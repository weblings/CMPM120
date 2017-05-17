
var preloaderState = {
	
	preload: function(){
		game.load.spritesheet('player','assets/img/dude.png', 32, 48);
		game.load.image('fist', 'assets/img/fist.jpg');
		game.load.image('hitbox', 'assets/img/hitbox.png');
		game.load.image('bg', 'assets/img/bg.png');
        game.load.image('health_full','assets/img/health_full.png');
        game.load.image('health_empty','assets/img/health_empty.png');
        game.load.image('health_damage','assets/img/health_damage.png');
        
        //Scorpion
        game.load.image('scorpion_idle','assets/img/Scorpion/Scorpion_Idle.png');
        game.load.image('scorpion_crouch','assets/img/Scorpion/Scorpion_crouch.png');
        game.load.image('scorpion_jump','assets/img/Scorpion/Scorpion_Jump.png');
        game.load.image('scorpion_A','assets/img/Scorpion/Scorpion_LightAttack.png');
		//insert assets to load here NH
	},

	create: function(){
		//game.state.start('main');
        game.state.start('charSelect');
	}

};