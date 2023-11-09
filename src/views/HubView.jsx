import RedirectionHelper from "../helpers/RedirectionHelper";
import React, { useState } from 'react';

class HubView extends React.Component {


componentDidMount() {
    if (1 !== 0) {
      RedirectionHelper.Redirect('/login');
        }
        else {
            //load hub
        }
  }

  render() {
    return (
      <div>
        <p>Hub</p>
      </div>
    );
  }
}

export default HubView;
