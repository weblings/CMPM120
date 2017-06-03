var titleState = function(){};

titleState.prototype = {

	preload: function(){
		
 		//Controllers
        var pad1;
        var pad2;
        var padControl1;
        var padControl2; 

        var timer;
        var beta = false; //keep track of where A button registers

	},

	create: function(){

		game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;

        timer = new setTime();

		//temporary bg for readability
		game.stage.backgroundColor = '#827b7c';

		//add logo
		//var logo = game.add.sprite(640, 50, 'logo');
		//logo.anchor.x = 0.5;
		game.state.disableVisibilityChange = true; //prevent pausing on this screen

		//add route to character select by clicking on "play" text; input enabled for mouse
		var playText = game.add.text(game.world.centerX-100, game.world.centerY-100, "P L A Y", {fontSize: '50px', fill: '#1a4064'});
		playText.inputEnabled = true;
		//mouse input
		/*playText.events.onInputUp.add(function(){
			game.state.start('charSelect');
		});
		playText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		playText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});*/


		//add route to controls page
		var controlText = game.add.text(game.world.centerX-100, game.world.centerY, "C O N T R O L S", {fontSize: '50px', fill: '#1a4064'});
		controlText.inputEnabled = true;
		/*controlText.events.onInputUp.add(function(){
			game.state.start('controls');
		});
		controlText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		controlText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});*/


		//add route to credits page
		/*var creditText = game.add.text(game.world.centerX, game.world.centerY+200, "C R E D I T S", {fontSize: '40px', fill: '#1a4064'});
		creditText.inputEnabled = true;
		creditText.events.onInputUp.add(function(){
			game.state.start('credits');
		});
		creditText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		creditText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});*/


	},

	update: function(){

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

       if(padControl1){

       		//move button up
       	    //if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && timer.timerDone('selectLock1')){
        	//	timer.startTimer('selectLock1',100);
        		//console.log("you moved up");
        		var button1 = game.add.sprite(game.world.centerX-150, game.world.centerY-75, 'X');
				button1.anchor.setTo(0.5, 0.5);
				button1.scale.setTo(0.1);
        	//	beta = false;
        	//}


			if(pad1.isDown(Phaser.Gamepad.XBOX360_X) /*&& !beta*/){ //change back to A later
                //console.log("you pressed A");
                game.state.start('charSelect');
            }

            //move button down
        	//if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && timer.timerDone('selectLock1')){
        	//	timer.startTimer('selectLock1',100);
        		//console.log("you moved down");
        		var button2 = game.add.sprite(game.world.centerX-150, game.world.centerY+25, 'Y');
        		button2.anchor.setTo(0.5, 0.5);
        		button2.scale.setTo(0.1);
        		//beta = true;
        	//}

        	if (pad1.isDown(Phaser.Gamepad.XBOX360_Y) /*&& beta*/){ //change back to A later
        		game.state.start('controls');
        	}

        }

        if(padControl2){

       		//move button up
       	    //if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && timer.timerDone('selectLock1')){
        	//	timer.startTimer('selectLock1',100);
        		//console.log("you moved up");
        		var button1 = game.add.sprite(game.world.centerX-50, game.world.centerY+25, 'X');
				button1.anchor.setTo(0.5, 0.5);
				button1.scale.setTo(0.1);
        	//	beta = false;
        	//}


			if(pad2.isDown(Phaser.Gamepad.XBOX360_X) /*&& !beta*/){ //change back to A later
                //console.log("you pressed A");
                game.state.start('charSelect');
            }

            //move button down
        	//if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && timer.timerDone('selectLock1')){
        	//	timer.startTimer('selectLock1',100);
        		//console.log("you moved down");
        		var button2 = game.add.sprite(game.world.centerX-50, game.world.centerY+125, 'Y');
        		button2.anchor.setTo(0.5, 0.5);
        		button2.scale.setTo(0.1);
        		//beta = true;
        	//}

        	if (pad2.isDown(Phaser.Gamepad.XBOX360_Y) /*&& beta*/){ //change back to A later
        		game.state.start('controls');
        	}

        }

	}

}