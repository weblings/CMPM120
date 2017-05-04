<<<<<<< HEAD

//Ooh look at me I'm different gittttt

//set up states NH
var mainState = {
	preload: function(){
		var cursors;

	},

	create: function(){
		cursors = game.input.keyboard.createCursorKeys();   

	},

	update: function(){

	}

};

=======
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//var cursors;
var player2;
var Player2SpawnX = 200;
var Player2SpawnY = 200; 

function preload() {
 game.load.spritesheet('player','assets/img/dude.png', 32, 48);}

function create() {
    //controls
    //cursors = game.input.keyboard.createCursorKeys();
    var player2 = new Player(game, 'player', Player2SpawnX, Player2SpawnY, 2);
    game.add.existing(player2);
}
>>>>>>> d8a0eace94a40a5753e5dee0089fdb87a9d40509

  