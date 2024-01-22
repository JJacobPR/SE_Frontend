import Phaser from 'phaser';

class EnvironmentallyFriendlyTransport extends Phaser.Scene {
    constructor(switchToLobby) {
        super({
            key: 'EnvironmentallyFriendlyTransport',
        });
        this.score = 0;
        
        this.switchToLobby = switchToLobby;

        this.timeLimit = 180;
        this.timerText = null;
        this.updateTimer = this.updateTimer.bind(this)
    }

    preload() {
        this.load.image('bg', 'assets/environmentallyFriendlyTransport/bg.png');
        this.load.spritesheet('cards', 'assets/environmentallyFriendlyTransport/cards.png', { frameWidth: 1334/5, frameHeight: 400 });
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

        this.scoreText = this.add.text(16, 550, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        this.cards = [];
        this.score = 0;
    
        this.displayCards();
        this.updateScoreText();
    }
    
    updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    displayCards() {
        this.cards.forEach(card => card.destroy());
     
        var indices = this.generateIndaces()

        this.cards = [
            this.add.sprite(100, 300, 'cards', indices[0]).setInteractive(),
            this.add.sprite(400, 300, 'cards', indices[1]).setInteractive(),
            this.add.sprite(700, 300, 'cards', indices[2]).setInteractive(),
        ]

        for (let i = 0; i < 3; i++) {
            this.cards[i].on('pointerdown', () => {
                if(this.isSmallestNumber(indices, indices[i])) {
                    this.score += 1

                    if (this.score >= 50) {
                        this.switchToLobby(this.score)
                    }

                    this.updateScoreText()
                    this.displayCards()
                } else {
                    this.displayCards()
                }
            });
        }
    }  

    isSmallestNumber(numbersArray, targetNumber) {
        const minNumber = Math.min(...numbersArray);
    
        return targetNumber === minNumber;
    }
    
    generateIndaces() {
        const uniqueNumbers = [];
    
        while (uniqueNumbers.length < 3) {
            const randomNumber = Phaser.Math.Between(0, 4);
    
            if (!uniqueNumbers.includes(randomNumber)) {
                uniqueNumbers.push(randomNumber);
            }
        } 
    
        return uniqueNumbers;
    } 
 
    updateTimer() {
        this.timeLimit--;
    
        if (this.timeLimit <= 0) {
            this.switchToLobby(this.score);
        }

        this.timerText.setText(`Time: ${this.timeLimit}`);
    }
}

const environmentallyFriendlyTransportConfig = {
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
    scene: EnvironmentallyFriendlyTransport,
};

export { EnvironmentallyFriendlyTransport, environmentallyFriendlyTransportConfig };
