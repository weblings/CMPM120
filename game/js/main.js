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
        var specialBullets1;
        var specialBullets2;
        var spikes1;
        var spikes2;
        var iceorbs1;
        var iceorbs2;

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
        
        //UI
        var healthBorder1;
        var healthBorder2;
        var healthBorders;
        var specialBorder1;
        var specialBorder2;
        var SpecialBorders;
        var charText1;
        var charText2;
        
        var simonSpecialSoundPlayed;
    },

	create: function() {
		Player1SpawnX = 215; //AG: TO-DO: Need to extend this once we get characters
		Player1SpawnY = 0; 


		Player2SpawnX = 1000;
		Player2SpawnY = 0;

		//bg
		var bg = game.add.sprite(0,0,'bg');
		bg.scale.setTo(0.8);
        
        //Music

        fight_music_choices = ['exit_the_premises','ouroboros','kick_shock','ultra_polka','exit_the_premises','ouroboros','kick_shock','parisian','patriotism'];
        this.ParisianIndex = 7;
        this.MuricaIndex = 8;

        index = game.rnd.between(0,fight_music_choices.length-1);
        if(index == this.ParisianIndex) this.Parisian = true;
        else if(index == this.MuricaIndex){
            this.Murica1 = game.add.sprite(0-5,game.height/4,'murica');
            this.Murica1.scale.setTo(.5,.5);
            this.Murica2 = game.add.sprite(game.width+5,game.height/4,'murica');
            this.Murica2.scale.setTo(-.5,.5);
        }else{
            this.Parisian = false;
        }
        
        main_music = game.add.audio(fight_music_choices[index]);
        main_music.play('',0, 1, true);
        main_music.mute = false;  
        main_music.loop = true;
        main_music.volume = .7;
            
        deathSound = game.add.audio('shoegazer');
        deathSound.volume = .7;
        deathSound.mute = false;
        
		
        if(P1CharChosen == "SIMON"){
	       player1 = new Simon(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1, P1CostumeIndex, this.Parisian);
        }else if(P1CharChosen == "LITERALLY A SCORPION"){
            player1 = new Scorpion(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1, P1CostumeIndex, this.Parisian);
        }else{
            player1 = new Security(game, 'hitbox', Player1SpawnX, Player1SpawnY, 1, P1CostumeIndex, this.Parisian);
        }
	    game.add.existing(player1);
	    
        if(P2CharChosen == "SIMON"){
	       player2 = new Simon(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2, P2CostumeIndex, this.Parisian);
        }else if(P2CharChosen == "LITERALLY A SCORPION"){
            player2 = new Scorpion(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2,  P2CostumeIndex, this.Parisian);
        }else{
            player2 = new Security(game, 'hitbox', Player2SpawnX, Player2SpawnY, 2,  P2CostumeIndex, this.Parisian);
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
        if(player1.charName == "SECURITY") {
        	bullets1 = player1.bullets;
            specialBullets1 = player1.specialBullets;
        }else if(player1.charName == "SIMON") {
        	spikes1 = player1.spikes;
        	iceorbs1 = player1.iceorbs;
        }
        fist2 = player2.fists;
        if(player2.charName == "SECURITY") {
        	bullets2 = player2.bullets;
            specialBullets2 = player2.specialBullets;
        }else if(player2.charName == "SIMON") {
        	spikes2 = player2.spikes;
        	iceorbs2 = player2.iceorbs;
        }
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
        this.frozenSound = game.add.audio('frozen');
        this.chainSound = game.add.audio('chain_hit');
        
        this.heavySoundPlayed = false;
        this.diveSoundPlayed = false;
        this.lightSoundPlayed = false;
        
        this.hitVolume = .8;
        this.blockVolume = .05;
        
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

        //Rounds won UI
        var roundUIHeight = 107;
        var roundScale = .9;
        p2wins1 = game.add.sprite(913-5,102,'round_unresolved');
        p2wins1.scale.setTo(-roundScale,roundScale);
        p2wins1.position.y = roundUIHeight;
        p2wins2 = game.add.sprite(860-5,102,'round_unresolved');
        p2wins2.scale.setTo(-roundScale,roundScale);
        p2wins2.position.y = roundUIHeight;
        p1wins1 = game.add.sprite(367+5,102,'round_unresolved');
        p1wins1.scale.setTo(roundScale,roundScale);
        p1wins1.position.y = roundUIHeight;
        p1wins2 = game.add.sprite(420+5,102,'round_unresolved');
        p1wins2.scale.setTo(roundScale,roundScale);
        p1wins2.position.y = roundUIHeight;
        
        p2won1 = game.add.sprite(913-5,102,'round_won');
        p2won1.scale.setTo(-roundScale,roundScale);
        if(p2win < 1) p2won1.alpha = 0;
        p2won1.position.y = roundUIHeight;
        p2won2 = game.add.sprite(860-5,102,'round_won');
        p2won2.scale.setTo(-roundScale,roundScale);
        p2won2.scale.setTo(roundScale,roundScale);
        p2won2.alpha = 0;
        p2won2.position.y = roundUIHeight;
        p1won1 = game.add.sprite(367+5,102,'round_won');
        p1won1.scale.setTo(roundScale,roundScale);
        p1won1.position.y = roundUIHeight;
        if(p1win < 1) p1won1.alpha = 0;
        p1won2 = game.add.sprite(420+5,102,'round_won');
        p1won2.scale.setTo(roundScale,roundScale);
        p1won2.alpha = 0;
        p1won2.position.y = roundUIHeight;
        
        //UI
        healthBorders = this.game.add.group();
        specialBorders = this.game.add.group();
        this.healthBorderHeight = 67;
        
        healthBorder1 = game.add.sprite(game.width/2 - 395,this.healthBorderHeight,'health_border');
        healthBorder1.anchor.setTo(.5,.5);
        healthBorder1.scale.setTo(-1.01,.998);
        healthBorders.add(healthBorder1);
        
        healthBorder2 = game.add.sprite(game.width/2 + 395,this.healthBorderHeight,'health_border');
        healthBorder2.anchor.setTo(.5,.5);
        healthBorder2.scale.setTo(1.01,.998);
        healthBorders.add(healthBorder2);
        
        specialBorder1 = game.add.sprite(199,127,'special_border');
        specialBorder1.anchor.setTo(.5,.5);
        specialBorder1.scale.setTo(.99,1);
        specialBorders.add(specialBorder1);
        
        specialBorder2 = game.add.sprite(game.world.width - 199,127,'special_border');
        specialBorder2.anchor.setTo(.5,.5);
        specialBorder2.scale.setTo(-.99,1);
        specialBorders.add(specialBorder2);
        
        //AG: Pause
        this.menu = game.add.sprite(game.world.width/2,game.world.height/2,'pause_menu');
        this.menu.anchor.setTo(0.5,0.5);
        this.menu.alpha = 0;
        this.menu.scale.setTo(.8,.8);
		this.control1 = game.add.sprite(38, 110, "controls1_menu");
		this.control1.scale.setTo(.5, .5);
		this.control1.alpha = 0;
		this.control2 = game.add.sprite(825, 110, "controls2_menu");
		this.control2.scale.setTo(.5, .5);
		this.control2.alpha = 0;
        
        charText1 = game.add.text(game.world.width/30, game.world.height/50-5, "", { font: "24px Arial", fill: "#081102", align: "center" });
        charText1.text = player1.charName;
        
        charText2 = game.add.text(29 * (game.world.width/30), game.world.height/50-5, "", { font: "24px Arial", fill: "#081102", align: "center" });
        charText2.text = player2.charName;
        charText2.anchor.setTo(1,0);
        
        simonSpecialSoundPlayed = false;
        scorpSpecialSoundPlayed = false;
    },

	update: function() {        
        if(!game.paused){
           //EVIE: ADD YO SHIT HERE SO IT DISSAPEAR WHEN YOU UNPAUSE AND IT BE GUD GUD
		   this.control1.alpha = 0;
		   this.control2.alpha = 0;
           this.menu.alpha = 0; 
        } 
        
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
			this.control1.alpha = 1;
			this.control2.alpha = 1;
            game.paused = true;
        }
        
        if(padControl1){
            if(pad1.isDown(Phaser.Gamepad.XBOX360_START) && player1.introFinished){
                this.menu.alpha = 1;
				this.control1.alpha = 1;
				this.control2.alpha = 1;
                game.paused = true;
            }
        }
        
        if(padControl2){
            if(pad2.isDown(Phaser.Gamepad.XBOX360_START) && player1.introFinished){
                this.menu.alpha = 1;
				this.control1.alpha = 1;
				this.control2.alpha = 1;
                game.paused = true;
            }
        }
        
        //AG: If a player has won
        if (!player1.alive && !player2.alive && gamerun){
        	gamerun = false;
        	round++;
            deathSound.play();
        }else if(!player1.alive && player2.alive && gamerun ){
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
        
        if(player1.introFinished){
            player1.addToSpecialBar(.0003);
            //player1.addToSpecialBar(1);
            player2.addToSpecialBar(.0003);
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
            //console.log("Bullets1 length: "+bullets2.children.length);
            for(let i=0; i< bullets2.children.length; i++){
                game.physics.arcade.overlap(player1,bullets2.children[i],mainState.SecurityLightAttack, null, this);
            }
            for(let i=0; i< specialBullets2.children.length; i++){
                game.physics.arcade.overlap(player1,specialBullets2.children[i],mainState.SecuritySpecialAttack, null, this);
            }
            //game.physics.arcade.overlap(player1,bullets2,mainState.SecurityLightAttack, null, this);
        }
        if(player1.charName == "SECURITY"){
            //console.log("Bullets2 length: "+bullets1.children.length);
            for(let i=0; i< bullets1.children.length; i++){
                game.physics.arcade.overlap(player2,bullets1.children[i],mainState.SecurityLightAttack, null, this);
            }
            for(let i=0; i< specialBullets1.children.length; i++){
                game.physics.arcade.overlap(player2,specialBullets1.children[i],mainState.SecuritySpecialAttack, null, this);
            }
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

        //simon's heavy NH

        if(player2.charName == "SIMON"){
        	for(let k=0; k< spikes2.children.length; k++){

            	game.physics.arcade.overlap(player1,spikes2.children[k],mainState.SimonHeavy, null, this);
            	
            }
            game.physics.arcade.overlap(player1,iceorbs2,mainState.SimonSpecial, null, this);
        }
        if(player1.charName == "SIMON"){
        	for(let l=0; l< spikes1.children.length; l++){
            	game.physics.arcade.overlap(player2,spikes1.children[l],mainState.SimonHeavy, null, this);
            }
            game.physics.arcade.overlap(player2,iceorbs1,mainState.SimonSpecial, null, this);
        }


        
        //Dive kicks
        if(player1.action.dive){
            game.physics.arcade.overlap(player2,player1,mainState.diveKick, null, this);
        }
        if(player2.action.dive){
            game.physics.arcade.overlap(player1,player2,mainState.diveKick, null, this);
        }

        
        if (player1.body.touching.up && player2.body.touching.down && player1.body.touching.down 
        	&& !player2.action.dive && player1.alive && !player2.action.attacking && !player1.staggered && (player2.position.y < 600)){
        	//player2.body.velocity.y -= 300;
        	if (player2.faceRIGHT){
        		player2.position.x +=50;
        	}else{
        		player2.position.x -=50;
        	}
        	

        }

        if (player2.body.touching.up && player1.body.touching.down && player2.body.touching.down 
        	&& !player1.action.dive && player2.alive && !player1.action.attacking && !player2.staggered && (player1.position.y < 600)){
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
                      player1.heavyChargeSoundPlayed = false;
                      player1.heavyChargeSound.stop();
                      player2.heavyChargeSoundPlayed = false;
                      player2.heavyChargeSound.stop();
                    this.timer.startTimer('endMatch',6000);
                    this.transitionStarted = true;
                }else if((!player1.alive || !player2.alive) && (p1win>=2 || p2win>=2) && this.transitionStarted){
                    if(this.timer.timerDone('endMatch')){
                        game.time.slowMotion = 1;
                        this.game.world.removeAll();
                        main_music.mute = true;
                        deathSound.mute = true;
                        player1.heavyChargeSoundPlayed = false;
                        player1.heavyChargeSound.stop();
                        player2.heavyChargeSoundPlayed = false;
                        player2.heavyChargeSound.stop();
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
                    player1.heavyChargeSoundPlayed = false;
                    player1.heavyChargeSound.stop();
                    player2.heavyChargeSoundPlayed = false;
                    player2.heavyChargeSound.stop();
                    game.state.start('main',false,false,P1CharChosen,P2CharChosen,p1win,p2win,round);
                    }
                }
            }
        }

        game.world.bringToTop(healthBorders);

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
            if(attackingPlayer.charName == "LITERALLY A SCORPION"){
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
                mainState.dashAttack(player,hitbox);
            }
        }else if(attackingPlayer.inSpecial){
        	if(attackingPlayer.charName == "LITERALLY A SCORPION"){
        		attackingPlayer.chainHit = true;
        		mainState.scorpionChain(player,hitbox, attackingPlayer.position.x);
        	}
        }
    },
    
    lightAttack: function(player,hitbox){
        
        

        var attackingPlayer;
        var hitPlayerNum = player.playerNum;

        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }

        if(!player.staggered && !player.action.down){
        	attackingPlayer.addToSpecialBar(5/120);
        }

        mainState.calcKnockBack(35,10,player.playerNum);
        player.takeDamage(5,50);

        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.001, 100);
        }

    },
  
    heavyAttack: function(player,hitbox){
        

        var attackingPlayer;
        var hitPlayerNum = player.playerNum;

        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }

        if(!player.staggered && !player.action.down){
        	attackingPlayer.addToSpecialBar(15/100);
        }

		mainState.calcKnockBack(400,80,player.playerNum);

        player.takeDamage(15,200);

        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.005, 120);
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

    dashAttack: function(player,hitbox){
    	
        var attackingPlayer;
        var hitPlayerNum = player.playerNum;

        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }

        if(!player.staggered && !player.action.down){
        	attackingPlayer.addToSpecialBar(5/120);
        }

        mainState.calcKnockBack(10,10,player.playerNum);
        player.takeDamage(5,200);

        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.001, 100);
        }
    },

    SimonHeavy: function(player,hitbox){

    	var attackingPlayer;
        var hitPlayerNum = player.playerNum;
        
        //AG: Determines out who is attacking
        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }



	    if (!hitbox.justHit){
	    	hitbox.justHit = true;
			mainState.calcKnockBack(100,1000,player.playerNum);

	        player.takeDamage(5,200);
	        this.heavySound.play();
			if(!player.action.down){
        		attackingPlayer.addToSpecialBar(5/120);
        	}
        	if(!player.action.block && !player1.action.down && !player2.action.down){
        		game.camera.shake(0.003, 100);
        	}
	    }

	    
		
    	
    },

    SimonSpecial: function(player, hitbox){
    	mainState.calcKnockBack(50,50,player.playerNum);
        player.takeDamage(20,200);
        player.frozenStun();

        
        if(!simonSpecialSoundPlayed){
            timer.startTimer("orbs",1200);
            simonSpecialSoundPlayed = true;
            this.frozenSound.play();
        }
        
        if(timer.timerDone("orbs")){
            simonSpecialSoundPlayed = false;
        }
        
        if(!player.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.007, 200);
        }

    },
    

    diveKick: function(player,hitbox){
        
        var attackingPlayer;
        var hitPlayerNum = player.playerNum;

        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }

        if(!player.staggered && !player.action.down){
        	attackingPlayer.addToSpecialBar(5/120);
        }

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
        
        if(!scorpSpecialSoundPlayed){
            timer.startTimer("chain",1200);
            scorpSpecialSoundPlayed = true;
            this.chainSound.play();
        }
        
        if(timer.timerDone("chain")){
            scorpSpecialSoundPlayed = false;
        }
        
    	if(!player.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.007, 200);
        }
    },
    
    //--Security's Attacks--//
    
    //Used for when projectile hits another projectile
    projectileClash: function(bullet1,bullet2){
        bullet1.kill();
        bullet2.kill();
        //console.log("bullet1: "+bullet1.position.x+" and bullet 2: "+bullet2.position.x);
        player1.perfect_block_sound.volume = .3;
        player1.perfect_block_sound.play();
        player1.perfect_block_sound.volume = .7;
    },
    
    SecurityLightAttack: function(player,bullet){
        
        //Destroy projectile
        //console.log("Bullets length: "+bullets.children.length);
        bullet.kill();
        
        //Setting up attackingPlayer and hitPlayer for sound
        var attackingPlayer;
        var hitPlayerNum = player.playerNum;
        var hitPlayer = player;
        var stun;
        
        //AG: Determines out who is attacking
        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }
            
        attackingPlayer.attackHit = true;
        
        if(!this.lightSoundPlayed){
            if(hitPlayer.action.block) this.lightSound.volume = this.blockVolume;
            else this.lightSound.volume = this.hitVolume;
            this.lightSound.play();
            this.lightSoundPlayed = true;
            this.timer.startTimer('lightSound',400);
        }
        
        if(hitPlayer.action.block){ //AG: If opponent is blocking
            stun = false;
        }else{
            stun = true;
        }
        //If player is blocking, they won't be stunned
        if(stun) mainState.calcKnockBack(10,10,player.playerNum);
        player.takeDamage(5,100);

        if (!player.action.down){
        	attackingPlayer.addToSpecialBar(5/120);
        }
        
        
    },
    
    SecuritySpecialAttack: function(player,bullet){
        
        //Destroy projectile
        //console.log("Bullets length: "+bullets.children.length);
        bullet.kill();
        
        //Setting up attackingPlayer and hitPlayer for sound
        var attackingPlayer;
        var hitPlayerNum = player.playerNum;
        var hitPlayer = player;
        var stun;
        
        //AG: Determines out who is attacking
        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }
            
        attackingPlayer.attackHit = true;
        
        if(!this.lightSoundPlayed){
            if(hitPlayer.action.block) this.lightSound.volume = this.blockVolume;
            else this.lightSound.volume = this.hitVolume;
            this.lightSound.play();
            this.lightSoundPlayed = true;
            this.timer.startTimer('lightSound',400);
        }
        
        if(hitPlayer.action.block){ //AG: If opponent is blocking
            stun = false;
        }else{
            stun = true;
        }
        //If player is blocking, they won't be stunned
        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
            game.camera.shake(0.008, 600);
            mainState.calcKnockBack(400,400,player.playerNum);
            player.takeDamage(7.5,300);
        }
    },
    
    SecurityHeavyAttack: function(player,hitbox){
        

        var attackingPlayer;
        var hitPlayerNum = player.playerNum;
        
        if(hitPlayerNum == 1){
            attackingPlayer = player2;
        }else{
            attackingPlayer = player1;
        }

        if(!player.staggered && !player.action.down){
        	attackingPlayer.addToSpecialBar(15/100);
        }

		mainState.calcKnockBack(1200,300,player.playerNum);
        player.takeDamage(15,400); 

        if(!player1.action.block && !player2.action.block && !player1.action.down && !player2.action.down){
        	game.camera.shake(0.005, 120);
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
                player1.heavyChargeSoundPlayed = false;
                player1.heavyChargeSound.stop();
                player2.heavyChargeSoundPlayed = false;
                player2.heavyChargeSound.stop(); game.state.start('main',false,false,P1CharChosen,P2CharChosen,p1win,p2win,round);
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.TWO)){
                //RESTART MATCH
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                p1win = 0;
                p2win = 0;
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                player1.heavyChargeSoundPlayed = false;
                player1.heavyChargeSound.stop();
                player2.heavyChargeSoundPlayed = false;
                player2.heavyChargeSound.stop(); game.state.start('main',false,false,P1CharChosen,P2CharChosen,p1win,p2win,round);
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.THREE)){
                //CHARACTER SELECT
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                player1.heavyChargeSoundPlayed = false;
                player1.heavyChargeSound.stop();
                player2.heavyChargeSoundPlayed = false;
                player2.heavyChargeSound.stop();
                game.state.start('charSelect');
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.FOUR)){
                //CONTROLS
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                player1.heavyChargeSoundPlayed = false;
                player1.heavyChargeSound.stop();
                player2.heavyChargeSoundPlayed = false;
                player2.heavyChargeSound.stop();
                game.state.start('controls');
            }else if(game.input.keyboard.isDown(Phaser.KeyCode.FIVE)){
                //MAIN MENU
                game.time.slowMotion = 1;
                this.game.world.removeAll();
                game.paused = false;
                main_music.mute = true;
                deathSound.mute = true;
                player1.heavyChargeSoundPlayed = false;
                player1.heavyChargeSound.stop();
                player2.heavyChargeSoundPlayed = false;
                player2.heavyChargeSound.stop();
                game.state.start('title',false,false);
            } 
        }
    }
    
};


