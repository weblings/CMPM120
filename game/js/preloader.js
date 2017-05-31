
var preloaderState = {
	
	preload: function(){
		game.load.spritesheet('player','assets/img/dude.png', 32, 48);
		game.load.image('fist', 'assets/img/fist.jpg');
		game.load.image('hitbox', 'assets/img/hitbox.png');
		game.load.image('bg', 'assets/img/bg.png');
        game.load.image('health_full','assets/img/health_full.png');
        game.load.image('health_empty','assets/img/health_empty.png');
        game.load.image('health_damage','assets/img/health_damage.png');
        game.load.image('logo','assets/img/Logo.png');
        
        //Scorpion
        /*
        game.load.image('scorpion_idle','assets/img/Scorpion/Scorpion_Idle.png');
        game.load.image('scorpion_crouch','assets/img/Scorpion/Scorpion_crouch.png');
        game.load.image('scorpion_jump','assets/img/Scorpion/Scorpion_Jump.png');
        game.load.image('scorpion_A','assets/img/Scorpion/Scorpion_LightAttack.png');
        game.load.image('scorpion_B1','assets/img/Scorpion/Scorpion_HeavyAttackCharge.png');
        game.load.image('scorpion_B2','assets/img/Scorpion/Scorpion_HeavyAttack.png');
        game.load.image('scorpion_down','assets/img/Scorpion/Scorpion_Down.png');
        game.load.image('scorpion_stagger','assets/img/Scorpion/Scorpion_stagger.png');
        //game.load.image('scorpion_walk1','assets/img/Scorpion/Scorpion_walk_1.png');
        //game.load.image('scorpion_walk2','assets/img/Scorpion/Scorpion_walk_2.png');
        game.load.spritesheet('scorp_walk','assets/img/Scorpion/scorp_walk.png', 741, 660);
        */
        //changes needed: divekick, jump, heavyattack
        game.load.atlas('scorpion_atlas', 'assets/img/Scorpion/spritesheet.png','assets/img/Scorpion/sprites.json');

		//insert assets to load here NH
        
        //Security
        game.load.atlas('security_atlas', 'assets/img/Security/security_spritesheet.png','assets/img/Security/security_spritesheet.json');

        //audio 
        game.load.audio('jump_sound', ['assets/audio/jump.wav']);
        
        //Sound
        game.load.audio('light','assets/audio/hit8.ogg');
        game.load.audio('heavy','assets/audio/hit9.ogg')
        
	},

	create: function(){
		//game.state.start('main');
        game.state.start('charSelect');
	}

};