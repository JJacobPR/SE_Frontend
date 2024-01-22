import Phaser from 'phaser';

class EcoSorter extends Phaser.Scene {
    constructor(switchToLobby) {
        super({
            key: 'EcoSorter',
        });
        this.score = 0;
        
        this.switchToLobby = switchToLobby;

        this.timeLimit = 180;
        this.timerText = null;
        this.updateTimer = this.updateTimer.bind(this)
    }

    preload() {
        this.load.image('battery', 'assets/ecoSort/battery.jpg')
        this.load.image('bottles', 'assets/ecoSort/bottle.png')
        this.load.image('bulb', 'assets/ecoSort/bulb.png')
        this.load.image('paper', 'assets/ecoSort/paper.png')
        this.load.image('bg', 'assets/ecoSort/eco_sort_background.png')
    } 

    create() {
        this.add.image(400, 300, 'bg');
        
        this.timeLimit = 180;
        this.timer = setInterval(this.updateTimer, 1000);
        this.timerText = this.add.text(this.cameras.main.width - 200, 16, `Time: ${this.timeLimit}`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'left'
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
        });
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    
        this.input.on('dragend', (pointer, gameObject) => {
            if (pointer.isDown) { return }
            gameObject.clearTint();
            var options = ['bottles', 'paper', 'battery', 'bulb'];
            if (gameObject.x > 30 && gameObject.y > 70 && gameObject.x < 330 && gameObject.y < 280) {
                if (gameObject.texture.key === 'bottles' || gameObject.texture.key === 'paper') {
                    this.change_score(1)
                    this.spawn_trash(options[Phaser.Math.Between(0, 3)])
                } else if (gameObject.texture.key === 'battery' || gameObject.texture.key === 'bulb') {
                    this.change_score(-1)
                    this.spawn_trash(options[Phaser.Math.Between(0, 3)])
                }
                gameObject.destroy(); 
            }
            if (gameObject.x < 770 && gameObject.y > 70 && gameObject.x > 470 && gameObject.y < 280) {
                if (gameObject.texture.key === 'bottles' || gameObject.texture.key === 'paper') {
                    this.change_score(-1)
                    this.spawn_trash(options[Phaser.Math.Between(0, 3)])
                } else if (gameObject.texture.key === 'battery' || gameObject.texture.key === 'bulb') {
                    this.change_score(1)
                    this.spawn_trash(options[Phaser.Math.Between(0, 3)])
                }
                gameObject.destroy(); 
            }
        });
        
        this.spawn_trash('battery')
        this.spawn_trash('bottles')
        this.spawn_trash('bulb')
        this.spawn_trash('paper')
    }
 
    change_score(ammount){
        this.score += ammount
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.score >= 48) {
            this.switchToLobby(this.score);
        }
    }

    spawn_trash(id) {
        let trash = this.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(300, 450), id);
        trash.displayHeight = 100
        trash.scaleX = trash.scaleY
        trash.setInteractive({ draggable: true });
    }

    updateTimer() {
        this.timeLimit--;
    
        if (this.timeLimit <= 0) {
            this.switchToLobby(this.score);
        }

        this.timerText.setText(`Time: ${this.timeLimit}`);
    }

}

const ecoSorterConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-minigame-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: EcoSorter,
};

export { EcoSorter, ecoSorterConfig };
