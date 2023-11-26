import React, { useState } from 'react';
import '../styles/AccountView.scss';
import '../index.scss'; 
import axios from "axios";
import LocalStorage from '../helpers/LocalStorage';
import RedirectionHelper from '../helpers/RedirectionHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class AccountView extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          user: {
              name: '',
              email: '',
          },
          newEmail: undefined,
          password: '',
          passwordConfirmation: '',
          disabled: true
      }
  }

  render() {
  return (
    <div className="AccountSite">
        <div className="MyAccountMain">
            <h2>My account <FontAwesomeIcon icon={faUserCircle} beat/></h2>
            <form>
                <div className="UserName">
                    <label>Name
                    <input type="text" id="name" 
                        />
                    </label>
                </div>
            
                <div className="UserEmail">
                    <label>Email
                    <input type="text" id="email" 
                        />
                    </label>
                </div>
                
                <div className="UserPassword">
                    <label>Password
                    <input type="password" id="password" 
                        />
                    </label>
                </div>

                <div className="UserPasswordConfirmation">
                    <label>Password Confirmation
                    <input type="password" id="password_confirmation" 
                        />
                    </label>
                </div>
            </form>
            
            <button className="EditBtn" > Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
            <button className="SaveBtn" > Save <FontAwesomeIcon icon={faFloppyDisk} disabled = {this.state.disabled}/></button>
            <button className="DeleteBtn"> Delete account <FontAwesomeIcon icon={faTrash} /></button>
        </div>
    </div>
    );
  }
}

export default AccountView;
