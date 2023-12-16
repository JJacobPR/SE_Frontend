import React, {useState} from "react";
import styles from "./Notifications.module.scss";
import { Button, List, ListItem } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';

function NotificationHolder() {
    
    const loadNotifications = () => {
        // here use axios to get notifications from database
        return [
            {'header': 'aa?', 'body':'AAAA'},
            {'header': 'bb?', 'body':'BBB'}
        ]
    };

    // load notifications here
    const notifications = loadNotifications();

    const clearAllNotifications = () => {
        // here use axios to delete all notifications
        console.log('Cleared!');
        console.log(notifications);
    };
    
    const clearNotification = (index) => {
        console.log('Cleared index: ' + index)
    };

    return (
        <div id='main'>
          <div id='header'>
            Notifications
            <button onClick={clearAllNotifications}>Clear All</button>
          </div>

        <div >
          <List id='body' className={styles["notif-list"]}>
              {notifications.map((item, index) => (
                <ListItem key="{index}" className={styles["notif-item"]}>
                    <p className={styles["notif-header"]}>{item.header}</p>
                    <p>{item.body}</p>
                    <Button onClick={() => clearNotification(index)}>x</Button>
                </ListItem>
              ))}
          </List>
          </div>
      </div>
    );
}

export default NotificationHolder