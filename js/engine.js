/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        level,
        lives;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required because the game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call the update/render functions, pass along the time delta to
         * the update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data.
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkPoints();
        checkLives();
        checkStar();
    }

    //This function checks if the player and an enemy collide on the same block
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if (player.starred === false){
            //checking if the enemy and the player are in the same row
                if (enemy.y === player.y){
                    //checking if the enemy and the player are in the same block
                    if (((enemy.x > -50) && (enemy.x <= 50) && (player.x === 0))||
                        ((enemy.x > 50) && (enemy.x <= 150) && (player.x === 100))||
                        ((enemy.x > 150) && (enemy.x <= 250) && (player.x === 200))||
                        ((enemy.x > 250) && (enemy.x <= 350) && (player.x === 300))||
                        ((enemy.x > 350) && (enemy.x <= 450) && (player.x === 400))){
                        player.x = 200;
                        player.y = 400;
                        player.lives--;
                    }
                }
            }
        });
    }

    function checkPoints() {
        //checking if the enemy and the player are in the same row
        if (BlueGem.y === player.y){
            //checking if the enemy and the player are in the same block
            if (((BlueGem.x > -50) && (BlueGem.x <= 50) && (player.x === 0))||
                ((BlueGem.x > 50) && (BlueGem.x <= 150) && (player.x === 100))||
                ((BlueGem.x > 150) && (BlueGem.x <= 250) && (player.x === 200))||
                ((BlueGem.x > 250) && (BlueGem.x <= 350) && (player.x === 300))||
                ((BlueGem.x > 350) && (BlueGem.x <= 450) && (player.x === 400))){
                BlueGem.x = 1000;
                BlueGem.y = 1000;
                player.points = player.points + BlueGem.points;
                console.log(player.points);
            }
        }
    }

    function checkLives() {
        //checking if the enemy and the player are in the same row
        if (Heart.y === player.y){
            //checking if the enemy and the player are in the same block
            if (((Heart.x > -50) && (Heart.x <= 50) && (player.x === 0))||
                ((Heart.x > 50) && (Heart.x <= 150) && (player.x === 100))||
                ((Heart.x > 150) && (Heart.x <= 250) && (player.x === 200))||
                ((Heart.x > 250) && (Heart.x <= 350) && (player.x === 300))||
                ((Heart.x > 350) && (Heart.x <= 450) && (player.x === 400))){
                Heart.x = 1000;
                Heart.y = 1000;
                player.lives = player.lives + Heart.lives;
                console.log(player.lives);
            }
        }
    }

    function checkStar() {
        //checking if the enemy and the player are in the same row
        if (star.y === player.y){
            //checking if the enemy and the player are in the same block
            if (((star.x > -50) && (star.x <= 50) && (player.x === 0))||
                ((star.x > 50) && (star.x <= 150) && (player.x === 100))||
                ((star.x > 150) && (star.x <= 250) && (player.x === 200))||
                ((star.x > 250) && (star.x <= 350) && (player.x === 300))||
                ((star.x > 350) && (star.x <= 450) && (player.x === 400))){
                star.x = 1000;
                star.y = 1000;
                player.starred = true;
            }
        }
    }
    /* This is called by the update function and loops through all of the
     * objects within the allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for 
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. 
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        player.reset();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)


        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        ctx.font = "30px Arial";
        level = "Level: " + player.level;
        ctx.fillText(level,10,50);
        lives = "Lives: " + player.lives;
        ctx.fillText(lives,400,50);
        renderEntities();

        if (player.lives < 0){
            ctx.drawImage(Resources.get(player.GameOver), 100, 100);
            setTimeout(reset, 1000);
            
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions defined on enemy
     * and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function.
         */
         if ((player.level % 10) === 0){
            player.starred = false;
            BlueGem.render();
            Heart.render();
            star2.render();
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });

            player.render();
         }
         else if ((player.level % 5) === 0){
            player.starred = false;
            Heart.render();
            BlueGem2.render();
            star.render();
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });

            player.render();
         }
         else if ((player.level % 3) === 0){
            player.starred = false;
            Heart2.render();
            BlueGem.render();
            star.render();
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });

            player.render();
         }
         else if((player.level % 2) === 0){
            player.starred = false;
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            BlueGem2.render();
            Heart2.render();
            star2.render();
            player.render();
         }
         else
         {
            player.starred = false;
            BlueGem.render();
            star2.render();
            Heart2.render();
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });

            player.render();
         }

        //checking if the player reaches the water (wins)
        if (player.y < 100){
            // ctx.drawImage(Resources.get(player.winning), 0, 100);
            setTimeout(function() {
            player.x = 200;
            player.y = 400;
            }, 10);

            player.level++;
            level = "Level: " + player.level;
            ctx.fillText(level,10,50);
        }
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        player.x = 200;
        player.y = 400;
        player.points = 0;
        player.level = 1;
        player.lives = 3;
        player.starred = false;
        player.canMove = false;
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/winning.png',
        'images/enemy-bug2.png',
        'images/Gem-Blue.png',
        'images/Star.png',
        'images/Heart.png',
        'images/gameover.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
