import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/LoginView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import LocalStorage from '../helpers/LocalStorage';
import RedirectionHelper from '../helpers/RedirectionHelper';
import ApiHelper from '../helpers/ApiHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faArrowUpRightFromSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const loginHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      console.error("Please enter both email and password");
      return;
    }
    try {
      await axios.post('/api/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
        }
      });

      console.log('Login successful');
      const userDetails = await ApiHelper.fetchLoggedUser();
      LocalStorage.SetActiveUser(userDetails.uuid);
      navigate("/hub");
    } catch (error) {
      console.error('Error during login or fetching user data:', error);
    }
  };
  if (LocalStorage.IsUserLogged()) {
    RedirectionHelper.Redirect("hub");
  }
  return (
    <div className="LoginSite">
      <div>
        <img className="superHero" src={superhero} alt="Superhero" />
      </div>
      <div className="LoginMain">
        <h2>
          We need our superhero! <FontAwesomeIcon className="icon" icon={faRightToBracket} beat />
        </h2>
        <form onSubmit={loginHandler}>
          <div className="LoginMail">
            <label>
              Email
              <input onChange={(e) => setEmail(e.target.value)} type="text" name="mail" autoComplete="on" value={email} />
            </label>
          </div>      <div className="LoginPass">
            <label>
              Password
              <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" autoComplete="on" value={password} />
            </label>
          </div>
          <button className="button1">
            Sign in <FontAwesomeIcon className="icon" icon={faRightToBracket} />
          </button>
        </form>

        <div className="ForgotPassHref">
          <a href="/">
            Forgot Password? <FontAwesomeIcon className="icon" icon={faEnvelope} />
          </a>
        </div>
        <div className="RegisterHref">
          <a href="/register">
            Sign up <FontAwesomeIcon className="icon" icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>
    </div>);
};

export default LoginView;