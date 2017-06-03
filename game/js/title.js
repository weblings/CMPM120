var titleState = function(){};

titleState.prototype = {

	create: function(){
		//add logo
		var logo = game.add.sprite(640,0,'logo');
		logo.anchor.x = 0.5;
		game.state.disableVisibilityChange = true; //prevent pausing on this screen

		//add route to character select by clicking on "play" text; input enabled for mouse
		var playText = game.add.text(game.world.centerX, game.world.centerY, "P L A Y", {fontSize: '40px', fill: '#1a4064'});
		playText.anchor.setTo(0.5);
		playText.inputEnabled = true;
		playText.events.onInputUp.add(function(){
			game.state.start('charSelect');
		});
		playText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		playText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});


		//add route to controls page
		var controlText = game.add.text(game.world.centerX, game.world.centerY+100, "C O N T R O L S", {fontSize: '40px', fill: '#1a4064'});
		controlText.anchor.setTo(0.5);
		controlText.inputEnabled = true;
		controlText.events.onInputUp.add(function(){
			game.state.start('controls');
		});
		controlText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		controlText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});

		//add route to credits page
		var creditText = game.add.text(game.world.centerX, game.world.centerY+200, "C R E D I T S", {fontSize: '40px', fill: '#1a4064'});
		creditText.anchor.setTo(0.5);
		creditText.inputEnabled = true;
		creditText.events.onInputUp.add(function(){
			game.state.start('credits');
		});
		creditText.events.onInputOver.add(function(target){
			target.fill = '#ff0d00';
		});
		creditText.events.onInputOut.add(function(target){
			target.fill = '#1a4064';
		});

	},

}