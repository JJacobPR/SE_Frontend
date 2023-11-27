import RedirectionHelper from "../helpers/RedirectionHelper";
import React from 'react';
import LocalStorage from '../helpers/LocalStorage';
import LeftSidebar from "../components/left_sidebar/LeftSidebar";

class HubView extends React.Component {
  // componentDidMount() {
  //   if (!LocalStorage.IsUserLogged()) {
  //     RedirectionHelper.Redirect('/login');
  //   }
  // }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <LeftSidebar />
        <div style={{ flex: 1 }}>
          <p>Hub</p>
          {/* Rest of the hub content */}
        </div>
      </div>
    );
  }
}

export default HubView;
