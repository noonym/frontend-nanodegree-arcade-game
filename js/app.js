// Enemies our player must avoid
var Enemy = function(a, b, c) {

	this.direction = c;
    if (this.direction === true){
    	// The image/sprite for our enemies, this uses
    	// a helper we've provided to easily load images
	     this.sprite = 'images/enemy-bug.png';

	    //Enemy's initial location,
	    //where x is the x-axis position
	    //and y is the y-axis position
	    this.x = -100;
	    this.y = a;   	
    }
    else{
    	this.sprite = 'images/enemy-bug2.png';
   	    this.x = 1000;
   	    if (((player.level % 10) === 0) || ((player.level % 5) === 0))
			this.y = a; 
    	else
    		this.y = 1000;
    }

    //Enemy's Speed
    this.speed = b;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, direction) {
    //multiplying any movement by the dt parameter will
    //ensure the game runs at the same speed for all computers.
   if (this.direction)
   {
    this.x = this.x  + this.speed * dt;

    //to make the enemy appears again
    if (this.x > 1000)
        this.x = -100;
	}
	else{
		this.x = this.x  - this.speed * dt;

    //to make the enemy appears again
    if (this.x < -100)
        this.x = 1000;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player class
var player = function(){
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    //The winning message 
    this.winning = 'images/winning.png';
    this.GameOver = 'images/gameover.png';

    //Player's initial location,
    //where x is the x-axis position
    //and y is the y-axis position
    this.x = 200;
    this.y = 400;
    this.points = 0;
    this.level = 1;
    this.lives = 3;
    this.starred = false;
    this.canMove = false;
};


// Update the player's position, required method for game
player.prototype.update = function() {
};

// Draw the player on the screen, required method for game
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle user input and recall that the player cannot move off screen
player.prototype.handleInput = function(k) {
		if (k === 'left'){
			if (this.x > 0)
				this.x = this.x - 100;
		}
		else if (k === 'up'){
			if (this.y > 0)
				this.y = this.y - 83;
		}
		else if (k === 'right'){
			if (this.x < 400)
				this.x = this.x + 100;
		}
		else if (k === 'down'){
			if (this.y < 400)
				this.y = this.y + 83;
		}
};

//Reset the player location
player.prototype.reset = function() {
    if (this.y < 0){
        this.x = 200;
        this.y = 400;
    }
};

//Items to be collected
var Gem= function(a, b){
    this.x = a;
    this.y = b;
    this.points = 200;
    this.sprite = 'images/Gem-Blue.png';
}

Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Items to be collected
var Star= function(a, b){
    this.x = a;
    this.y = b;
    this.sprite = 'images/Star.png';
}

Star.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Hearts= function(a, b){
    this.x = a;
    this.y = b;
    this.lives = 1;
    this.sprite = 'images/Heart.png';
}

Hearts.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// All enemy objects in an array allEnemies
// The player object in a variable called player
var allEnemies = new Array();
allEnemies.push(new Enemy(68, 550, false));
allEnemies.push(new Enemy(68, 100, true));
allEnemies.push(new Enemy(151, 400, true));
allEnemies.push(new Enemy(151, 600, false));
allEnemies.push(new Enemy(234, 350, true));
allEnemies.push(new Enemy(234, 200, true));

var player = new player();
var BlueGem = new Gem(0, 151);
var BlueGem2 = new Gem(1000, 1000);
var Heart = new Hearts(300, 68);
var Heart2 = new Hearts(1000, 1000);
var star = new Star(100, 317);
var star2 = new Star(1000, 1000);

// This listens for key presses and sends the
// keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
