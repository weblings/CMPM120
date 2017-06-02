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

        var gamerun

        //Controllers
        var pad1;
        var pad2;
        var padControl1;
        var padControl2; 
    },

	create: function() {
		Player1SpawnX = 215; //AG: TO-DO: Need to extend this once we get characters
		Player1SpawnY = 0; 


		Player2SpawnX = 1000;
		Player2SpawnY = 0;

		//bg
		var bg = game.add.sprite(0,0,'bg');
		bg.scale.setTo(0.8);
        
        if(P1CharChosen == "SIMON"){
	       player1 = new Simon(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1,false);
        }else if(P1CharChosen == "LITERALLY A SCORPION"){
            player1 = new Scorpion(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1,false);
        }else{
            player1 = new Security(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1,false);
        }
	    game.add.existing(player1);
	    
        if(P2CharChosen == "SIMON"){
	       player2 = new Simon(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2,duplicate);
        }else if(P2CharChosen == "LITERALLY A SCORPION"){
            player2 = new Scorpion(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2,duplicate);
        }else{
            player2 = new Security(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2,duplicate);
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

        gamerun = true;

        //AG: Sound
        this.heavySound = game.add.audio('heavy');
        this.diveSound = game.add.audio('dive');
        this.lightSound = game.add.audio('light');
        
        this.heavySoundPlayed = false;
        this.diveSoundPlayed = false;
        this.lightSoundPlayed = false;
        
        this.hitVolume = .8;
        this.blockVolume = .05;
        
        //AG: Pause
        this.menu = game.add.sprite(game.world.width/2,game.world.height/2,'pause_menu');
        this.menu.anchor.setTo(0.5,0.5);
        this.menu.alpha = 0;
        this.menu.scale.setTo(.8,.8);
        
        /*this.menuC = game.add.sprite(game.world.width/2,game.world.height/2,'pause_menu_controller');
        this.menuC.anchor.setTo(0.5,0.5);
        this.menuC.alpha = 0;
        this.menuC.scale.setTo(.8,.8);*/
        
        pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        fourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        fiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        
        //startKey = game.input.gamepad.pad1.onDown(Phaser.Gamepad.XBOX360_START);
        
        pauseKey.onDown.add(mainState.unpause, self);
        oneKey.onDown.add(mainState.unpause, self);
        twoKey.onDown.add(mainState.unpause, self);
        threeKey.onDown.add(mainState.unpause, self);
        fourKey.onDown.add(mainState.unpause, self);
        fiveKey.onDown.add(mainState.unpause, self);
        
        //Transition
        this.transitionStarted = false;

        //Music
        fight_music_choices = ['exit_the_premises','ouroboros','kick_shock','ultra_polka'];
        index = game.rnd.between(0,3);
        main_music = game.add.audio(fight_music_choices[index]);
        main_music.play('',0, 1, true);
        main_music.mute = false;  
        main_music.loop = true;
        main_music.volume = .7;
        
        deathSound = game.add.audio('shoegazer');
        deathSound.volume = .7;
        deathSound.mute = false;
        
        //Rounds won UI
        p2wins1 = game.add.sprite(game.world.width/2+135,60,'round_unresolved');
        p2wins1.scale.setTo(.3,.3);
        p2wins2 = game.add.sprite(game.world.width/2+95,60,'round_unresolved');
        p2wins2.scale.setTo(.3,.3);        
        p1wins1 = game.add.sprite(game.world.width/2-165,60,'round_unresolved');
        p1wins1.scale.setTo(.3,.3);
        p1wins2 = game.add.sprite(game.world.width/2-125,60,'round_unresolved');
        p1wins2.scale.setTo(.3,.3);
        
        p2won1 = game.add.sprite(game.world.width/2+135,60,'round_won');
        p2won1.scale.setTo(.3,.3);
        if(p2win < 1) p2won1.alpha = 0;
        p2won2 = game.add.sprite(game.world.width/2+95,60,'round_won');
        p2won2.scale.setTo(.3,.3);
        p2won2.alpha = 0;
        p1won1 = game.add.sprite(game.world.width/2-165,60,'round_won');
        p1won1.scale.setTo(.3,.3);
        if(p1win < 1) p1won1.alpha = 0;
        p1won2 = game.add.sprite(game.world.width/2-125,60,'round_won');
        p1won2.scale.setTo(.3,.3);
        p1won2.alpha = 0;
	},

	update: function() {
        
        if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected){
            padControl1 = true;
        }
        else{
            padControl1 = false;
        }

        if (game.input.gamepad.supported && game.input.gamepad.active && pad2.connected){
            padControl2 = true;
        }
        else{
            padControl2 = false;
        }
        
        //Pause button
        if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            this.menu.alpha = 1;
            game.paused = true;
        }
        
        if(padControl1){
            if(pad1.isDown(Phaser.Gamepad.XBOX360_START)){
                this.menu.alpha = 1;
                game.paused = true;
            }
        }
        
        //AG: If a player has won
        if(!player1.alive && player2.alive && gamerun ){
        	p2win++;
        	gamerun = false;
            round++;
            deathSound.play();
        }else if(player1.alive && !player2.alive && gamerun){
        	p1win++;
        	gamerun = false;
            round++;
            deathSound.play();
        }

        if(!player1.alive || !player2.alive){
            main_music.fadeOut(500);
            
            if(!player1.alive && !player2.alive){
                introText2.text = "YOU'RE BOTH DETAINED"
            }else if(!player1.alive){
                introText1.text = player2.charName
                introText1.fontSize = 64;
                if(p2win < 2){ 
                    introText2.text = "WINS ROUND "+round;
                    game.add.tween(p2won1).to( { alpha: 1 }, 40, "Linear", true, 600);
                }else{
                    game.add.tween(p2won2).to( { alpha: 1 }, 40, "Linear", true, 600);
                    introText2.text = "GETS TO KEEP THEIR SEAT"
                } 
                introText1.alpha = 1;
            }else{ //player2 dead
                introText1.text = player1.charName
                introText1.fontSize = 64;
                if(p1win < 2){ 
                    introText2.text = "WINS ROUND "+round;
                    game.add.tween(p1won1).to( { alpha: 1 }, 40, "Linear", true, 600);
                }else{
                    game.add.tween(p1won2).to( { alpha: 1 }, 40, "Linear", true, 600);
                    introText2.text = "GETS TO KEEP THEIR SEAT"
                } 
                introText1.alpha = 1;
            }
            introText2.alpha = 1; //make text visible
            introText2.fill = "#b70030"; //AG: TO-DO: Finalize this color when get bg
            if(game.time.slowMotion < 4){
                game.time.slowMotion += 1;
            }
        }
        
        
        //AG: Allows sounds to play again
        if (this.timer.timerDone('heavySound')){
            this.heavySoundPlayed = false;
            player1.attackHit = false;
            player2.attackHit = false;
        }
        
        if (this.timer.timerDone('diveSound')){
            this.diveSoundPlayed = false;
        }
        
        if (this.timer.timerDone('lightSound')){
            this.lightSoundPlayed = false;
            player1.attackHit = false;
            player2.attackHit = false;
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
        if(player1.charName == "SECURITY" && player2.charName == "SECURITY"){
            //game.physics.arcade.overlap(bullets1,bullets2,mainState.projectileClash, null, this);
            //console.log("Player1 bullets:"+bullets1.children.length);
            for(let i=0; i< bullets1.children.length; i++){
                for(let j=0; j<bullets2.children.length; j++){
                    //console.log("i:"+i+", j:"+j);
                    game.physics.arcade.overlap(bullets1.children[i],bullets2.children[j],mainState.projectileClash, null, this);
                }
            }
        }
        
        //Dive kicks
        if(player1.action.dive){
            game.physics.arcade.overlap(player2,player1,mainState.diveKick, null, this);
        }
        if(player2.action.dive){
            game.physics.arcade.overlap(player1,player2,mainState.diveKick, null, this);
        }

        
        if (player1.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player2.action.dive && player1.alive && !player2.action.attacking && !player1.staggered){
        	//player2.body.velocity.y -= 300;
        	if (player2.faceRIGHT){
        		player2.position.x +=50;
        	}else{
        		player2.position.x -=50;
        	}
        	

        }

        if (player2.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player1.action.dive && player2.alive && !player1.action.attacking && !player2.staggered){
        	//player1.body.velocity.y -= 300;
        	if (player1.faceRIGHT){
        		player1.position.x +=50;
        	}else{
        		player1.position.x -=50;
        	}
        	
        }
    
        
        //AG: Transitions
        if(player1.introFinished){
            if(game.time.slowMotion == 4){
                if ((!player1.alive || !player2.alive) && (p1win>=2 || p2win>=2) && !this.transitionStarted){
                    this.timer.startTimer('endMatch',6000);
                    this.transitionStarted = true;
                }else if((!player1.alive || !player2.alive) && (p1win>=2 || p2win>=2) && this.transitionStarted){
                    if(this.timer.timerDone('endMatch')){
                        game.time.slowMotion = 1;
                        this.game.world.removeAll();
                        main_music.mute = true;
                        deathSound.mute = true;
                        game.state.start('charSelect',false,false);
                    }
                }else if ((!player1.alive || !player2.alive) && !this.transitionStarted){
                    this.timer.startTimer('nextRound',6000);
                    this.transitionStarted = true;
                }else if ((!player1.alive || !player2.alive) && this.transitionStarted){
                    if(this.timer.timerDone('nextRound')){
                    game.time.slowMotion = 1;
                    this.game.world.removeAll();
                    main_music.mute = true;
                    deathSound.mute = true;
                    game.state.start('main',false,false,P1CharChosen,P2CharChosen,p1win,p2win,round);
                    }
                }
            }
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
        
        attackingPlayer.attackHit = true;
        
        //AG: Determines which attack they did
        if(attackingPlayer.inHeavyAttack || attackingPlayer.action.dive){
            
            //AG: Sound handling
            if(!this.heavySoundPlayed){
                if(hitPlayer.action.block) this.heavySound.volume = this.blockVolume;
                else this.heavySound.volume = this.hitVolume;
                this.heavySound.play();
                this.heavySoundPlayed = true;
                this.timer.startTimer('heavySound',500);
            }
            
            if(attackingPlayer.charName == "SECURITY"){
                mainState.SecurityHeavyAttack(player,hitbox);
            }else{ //AG: Every other character's stuff is here rn (Should change by final)
                mainState.heavyAttack(player,hitbox);
            }
        }else if(attackingPlayer.inLightAttack){
            if(attackingPlayer.charName == "SECURITY"){
                attackingPlayer.bullets.removeAll(); //AG: If bullet hits opponent, destroy it
                if(hitPlayer.action.block){ //AG: If opponent is blocking
                    this.lightSound.volume = this.blockVolume;
                    this.lightSound.play();
                    mainState.SecurityLightAttack(player,hitbox,false);
                }else{
                    this.lightSound.volume = this.hitVolume;
                    this.lightSound.play();
                    mainState.SecurityLightAttack(player,hitbox,true);
                }
            }else if(attackingPlayer.charName == "LITERALLY A SCORPION"){
                //AG: Sound handling
                if(!this.lightSoundPlayed){
                    if(hitPlayer.action.block) this.lightSound.volume = this.blockVolume;
                    else this.lightSound.volume = this.hitVolume;
                    this.lightSound.play();
                    this.lightSoundPlayed = true;
                    this.timer.startTimer('lightSound',500);
                }
                mainState.lightAttack(player,hitbox);
            }else{
                //AG: Sound handling
                if(!this.lightSoundPlayed){
                    if(hitPlayer.action.block) this.lightSound.volume = this.blockVolume;
                    else this.lightSound.volume = this.hitVolume;
                    this.lightSound.play();
                    this.lightSoundPlayed = true;
                    this.timer.startTimer('lightSound',1000);
                }
                mainState.lightAttack(player,hitbox);
            }
        }else if(attackingPlayer.inSpecial){
        	if(attackingPlayer.charName == "LITERALLY A SCORPION"){
        		attackingPlayer.chainHit = true;
        		mainState.scorpionChain(player,hitbox, attackingPlayer.position.x);
        	}

        }else{
            //AG: Projectile could hit after leaving inLightAttack
            if(attackingPlayer.charName == "SECURITY"){
                attackingPlayer.bullets.removeAll();
                if(hitPlayer.action.block){
                    this.lightSound.volume = this.blockVolume;
                    this.lightSound.play();
                    mainState.SecurityLightAttack(player,hitbox,false);
                }else{
                    this.lightSound.volume = this.hitVolume;
                    this.lightSound.play();
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
        mainState.calcKnockBack(400,80,player.playerNum);

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
                              
            //Sound
            if(!this.diveSoundPlayed){
                this.diveSound.play();
                this.diveSoundPlayed = true;
                this.timer.startTimer('diveSound',500);
            }
    	}

    },

    scorpionChain: function(player,hitbox,location){
    	player.takeDamage(25,100);
    	player.chained(location);

    	game.camera.shake(0.005, 200);
    },
    
    projectileClash: function(bullet1,bullet2){
        bullet1.kill();
        bullet2.kill();
        //console.log("bullet1: "+bullet1.position.x+" and bullet 2: "+bullet2.position.x);
        player1.perfect_block_sound.volume = .3;
        player1.perfect_block_sound.play();
        player1.perfect_block_sound.volume = .7;
    },
    
    //--Security's Attacks--//
    
    SecurityLightAttack: function(player,hitbox,stun){
        //If player is blocking, they won't be stunned
        if(stun) mainState.calcKnockBack(10,10,player.playerNum);
        player.takeDamage(5,100);
    },
    
    SecurityHeavyAttack: function(player,hitbox){
        mainState.calcKnockBack(1200,300,player.playerNum);
        player.takeDamage(15,400); 
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
    },
    
    //From THESE BEAUTIFUL HUMAN BEINGS: http://www.html5gamedevs.com/topic/501-input-ondown-and-mouse-keyboard-touch/
    unpause: function(event){
        // Only act if paused
        if(game.paused){
            
            if(padControl1){
                if(pad1.isDown(Phaser.Gamepad.XBOX360_START)){
                    game.paused = false;
                    //this.menuC.alpha = 0;
                }
            }
            
            if (game.input.keyboard.isDown(Phaser.KeyCode.ESC)){
                //UNPAUSE
                game.paused = false;
                mainState.menu.alpha = 0;
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.ONE)){
                //RESTART ROUND
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                game.state.start('main',false,false,P1CharChosen,P2CharChosen,p1win,p2win,round);
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.TWO)){
                //RESTART MATCH
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                p1win = 0;
                p2win = 0;
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                game.state.start('main',false,false,P1CharChosen,P2CharChosen,p1win,p2win,round);
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.THREE)){
                //CHARACTER SELECT
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                game.state.start('charSelect');
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.FOUR)){
                //CONTROLS
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                game.state.start('controls');
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.FIVE)){
                //MAIN MENU
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                game.state.start('title',false,false);
            } 
        }
    }
    
};


