var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player1;
var Player1SpawnX = 325;
var Player1SpawnY = 200; 

var player2;
var Player2SpawnX = 475;
var Player2SpawnY = 200;

//AG: Collider group vars
var players;
var ground;

function preload() {
 game.load.spritesheet('player','assets/img/dude.png', 32, 48);}

function create() {
    var player1 = new Player(game, 'player', Player1SpawnX, Player1SpawnY, 1);
    game.add.existing(player1);
    
    var player2 = new Player(game, 'player', Player2SpawnX, Player2SpawnY, 2);
    game.add.existing(player2);
    
    //AG: Attempt to get physics working
    var plat = game.add.sprite(0, game.height-32, 'player');
    game.physics.enable(plat);
    plat.body.immovable = true;
    plat.scale.setTo(25,1);
    
    //AG: Physics from http://www.codevinsky.com/phaser-2-0-tutorial-flappy-bird-part-2/
    game.physics.startSystem(Phaser.Physics.Arcade);
    players = this.game.add.group();
    players.add(player1);
    players.add(player2);
    
    ground = this.game.add.physicsGroup();
    ground.add(plat);
}

function update() {
    game.physics.arcade.collide(players,ground); 
}
  