
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
		game.load.image('scorp_ID','assets/img/Scorpion_Passport.png');
		game.load.image('rabbit_ID','assets/img/Rabbit_Passport.png');
		game.load.image('guard_ID','assets/img/SecurityGuard_Passport.png');
		game.load.image('control1','assets/img/controls1.png');
		game.load.image('control2','assets/img/controls.png');
        game.load.image('pause_menu','assets/img/menu_bg_temp.png');
        game.load.image('round_unresolved','assets/img/round_unresolved.png');
        game.load.image('round_won','assets/img/round_won.png');
		game.load.image('arrow','assets/img/Arrow.png');
		game.load.image('selectBox','assets/img/selectBox.png');
		game.load.image('selectBox2','assets/img/selectBox2.png');
        
        //Xbox
        game.load.image('controller','assets/img/controller.png');
        game.load.image('A','assets/img/Xbox_Controls/A_Button.png');
        game.load.image('B','assets/img/Xbox_Controls/B_Button.png');
        game.load.image('Y','assets/img/Xbox_Controls/Y_Button.png');
        game.load.image('X','assets/img/Xbox_Controls/X_Button.png');
        game.load.image('Joystick_Left','assets/img/Xbox_Controls/Joystick_Left.png');
        game.load.image('Joystick_Right','assets/img/Xbox_Controls/Joystick_Right.png');
        game.load.image('Joystick_Up','assets/img/Xbox_Controls/Joystick_Up.png');
        game.load.image('Joystick_Down','assets/img/Xbox_Controls/Joystick_Down.png');


        //simon
        game.load.atlas('rabbit_atlas','assets/img/simon/spritesheet.png','assets/img/simon/sprites.json');
        game.load.atlas('rabbit_atlas2','assets/img/simon/alt/spritesheet.png','assets/img/simon/sprites.json');
        game.load.image('rabbit_blood','assets/img/simon/FrozenRabbit_blood.png');


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
        game.load.atlas('scorpion_chain', 'assets/img/Scorpion/scorpion_chain.png','assets/img/Scorpion/chain.json');
        game.load.atlas('scorpion_atlas2', 'assets/img/Scorpion/alt/spritesheet.png','assets/img/Scorpion/sprites.json');
        game.load.image('scorpion_blood','assets/img/Scorpion/Scorpion_blood.png');
        game.load.image('scorpion_curse','assets/img/Scorpion/Scorpion_curse.png');

		//insert assets to load here NH
        
        //Security
        game.load.atlas('security_atlas', 'assets/img/Security/security_spritesheet.png','assets/img/Security/security_spritesheet.json');
        game.load.atlas('security_atlas2','assets/img/Security/security_alt_spritesheet.png','assets/img/Security/security_alt_spritesheet.json');
        game.load.image('security_blood','assets/img/Security/securityguard_blood.png');
        
        //audio 
        game.load.audio('jump_sound', ['assets/audio/jump.mp3','assets/audio/jump.ogg']); 
        game.load.audio('light',['assets/audio/hit8.mp3','assets/audio/hit8.ogg']);
        game.load.audio('heavy',['assets/audio/hit18.mp3','assets/audio/hit18.ogg']);
        game.load.audio('dive',['assets/audio/hit9.mp3','assets/audio/hit9.ogg']);
        game.load.audio('block',['assets/audio/hit2.mp3','assets/audio/hit2.ogg']);
        game.load.audio('heavy_charge',['assets/audio/heavy_charge.mp3','assets/audio/heavy_charge.ogg']);
        game.load.audio('perfect_block',['assets/audio/block.mp3','assets/audio/block.ogg']);
        game.load.audio('throw',['assets/audio/throw.mp3','assets/audio/throw.ogg']);
        
        //music
        game.load.audio('local_forecast',['assets/audio/Local_Forecast.mp3','assets/audio/Local_Forecast.ogg']);
        game.load.audio('exit_the_premises',['assets/audio/Exit_the_Premises.mp3','assets/audio/Exit_the_Premises.ogg']);
        game.load.audio('ouroboros',['assets/audio/Ouroboros.mp3','assets/audio/Ouroboros.ogg']);
        game.load.audio('kick_shock',['assets/audio/Kick_Shock.mp3','assets/audio/Kick_Shock.ogg']);
        game.load.audio('ultra_polka',['assets/audio/Ultra_Polka.mp3','assets/audio/Ultra_Polka.ogg']);
        game.load.audio('pariasian',['assets/audio/Parisian.mp3','assets/audio/Parisian.ogg']);
        game.load.audio('shoegazer',['assets/audio/Shoegazer.mp3','assets/audio/Shoegazer.ogg']);

	},

	create: function(){
		//game.state.start('main');
        game.state.start('charSelect');
	}

};