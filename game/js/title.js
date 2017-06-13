var titleState = function(){};

titleState.prototype = {

	preload: function(){
		
        //keyboard
        var P1keyUp;
        var P1keyDown;
        var P1Chose;

 		//Controllers
        var pad1;
        var pad2;
        var padControl1;
        var padControl2; 

        var timer;
        
        //AG: Adding bg for Sammys
        var bg;
        var plane;

        var button1;
        var button2;
        var button3;
        var arrow1;
        var arrow2;
        var arrow3;
        
        var padControls1Shown;
        var padControls2Shown;

	},

	create: function(){
        //AG: Adding bg for Sammys
		/*bg_GC = game.add.sprite(0,-30,'CharBG_GC');
		bg_GC.scale.setTo(1, .8);*/

        bg = game.add.sprite(0, 0, 'sky');
        this.clouds = game.add.tileSprite(0, 0, 1280, 720, 'clouds');
        plane = game.add.sprite(0, 0, 'plane');

        P1keyUp = Phaser.Keyboard.W;
        P1keyDown = Phaser.Keyboard.S;
        P1Chose = Phaser.Keyboard.ENTER
        
        main_music = game.add.audio('parisian');
        //solution for looping bug from http://www.html5gamedevs.com/topic/13947-audio-not-looping-in-chrome/
        main_music.play('',0, 1, true);
        //main_music.onLoop.add(playMainMusic, this);       
        main_music.mute = false;  
        main_music.loop = true;
        main_music.volume = 0.7;
        
        
		game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;

        timer = new setTime();

		//temporary bg for readability
		//game.stage.backgroundColor = '#827b7c';

		//add logo
		//var logo = game.add.sprite(640, 50, 'logo');
		//logo.anchor.x = 0.5;
		game.state.disableVisibilityChange = true; //prevent pausing on this screen

		//add route to character select by clicking on "play" text; input enabled for mouse
		var playText = game.add.text(100, game.world.centerY-100, "P L A Y", {fontSize: '40px', fill: '#fff'});
		/*playText.inputEnabled = true;
		//mouse input
		playText.events.onInputUp.add(function(){
			game.state.start('charSelect');
		});
		playText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		playText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});*/


		//add route to controls page
		var controlText = game.add.text(100, game.world.centerY, "C O N T R O L S", {fontSize: '40px', fill: '#fff'});
		/*controlText.inputEnabled = true;
		controlText.events.onInputUp.add(function(){
			game.state.start('controls');
		});
		controlText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		controlText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});*/


		//add route to credits page
		var creditText = game.add.text(100, game.world.centerY+100, "C R E D I T S", {fontSize: '40px', fill: '#fff'});
		/*creditText.inputEnabled = true;
		creditText.events.onInputUp.add(function(){
			game.state.start('credits');
		});
		creditText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		creditText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});*/


        padControls1Shown = false;
        padControls2Shown = false;

        onPlay = true;
        onControls = false;
        onCredits = false;


        button1 = game.add.sprite(50, game.world.centerY-75, 'A');
        button1.anchor.setTo(0.5, 0.5);
        button1.scale.setTo(0.1);
        button1.alpha = 0;

        button2 = game.add.sprite(50, game.world.centerY+25, 'A');
        button2.anchor.setTo(0.5, 0.5);
        button2.scale.setTo(0.1);
        button2.alpha = 0;

        button3 = game.add.sprite(50, game.world.centerY+125, 'A');
        button3.anchor.setTo(0.5, 0.5);
        button3.scale.setTo(0.1);
        button3.alpha = 0;

        arrow1 = game.add.sprite(70, game.world.centerY-75, 'arrow');
        arrow1.anchor.setTo(0.5, 0.5);
        arrow1.scale.setTo(0.15);
        arrow1.angle += 90;
        arrow1.tint = '#000'
        arrow1.alpha = 1;

        arrow2 = game.add.sprite(70, game.world.centerY+25, 'arrow');
        arrow2.anchor.setTo(0.5, 0.5);
        arrow2.scale.setTo(0.15);
        arrow2.angle += 90;
        arrow2.tint = '#000'
        arrow2.alpha = 0;

        arrow3 = game.add.sprite(70, game.world.centerY+125, 'arrow');
        arrow3.anchor.setTo(0.5, 0.5);
        arrow3.scale.setTo(0.15);
        arrow3.angle += 90;
        arrow3.tint = '#000'
        arrow3.alpha = 0;
        

	},

	update: function(){

        /*this.clouds.tilePosition.x += 0.4;

        //keyboard input
        if(game.input.keyboard.justPressed(P1keyUp) && timer.timerDone('selectLock1') && onControls && !onPlay && !onCredits){
            timer.startTimer('selectLock1',200);
            //console.log("you are on play");
            arrow1.alpha = 1;
            arrow2.alpha = 0;
            arrow3.alpha = 0;
            onControls = false;
            onPlay = true;
            onCredits = false;
        }
        if(game.input.keyboard.justPressed(P1keyDown) && timer.timerDone('selectLock1') && onPlay && !onControls && !onCredits){
            timer.startTimer('selectLock1',200);
            //console.log("you are on Controls");
            arrow1.alpha = 0;
            arrow2.alpha = 1;
            arrow3.alpha = 0;
            onControls = true;
            onPlay = false;
            onCredits = false;
        }
		if(game.input.keyboard.justPressed(P1keyDown) && timer.timerDone('selectLock1') && !onPlay && onControls && !onCredits){
            timer.startTimer('selectLock1',200);
            //console.log("you are on Credits");
            arrow1.alpha = 0;
            arrow2.alpha = 0;
            arrow3.alpha = 1;
            onControls = false;
            onPlay = false;
            onCredits = true;
        }
        if(game.input.keyboard.justPressed(P1keyUp) && timer.timerDone('selectLock1') && !onControls && !onPlay && onCredits){
            timer.startTimer('selectLock1',200);
            //console.log("you are on play");
            arrow1.alpha = 0;
            arrow2.alpha = 1;
            arrow3.alpha = 0;
            onControls = true;
            onPlay = false;
            onCredits = false;
        }

        //go to appropriate states
        if(game.input.keyboard.justPressed(P1Chose) && onPlay && !onControls && !onCredits){
            main_music.mute = true;
            game.state.start('charSelect');
        }
        if(game.input.keyboard.justPressed(P1Chose) && !onPlay && onControls && !onCredits){
            game.state.start('altControls');
        }
        if(game.input.keyboard.justPressed(P1Chose) && !onPlay && !onControls && onCredits){
                //console.log("you pressed A");
                game.state.start('credits');
        }*/


        //controller
        if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected){
            //console.log("connected");
            padControl1 = true;
        }
        else{
        	//console.log("not connected");
            padControl1 = false;
        }

        if (game.input.gamepad.supported && game.input.gamepad.active && pad2.connected){
            padControl2 = true;
        }
        else{
            padControl2 = false;
        }


        //controller one input
        if(padControl1){

            if(!padControls1Shown){
                button1.alpha = 1;
                button2.alpha = 0;
                button3.alpha = 0;
                arrow1.alpha = 0;
                padControls1Shown = true;                
            }


       		//move button up
       	    if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && timer.timerDone('selectLock1') && onControls && !onPlay && !onCredits){
        		timer.startTimer('selectLock1',200);
        		console.log("P1: you are on Play");
                button1.alpha = 1;
                button2.alpha = 0;
                button3.alpha = 0;
                onPlay = true;
                onControls = false;
                onCredits = false;
        	}


			if(pad1.isDown(Phaser.Gamepad.XBOX360_A) && onPlay && !onControls && !onCredits){ //change back to A later
                //console.log("you pressed A");
                main_music.mute = true;
                game.state.start('charSelect');
            }
           

            //move button down
        	if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && timer.timerDone('selectLock1') && onPlay && !onControls && !onCredits){
        		timer.startTimer('selectLock1',200);
        		console.log("P1: you are on Controls (1)");
                button1.alpha = 0;
                button2.alpha = 1;
                button3.alpha = 0;
                onControls = true;
                onPlay = false;
                onCredits = false;
        	}

            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && timer.timerDone('selectLock1') && !onPlay && !onControls && onCredits){
                timer.startTimer('selectLock1',200);
                console.log("P2: you are on Controls (2)");
                button1.alpha = 0;
                button2.alpha = 1;
                button3.alpha = 0;
                onControls = true;
                onPlay = false;
                onCredits = false;
            }

        	if (pad1.isDown(Phaser.Gamepad.XBOX360_A) && onControls && !onPlay && !onCredits){ //change back to A later
        		//console.log("you pressed A");
                game.state.start('altControls');
        	}

            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && timer.timerDone('selectLock1') && onControls && !onPlay && !onCredits){
                timer.startTimer('selectLock1',200);
                console.log("P1: you are on Credits");
                button1.alpha = 0;
                button2.alpha = 0;
                button3.alpha = 1;
                onControls = false;
                onPlay = false;
                onCredits = true;
            }

            if(pad1.isDown(Phaser.Gamepad.XBOX360_A) && !onPlay && !onControls && onCredits){
                //console.log("you pressed A");
                game.state.start('credits');
            }
        }

        //controller 2 input
        if(padControl2){

            if(!padControls2Shown){
                button1.alpha = 1;
                button2.alpha = 0;
                button3.alpha = 0;
                arrow1.alpha = 0;
                padControls2Shown = true;                
            }


            //move button up
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && timer.timerDone('selectLock2') && onControls && !onPlay && !onCredits){
                timer.startTimer('selectLock2',200);
                console.log("P2: you are on Play");
                button1.alpha = 1;
                button2.alpha = 0;
                button3.alpha = 0;
                onPlay = true;
                onControls = false;
                onCredits = false;
            }


            if(pad2.isDown(Phaser.Gamepad.XBOX360_A) && onPlay && !onControls && !onCredits){ //change back to A later
                //console.log("you pressed A");
                main_music.mute = true;
                game.state.start('charSelect');
            }
           

            //move button down
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && timer.timerDone('selectLock2') && onPlay && !onControls && !onCredits){
                timer.startTimer('selectLock2',200);
                console.log("P2: you are on Controls (1)");
                button1.alpha = 0;
                button2.alpha = 1;
                button3.alpha = 0;
                onControls = true;
                onPlay = false;
                onCredits = false;
            }

            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && timer.timerDone('selectLock2') && !onPlay && !onControls && onCredits){
                timer.startTimer('selectLock2',200);
                console.log("P2: you are on Controls (2)");
                button1.alpha = 0;
                button2.alpha = 1;
                button3.alpha = 0;
                onControls = true;
                onPlay = false;
                onCredits = false;
            }

            if (pad2.isDown(Phaser.Gamepad.XBOX360_A) && onControls && !onPlay && !onCredits){ //change back to A later
                //console.log("you pressed A");
                game.state.start('controls');
            }

            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && timer.timerDone('selectLock2') && onControls && !onPlay && !onCredits){
                timer.startTimer('selectLock2',200);
                console.log("P2: you are on Credits");
                button1.alpha = 0;
                button2.alpha = 0;
                button3.alpha = 1;
                onControls = false;
                onPlay = false;
                onCredits = true;
            }

            if(pad2.isDown(Phaser.Gamepad.XBOX360_A) && !onPlay && !onControls && onCredits){
                console.log("you pressed A");
                game.state.start('credits');
            }
        }
        
        if(!padControl1 && !padControl2){
            this.clouds.tilePosition.x += 0.4;

            //keyboard input
            if(game.input.keyboard.justPressed(P1keyUp) && timer.timerDone('selectLock1') && onControls && !onPlay && !onCredits){
                timer.startTimer('selectLock1',200);
                //console.log("you are on play");
                arrow1.alpha = 1;
                arrow2.alpha = 0;
                arrow3.alpha = 0;
                onControls = false;
                onPlay = true;
                onCredits = false;
            }
            if(game.input.keyboard.justPressed(P1keyDown) && timer.timerDone('selectLock1') && onPlay && !onControls && !onCredits){
                timer.startTimer('selectLock1',200);
                //console.log("you are on Controls");
                arrow1.alpha = 0;
                arrow2.alpha = 1;
                arrow3.alpha = 0;
                onControls = true;
                onPlay = false;
                onCredits = false;
            }
            if(game.input.keyboard.justPressed(P1keyDown) && timer.timerDone('selectLock1') && !onPlay && onControls && !onCredits){
                timer.startTimer('selectLock1',200);
                //console.log("you are on Credits");
                arrow1.alpha = 0;
                arrow2.alpha = 0;
                arrow3.alpha = 1;
                onControls = false;
                onPlay = false;
                onCredits = true;
            }
            if(game.input.keyboard.justPressed(P1keyUp) && timer.timerDone('selectLock1') && !onControls && !onPlay && onCredits){
                timer.startTimer('selectLock1',200);
                //console.log("you are on play");
                arrow1.alpha = 0;
                arrow2.alpha = 1;
                arrow3.alpha = 0;
                onControls = true;
                onPlay = false;
                onCredits = false;
            }

            //go to appropriate states
            if(game.input.keyboard.justPressed(P1Chose) && onPlay && !onControls && !onCredits){
                main_music.mute = true;
                game.state.start('charSelect');
            }
            if(game.input.keyboard.justPressed(P1Chose) && !onPlay && onControls && !onCredits){
                game.state.start('altControls');
            }
            if(game.input.keyboard.justPressed(P1Chose) && !onPlay && !onControls && onCredits){
                    //console.log("you pressed A");
                    game.state.start('credits');
            }
        }

	}

}