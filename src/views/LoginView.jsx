import React, { useState } from 'react';
import "../styles/LoginView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";

class LoginView extends React.Component {
  render() {
    return (
      <div className="LoginSite">
        <div>
          <img className="superHero" src={superhero}/>
        </div>
                <div className="LoginMain">
                    <h2>We need our superhero!</h2>
                    <form>
                        <div className="LoginMail">
                            <label>Email
                            <input type="text" name="mail" autoComplete="on" />
                            </label>
                        </div>
                        
                        <div className="LoginPass">
                            <label>Password
                            <input type="password" name="password" autoComplete="on" />
                            </label>
                        </div>
                        <button class="button1" >Sign in</button>
                    </form>
                    
                    <div className="ForgotPassHref">
                        <a href="/" >Forgot Password?</a>
                    </div>
                    
                    <div className="RegisterHref">
                        <a href="/register">Sign up</a>
                    </div>
                </div>
            </div>
    );
  }
}

export default LoginView;
