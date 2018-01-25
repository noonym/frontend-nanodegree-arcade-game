# Arcade Game

## How to Play?

The main objective of this game is to reach the sea without colliding with the red enemies.
use the arrow keys on your keyboard to move your character. 
if the character collides with one enemy the game will automatically restart.

## How it Works?

**The game has the files:**

* **index.html:** which is the webpage.
* **Images Folder:** contains the images used in the game.
* **CSS Folder:** contains the CSS files used in the game.
* **JS Folder:** contains the JavaScript files used to build the game.

**The JS Folder has the files:**

### app.js
The app.js has the game objects, Enemy and Player.
for the Enemy object: it take two parameters, the y and speed attributes respectively.
to make initializing a new enemy easier.

**The two objects share some attributes:**

`x`: the x-axis position on the canvas.
`y`: the y-axis position on the canvas.
`sprite`: the object image on the game.
`render` functions: draw the object image on the screen, required method for game.

**The two objects differ on some attributes:**
`speed`: for the enemy speed on the game.
`winning`: the winning message to appear in case of winning.
`update` function: update the enemy's position, required method for game. Parameter: dt, a time delta between ticks
`handleInput` function: handle user input and recall that the player cannot move off screen.

### engine.js
This file provides the game loop functionality (update entities and render), draws the initial game board on the screen, and then calls the update and render methods on player and enemy objects (defined in app.js).

### resources.js
This is simply an image loading utility. It eases the process of loading image files so that they can be used within the game. It also includes a simple "caching" layer so it will reuse cached images if it attempts to load the same image multiple times.
