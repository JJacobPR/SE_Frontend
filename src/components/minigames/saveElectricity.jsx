import Phaser from 'phaser';

class SaveElectricity extends Phaser.Scene {
    constructor(switchToLobby) {
        super({
            key: 'SaveElectricity',
        });
        this.score = 0;
        this.scoreText = null;
        this.blockOfFlats = null;
        this.light = null;
        this.windows = [];
        this.switchToLobby = switchToLobby;
        this.timeLimit = 180;
        this.timerText = null;
        this.updateTimer = this.updateTimer.bind(this);
    }

    preload() {
        this.load.image('light_on', 'assets/saveElectricity/light_on-b.png');
        this.load.image('light_off', 'assets/saveElectricity/ligh_off-b.png');
        this.load.image('window', 'assets/saveElectricity/window2.png');
        this.load.image('background', 'assets/saveElectricity/b31.jpg');
    }

    create() {
        this.createBackground();
        this.createBlockOfFlats();

        this.timeLimit = 180;
        this.timer = setInterval(this.updateTimer, 1000);
        this.timerText = this.add.text(this.cameras.main.width - 200, 16, `Time: ${this.timeLimit}`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'left'
        });

        this.scoreText = this.add.text(
            this.game.config.width - 16,
            16,
            'Score: 0',
            { fontSize: '32px', fill: '#fff' }
        ).setOrigin(1, 0);

        this.spawnLight();
        this.input.on('pointerdown', this.onClickLight, this);
    }

    update() {
    }

    createBlockOfFlats() {
        const numRows = 8;
        const numCols = 4;
        const windowWidth = 50;
        const windowHeight = 60;
        const gapX = 20;
        const gapY = 20;
    
        const totalWidth = numCols * (windowWidth + gapX) - gapX;
        const totalHeight = numRows * (windowHeight + gapY) - gapY;
    
        const startX = (this.game.config.width - totalWidth) / 2;
        const startY = (this.game.config.height - totalHeight) / 2;
    
        this.blockOfFlats = this.add.group();
    
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const windowX = startX + col * (windowWidth + gapX);
                const windowY = startY + row * (windowHeight + gapY);
    
                const window = this.add.sprite(windowX, windowY, 'window').setInteractive();
                window.setOrigin(0, 0);
                window.displayWidth = windowWidth;
                window.displayHeight = windowHeight;
    
                this.blockOfFlats.add(window);
                this.windows.push(window);
            }
        }
    
    }

    createBackground() {
        this.add.sprite(0, 0, 'background').setOrigin(0);
    }
    spawnLight() {
        if (this.light) {
            this.light.destroy();
        }

        // Choose a random window to spawn the light inside
        const randomWindow = Phaser.Math.RND.pick(this.windows);

        const lightX = randomWindow.x + (randomWindow.displayWidth - 50) * Math.random();
        const lightY = randomWindow.y + (randomWindow.displayHeight - 50) * Math.random();

        this.light = this.add.sprite(lightX, lightY, 'light_on').setInteractive();
        this.light.setOrigin(0, 0);
        this.light.displayWidth = 50;
        this.light.displayHeight = 50;
    }

    onClickLight(pointer, gameObjects) {
        if (Array.isArray(gameObjects) && gameObjects.length > 0) {
            const clickedObject = gameObjects[0];

            if (clickedObject === this.light) {
                this.score += 1;
                this.scoreText.setText(`Score: ${this.score}`);

                if (this.score >= 150) {
                    this.switchToLobby(this.score);
                }

                const windowIndex = this.windows.indexOf(clickedObject);
                if (windowIndex !== -1) {
                    const window = this.windows[windowIndex];
                    window.setTexture('light_off');
                }

                this.spawnLight();
            }
        }
    }
    
    updateTimer() {
        this.timeLimit--;
    
        if (this.timeLimit <= 0) {
            this.switchToLobby(this.score);
        }

        this.timerText.setText(`Time: ${this.timeLimit}`);
    }
}

const saveElectricityConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 805,
    parent: 'phaser-minigame-container',
    scene: SaveElectricity,
};

export { SaveElectricity, saveElectricityConfig };