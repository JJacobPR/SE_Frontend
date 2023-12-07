import { SvgIcon } from '@mui/material';
import React, { useState } from 'react';

import greenleaf from "../assets/img/npc/greenleaf.png";
import redbird from "../assets/img/npc/redbird.png";
import splashspeed from "../assets/img/npc/splashspeed.png";

class NpcView extends React.Component {
    render() {
        return(
            <div>
                <img src={greenleaf}></img>
                <img src={redbird}></img>
                <img src={splashspeed}></img>
            </div>
        );
    }
}

export default NpcView;