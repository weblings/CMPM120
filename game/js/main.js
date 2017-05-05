var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player1;
var Player1SpawnX = 325;
var Player1SpawnY = 500; 

var player2;
var Player2SpawnX = 475;
var Player2SpawnY = 500; 

function preload() {
 game.load.spritesheet('player','assets/img/dude.png', 32, 48);}

function create() {
    var player1 = new Player(game, 'player', Player1SpawnX, Player1SpawnY, 1);
    game.add.existing(player1);
    
    var player2 = new Player(game, 'player', Player2SpawnX, Player2SpawnY, 2);
    game.add.existing(player2);
    
    //AG: Attempt to get physics working
    var ground = game.add.sprite(0, game.height-32, 'player');
    ground.scale.setTo(25,1);
}

function update() {
    //AG: Should make player collide with other player
    //game.physics.arcade.collide(player1,player2); //AG: Crashes because player1 and player2 still treated as undefined
}
  