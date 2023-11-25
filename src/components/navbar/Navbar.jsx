import styles from "./Navbar.module.scss";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/exampleSlice";

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
            <Link to="npc">NPC</Link>
          </li>

          <li>
            <Link to="profile">Chat</Link>
          </li>

          <li>
            <Link to="account">My Account</Link>
          </li>

          <li>
            <Link to="login" onClick={loginHandler}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
