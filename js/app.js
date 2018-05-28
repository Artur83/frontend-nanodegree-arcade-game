// Create the enemy constructor
var Enemy = function(x,y) {

	// Set the image for the enemy
	this.sprite = 'images/enemy-bug.png';

	// Set the enemy position
	this.x = x;
	this.y = y;

	// Set the speed multipler for the enemy using a random
	// number between 1 & 5
	this.multiplier = Math.floor((Math.random() * 5) + 1);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Set the position of the enemy based on dt and the speed multipler
  	this.x = this.x + 101 * dt * this.multiplier;

    // If the enemy goes off of the board, reset it
  	if (this.x > 550) {
  		this.reset();
  	}

    // Check for collisions with the player
    // if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
    if (this.y == player.y && (this.x > player.x - 80 && this.x < player.x + 80)) {

      // Reset the player to her original position
      player.reset();
      }

};

// Reset the enemy to the left of the board with a new y position
// and a new speed multiplier
Enemy.prototype.reset = function() {
	this.x = -200;
	var yVals = [220, 140, 60];
	this.y = yVals[Math.floor((Math.random() * 3))];
	this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Create the Player constructor
var Player = function(x,y) {

	// Set the player to the girl in the cat hat image
	this.sprite = 'images/char-boy.png';

	// Set the player's location
	this.x = x;
	this.y = y;

  // Store the original position of the player for resetting later
  this.xo = x;
  this.yo = y;

	// Set number of wins at the beggining of the game
  this.wins = 0;
};


Player.prototype.handleInput = function(dir) {

	// Change the player's position based on the user keyboard input
	if (dir == 'up') {
		this.y = this.y - 80;
	} else if (dir == 'down') {
		this.y = this.y + 80;
	} else if (dir == 'left') {
		this.x = this.x - 101;
	} else if (dir == 'right') {
		this.x = this.x + 101;
	}


  // Check the position of the player
  if (this.x < 0) {
    // Player is off to the left side of the board, move the player back to zero
    this.x = 0;

  } else if (this.x > 404) {
    // Player is off to the right side of the board, move the player back to the right-most square (404)
    this.x = 404;
  } else if (this.y > 380) {
    // Player is off the bottom of the board
    this.y = 380;
  } else if (this.y < 60) {
    // Player is off the top of the board
		player.wins++;
		document.querySelector('.score').innerHTML = "Score: " + this.wins;
    this.y = 380;
  }

};

// Reset the player to her original position & image
Player.prototype.reset = function() {
	// Reset the player to the original position
	this.x = this.xo;
	this.y = this.yo;


	player.wins = 0;
	document.querySelector('.score').innerHTML = "Score: " + this.wins;
};



// Update the player's position
Player.prototype.update = function() {
	this.x = this.x;
	this.y = this.y;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create the allEnemies array, which will hold all of the
// enemy objects
var allEnemies = [];
// Set a varaiable for the possible y values
var yVals = [220, 140, 60];

// Create the separate enemy instances
for (var i = 0; i < 5; i++) {

	// Set a starting x-position based on a random value
	var x = Math.floor((Math.random() * -1000) + 1);

	// Set a starting y-position based on a random selection
	// of the 3 possible values
	var y = yVals[Math.floor(Math.random() * 3)];

	// Create the new enemy object
	var enemy = new Enemy(x, y);

	// Push the enemy into the array
	allEnemies.push(enemy);
}

// -- Instantiate the player --
var player = new Player(202, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	// Pass the values to the handleInput method
	player.handleInput(allowedKeys[e.keyCode]);
});
