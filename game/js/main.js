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

	    //insert if statement here to turn off collision on hits
	    //add more checks later depending on scenario 
	    //this is mainly to fix the dive kick stuf but we need the divekick working fist NH
	    if (!player1.staggered || !player2.staggered || !player1.action.dive || !player2.action.dive){
	    	game.physics.arcade.collide(player1,player2);
	    }
        //game.physics.arcade.collide(player1,player2);


        //Light and heavy attacks
        game.physics.arcade.overlap(player1,fist2,mainState.determineAttack, null, this);
        game.physics.arcade.overlap(player2,fist1,mainState.determineAttack, null, this);
        
        //Dive kicks
        if(game.physics.arcade.collide(player1,player2) && player1.action.dive){
            game.physics.arcade.overlap(player2,player1,mainState.heavyAttack, null, this);
        }
        if(game.physics.arcade.collide(player2,player1) && player2.action.dive){
            game.physics.arcade.overlap(player1,player2,mainState.heavyAttack, null, this);
        }

        if (player1.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player2.action.dive){
        	player2.body.velocity.y -= 300;
        	if (player2.faceRIGHT){
        		player2.position.x +=50;
        	}else{
        		player2.position.x -=50;
        	}

        }

        if (player2.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player1.action.dive){
        	player1.body.velocity.y -= 300;
        	if (player1.faceRIGHT){
        		player1.position.x +=50;
        	}else{
        		player1.position.x -=50;
        	}
        }
    },
    
    determineAttack: function(player,hitbox){
        var attackingPlayer;
        var hitPlayer = player.playerNum;
        
        //AG: Determines out who is attacking
        if(hitPlayer == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }
        
        //AG: Determines which attack they did
        if(attackingPlayer.inHeavyAttack){
            mainState.heavyAttack(player,hitbox);
        }else{
            mainState.lightAttack(player,hitbox);

        }
    },
    
    lightAttack: function(player,hitbox){
        player.takeDamage(3,100);
        mainState.calcKnockBack(50,30,player.playerNum);
    },
  
    heavyAttack: function(player,hitbox){
        player.takeDamage(10,1000);
        mainState.calcKnockBack(100,70,player.playerNum);
    },
    
    //AG: Should figure out which direction to apply knockback
    calcKnockBack: function(x,y,numOfHitPlayer){
        
        if(numOfHitPlayer == 1){
            var hitPlayer = player1;
        }else if(numOfHitPlayer == 2){
            var hitPlayer = player2;
        }  
        
        //Calc if x should be negative
        if(player1.x > player2.x && numOfHitPlayer == 2){
            x = -x;
        }else if(player1.x < player2.x && numOfHitPlayer == 1){
            x = -x;
        }
        
        //Calc if y should be negative (Might be busted)
        if(mainState.yValueinMarginOf(.5) && numOfHitPlayer == 1){
            if(hitPlayer.action.jump || hitPlayer.action.dive) y = y;
        }else if(mainState.yValueinMarginOf(.5) && numOfHitPlayer == 2){
            if(hitPlayer.action.jump || hitPlayer.action.dive) y = y;
        }else{ //sends player up
            y = -y;
        }
        
        //Apply knockback to hit player
        hitPlayer.applyKnockBack(x,y);

    },
    
    //AG: Phaser doesn't keep characters at whole numbers during calculation
    yValueinMarginOf(value){
        Boolean(Math.abs(player1.y - player2.y) < value);
    },
    
    //AG: x version
    xValueinMarginOf(value){
        Boolean(Math.abs(player1.x - player2.x) < value);
    }
}


