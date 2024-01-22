import Phaser from 'phaser';

class SaveEarth extends Phaser.Scene {
    constructor(switchToLobby) {
        super({
            key: 'SaveEarth',
        });
        this.trashTypes = ['newspaper', 'glass', 'plastic_bottle'];
        this.trash = null;
        this.catcher = null;
        this.cursors = null;
        this.txtScore = null;
        this.score = 0;
        this.switchToLobby = switchToLobby;

        this.timeLimit = 180;
        this.timerText = null;
        this.updateTimer = this.updateTimer.bind(this)
    }

    preload() {
        this.load.image('plastic_bottle', 'assets/saveEarth/plastic_bottle_small.png');
        this.load.image('glass', 'assets/saveEarth/glass_small.png');
        this.load.image('newspaper', 'assets/saveEarth/newspaper_small.png');
        this.load.image('catcher', 'assets/saveEarth/catcher.png');
        this.load.image('bg', 'assets/saveEarth/bg.png');
    }

    create() {
        // this.add.sprite(0, 0, 'bg');
        this.cameras.main.setBackgroundColor('#000'); // Set a default background color
        this.add.sprite(400, 300, 'bg').setScrollFactor(0);

        this.timeLimit = 180;
        this.timer = setInterval(this.updateTimer, 1000);
        this.timerText = this.add.text(this.cameras.main.width - 200, 16, `Time: ${this.timeLimit}`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'left'
        });

        this.catcher = this.physics.add.sprite(400, 300, 'catcher');
        this.catcher.setOrigin(0.5, 0);
        this.physics.add.existing(this.catcher);

        this.spawnTrash();

        this.score = 0;
        const style = { font: '20px Arial', fill: '#FFF' };
        this.txtScore = this.add.text(10, 10, this.score.toString(), style);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.catcher.x -= 5;
            this.catcher.scaleX = 1;
        }

        if (this.cursors.right.isDown) {
            this.catcher.x += 5;
            this.catcher.scaleX = -1;
        }

        if (this.cursors.up.isDown) {
            this.catcher.y -= 5;
        }

        if (this.cursors.down.isDown) {
            this.catcher.y += 5;
        }

        this.physics.overlap(this.catcher, this.trash, this.trashHitHandler.bind(this));
    }

    spawnTrash() {
        if (this.trash) {
            this.trash.destroy();
        }

        const trashType = Phaser.Math.RND.pick(this.trashTypes);
        this.trash = this.add.sprite(
            Phaser.Math.RND.integerInRange(0, this.game.config.width - 5),
            Phaser.Math.RND.integerInRange(0, this.game.config.height - 5),
            trashType
        );

        this.physics.add.existing(this.trash);
    }

    trashHitHandler(catcherObject, trashObject) {
        trashObject.destroy();
        this.score++;
        this.txtScore.setText(this.score.toString());
        this.spawnTrash();
        if (this.score >= 24) {
            this.switchToLobby(this.score)
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

const saveEarthConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-minigame-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: SaveEarth
};

export { SaveEarth, saveEarthConfig };
