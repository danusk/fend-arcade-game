// canvas width = 505
// canvas height = 60
const WATER_EDGE = 50;
const MAX_X = 500;
const INIT_X = 200;
const INIT_Y = 400;

class GamePiece {

    constructor (x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Draw the game piece screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends GamePiece {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(
        x = Math.floor(Math.random() * MAX_X),
        y = Math.floor(Math.random() * (240 - WATER_EDGE) + WATER_EDGE),
        speed = Math.floor(Math.random() * 150) + WATER_EDGE,
        sprite = 'images/enemy-bug.png') {
        super(x, y, sprite);
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x >= MAX_X) this.x = -100;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends GamePiece {

    constructor(x = INIT_X, y = INIT_Y, sprite = 'images/char-boy.png') {
        super(x, y, sprite)
    }

    // If player reaches the water, reset game by moving player back to initial location
    update() {
        if (this.y <= WATER_EDGE) alert("You win!");
    }

    // Receives user input and moves player according to input
    // Player cannot move off screen
    handleInput(key) {

        const moveIncrement = 40;

        if (key === 'left' && this.x - moveIncrement >= 0) {
            this.x -= moveIncrement;
        } else if (key === 'up' && this.y - moveIncrement >= 0) {
            this.y -= moveIncrement;
        } else if (key === 'right' && this.x + moveIncrement <= 400) {
            this.x += moveIncrement;
        } else if (key === 'down' && this.y + moveIncrement <= 400) {
            this.y += moveIncrement;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

for (let i = 0; i <= 2; i++) {
    let enemy = new Enemy();
    // enemies initial position
    allEnemies.push(enemy);
}

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
    // bounding box test
    // width: 101px
    // height: 171px
    const spriteDim = 50;
    allEnemies.forEach(enemy => {
        if ((player.x < enemy.x + spriteDim)  && (player.x + spriteDim  > enemy.x) &&
        (player.y < enemy.y + spriteDim) && (player.y + spriteDim > enemy.y)) {
        player.x = INIT_X;
        player.y = INIT_Y;
        };
    });
}