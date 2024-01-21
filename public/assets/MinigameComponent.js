import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { TrashGame, trashGameConfig } from './games/trashGame';
import { SaveEarth, saveEarthConfig } from './games/saveEarth';
import { TreePlanter, treePlanterConfig } from './games/treePlanter';
import { LightSwitcher, lightSwitcherConfig } from './games/lightSwitcher';
import { SaveElectricity, saveElectricityConfig } from './games/saveElectricity';

const MinigameComponent = ({ gameNumber, switchToLobby }) => {
    useEffect(() => {
        const minigameMapping = {
            1: { gameClass: TrashGame, config: trashGameConfig },
            2: { gameClass: SaveEarth, config: saveEarthConfig },
            3: { gameClass: TreePlanter, config: treePlanterConfig },
            4: { gameClass: LightSwitcher, config: lightSwitcherConfig },
            5: { gameClass: SaveElectricity, config: saveElectricityConfig },
        };

        const selectedMinigame = minigameMapping[gameNumber];

        if (!selectedMinigame) {
            console.error('Invalid intValue for minigame selection');
            return;
        }

        // Pass an object with additional data to the scene
        selectedMinigame.config.scene = new selectedMinigame.gameClass(switchToLobby);

        const minigame = new Phaser.Game(selectedMinigame.config);

        return () => {
            // Cleanup when the component is unmounted
            minigame.destroy(true);
        };
    }, [gameNumber, switchToLobby]); // Include both dependencies in the array

    return (
        <div id="phaser-minigame-container">
        </div>
    );
};

export default MinigameComponent;
