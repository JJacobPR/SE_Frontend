import React, { useState } from 'react';
import '../styles/AccountView.scss';
import '../index.scss'; 
import axios from "axios";
import LocalStorage from '../helpers/LocalStorage';
import RedirectionHelper from '../helpers/RedirectionHelper';

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
            <h2>My account</h2>
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
            
            <button className="EditBtn" > Edit </button>
            <button className="SaveBtn" > Save </button>
            <button className="DeleteBtn"> Delete account </button>
        </div>
    </div>
    );
  }
}

export default AccountView;
