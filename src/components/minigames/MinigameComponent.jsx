import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { TrashGame, trashGameConfig } from './trashGame';
import { SaveEarth, saveEarthConfig } from './saveEarth';
import { TreePlanter, treePlanterConfig } from './treePlanter';
import { SaveElectricity, saveElectricityConfig } from './saveElectricity';

const MinigameComponent = ({ gameNumber, switchToLobby }) => {
    useEffect(() => {
        const minigameMapping = {
            1: { gameClass: TrashGame, config: trashGameConfig },
            2: { gameClass: SaveEarth, config: saveEarthConfig },
            3: { gameClass: TreePlanter, config: treePlanterConfig },
            4: { gameClass: SaveElectricity, config: saveElectricityConfig }
        };

        const selectedMinigame = minigameMapping[gameNumber];

        if (!selectedMinigame) {
            console.error('Invalid value for minigame selection');
            return;
        }

        selectedMinigame.config.scene = new selectedMinigame.gameClass(switchToLobby);

        const minigame = new Phaser.Game(selectedMinigame.config);

        return () => {
            minigame.destroy(true);
        };
    }, [gameNumber, switchToLobby]);

    return (
        <div id="phaser-minigame-container">
        </div>
    );
};

export default MinigameComponent;
