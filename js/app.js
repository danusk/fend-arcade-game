// canvas width = 505
// canvas height = 606

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
    constructor(x, y, speed, sprite='images/enemy-bug.png') {
        super(x, y, sprite);
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x >= 505) {
            this.x = -100;
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends GamePiece {

    constructor(x, y, sprite='images/char-boy.png') {
        super(x, y, sprite)
    }

    update() {

    }

    // Receives user input and moves player according to input
    // Player cannot move off screen
    handleInput(key) {
        if (key === 'left' && this.x - 50 >= 0) {
            this.x -= 50;
        } else if (key === 'up' && this.y - 60 >= 0) {
            this.y -=60;
        } else if (key === 'right' && this.x + 50 <= 400) {
            this.x += 50;
        } else if (key === 'down' && this.y + 50 <= 400) {
            this.y += 50;
        }
    }
}


// If player reaches the water, reset game by moving player back to initial location

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];


for (let i = 0; i <= 2; i++) {
    let xinit = Math.floor(Math.random() * 500);
    let yinit = Math.floor(Math.random() * 300);
    let enemy = new Enemy(xinit, yinit, Math.floor(Math.random() * 150) + 50);
    // enemies initial position
    allEnemies.push(enemy);
}

let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
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
    // width: 101px - 50px
    // height: 171px - 85px
    allEnemies.forEach(function(enemy) {
        if ((player.x < enemy.x + 50)  && (player.x + 50  > enemy.x) &&
        (player.y < enemy.y + 80) && (player.y + 80 > enemy.y)) {
        // Oh no
        player.x = 200;
        player.y = 400;
        };
    });

}