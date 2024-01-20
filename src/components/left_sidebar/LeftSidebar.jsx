import React, { useEffect, useState } from "react";
import styles from "./LeftSidebar.module.scss";
import ProfilePreview from "./profile_preview/ProfilePreview";
import ApiHelper from '../../helpers/ApiHelper';
import Chat from '../chat/Chat';

function LeftSidebar() {
  const [userData, setUserData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeFriendUuid, setActiveFriendUuid] = useState(null);
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserUuid, setSelectedUserUuid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiHelper.fetchLoggedUserWithFriends();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const getUsers = async () => {
      try {
        const allUsers = await ApiHelper.fetchUserWithoutFriends();
        setPotentialFriends(allUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
    getUsers();
  }, []);

  const sortedFriends = userData && userData.friends
    ? [...userData.friends].sort((a, b) => b.favourite - a.favourite)
    : [];

  const startChat = (uuid) => {
    console.log(`Starting chat with UUID: ${uuid}`);
    setActiveFriendUuid(uuid);
    setIsChatOpen(true);
  };

  const selectUser = (uuid) => {
    setSelectedUserUuid(uuid);
  };

  const confirmAddFriend = () => {
    if (selectedUserUuid) {
      ApiHelper.addFriend(selectedUserUuid);
      setSelectedUserUuid(null);
    }
  };

  const filteredUsers = searchTerm.length === 0
    ? potentialFriends
    : potentialFriends.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.sidebar}>
      <ul>
        <div>
          <div className={styles.profile}>
            <ProfilePreview userData={userData} />
          </div>
          <div className={styles.friendlist}>
            <h2>Friends</h2>
            <h3>Search Users</h3>
            <div>
              <input
                type="text"
                placeholder="Search users..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <ul className={styles.searchResults}>
                  {filteredUsers.map(user => (
                    <li
                      key={user.uuid}
                      onClick={() => selectUser(user.uuid)}
                    >
                      {user.name}
                    </li>
                  ))}
                  {filteredUsers.length === 0 && <li>No users found</li>}
                </ul>
              )}

              {selectedUserUuid && (
                <button className={styles.addFriend} onClick={confirmAddFriend}>
                  Add Friend
                </button>
              )}
            </div>
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
