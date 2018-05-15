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
        switch(key) {
            case 'left':
                this.x -= 50;
                break;
            case 'up':
                this.y -= 50;
                break;
            case 'right':
                this.x += 50;
                break;
            case 'down':
                this.y += 50;
                break;
        }
    }
}

function checkCollisions() {
    // acct width of sprite on each side
//    if (((Player.x + 50) <= (Enemy.x + 50)) && ((Player.x - 50) >= (Enemy.x - 50)) || ((Enemy.x + 50) <= (Player.x + 50)) && ((Enemy.x - 50) >= (Player.x - 50)) {
//         console.log('Oh no');
//         Player.x = 200;
//         Player.y = 400;
//     }
}



// If player reaches the water, reset game by moving player back to initial location

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];


for (let i = 0; i <= 2; i++) {
    let xinit = Math.floor(Math.random() * 500);
    let yinit = Math.floor(Math.random() * 300);
    console.log(yinit);
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
