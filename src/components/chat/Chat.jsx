import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Chat.module.scss';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import LocalStorage from '../../helpers/LocalStorage';
import ApiHelper from '../../helpers/ApiHelper';

function Chat({ friendUuid, onClose, isChatOpen }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friendDetails, setFriendDetails] = useState(null);
  const currentUserUuid = LocalStorage.GetActiveUser();

  useEffect(() => {
    const chatHistory = LocalStorage.GetChatHistory(friendUuid);
    setMessages(chatHistory);

    ApiHelper.fetchFriendData(friendUuid).then(data => setFriendDetails(data));

    window.Echo.leave('notifications');

    window.Echo.channel('notifications')
      .listen('.on_message_sent', (data) => {
        if ((data.receiver_uuid === currentUserUuid && data.sender_uuid === friendUuid)) {
          setMessages(prevMessages => [...prevMessages, {
            sender: data.sender_uuid,
            message: data.message
          }]);
        }
      });

    return () => {
      window.Echo.leave('notifications');
    };
  }, [friendUuid, currentUserUuid]);

  const sendMessage = () => {
    axios.post('/api/users/sendMessage', {
      receiver_uuid: friendUuid,
      message: newMessage
    }, { withCredentials: true })
      .then(response => {
        const updatedMessages = [...messages, {
          sender: LocalStorage.GetActiveUser(),
          message: newMessage
        }];
        setNewMessage('');
        setMessages(updatedMessages);
        LocalStorage.SetChatHistory(friendUuid, updatedMessages);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const chatContainerClasses = `${styles.chatContainer} ${isChatOpen ? styles.active : ''}`;

  return (
    <div className={chatContainerClasses}>
      <div className={styles.chatHeader}>
        <h3>Chat with {friendDetails ? friendDetails.name : 'Loading...'}</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className={styles.chatMessages}>
        {messages.filter(msg => msg.sender === friendUuid || msg.sender === LocalStorage.GetActiveUser())
          .map((msg, index) => (
            <div key={index} className={msg.sender === LocalStorage.GetActiveUser() ? styles.myMessage : styles.theirMessage}>
              {msg.message}
            </div>
          ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newMessage.trim()) {
              sendMessage();
              e.preventDefault();
            }
          }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
