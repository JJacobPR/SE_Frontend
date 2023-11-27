import styles from "./Navbar.module.scss";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/exampleSlice";
import LocalStorage from "../../helpers/LocalStorage";

function Navbar() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(increment());
    console.log(`Login Clicked:${count}`);
  };

  return (
    <nav>
      <Link className={styles["logo-wrapper"]} to="hub">
        <img src={logo} />
      </Link>
      <div>
        <ul className={styles["nav-main"]}>
          <li>
            <FontAwesomeIcon icon={faComments} />
            <Link to="profile"> Forum</Link>
          </li>

          <li>
            <Link to="account">
            <FontAwesomeIcon icon={faUserCircle} /> My Account</Link>
          </li>
          { LocalStorage.IsUserLogged() == false  &&
            <li>
              <Link to="login" onClick={loginHandler}>
              <FontAwesomeIcon icon={faRightToBracket} /> Login </Link>
            </li>
          }
          { LocalStorage.IsUserLogged() == true &&
            <li>
              <Link to="login" onClick={loginHandler}>
                 Logout
              </Link>
            </li>  
          } 
          <li><FontAwesomeIcon icon={faVolumeHigh}/><a> Volume</a></li>   
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
