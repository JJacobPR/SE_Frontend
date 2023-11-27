import React, { useState } from 'react';
import "../styles/RegisterView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

class RegisterView extends React.Component {
    render() {
            return (
                <div className="RegisterSite">
                    <div>
                        <img className="superHero" src={superhero}/>
                    </div>
                    <div className="RegisterMain">
                        <h2>A superhero in the making</h2>
                        <form>
                            <div className="RegisterName">
                                <label>Name
                                <input type="text" name="name" autoComplete="on"/>
                                </label>
                            </div>
                            <div className="RegisterMail">
                                <label>Email
                                <input type="text" name="email" autoComplete="on"/>
                                </label>
                            </div>
                            <div className="RegisterPass">
                                <label>Password
                                <input type="password" name="password" autoComplete="on"/>
                                </label>
                            </div>
                            <div className="RegisterConfirmationPass">
                                <label>Password Confirmation
                                <input type="password" name="password_confirmation" autoComplete="on"/>
                                </label>
                            </div>
                            <button className="button">Sign up <FontAwesomeIcon icon={faRightToBracket} /></button>
                        </form>
                        
                    </div>
            </div>

        );
    }
}

export default RegisterView;
