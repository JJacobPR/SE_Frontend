import React, {useState} from "react";
import styles from "./Dialogue.module.scss";

function Dialogue(props) {
    return (props.trigger) && (
      <div className={styles["popupDiv"]}>
          <div className={styles["popup"]}>
            This is an example dialogue popup
              <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
          </div>
      </div>
    );
}

export default Dialogue