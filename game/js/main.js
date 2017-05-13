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

        var floor;
        
        //AG: Text
        var introText1;
        var introText2;
	},

	create: function() {
		Player1SpawnX = 215; //AG: TO-DO: Need to extend this once we get characters
		Player1SpawnY = 0; 


		Player2SpawnX = 1000;
		Player2SpawnY = 0;

		//bg
		var bg = game.add.sprite(0,0,'bg');
		bg.scale.setTo(0.8);

	    player1 = new Player(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1);
	    game.add.existing(player1);
	    
	    player2 = new Player(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2);
	    game.add.existing(player2);

	    //new ground
	    //game.physics.startSystem(Phaser.Physics.ARCADE)
	    platforms = game.add.group();
		platforms.enableBody = true;

	    floor = game.add.tileSprite(0, game.world.height -40, 1280, 720,'bg');
	    platforms.add(floor);



	    floor.body.immovable = true;
	    

	    
	    //AG: Attempt to get physics working
        //var plat = game.add.sprite(0, game.height-32, 'player');
	    //game.physics.enable(plat);
	    //plat.body.immovable = true;
	    //plat.scale.setTo(25,1);
	    
	    //AG: Physics from http://www.codevinsky.com/phaser-2-0-tutorial-flappy-bird-part-2/
	    game.physics.startSystem(Phaser.Physics.Arcade);
	    players = this.game.add.group();
	    players.add(player1);
	    players.add(player2);
	    
	    //ground = this.game.add.physicsGroup();
	    //ground.add(plat);
        
        fist1 = player1.fists;
        fist2 = player2.fists;
        
        //---Text Stuff---//
        
        //AG: Intro Text
        introText1 =  game.add.text(game.world.centerX, game.world.centerY - game.world.centerY/3, "FLIGHT IS OVERBOOKED", { font: "32px Arial", fill: "#000", align: "center" });
        introText1.alpha = 0;
        introText1.anchor.set(0.5);
        
        introText2 =  game.add.text(game.world.centerX, game.world.centerY - game.world.centerY/7, "FIGHT FOR YOUR SEAT", { font: "64px Arial", fill: "#f44242", align: "center" });
        introText2.alpha = 0;
        introText2.anchor.set(0.5);
        
        var tween1 = game.add.tween(introText1).to( { alpha: 1 }, 800, "Linear", true, 800);
        var tween2;

        tween1.onComplete.add(mainState.Tween1completed, this);

	},

	update: function() {
        
        //AG: If a player has won
        if(!player1.alive || !player2.alive){    
            if(!player1.alive && !player2.alive){
                introText2.text = "YOU BOTH GET ARRESTED AND THROWN OFF"
            }else if(!player1.alive){
                introText1.text = player2.charName
                introText2.text = "GETS TO KEEP THEIR SEAT"
                introText1.alpha = 1;
            }else{ //player2 dead
                introText1.text = player1.charName
                introText2.text = player1.charName + "GETS TO KEEP THEIR SEAT"
                introText1.alpha = 1;
            }
            introText2.alpha = 1; //make text visible
            introText2.fill = "#b70030"; //AG: TO-DO: Finalize this color when get bg
            introText1.font = "48px Arial";
            if(game.time.slowMotion < 4){
                game.time.slowMotion += 1;
            }
        }
        
	    game.physics.arcade.collide(players,platforms);

	    //insert if statement here to turn off collision on hits
	    //add more checks later depending on scenario 
	    //this is mainly to fix the dive kick stuf but we need the divekick working fist NH
	    if ((!player1.action.dive && !player2.action.dive)){
	    	game.physics.arcade.collide(player1,player2);
	    }
        //game.physics.arcade.collide(player1,player2);


        //update test
        if (player1.position.y > player1.floorLevel){
        	player1.position.y = player1.floorLevel;
    	}
    	if (player2.position.y > player2.floorLevel){
        	player2.position.y = player2.floorLevel;
    	}


        //Light and heavy attacks
        game.physics.arcade.overlap(player1,fist2,mainState.determineAttack, null, this);
        game.physics.arcade.overlap(player2,fist1,mainState.determineAttack, null, this);
        
        //Dive kicks
        if(player1.action.dive){
            game.physics.arcade.overlap(player2,player1,mainState.diveKick, null, this);
        }
        if(player2.action.dive){
            game.physics.arcade.overlap(player1,player2,mainState.diveKick, null, this);
        }

        if (player1.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player2.action.dive && player1.alive){
        	player2.body.velocity.y -= 300;
        	if (player2.faceRIGHT){
        		player2.position.x +=50;
        	}else{
        		player2.position.x -=50;
        	}

        }

        if (player2.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player1.action.dive && player2.alive){
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
    
    diveKick: function(player,hitbox){
        player.takeDamage(5,250);
        mainState.calcKnockBack(40,30,player.playerNum);
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
    },
    
    Tween1completed(){
        tween2 = game.add.tween(introText2).to( { alpha: 1 }, 400, "Linear", true, 600);
        tween2.onComplete.add(mainState.Tween2completed, this);
    },
    
    Tween2completed(){
        tween1 = game.add.tween(introText1).to( { alpha: 0 }, 650, "Linear", true, 100);
        tween2 = game.add.tween(introText2).to( { alpha: 0 }, 850, "Linear", true, 200);
        player1.introFinished = true;
        player2.introFinished = true;
    }
}


