import React, { useEffect, useState } from "react";
import "../styles/AccountView.scss";
import "../index.scss";
import axios from "axios";
import LocalStorage from "../helpers/LocalStorage";
import RedirectionHelper from "../helpers/RedirectionHelper";
import ApiHelper from "../helpers/ApiHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPenToSquare, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";

const AccountView = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    about: "",
    anonymous: false
  });
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [disabled, setDisabled] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      if (!LocalStorage.IsUserLogged()) {
        RedirectionHelper.Redirect("/login");
      } else {
        try {
          const loggedUser = await ApiHelper.fetchLoggedUser();
          setUser({
            name: loggedUser.name,
            email: loggedUser.email,
            about: loggedUser.about,
            anonymous: loggedUser.anonymous
          });
          setOriginalEmail(loggedUser.email);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleAnonymousChange = (e) => {
    setUser({ ...user, anonymous: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Password and confirmation do not match.");
      return;
    }
    const uuid = LocalStorage.GetActiveUser();
    const updatePayload = {
      name: user.name,
      about: user.about,
      anonymous: user.anonymous
    };
  
    // Only include the email in the payload if it has been changed
    if (user.email !== originalEmail) {
      updatePayload.email = user.email;
    }
  
    // Include password only if it's provided
    if (password) {
      updatePayload.password = password;
      updatePayload.password_confirmation = passwordConfirmation;
    }
  
    try {
      await axios.put(`/api/users/${uuid}`, updatePayload);
      console.log('User updated successfully');
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  return (
    <div className="AccountSite">
      <div className="MyAccountMain">
        <h2>
          My account <FontAwesomeIcon icon={faUserCircle} beat />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="UserName">
            <label>
              Name
              <input type="text" name="name" value={user.name} onChange={handleInputChange} />
            </label>
          </div>

          <div className="UserEmail">
            <label>
              Email
              <input type="text" name="email" value={user.email} onChange={handleInputChange} />
            </label>
          </div>

          <div className="UserAbout">
            <label>
              About
              <textarea name="about" value={user.about} onChange={handleInputChange} />
            </label>
          </div>

          <div className="UserAnonymous">
            <label>
              Anonymous Profile
              <input type="checkbox" checked={user.anonymous} onChange={handleAnonymousChange} />
            </label>
          </div>

          <div className="UserPassword">
            <label>
              Password
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
          </div>

          <div className="UserPasswordConfirmation">
            <label>
              Password Confirmation
              <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
            </label>
          </div>

          <button className="SaveBtn" type="submit">
            Save <FontAwesomeIcon className="icon" icon={faFloppyDisk} />
          </button>
        </form>

        <button className="DeleteBtn">
          Delete account <FontAwesomeIcon className="icon" icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default AccountView;
