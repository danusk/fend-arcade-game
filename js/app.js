const   WATER_EDGE = 30,
        INIT_X = 200,
        MAX_Y = 400,
        MAX_X = 500,
        NUM_ENEMIES = 5;

var lives = ['', '', ''];

class GamePiece {

    constructor (x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Draw the game piece screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends GamePiece {

    // The image/sprite for enemies, this uses
    // a helper provided to easily load images
    constructor(
        x = Math.floor(Math.random() * MAX_X),
        y = Math.floor(Math.random() * (240 - WATER_EDGE) + WATER_EDGE),
        speed = Math.floor(Math.random() * 150) + WATER_EDGE,
        sprite = 'images/enemy-bug.png') {

        super(x, y, sprite);
        this.speed = speed;
    }

    // Update the enemy's position
    update(dt) {
        // Movement multiplied by the dt parameter
        // to ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x >= MAX_X) this.x = -100;
    }
}

// Player class
class Player extends GamePiece {

    constructor(x = INIT_X, y = MAX_Y, sprite = 'images/char-boy.png') {
        super(x, y, sprite)
    }

    // If player reaches the water, reset game by moving player back to initial location
    update() {

        const modal = document.querySelector('.modal');

        if (this.y <= WATER_EDGE) {
            modal.style.display = 'block';
            document.removeEventListener('keyup', handleInput);
        }

        if (lives.length === 0) {
           let modalText = document.querySelector('h1');
           modalText.innerHTML = 'Game Over';
           modal.style.display = 'block';
           document.removeEventListener('keyup', handleInput);
        }
    }


    // Receives user input and moves player according to input
    // Player cannot move off screen
    handleInput(key) {

        // Amount player moves for each key input
        const moveIncrement = 40;

        if (key === 'left' && this.x - moveIncrement >= 0) {
            this.x -= moveIncrement;
        } else if (key === 'up' && this.y - moveIncrement >= 0) {
            this.y -= moveIncrement;
        } else if (key === 'right' && this.x + moveIncrement <= MAX_Y) {
            this.x += moveIncrement;
        } else if (key === 'down' && this.y + moveIncrement <= MAX_Y) {
            this.y += moveIncrement;
        }
    }
}


// Place all enemy objects in an array called allEnemies
let allEnemies = [];

for (let i = 0; i <= NUM_ENEMIES - 1; i++) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
}

// Instantiate Player
let player = new Player();

// Listens for key presses and sends the keys to
// Player.handleInput() method
document.addEventListener('keyup', e => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Bounding box test to check for collisions
// between enemies and player
function checkCollisions() {

    // Sprite box size
    const spriteDim = 55;

    allEnemies.forEach(enemy => {
        if ((player.x < enemy.x + spriteDim) && (player.x + spriteDim > enemy.x) &&
        (player.y < enemy.y + spriteDim) && (player.y + spriteDim > enemy.y)) {
        player.x = INIT_X;
        player.y = MAX_Y;
        lives.splice(lives.length - 1, 1);
        };
    });
}