import React, { useState } from "react";
import "../styles/RegisterView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import LocalStorage from '../helpers/LocalStorage';
import RedirectionHelper from '../helpers/RedirectionHelper';
import { useNavigate } from "react-router-dom";



const RegisterView = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [csrfToken, setCsrfToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfToken = await ApiHelper.fetchCsrfToken();
        setCsrfToken(csrfToken);
      } catch (error) {
        console.error('Error retrieving CSRF token:', error);
      }
    };
  
    fetchCsrfToken();
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    // Validate input here if necessary

    try {
      const response = await axios.post('/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      });

      if (response.status === 204) {
        // Handle automatic login after registration
        await axios.post('/api/login', {
           email: email, 
           password: password 
          }, { 
            withCredentials: true, 
            headers: {
              'Accept': 'application/json',
              'X-XSRF-TOKEN': csrfToken,
        } } );
        // Redirect or perform other actions after successful login
        console.log('Login successful');
        const userDetails = await ApiHelper.fetchLoggedUser();
        LocalStorage.SetActiveUser(userDetails.uuid);
        navigate("/hub");
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };


  return (
    <div className="RegisterSite">
      <div>
        <img className="superHero" src={superhero} />
      </div>
      <div className="RegisterMain">
        <h2>A superhero in the making</h2>
        <form  onSubmit={handleRegister}>
          <div className="RegisterName">
            <label>
              Name
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="on" />
            </label>
          </div>
          <div className="RegisterMail">
            <label>
              Email
              <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="on" />
            </label>
          </div>
          <div className="RegisterPass">
            <label>
              Password
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
            </label>
          </div>
          <div className="RegisterConfirmationPass">
            <label>
              Password Confirmation
              <input type="password" name="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} autoComplete="on" />
            </label>
          </div>
          <button className="button">
            Sign up <FontAwesomeIcon className="icon" icon={faRightToBracket} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
