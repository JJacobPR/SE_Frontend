import { SvgIcon } from '@mui/material';
import React, { useState } from 'react';

import greenleaf from "../assets/img/npc/greenleaf.png";
import redbird from "../assets/img/npc/redbird.png";
import splashspeed from "../assets/img/npc/splashspeed.png";

import Dialogue from '../components/Popup/Dialogue';
import Notifications from '../components/Notifications/Notifications';

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

class NpcView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          popup: false
        };
      }

    setTrigger = (value) => {
        this.setState({popup: value})
    }

    render() {
        return(
            <div>
                <Dialogue trigger={this.state.popup} setTrigger={this.setTrigger}/>
                <Box component="ul" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => this.setTrigger(true)}>
                        <CardCover><img src={greenleaf} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Green Leaf</Typography>
                        </CardContent>
                    </Card>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => this.setTrigger(true)}>
                        <CardCover><img src={redbird} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Red Bird</Typography>
                        </CardContent>
                    </Card>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => this.setTrigger(true)}>
                        <CardCover><img src={splashspeed} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Splash Speed</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Notifications></Notifications>
            </div>
        );
    }
}

export default NpcView;