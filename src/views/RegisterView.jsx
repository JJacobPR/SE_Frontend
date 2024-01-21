import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import ApiHelper from '../helpers/ApiHelper';
import axios from "axios";

const RegisterView = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password_confirmation":
        setPasswordConfirmation(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const csrfToken = await ApiHelper.fetchCsrfToken();
      await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      }, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': csrfToken,
          'Accept': 'application/json'
        }
      });
      console.log('Registration successful');
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="RegisterSite">
      <div>
        <img className="superHero" src={superhero} alt="Superhero" />
      </div>
      <div className="RegisterMain">
        <h2>A superhero in the making</h2>
        <form onSubmit={handleSubmit}>
          <div className="RegisterName">
            <label>
              Name
              <input type="text" name="name" autoComplete="on" value={name} onChange={handleInputChange} />
            </label>
          </div>
          <div className="RegisterMail">
            <label>
              Email
              <input type="text" name="email" autoComplete="on" value={email} onChange={handleInputChange} />
            </label>
          </div>
          <div className="RegisterPass">
            <label>
              Password
              <input type="password" name="password" autoComplete="on" value={password} onChange={handleInputChange} />
            </label>
          </div>
          <div className="RegisterConfirmationPass">
            <label>
              Password Confirmation
              <input type="password" name="password_confirmation" autoComplete="on" value={passwordConfirmation} onChange={handleInputChange} />
            </label>
          </div>
          <button className="button" type="submit">
            Sign up <FontAwesomeIcon className="icon" icon={faRightToBracket} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
