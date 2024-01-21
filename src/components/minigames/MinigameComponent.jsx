import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { TrashGame, trashGameConfig } from './trashGame';

const MinigameComponent = ({ gameNumber, switchToLobby, gameInstance }) => {
    useEffect(() => {
        const minigameMapping = {
            1: { gameClass: TrashGame, config: trashGameConfig }
        };

        const selectedMinigame = minigameMapping[gameNumber];

        if (!selectedMinigame) {
            console.error('Invalid value for minigame selection');
            return;
        }

        selectedMinigame.config.scene = new selectedMinigame.gameClass(gameInstance, switchToLobby);

        const minigame = new Phaser.Game(selectedMinigame.config);

        return () => {
            minigame.destroy(true);
        };
    }, [gameNumber, switchToLobby, gameInstance]);

    return (
        <div id="phaser-minigame-container">
        </div>
    );
};

export default MinigameComponent;
