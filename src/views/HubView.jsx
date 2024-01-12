import RedirectionHelper from "../helpers/RedirectionHelper";
import React, { useEffect } from "react";
import LocalStorage from "../helpers/LocalStorage";
import LeftSidebar from "../components/left_sidebar/LeftSidebar";

const HubView = (props) => {
  useEffect(() => {
    if (!LocalStorage.IsUserLogged()) {
      RedirectionHelper.Redirect("/login");
    }
  });

  return (
    <div style={{ display: "flex" }}>
      <LeftSidebar />
      <div style={{ flex: 1 }}>
        <p>Hub</p>
        {/* Rest of the hub content */}
      </div>
    </div>
  );
};

export default HubView;
