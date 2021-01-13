## Credits
 * Aidan Smithers - Designer - Lead Frontend Developer
 * William Santos - Lead Backend Developer
 * Henry Russell - Frontend Developer
 * Sebastian Farrelly - Developer & Tester

# ABTDG - Another Bad Tower Defence Game
CS1830 - Computing Laboratory (Games) -
Group 22 -
2019

## Documentation
Time line, progress and testing logs:
* [GoogleDocs](https://docs.google.com/document/d/1i8lZeVWdyHMcZZLVyXHHuaSbnXFnruEyoMOhewy8uxc/edit?usp=sharing)

Extremely Detailed Description of the game:
* [GoogleDocs](https://docs.google.com/document/d/1Ga7Dt7GrP7cLfxBWjdXnUhXGQ5_-UElXDyV6x0nstaI/edit#)
* [Wiki](https://github.com/williamsandytoes/abtdg/wiki)

## Requirements
* [Node JS](https://nodejs.org/en/)

## How to run
### Single Player
 * Go to this directory in your console
 * Type `npm install`
 * Type `npm start`
 * The page will automatically open
 * Or you can visit [porrige51122.github.io/ABTDG/](https://porrige51122.github.io/ABTDG/) for the singleplayer game
 
### Multi Player
 * Go to our website [abtdg.fun](http://abtdg.fun)

## How do we qualify for marks?
### Game Characteristics (5%)
 * This game uses lives to determine who wins the game
 * Singleplayer: the score is how many waves you reach
 * Multiplayer: the aim is to make the other player reach 0 lives therefore the score is lives
 * The player can control a specific type of tower which fires a beam in the direction of the mouse (called the mouse tower)

### User Interface (5%)
 * Singleplayer:
  * There once you load the page the game will start (This is due to how we eventually wired in multiplayer)
  * When the game ends there is an end screen which tells you your score (how many waves you have beaten) and you can play again
 * Multiplayer
  * There is an entire website which leads you to create a multiplayer game and let other people are ready
  * Here you can change settings of the game and once you are ready you can start. Pressing start will take you to the game page and the game will start (hence why single player works that way)
 * Once the game starts, you have default money ($100) and lives (5) and income rate (10)
 * When the game ends, an end screen shows to show who wins and how many waves you have beaten
 * There is a health bar to show the health of the enemies and how many lives you have

### Player Sprite (10%)
 * The player controls all the mouse turrets fires a beam in the direction of the mouse
 * when the mouse is on the canvas, the beam starts on the tower and projects itself through the mouse to the edge of the canvas

### Vectors (10%)
 * This program uses the vector class to do positions and velocity of all entities
  * Positions of all walls and sprites on the canvas
  * Velocities of all the enemies

### Collisions (15%)
 * The user controlls the beam of the turret 
  * This beam follows the mouse and if an enemy crosses the beam, the enemy will lose health and the beam will not go through the enemy using the collision class
  * once the beam crosses the enemy, it will reflect off the enemy using the vector class.
  * If this reflected hits another enemy, it deals 50% of its initial damage and stops the beam completely using the collision class again
 
## Object Oriented Approach (15%)
 * All sprites on the canvas are using a sprite class
  * The walls are using a wall class which extends the sprite class
  * The enemies are using an enemies class which extends the sprite class
  * The same for towers and health bars and projectiles.
 * Collisions are done in a separate class called the interaction class which is used for the collisions section.
 * The entire game loop is done in the CVS class in app.js
 
## Additional Features (40%)
 * This game is multiplayer
 * Random Map generation
 * Terrain generation
 * There are animations upon death and placement
 * Multiple tower types, multiple enemies all with self drawn sprites
 * All web hosted [here](https://abtdg.fun/)
 * Working health bars
 * Important information such as money and income all stored serverside to reduce cheating

# Planned Features
 * Enemies will create a custom path to the goal then follow it


