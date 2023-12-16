import React, {useState, useEffect} from "react";
import styles from "./Notifications.module.scss";
import { Button, List, Divider } from "@mui/material";

function Notifications(props) {
	const getNotifications = () => {
		// here use axios to get notifications from database
		return [
			{'id': 123, 'header': 'Message', 'body':'User RickAstley sent you a message.'},
			{'id': 987, 'header': 'Quiz', 'body':'You can try quizes again!'},
			{'id': 760, 'header': 'Friend Request', 'body':'User Goku wants to be your friend!'}
		  ]
	  };

	const [notifications, setNotifications] = useState(getNotifications());
	console.log(notifications);

	const clearAllNotifications = () => {
		if (notifications.length === 0) {
			console.log('No notifications to clear!');
			return;
		}

		// here use axios to clear all notifications

		setNotifications([]);
		console.log('Cleared!');
		console.log(notifications);
	};
    
	const clearNotification = (index) => {
		// here use axios to clear a single notification

		const notif_uuid = notifications[index]['id']

		const updatedNotifications = [...notifications];
		updatedNotifications.splice(index, 1);
		setNotifications(updatedNotifications);

		console.log('Cleared notificaiton no: ' + index + ' and uuid: ' + notif_uuid)
		console.log(notifications);
	};

	return (
	<div className={styles["all"]}>
		<div className={styles["header"]}>
			<p>Notifications</p>
			{ notifications.length !== 0 && <button className={styles["all-clear-button"]} onClick={clearAllNotifications}>Clear</button>}
		</div>
		<div>
			<List id='body' className={styles["list"]}>
				{ notifications.length === 0 ? <p className={styles["no-new-notifs"]}>No new notifications</p> :
				notifications.map((item, index) => (
					<ul key={index} className={styles["item"]}>
						<div className={styles["item-header"]}>
							<p>{item.header}</p>
							<button className={styles["item-clear-button"]} onClick={() => clearNotification(index)}>x</button>
						</div>
						<p className={styles["item-body"]}>{item.body}</p>
							<Divider variant="middle" />
					</ul>
				))}
			</List>
        </div>
    </div>
  );
}

export default Notifications