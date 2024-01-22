import Phaser from 'phaser';

class TreePlanter extends Phaser.Scene {
    constructor(switchToLobby) {
        super({
            key: 'TreePlanter',
        });
        this.score = 0;
        
        this.switchToLobby = switchToLobby;

        this.timeLimit = 180;
        this.timerText = null;
        this.updateTimer = this.updateTimer.bind(this)
    }

    preload() {
        this.load.image('background', 'assets/treePlanter/background.png')
        this.load.image('seed', 'assets/treePlanter/seed.png')
        this.load.image('tree', 'assets/treePlanter/tree.png')
        this.load.image('hole', 'assets/treePlanter/hole.png')
    }

    create() {
        this.holesHit = 0;

        this.add.sprite(400, 300, 'background');
        
        this.timeLimit = 180;
        this.timer = setInterval(this.updateTimer, 1000);
        this.timerText = this.add.text(this.cameras.main.width - 200, 16, `Time: ${this.timeLimit}`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'left'
        });

        this.holes = [];
        this.trees = [];

        this.reset_holes()
        this.reset_seed()

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    }
    
    reset_holes(){
        this.holes.length = 0

        this.holes.push(this.physics.add.sprite(300, 550, 'hole'));
        this.holes.push(this.physics.add.sprite(500, 550, 'hole'));
        this.holes.push(this.physics.add.sprite(700, 550, 'hole'));

    }

    update() {
        this.seed.x += this.velocity_x
        this.seed.y += this.velocity_y
        if (this.isShot) {
            this.velocity_y += 0.1
        }
        this.seed_oob_detector()
    }
    
    seed_oob_detector() {
        if (this.seed.x < -20 || this.seed.x > 820 || this.seed.y < -20 || this.seed.y > 620) {
            this.reset_seed()
        }
    }

    dragStop(pointer, gameObject) {
        this.isShot = true;
        this.velocity_x = -(gameObject.x - 100) * 0.1;
        this.velocity_y = -(gameObject.y - 440) * 0.1;
        gameObject.input.enabled = false;
    }
    
    drag(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    }
     
    handleCollision(seed, hole) {
        const tree = this.add.sprite(hole.x, hole.y - 117, 'tree');
        this.trees.push(tree);
        
        seed.destroy();
        hole.destroy();
        
        this.holesHit += 1;

        if (this.holesHit === this.holes.length) {
            this.time.delayedCall(1000, function() {
                this.reset_holes();
                this.delete_trees();
                this.holesHit = 0;
            }, [], this);
        }

        this.reset_seed();
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.score >= 12) {
            this.switchToLobby(this.score)
        }
    }

    reset_seed() {
        
        this.isShot = false
        this.velocity_x = 0
        this.velocity_y = 0

        this.seed = this.add.sprite(100, 440, 'seed');
        this.seed.setInteractive();  
        
        this.input.setDraggable(this.seed);  
        this.input.on('drag', this.drag, this);
        this.input.on('dragend', this.dragStop, this);
        
        this.physics.world.enable(this.seed);
        this.reset_seed_hole_connections();
    }

    reset_seed_hole_connections() {
        for (let i = 0; i < this.holes.length; i++) {
            this.physics.add.overlap(this.seed, this.holes[i], this.handleCollision, null, this);
        }
    }

    delete_trees() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].destroy();
        }
        this.trees = [];
    }

    updateTimer() {
        this.timeLimit--;
    
        if (this.timeLimit <= 0) {
            this.switchToLobby(this.score);
        }

        this.timerText.setText(`Time: ${this.timeLimit}`);
    }
}

const treePlanterConfig = {
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
    scene: TreePlanter,
};

export { TreePlanter, treePlanterConfig };
