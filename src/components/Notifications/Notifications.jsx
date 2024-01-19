import React, {useState, useEffect} from "react";
import styles from "./Notifications.module.scss";
import axios from 'axios';
import LocalStorage from '../../helpers/LocalStorage.jsx';
import { Button, List, Divider } from "@mui/material";

function Notifications(props) {
	const getNotifications = async () => {
		try {
			const response = await axios.get('/api/notifications', {
			  headers: {
				Accept: 'application/json',
			  },
			});

			console.log('Response:', response);
		
			const notifications = response.data.data.map(notification => ({
			  id: notification.uuid,
			  header: getNotificationHeader(notification.type),
			  body: getNotificationBody(notification),
			}));
			console.log(notifications);
		
			return notifications;

		  } catch (error) {
			console.error(error);
			return [];
		  }
	  };

	  const getNotificationHeader = (type) => {
		if(type == 1) {
			let firstTypeMessage = 'Friend Request';
			return firstTypeMessage;
		}
		else if(type == 2) {
			let secondTypeMessage = 'Game Invite';
			return secondTypeMessage;
		}
		else {
			let otherTypeMessage = 'Notification';
			return otherTypeMessage;
		}
	  };

	  const getNotificationBody = (notification) => {
		const { type, created_at } = notification;

		const formattedDate = new Date(created_at).toLocaleString(undefined, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		  });


		if(type == 1) {
			let firstTypeMessage = `You have got a friend request! (${formattedDate})`;
			return firstTypeMessage;
		}
		else if(type == 2) {
			let secondTypeMessage = `You were invited to a game! (${formattedDate})`;
			return secondTypeMessage;
		}
		else {
			let otherTypeMessage = `You have a notification! (${formattedDate})`;
			return otherTypeMessage;
		}
	  };

	const [notifications, setNotifications] = useState([]);
	console.log(notifications);
	const isLoggedIn = LocalStorage.IsUserLogged();

	const fetchData = async () => {
		const fetchedNotifications = await getNotifications();
		setNotifications(fetchedNotifications);
	  };

	useEffect(() => {
		fetchData();
	  
		const intervalId = setInterval(() => {
			fetchData();
		}, 5000);
	  
		return () => clearInterval(intervalId);
	  }, []);

	const clearAllNotifications = () => {
		if (notifications.length === 0) {
			console.log('No notifications to clear!');
			return;
		}

		// here use axios to clear all notifications (delete notification to be implemented in docs)

		setNotifications([]);
		console.log('Cleared!');
		console.log(notifications);
	};
    
	const clearNotification = (index) => {
		// here use axios to clear a single notification (delete notification to be implemented in docs)

		const notif_uuid = notifications[index]['id']

		const updatedNotifications = [...notifications];
		updatedNotifications.splice(index, 1);
		setNotifications(updatedNotifications);

		console.log('Cleared notificaiton no: ' + index + ' and uuid: ' + notif_uuid)
		console.log(notifications);
	};

	const Accept = async (uuid) => {
		try {
		  await axios.put(`/api/notifications/${uuid}`, {
			accept: true,
			seen: true,
		  });
		  fetchData();

		} catch (error) {
		  console.error(error);
		}
	  };
	
	  const Decline = async (uuid) => {
		try {
		  await axios.put(`/api/notifications/${uuid}`, {
			accept: false,
			seen: true,
		  });
		  fetchData();

		} catch (error) {
		  console.error(error);
		}
	  };

	  return (
		<div className={styles["all"]}>
		  {isLoggedIn && (
			<>
			  <div className={styles["header"]}>
				<p>Notifications</p>
				{notifications?.length !== 0 && <button className={styles["all-clear-button"]} onClick={clearAllNotifications}>Clear</button>}
			  </div>
			  <div>
				<List id='body' className={styles["list"]}>
				  {Array.isArray(notifications) && notifications.length === 0 ? (
					<p className={styles["no-new-notifs"]}>No new notifications</p>
				  ) : (
					notifications.map((item, index) => (
					  <ul key={index} className={styles["item"]}>
						<div className={styles["item-header"]}>
						  <p>{item?.header}</p>
						  <button className={styles["accept-button"]} onClick={() => Accept(item?.id)}>
							Accept
						  </button>
						  <button className={styles["decline-button"]} onClick={() => Decline(item?.id)}>
							Decline
						  </button>
						  <button className={styles["item-clear-button"]} onClick={() => clearNotification(index)}>x</button>
						</div>
						<p className={styles["item-body"]}>{item?.body}</p>
						<Divider variant="middle" />
					  </ul>
					))
				  )}
				</List>
			  </div>
			</>
		  )}
		</div>
	  );
}

export default Notifications