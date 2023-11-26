import RedirectionHelper from "../helpers/RedirectionHelper";
import React, { useState } from 'react';

class HubView extends React.Component {
  // componentDidMount() {
  //   if (!LocalStorage.IsUserLogged()) {
  //     RedirectionHelper.Redirect('/login');
  //   }
  // }

  render() {
    return (
      <div>
        <p>Hub</p>
      </div>
    );
  }
}

export default HubView;
