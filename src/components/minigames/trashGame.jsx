import Phaser from 'phaser';

class TrashGame extends Phaser.Scene {
    constructor(gameInstnace, switchToLobby) {
        super({
            key: 'TrashGame',
        });
        this.trashes = [];
        this.basket = null;
        this.score = 0;
        this.scoreText = null;
        this.cursors = null;
        this.gameInstance = gameInstnace;
        this.switchToLobby = switchToLobby;
    }

    preload() {
        this.load.image('basket_blue', 'assets/trashGame/basket_blue.png');
        this.load.image('basket_green', 'assets/trashGame/basket_green.png');
        this.load.image('basket_yellow', 'assets/trashGame/basket_yellow.png');
        this.load.image('plastic_bottle', 'assets/trashGame/plastic_bottle.png');
        this.load.image('glass', 'assets/trashGame/glass.png');
        this.load.image('newspaper', 'assets/trashGame/newspaper.png');
    }

    create() {
        this.cameras.main.setBounds(0, 0, 1200, 600);

        const basketColors = ['basket_blue', 'basket_green', 'basket_yellow'];
        const randomBasketColor = Phaser.Utils.Array.GetRandom(basketColors);

        this.basket = this.physics.add.sprite(400, 550, randomBasketColor);
        this.basket.setCollideWorldBounds(true);
        this.basket.setScale(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === this.basket) {
                this.decreaseScore();
            }
        });

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        this.spawnTrash();
        this.time.addEvent({
            delay: 3000,
            callback: this.spawnTrash,
            callbackScope: this,
            loop: true,
        });

        this.physics.add.collider(this.basket, this.trashes, this.collectTrash, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.basket.setVelocityX(-400);
        } else if (this.cursors.right.isDown) {
            this.basket.setVelocityX(400);
        } else {
            this.basket.setVelocityX(0);
        }
    }

    collectTrash(basket, trash) {
        trash.destroy();

        // Sprawdź kolor kosza i typ śmiecia
        const basketColor = this.basket.texture.key;
        const trashType = trash.trashType;

        if (
            (basketColor === 'basket_yellow' && trashType === 'plastic_bottle') ||
            (basketColor === 'basket_blue' && trashType === 'newspaper') ||
            (basketColor === 'basket_green' && trashType === 'glass')
        ) {
            this.increaseScore();
        } else {
            this.decreaseScore();
        }

        this.spawnTrash();
    }

    spawnTrash() {
        const trashTypes = ['plastic_bottle', 'glass', 'newspaper'];
        const randomTrashType = Phaser.Utils.Array.GetRandom(trashTypes);

        const x = Phaser.Math.Between(0, 1200);

        const trash = this.physics.add.sprite(x, 0, randomTrashType);
        trash.trashType = randomTrashType;
        trash.setScale(0.1);
        this.trashes.push(trash);

        trash.body.velocity.y = Phaser.Math.Between(50, 100);
        trash.setInteractive();
        this.input.setDraggable(trash);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            const trashBounds = gameObject.getBounds();
            const basketBounds = this.basket.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(trashBounds, basketBounds)) {
                this.collectTrash(this.basket, gameObject);
            } else {
                gameObject.destroy();
            }
        });
    }

    increaseScore() {
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
        // if(this.score>2){
        //     this.switchToLobby(false)
        // }
    }

    decreaseScore() {
        this.score -= 1;
        this.scoreText.setText(`Score: ${this.score}`);

        // this.score = Math.max(0, this.score - 1);
        // this.scoreText.setText(`Score: ${this.score}`);
    }
}

const trashGameConfig = {
        type: Phaser.AUTO,
        width: 1200,
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
        scene: TrashGame,
};

export {TrashGame, trashGameConfig};
