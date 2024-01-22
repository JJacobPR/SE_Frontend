import Phaser from 'phaser';

class PipeGame extends Phaser.Scene {
    constructor(switchToLobby) {
        super({
            key: 'PipeGame',
        });
        this.score = 0;
        this.switchToLobby = switchToLobby;

        this.pipe_segments = []

        this.timeLimit = 180;
        this.timerText = null;
        this.updateTimer = this.updateTimer.bind(this)
    }

    preload() {
        this.load.image('bg', 'assets/pipeGame/bg.png')
        this.load.spritesheet('pipes', 'assets/pipeGame/pipes.png', { frameWidth: 96, frameHeight: 96 })
    }

    reset() {
        for (let i = 0; i < this.pipe_segments.length; i++) {
            this.pipe_segments[i].destroy();
        }

        this.pipe_segments = [
            this.add.sprite(96 *-1 + 16, 96 * 1 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 0 + 16, 96 * 1 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 1 + 16, 96 * 1 + 12, 'pipes', 5).setOrigin(0, 0),
            this.add.sprite(96 * 1 + 16, 96 * 2 + 12, 'pipes', 0).setOrigin(0, 0),
            this.add.sprite(96 * 1 + 16, 96 * 3 + 12, 'pipes', 0).setOrigin(0, 0),
            this.add.sprite(96 * 1 + 16, 96 * 4 + 12, 'pipes', 3).setOrigin(0, 0),
            this.add.sprite(96 * 2 + 16, 96 * 4 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 3 + 16, 96 * 4 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 4 + 16, 96 * 4 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 5 + 16, 96 * 4 + 12, 'pipes', 5).setOrigin(0, 0),
            this.add.sprite(96 * 5 + 16, 96 * 5 + 12, 'pipes', 3).setOrigin(0, 0),
            this.add.sprite(96 * 6 + 16, 96 * 5 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 7 + 16, 96 * 5 + 12, 'pipes', 2).setOrigin(0, 0),
            this.add.sprite(96 * 7 + 16, 96 * 4 + 12, 'pipes', 0).setOrigin(0, 0),
            this.add.sprite(96 * 7 + 16, 96 * 3 + 12, 'pipes', 5).setOrigin(0, 0),
            this.add.sprite(96 * 6 + 16, 96 * 3 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 5 + 16, 96 * 3 + 12, 'pipes', 3).setOrigin(0, 0),
            this.add.sprite(96 * 5 + 16, 96 * 2 + 12, 'pipes', 5).setOrigin(0, 0),
            this.add.sprite(96 * 4 + 16, 96 * 2 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 3 + 16, 96 * 2 + 12, 'pipes', 3).setOrigin(0, 0),
            this.add.sprite(96 * 3 + 16, 96 * 1 + 12, 'pipes', 0).setOrigin(0, 0),
            this.add.sprite(96 * 3 + 16, 96 * 0 + 12, 'pipes', 4).setOrigin(0, 0),
            this.add.sprite(96 * 4 + 16, 96 * 0 + 12, 'pipes', 1).setOrigin(0, 0),
            this.add.sprite(96 * 5 + 16, 96 * 0 + 12, 'pipes', 2).setOrigin(0, 0),
            this.add.sprite(96 * 5 + 16, 96 *-1 + 12, 'pipes', 0).setOrigin(0, 0),
        ]

        var bad_pipe = this.pipe_segments[Phaser.Math.Between(1, this.pipe_segments.length-2)]
        var bad_pipe_old_position_x = bad_pipe.x 
        var bad_pipe_old_position_y = bad_pipe.y  


        bad_pipe.setPosition(
            Phaser.Math.Snap.To(Phaser.Math.Between(100, 700), 96, 16 + 48),
            Phaser.Math.Snap.To(Phaser.Math.Between(100, 500), 96, 12 + 48)
        ) 

        bad_pipe.on('dragend', () => {
            if (bad_pipe_old_position_x == Phaser.Math.Snap.To(bad_pipe.x, 96, 16) &&
                bad_pipe_old_position_y == Phaser.Math.Snap.To(bad_pipe.y, 96, 12))
                {
                this.score += 1
                this.scoreText.setText(`Score: ${this.score}`);
                if (this.score >= 20) {
                    this.switchToLobby(this.score)
                }
                this.reset()
            }
        });

        for (let i = 0; i < this.pipe_segments.length; i++) {
            let pipe = this.pipe_segments[i];
            pipe.setInteractive({ draggable: true });
        }

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            // dragX = Phaser.Math.Snap.To(dragX, 96);
            // dragY = Phaser.Math.Snap.To(dragY, 96);

            gameObject.setPosition(dragX + 16, dragY + 12);
            this.children.bringToTop(gameObject);
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setPosition(Phaser.Math.Snap.To(gameObject.x, 96, 16), Phaser.Math.Snap.To(gameObject.y, 96, 12))

            gameObject.clearTint();
        });
    }

    create() {
        this.add.sprite(400, 300, 'bg');

        this.timeLimit = 180;
        this.timer = setInterval(this.updateTimer, 1000);
        this.timerText = this.add.text(this.cameras.main.width - 200, 16, `Time: ${this.timeLimit}`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'left'
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
        
        this.reset()
    
    }
    update() {
    }

    updateTimer() {
        this.timeLimit--;
    
        if (this.timeLimit <= 0) {
            this.switchToLobby(this.score);
        }

        this.timerText.setText(`Time: ${this.timeLimit}`);
    }
}

const pipeGameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-minigame-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scene: PipeGame,
};

export { PipeGame, pipeGameConfig };
