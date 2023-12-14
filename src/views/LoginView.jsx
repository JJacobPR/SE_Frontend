import React, { useState } from "react";
import "../styles/LoginView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const LoginView = () => {
  return (
    <div className="LoginSite">
      <div>
        <img className="superHero" src={superhero} />
      </div>
      <div className="LoginMain">
        <h2>
          We need our superhero! <FontAwesomeIcon icon={faRightToBracket} beat />
        </h2>
        <form>
          <div className="LoginMail">
            <label>
              Email
              <input type="text" name="mail" autoComplete="on" />
            </label>
          </div>

          <div className="LoginPass">
            <label>
              Password
              <input type="password" name="password" autoComplete="on" />
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
