import styles from "./Navbar.module.scss";
import logo from "../../assets/img/logo.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import LocalStorage from "../../helpers/LocalStorage";

const Navbar = (props) => {
  const [muted, updateMuted] = useState(true);

  const muteMe = (elem) => {
    elem.pause();
  };

  const unmuteMe = (elem) => {
    elem.play();
  };

  const MuteSound = () => {
    if (muted === false) {
      document.querySelectorAll("video, audio").forEach((elem) => muteMe(elem));
      updateMuted(true);
    } else {
      document.querySelectorAll("video, audio").forEach((elem) => unmuteMe(elem));
      updateMuted(false);
    }
  };

  const onLogout = () => {
    LocalStorage.LogoutUser();
  };

  return (
    <nav>
      <Link className={styles["logo-wrapper"]} to="hub">
        <img src={logo} />
      </Link>
      <div>
        <ul className={styles["nav-main"]}>
          <li>
          <FontAwesomeIcon className="icon" icon={faGamepad} />
          <Link to="hub">Play</Link>
          </li>
          <li>
            <FontAwesomeIcon className="icon" icon={faComments} />
            <Link to="profile">Forum</Link>
          </li>

          <li>
          <Link to="npc">NPC</Link>
          </li>

          <li>
            <FontAwesomeIcon className="icon" icon={faUserCircle} />
            <Link to="account">My Account</Link>
          </li>
          {LocalStorage.IsUserLogged() == false && (
            <li>
              <FontAwesomeIcon className="icon" icon={faRightToBracket} />
              <Link to="login" >
                Login
              </Link>
            </li>
          )}
          {LocalStorage.IsUserLogged() == true && (
            <li>
              <Link to="login" onClick={onLogout}>
                Logout
              </Link>
            </li>
          )}
          {muted == false && (
            <li>
              <FontAwesomeIcon className="icon" icon={faVolumeHigh} />
              <a onClick={MuteSound}>Mute</a>
            </li>
          )}
          {muted == true && (
            <li>
              <FontAwesomeIcon className="icon" icon={faVolumeXmark} />
              <a onClick={MuteSound}>Unmute</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
