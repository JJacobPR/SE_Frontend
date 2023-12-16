import { Dialog, SvgIcon } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import LocalStorage from '../helpers/LocalStorage';

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
            popupQuiz: false,
            quizData: null,
            index: 0,
            points: 0,
            email: 'fk@gmail.com',
            password: 'strongpassword123',
        };
    }

    onLogin = () => {
        axios.get('/api/csrf-cookie', {
        })
        .then(() => {
            axios.post('/api/login', {
                email: this.state.email,
                password: this.state.password
            })
        .then(() => {
            axios.get('/api/user', {
            }).then((response) => {
                LocalStorage.SetActiveUser(response.data.data.uuid);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    });
    };

    setTriggerForQuiz = (value) => {
        this.setState({ popupQuiz: value });
    };

    onGetQuiz = () => {
        axios.get('/api/quizzes/getRandom', {
                headers: {
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const quizData = response.data.data;
                this.setState({ quizData, popupQuiz: true, index: 0, points: 0 });
                console.log(quizData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handleAnswer = (correct, id) => {
        if (correct === id) {
            this.setState((prevState) => ({
                points: prevState.points + 50,
            }));
        }
        console.log(correct);
        console.log(id);
        this.setState((prevState) => ({
            index: prevState.index + 1
        }));
        console.log(this.state.points);
    };

    render() {
        return (
            <div>
                <Dialogue
                    trigger={this.state.popupQuiz}
                    setTrigger={this.setTriggerForQuiz}
                    question={this.state.quizData?.questions[this.state.index]}
                    handleAnswer={() => this.handleAnswer(this.state.quizData?.questions[this.state.index]?.correct)}
                />
                <Box component="ul" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => this.setTrigger(true)}>
                        <CardCover><img src={greenleaf} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Green Leaf</Typography>
                        </CardContent>
                    </Card>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => {this.setTriggerForQuiz(true); this.onGetQuiz();}}>
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
                <button onClick={() => this.onLogin()}></button>
                <Notifications></Notifications>
            </div>
        );
    }
}

export default NpcView;