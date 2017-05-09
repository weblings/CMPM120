//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var mainState = {

	preload: function() {
	 	
	 	var player1;
		var Player1SpawnX;
		var Player1SpawnY; 

		var player2;
		var Player2SpawnX;
		var Player2SpawnY;

		//AG: Collider group vars
		var players;
		var ground;
        var fist1;
        var fist2;
	},

	create: function() {
		Player1SpawnX = 325;
		Player1SpawnY = 200; 


		Player2SpawnX = 475;
		Player2SpawnY = 200;


	    player1 = new Player(game, 'player', Player1SpawnX, Player1SpawnY, 1);
	    game.add.existing(player1);
	    
	    player2 = new Player(game, 'player', Player2SpawnX, Player2SpawnY, 2);
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
        
        fist1 = player1.fists;
        fist2 = player2.fists;
	},

	update: function() {
	    game.physics.arcade.collide(players,ground);
        game.physics.arcade.collide(player1,player2);
        
        game.physics.arcade.overlap(player1,fist2,mainState.lightAttack, null, this);
        game.physics.arcade.overlap(player2,fist1,mainState.heavyAttack, null, this);
    },
    
    lightAttack: function(player,hitbox){
        player.takeDamage(3,100);
    },
  
    heavyAttack: function(player,hitbox){
        player.takeDamage(10,1000);
    }
}


