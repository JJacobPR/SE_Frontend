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
            popupQuest: false,
            popupTutorial: false,
            quizData: null,
            questData: null,
            tutorialData: null,
            quizIndex: 0,
            questIndex: 0,
            points: 0,
            number: 0,
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

    setTriggerForQuest = (value) => {
        this.setState({ popupQuest: value });
    };

    setTriggerForTutorial = (value) => {
        this.setState({ popupTutorial: value });
    };

    onGetQuiz = () => {
        axios.get('/api/quizzes/getRandom', {
                headers: {
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const quizData = response.data.data;
                this.setState({ quizData, popupQuiz: true, quizIndex: 0, points: 0 });
                console.log(quizData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    onGetQuest = () => {
        axios.get('/api/quests', {
                headers: {
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const questData = response.data;
                this.setState({ questData, popupQuest: true});
                console.log(questData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    onGetTutorial = () => {
        axios.get('/api/tutorials', {
                headers: {
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const tutorialData = response.data.data;
                this.setState({ tutorialData, popupTutorial: true });
                console.log(tutorialData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handleAnswer = (correct, id) => {
        this.setState({ number: id});
        if (correct === this.state.number) {
            this.setState((prevState) => ({
                points: prevState.points + 50,
            }));
        }
        console.log(correct);
        console.log(id);
        console.log(this.state.number);
        this.setState((prevState) => ({
            quizIndex: prevState.quizIndex + 1
        }));
        console.log(this.state.points);
    };

    resetTutorials = () => {
        for (let i = 0; i < this.state.tutorialData.length; i++) {
            if (this.state.tutorialData[i].completed) {
                axios.put(`/api/tutorials/${this.state.tutorialData[i].uuid}`, {
                    "completed": false
                })
                .then((response) => {
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.onLogin()}>Log in example</button>
                <Dialogue
                    trigger={this.state.popupQuiz}
                    setTrigger={this.setTriggerForQuiz}
                    question={this.state.quizData?.questions[this.state.quizIndex]}
                    handleAnswer={(number) => this.handleAnswer(this.state.quizData?.questions[this.state.quizIndex]?.correct, number)}
                />
                <Dialogue
                    trigger={this.state.popupQuest}
                    setTrigger={this.setTriggerForQuest}
                    quest={this.state.questData}
                >
                </Dialogue>
                <Dialogue
                    trigger={this.state.popupTutorial}
                    setTrigger={this.setTriggerForTutorial}
                    tutorial={this.state.tutorialData}
                />
                <Box component="ul" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => {this.setTriggerForQuest(true); this.onGetQuest();}}>
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
                    <Card component="li" sx={{ maxWidth: 200, maxHeight: 200, flexGrow: 1 }} onClick={() => {this.setTriggerForTutorial(true); this.onGetTutorial();}}>
                        <CardCover><img src={splashspeed} srcSet="" loading="lazy" alt=""/>
                        </CardCover>
                        <CardContent>
                        <Typography level="body-lg" fontWeight="bold" textColor="black" mt={{ xs: 12, sm: 18 }}>Splash Speed</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Notifications></Notifications>
                <button onClick={this.resetTutorials}>Reset Tutorials</button>
            </div>
        );
    }
}

export default NpcView;