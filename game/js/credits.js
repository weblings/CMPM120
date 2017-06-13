var creditState = {

	preload: function(){
		
 		//Controllers
        var pad1;
        var pad2;
        var padControl1;
        var padControl2;

        var pressB;

	},

	create: function(){

		game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;

		game.state.disableVisibilityChange = true;

		game.stage.backgroundColor = '#000';

		var textStyle = { font: '40px', fill: '#facade'};
		var artist = game.add.text(game.world.centerX-400, game.world.centerY-200, 'Artists:', textStyle);
		var evie = game.add.text(game.world.centerX-300, game.world.centerY-150, 'Evie Chang', textStyle);
		var nikki = game.add.text(game.world.centerX-300, game.world.centerY-100, 'Nikki Wilkinson', textStyle);

		var programmer = game.add.text(game.world.centerX+50, game.world.centerY-200, 'Programmers:', textStyle);
		var andrew = game.add.text(game.world.centerX+150, game.world.centerY-150, 'Andrew Gwinner', textStyle);
		var nick = game.add.text(game.world.centerX+150, game.world.centerY-100, 'Nicholas Ho', textStyle);

		var music = game.add.text(game.world.centerX-400, game.world.centerY+50, 'Music by:', textStyle);
		var kevin = game.add.text(game.world.centerX-300, game.world.centerY+100, 'Kevin MacLeod', textStyle);

		var special = game.add.text(game.world.centerX+50, game.world.centerY+50, 'Special thanks to:', textStyle);
		var nathan = game.add.text(game.world.centerX+150, game.world.centerY+100, 'Nathan Altice', textStyle);
		var robin = game.add.text(game.world.centerX+150, game.world.centerY+150, 'Robin Hunicke', textStyle);

		var back = game.add.text(950, 650, 'Press ESC to go back', textStyle);

        pressB = Phaser.Keyboard.B;
	},

	update: function(){


        if(game.input.keyboard.justPressed(pressB)){
            game.state.start('title');
        }


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
        	if(pad1.isDown(Phaser.Gamepad.XBOX360_B)){
        		game.state.start('title');
        	}
        }

        if(padControl2){
        	if(pad2.isDown(Phaser.Gamepad.XBOX360_B)){
        		game.state.start('title');
        	}
        }

	}
}