import React, { useState } from "react";
import "../styles/LoginView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();
    if (email === "test@test.gmail" && password === "test") navigate("/hub");
  };

  return (
    <div className="LoginSite">
      <div>
        <img className="superHero" src={superhero} />
      </div>
      <div className="LoginMain">
        <h2>
          We need our superhero! <FontAwesomeIcon icon={faRightToBracket} beat />
        </h2>
        <form onSubmit={loginHandler}>
          <div className="LoginMail">
            <label>
              Email
              <input onChange={(e) => updateEmail(e.target.value)} type="text" name="mail" autoComplete="on" />
            </label>
          </div>

          <div className="LoginPass">
            <label>
              Password
              <input onChange={(e) => updatePassword(e.target.value)} type="password" name="password" autoComplete="on" />
            </label>
          </div>
          <button className="button1">
            Sign in <FontAwesomeIcon icon={faRightToBracket} />
          </button>
        </form>

        <div className="ForgotPassHref">
          <a href="/">
            Forgot Password? <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <div className="RegisterHref">
          <a href="/register">
            Sign up <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
