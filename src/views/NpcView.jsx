import { SvgIcon } from '@mui/material';
import React, { useState } from 'react';

import greenleaf from "../assets/img/npc/greenleaf.png";
import redbird from "../assets/img/npc/redbird.png";
import splashspeed from "../assets/img/npc/splashspeed.png";

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import HeroCard from '../components/hero_card/HeroCard';

class NpcView extends React.Component {
    render() {
        return(
            <div>
                {/* <img src={greenleaf}></img>
                <img src={redbird}></img>
                <img src={splashspeed}></img> */}
                <Box component="ul" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }}>
                        <CardCover><img src={greenleaf} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Green Leaf</Typography>
                        </CardContent>
                    </Card>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }}>
                        <CardCover><img src={redbird} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Red Bird</Typography>
                        </CardContent>
                    </Card>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }}>
                        <CardCover><img src={splashspeed} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Splash Speed</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        );
    }
}

export default NpcView;