import React from "react";
//import '../style.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="pupupDiv">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup