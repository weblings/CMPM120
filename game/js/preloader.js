
var preloaderState = {
	
	preload: function(){
		game.load.spritesheet('player','assets/img/dude.png', 32, 48);
		game.load.image('fist', 'assets/img/fist.jpg');
		//insert assets to load here NH
	},

	create: function(){
		game.state.start('main');
	}

};