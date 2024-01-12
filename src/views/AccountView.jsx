import React, { useEffect, useState } from "react";
import "../styles/AccountView.scss";
import "../index.scss";
import axios from "axios";
import LocalStorage from "../helpers/LocalStorage";
import RedirectionHelper from "../helpers/RedirectionHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AccountView = (props) => {
  const [user, updateUser] = useState({
    name: "",
    email: "",
  });
  const [newEmail, updateNewEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [passwordConfirmation, updatePasswordConfirmation] = useState("");
  const [disabled, updateDisabled] = useState(true);

  useEffect(() => {
    if (!LocalStorage.IsUserLogged()) {
      RedirectionHelper.Redirect("/login");
    }
  });

  return (
    <div className="AccountSite">
      <div className="MyAccountMain">
        <h2>
          My account <FontAwesomeIcon icon={faUserCircle} beat />
        </h2>
        <form>
          <div className="UserName">
            <label>
              Name
              <input type="text" id="name" />
            </label>
          </div>

          <div className="UserEmail">
            <label>
              Email
              <input type="text" id="email" />
            </label>
          </div>

          <div className="UserPassword">
            <label>
              Password
              <input type="password" id="password" />
            </label>
          </div>

          <div className="UserPasswordConfirmation">
            <label>
              Password Confirmation
              <input type="password" id="password_confirmation" />
            </label>
          </div>
        </form>

        <button className="EditBtn">
          Edit <FontAwesomeIcon className="icon" icon={faPenToSquare} />
        </button>
        <button className="SaveBtn">
          Save <FontAwesomeIcon className="icon" icon={faFloppyDisk} disabled={disabled} />
        </button>
        <button className="DeleteBtn">
          Delete account <FontAwesomeIcon className="icon" icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default AccountView;
