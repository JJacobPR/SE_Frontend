import styles from "./PlayerCard.module.scss";
import { useNavigate } from "react-router-dom";
import profilePic from "../../../assets/img/profile_pic.png";

const PlayerCard = ({ userData }) => {
  const navigate = useNavigate();

  const navToEditAccount = () => {
    navigate("../account");
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profile}>
        <div className={styles.edit}>
          <img src={profilePic} alt="Player-Icon" />
        </div>
        <div>
          <h2>{userData.name}</h2>
          <h3>Level: {userData.level}</h3>
          <h3>Experience: {userData.experience}</h3>
          <h3>FriendCode: {userData.friendCode}</h3>
          <h3>Anonymous: {userData.anonymous ? "Yes" : "No"}</h3>
        </div>
      </div>
      <button onClick={navToEditAccount}>Edit Account</button>
    </div>
  );
};

export default PlayerCard;
