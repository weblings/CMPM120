
var preloaderState = {
	
	preload: function(){
		
		//Loading text stuff
		this.loadingState = 0;
        this.loadingText =  game.add.text(game.world.centerX, game.world.centerY - game.world.centerY/3, "LOADING", { font: "32px Arial", fill: "#fff", align: "left" });
        this.loadingText.anchor.set(0.5);
        var loadingTween = game.time.events.loop(500,function(){
        	if(this.loadingState <= 2){
	    		this.loadingText.text+=' .';
	    		this.loadingState++;
	    	}else{
	    		this.loadingText.text='Loading';
	    		this.loadingState = 0;
	    	}
        },this);
        
		//Pack.json
		this.load.pack('Atlases', 'assets/pack.json');

		//Old code ----------------------------------------------------------
		game.load.script('Fire', 'js/Fire.js');
        
        //simon
        game.load.atlas('rabbit_atlas','assets/img/simon/spritesheet.png','assets/img/simon/sprites.json');
        game.load.atlas('rabbit_atlas2','assets/img/simon/alt/spritesheet.png','assets/img/simon/alt/sprites.json');

        //Scorpion   changes needed: divekick, jump, heavyattack
        game.load.atlas('scorpion_atlas', 'assets/img/Scorpion/spritesheet.png','assets/img/Scorpion/sprites.json');
        game.load.atlas('scorpion_chain', 'assets/img/Scorpion/scorpion_chain.png','assets/img/Scorpion/chain.json');
        game.load.atlas('scorpion_atlas2', 'assets/img/Scorpion/alt/spritesheet.png','assets/img/Scorpion/sprites.json');
        
        //Security
        game.load.atlas('security_atlas', 'assets/img/Security/security_spritesheet.png','assets/img/Security/security_spritesheet.json');
        game.load.atlas('security_atlas2','assets/img/Security/security_alt_spritesheet.png','assets/img/Security/security_alt_spritesheet.json');

        //Parisian
        game.load.atlas('scorpion_atlasP', 'assets/img/Scorpion/scorpion_spritesheet_parisian.png','assets/img/Scorpion/sprites.json');
        game.load.atlas('scorpion_atlas2P', 'assets/img/Scorpion/alt/Scorpion_alt_spritesheet_parisian.png','assets/img/Scorpion/sprites.json');
        game.load.atlas('security_atlasP', 'assets/img/Security/security_spritesheet_Parisian.png','assets/img/Security/security_spritesheet.json');
        game.load.atlas('security_atlas2P','assets/img/Security/security_alt_spritesheet_parisian.png','assets/img/Security/security_alt_spritesheet.json');
        game.load.atlas('rabbit_atlasP','assets/img/simon/spritesheet_parisian.png','assets/img/simon/sprites.json');
        game.load.atlas('rabbit_atlas2P','assets/img/simon/alt/spritesheet_parisian.png','assets/img/simon/alt/sprites.json');
        
        
        //audio 
        game.load.audio('jump_sound', ['assets/audio/jump.mp3']); 
        game.load.audio('light',['assets/audio/hit8.mp3']);
        game.load.audio('heavy',['assets/audio/hit18.mp3']);
        game.load.audio('dive',['assets/audio/hit9.mp3']);
        game.load.audio('block',['assets/audio/hit2.mp3']);
        game.load.audio('heavy_charge',['assets/audio/heavy_charge.mp3']);
        game.load.audio('perfect_block',['assets/audio/block.mp3']);
        game.load.audio('throw',['assets/audio/throw.mp3']);
        game.load.audio('super',['assets/audio/Steel_Rods.mp3']);
        game.load.audio('select',['assets/audio/select.mp3']);
        game.load.audio('deselect',['assets/audio/deselect.mp3']);
        game.load.audio('frozen',['assets/audio/frozen.mp3']);
        game.load.audio('chain_hit',['assets/audio/ScorpSpecial.mp3']);

        
        //music
        game.load.audio('local_forecast',['assets/audio/Local_Forecast.mp3']);
        game.load.audio('exit_the_premises',['assets/audio/Exit_the_Premises.mp3']);
        game.load.audio('ouroboros',['assets/audio/Ouroboros.mp3']);
        game.load.audio('kick_shock',['assets/audio/Kick_Shock.mp3']);
        game.load.audio('ultra_polka',['assets/audio/Ultra_Polka.mp3']);
        game.load.audio('parisian',['assets/audio/Parisian.mp3']);
        game.load.audio('shoegazer',['assets/audio/Shoegazer.mp3']);
        game.load.audio('patriotism',['assets/audio/Patriotism.mp3']);
        
	},

	create: function(){
		//game.state.start('main');
                //game.state.start('charSelect');
                game.state.start('title');
	},

};