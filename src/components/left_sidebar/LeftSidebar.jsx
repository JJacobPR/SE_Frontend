import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./LeftSidebar.module.scss";
import ProfilePreview from "./profile_preview/ProfilePreview";
import ApiHelper from '../../helpers/ApiHelper';
import Chat from '../chat/Chat';

function LeftSidebar() {
  const [userData, setUserData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeFriendUuid, setActiveFriendUuid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiHelper.fetchLoggedUserWithFriends();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const sortedFriends = userData && userData.friends
    ? [...userData.friends].sort((a, b) => b.favourite - a.favourite)
    : [];

  const startChat = (uuid) => {
    console.log(`Starting chat with UUID: ${uuid}`);
    setActiveFriendUuid(uuid);
    setIsChatOpen(true);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <div>
          <div className={styles.profile}>
            <ProfilePreview userData={userData} />
          </div>
          <div className={styles.friendlist}>
            <h2>Friends</h2>
            <ul>
              {sortedFriends.map(friend => (
                <li key={friend.uuid}>
                  <div className={styles.friend}>
                    <div className={styles.details}>
                      <b>{friend.favourite && <span>☆ </span>}{friend.name}</b>
                      <br />
                      Level: {friend.level}
                      <br />
                    </div>
                    <button
                      className={styles.startChat}
                      onClick={() => startChat(friend.uuid)}
                    >
                      Start Chat
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ul>
      {isChatOpen &&
        <Chat
          friendUuid={activeFriendUuid}
          isChatOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      }
    </div>
  );
}

export default LeftSidebar;
