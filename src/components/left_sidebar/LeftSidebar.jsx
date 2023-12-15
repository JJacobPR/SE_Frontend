import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./LeftSidebar.module.scss";
import ProfilePreview from "./profile_preview/ProfilePreview";

function LeftSidebar() {
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("/api/user?withFriends=true", { withCredentials: true })
  //     .then((response) => {
  //       setUserData(response.data.data);
  //       // console.log('User data:', response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

  const userData = {
    uuid: "db233b11-f7a7-412b-a660-6450e5d26c1d",
    name: "Player 1",
    avatar: null,
    about: null,
    email: "test2@gmail.com",
    level: 1,
    experience: 20,
    anonymous: false,
    friendCode: "132DCA",
    friends: [
      {
        uuid: "bfc273e2-e26c-4b05-8773-9e44d03f1ec8",
        name: "coolname123",
        avatar: null,
        level: 7,
        experience: 0,
        favourite: false,
      },
      {
        uuid: "bfc273e2-e26c-4b05-8773-9e44d03f1em0",
        name: "alberteinsten928",
        avatar: null,
        level: 12,
        experience: 0,
        favourite: true,
      },
      {
        uuid: "bfc273e2-e26c-4b05-8773-9e44d03f1e3d",
        name: "vincentvangogh29",
        avatar: null,
        level: 3,
        experience: 0,
        favourite: false,
      },
    ],
    created_at: "2023-11-25T16:20:52.000000Z",
    updated_at: "2023-11-25T16:20:52.000000Z",
  };

  const sortedFriends = userData && userData.friends ? [...userData.friends].sort((a, b) => b.favourite - a.favourite) : [];

  return (
    <div className={styles.sidebar}>
      <ul>
        <div>
          <ProfilePreview userData={userData} />
          <div className={styles.friendlist}>
            <h2>Friends</h2>
            <ul>
              {sortedFriends.map((friend) => (
                <li key={friend.uuid}>
                  <div className={styles.friend}>
                    <div className={styles.details}>
                      <b>
                        {friend.favourite && <span>☆ </span>}
                        {friend.name}
                      </b>
                      <br />
                      Level: {friend.level}
                      <br />
                    </div>
                    {/* Link to the chat route, passing the friend's uuid as a parameter */}
                    <Link to={`/chat/${friend.uuid}`} className={styles.startChatLink}>
                      Start Chat
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default LeftSidebar;
