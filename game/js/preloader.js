var preloader = {
	preload: function(){
		game.load.spritesheet('player','assets/img/dude.png', 32, 48);
		//insert assets to load here NH
	},

	create: function(){
		game.state.start('main');
	}

};