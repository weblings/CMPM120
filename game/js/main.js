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
        var bullets1;
        var bullets2;

        var floor;
        
        //AG: Text
        var introText1;
        var introText2;


        var tempgrav1 ;
        var tempvely1 ;
        var tempvelx1 ;
        var tempgrav2 ;
        var tempvely2 ;
        var tempvelx2 ;
        
        //Sounds
        //var lightSound;
        //var heavySound;
    },

	create: function() {
		Player1SpawnX = 215; //AG: TO-DO: Need to extend this once we get characters
		Player1SpawnY = 0; 


		Player2SpawnX = 1000;
		Player2SpawnY = 0;

		//bg
		var bg = game.add.sprite(0,0,'bg');
		bg.scale.setTo(0.8);
        
        if(P1CharChosen == "THE TEMP"){
	       player1 = new Player(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1);
        }else if(P1CharChosen == "LITERALLY A SCORPION"){
            player1 = new Scorpion(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1);
        }else{
            player1 = new Security(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1);
        }
	    game.add.existing(player1);
	    
        if(P2CharChosen == "THE TEMP"){
	       player2 = new Player(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2);
        }else if(P2CharChosen == "LITERALLY A SCORPION"){
            player2 = new Scorpion(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2);
        }else{
            player2 = new Security(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2);
        }
	    game.add.existing(player2);

	    //new ground
	    //game.physics.startSystem(Phaser.Physics.ARCADE)
	    platforms = game.add.group();
		platforms.enableBody = true;

	    floor = game.add.tileSprite(0, game.world.height -20, 1280, 720,'bg');
        floor.alpha = 0;
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
        if(player1.charName == "SECURITY") bullets1 = player1.bullets;
        fist2 = player2.fists;
        if(player2.charName == "SECURITY") bullets2 = player2.bullets;
        
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

        //timer stuff
        this.timer = new setTime();

        //hitstop stuff
        this.hitting = false;
        this.hitter = 1;
        this.justhev = false;

        //AG: sound tests
        //lightSound = game.add.audio('light');
        //heavySound = game.add.audio('heavy');
	},

	update: function() {
        
        //AG: If a player has won
        if(!player1.alive || !player2.alive){    
            if(!player1.alive && !player2.alive){
                introText2.text = "YOU'RE BOTH DETAINED"
            }else if(!player1.alive){
                introText1.text = player2.charName
                introText1.fontSize = 64;
                introText2.text = "GETS TO KEEP THEIR SEAT"
                introText1.alpha = 1;
            }else{ //player2 dead
                introText1.text = player1.charName
                introText1.fontSize = 64;
                introText2.text = "GETS TO KEEP THEIR SEAT"
                introText1.alpha = 1;
            }
            introText2.alpha = 1; //make text visible
            introText2.fill = "#b70030"; //AG: TO-DO: Finalize this color when get bg
            if(game.time.slowMotion < 4){
                game.time.slowMotion += 1;
            }
        }
        
	    game.physics.arcade.collide(players,platforms);

	    //insert if statement here to turn off collision on hits
	    //add more checks later depending on scenario 
	    //this is mainly to fix the dive kick stuf but we need the divekick working fist NH
	    if (!player1.action.dive && !player2.action.dive && !player1.hitAgainstWall && !player2.hitAgainstWall
	    	&& !player1.action.down && !player2.action.down){
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
        
        //Check if back on floor after wall-hit
        if(player1.hitAgainstWall && mainState.yValueinMarginOfGround(player1,1)){
            player1.hitAgainstWall = false;
        }
        if(player2.hitAgainstWall && mainState.yValueinMarginOfGround(player2,1)){
            player2.hitAgainstWall = false;
        }

        //Light and heavy attacks

        game.physics.arcade.overlap(player1,fist2,mainState.determineAttack, null, this);
        game.physics.arcade.overlap(player2,fist1,mainState.determineAttack, null, this);

        /*

        if (!this.hitting){
        	tempgrav1 = player1.body.gravity.y;
        	tempvely1 = player1.body.velocity.y;
        	tempvelx1 = player1.body.velocity.x;
        	tempgrav2 = player2.body.gravity.y;
        	tempvely2 = player2.body.velocity.y;
        	tempvelx2 = player2.body.velocity.x;
        }

        if (this.timer.timerDone('hitstop')){
        	this.hitting = false;

        	player1.body.gravity.y = tempgrav1;
        	player1.body.velocity.y = tempvely1;
       		player1.body.velocity.x = tempvelx1;
        	player2.body.gravity.y = tempgrav2;
        	player2.body.velocity.y = tempvely2;
       		player2.body.velocity.x = tempvelx2;
       		if (this.justhev){
       			this.justhev = false;
       			mainState.calcKnockBack(100,70,this.hitter);
       		}
       		
        }
        */

        
        //Handling SECURITY's Projectiles
        if(player2.charName == "SECURITY"){
            game.physics.arcade.overlap(player1,bullets2,mainState.determineAttack, null, this);
        }
        if(player1.charName == "SECURITY"){
            game.physics.arcade.overlap(player2,bullets1,mainState.determineAttack, null, this);
        }
        
        //Dive kicks
        if(player1.action.dive){
            game.physics.arcade.overlap(player2,player1,mainState.diveKick, null, this);
        }
        if(player2.action.dive){
            game.physics.arcade.overlap(player1,player2,mainState.diveKick, null, this);
        }

        
        if (player1.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player2.action.dive && player1.alive && !player2.action.attacking){
        	player2.body.velocity.y -= 300;
        	if (player2.faceRIGHT){
        		player2.position.x +=50;
        	}else{
        		player2.position.x -=50;
        	}
        	

        }

        if (player2.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player1.action.dive && player2.alive && !player1.action.attacking){
        	player1.body.velocity.y -= 300;
        	if (player1.faceRIGHT){
        		player1.position.x +=50;
        	}else{
        		player1.position.x -=50;
        	}
        	
        }

        //press space to restart
        if ((!player1.alive || !player2.alive) && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        	game.time.slowMotion = 1;
        	this.game.world.removeAll();
        	game.state.start('charSelect',false,false);
        }

        

    },
    
    determineAttack: function(player,hitbox){
        var attackingPlayer;

        var hitPlayerNum = player.playerNum;
        var hitPlayer = player;

        
        //AG: Determines out who is attacking
        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }
        
        //AG: Determines which attack they did
        if(attackingPlayer.inHeavyAttack || attackingPlayer.action.dive){
            if(attackingPlayer.charName == "SECURITY"){
                mainState.SecurityHeavyAttack(player,hitbox);
            }else{ //AG: Every other character's stuff is here rn (Should change by final)
                mainState.heavyAttack(player,hitbox);
            }
        }else if(attackingPlayer.inLightAttack){
            if(attackingPlayer.charName == "SECURITY"){
                attackingPlayer.bullets.removeAll(); //AG: If bullet hits opponent, destroy it
                if(hitPlayer.action.block){ //AG: If opponent is blocking
                    mainState.SecurityLightAttack(player,hitbox,false);
                }else{
                    mainState.SecurityLightAttack(player,hitbox,true);
                }
            }else{
                mainState.lightAttack(player,hitbox);
            }
        }else{
            //AG: Projectile could hit after leaving inLightAttack
            if(attackingPlayer.charName == "SECURITY"){
                attackingPlayer.bullets.removeAll();
                if(hitPlayer.action.block){
                    mainState.SecurityLightAttack(player,hitbox,false);
                }else{
                    mainState.SecurityLightAttack(player,hitbox,true);
                }            
            }
        }
    },
    
    lightAttack: function(player,hitbox){
        mainState.calcKnockBack(35,10,player.playerNum);
        player.takeDamage(5,50);

        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.001, 100);
        }

    },
  
    heavyAttack: function(player,hitbox){
        mainState.calcKnockBack(400,40,player.playerNum);

        player.takeDamage(15,200);
        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.005, 100);
        }
        

        /*

        this.hitting = true;
        this.hitter = player.playerNum
        this.justhev = true;

        this.timer.startTimer('hitstop',500);
        
        player1.body.gravity.y = 0;
        player1.body.velocity.y = 0;
        player1.body.velocity.x = 0;
        player2.body.gravity.y = 0;
        player2.body.velocity.y = 0;
        player2.body.velocity.x = 0;
        */
        
        

    },
    

    diveKick: function(player,hitbox){
        mainState.calcKnockBack(40,30,player.playerNum);
        player.takeDamage(5,250);
        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.005, 100);
    	}

    },
    
    //--Security's Attacks--//
    
    SecurityLightAttack: function(player,hitbox,stun){
        //If player is blocking, they won't be stunned
        if(stun) mainState.calcKnockBack(10,10,player.playerNum);
        player.takeDamage(5,100);
    },
    
    SecurityHeavyAttack: function(player,hitbox){
        mainState.calcKnockBack(300,100,player.playerNum);
        player.takeDamage(10,1000); 
        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.005, 100);
    	  }
    },
    
    //AG: Should figure out which direction to apply knockback
    calcKnockBack: function(x,y,numOfHitPlayer){
        
        if(numOfHitPlayer == 1){
            var hitPlayer = player1;
        }else if(numOfHitPlayer == 2){
            var hitPlayer = player2;
        } 
        
        if(hitPlayer.hitAgainstWall) return;
            
        var wallFactor = 3; //multiplier to normal knockback to launch player
        
        //Calc if x should be negative
        if(player1.x < player2.x && numOfHitPlayer == 2){
            if(mainState.playerXinMarginOfWall(player2, "right", 5)){
                x = -wallFactor*x;
                y = -wallFactor*y;
                hitPlayer.wallKnockBack(x,y,1000);
                return;
            }
            else x = x;
        }else if(player1.x < player2.x && numOfHitPlayer == 1){
            if(mainState.playerXinMarginOfWall(player1, "left", 5)){
                x = wallFactor*x;
                y = -wallFactor*y;
                hitPlayer.wallKnockBack(x,y,1000);
                return;
            }
            else x = -x;
        }
        
        if(player2.x < player1.x && numOfHitPlayer == 1){
            if(mainState.playerXinMarginOfWall(player1, "right", 5)){
                x = -wallFactor*x;
                y = -wallFactor*y;
                hitPlayer.wallKnockBack(x,y,1000);
                return;
            }
            else x = x;
        }else if(player2.x < player1.x && numOfHitPlayer == 2){
            if(mainState.playerXinMarginOfWall(player2, "left", 5)){
                x = wallFactor*x;
                y = -wallFactor*y;
                hitPlayer.wallKnockBack(x,y,1000);
                return;
            }
            else x = -x;
        }
        
        //Calc if y should be negative TO-DO: IS BUSTED (WON'T SEND PLAYER DOWN IF DIVE-KICKED IN MID-AIR)
        /*if(!mainState.yValueinMarginOf(10) && numOfHitPlayer == 1){
            if(hitPlayer.action.jump || hitPlayer.action.dive) y = y;
        }else if(!mainState.yValueinMarginOf(10) && numOfHitPlayer == 2){
            if(hitPlayer.action.jump || hitPlayer.action.dive) y = y;
        }else{ //sends player up
           y = -y;
        }*/
        y=-y;
            
        //Apply knockback to hit player
        hitPlayer.applyKnockBack(x,y);

    },
    
    //AG: Returns if Players are within a margin of eachother (Phaser doesn't keep characters at whole numbers during calculation)
    yValueinMarginOf: function(value){
        return Boolean(Math.abs(player1.y - player2.y) < value);
    },
    
    //AG: Returns if player is within a margin of the ground
    yValueinMarginOfGround: function(player,value){
        return Boolean(Math.abs(player.y - 720) < value);
    },
    
    //AG: x version for walls
    playerXinMarginOfWall: function(player, wall, value){
        if(wall == "left"){
            var wallX = player.touchLeftWallAt;
        }else{
            var wallX = player.touchRightWallAt;
        }
        return Boolean(Math.abs(player.x - wallX) < value);
    },
    
    Tween1completed: function(){
        tween2 = game.add.tween(introText2).to( { alpha: 1 }, 400, "Linear", true, 600);
        tween2.onComplete.add(mainState.Tween2completed, this);
    },
    
    Tween2completed: function(){
        tween1 = game.add.tween(introText1).to( { alpha: 0 }, 650, "Linear", true, 100);
        tween2 = game.add.tween(introText2).to( { alpha: 0 }, 850, "Linear", true, 200);
        player1.introFinished = true;
        player2.introFinished = true;
    }
    
};


