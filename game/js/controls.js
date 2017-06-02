var controlState = {

    
    create: function(){
       var controls1 = game.add.sprite(105,60,"control1");
	   controls1.scale.setTo(.75,.75);
	   controls1.alpha = 0;
	   var controls2 = game.add.sprite(80,50,"control2")
	   
	   var controls1_2 = game.add.sprite(755,60,"control1");
	   controls1_2.scale.setTo(.75,.75);
	   controls1_2.alpha = 0;
	   var controls2_2 = game.add.sprite(730,50,"control2");
	   
	   sprites = [controls1, controls2];
	   sprites2 = [controls1_2, controls2_2];
	   
	   preset1_1 = ['W', 'A', 'S', 'D', 'E', 'Q'];
	   preset1_2 = ['W', 'A', 'S', 'D', 'E', 'R'];
	   
	   preset2_1 = ['O', 'K', 'L', 'COLON', 'I', 'U'];
	   preset2_2 = ['O', 'K', 'L', 'COLON', 'I', 'P'];
	   
	   
	    P1keyUp = Phaser.Keyboard.W;
        P1keyDown = Phaser.Keyboard.S;
        P1keyA = Phaser.Keyboard.E;
        P1keyB = Phaser.Keyboard.R;
        P1index = 0;
        P1Chose = false;
        
        P2keyUp = Phaser.Keyboard.O;
        P2keyDown = Phaser.Keyboard.L;
        P2keyA = Phaser.Keyboard.I;//Phaser.Keyboard.OPEN_BRACKET;
        P2keyB = Phaser.Keyboard.U;//Phaser.Keyboard.CLOSED_BRACKET;
        P2index = 0;
        P2Chose = false;
		
		P1 = game.add.text(145, 365,"PLAYER 1", {fontSize: '35px', fill: '#fff'});
		P1Jump = game.add.text(50, 415,"JUMP: ", {fontSize: '32px', fill: '#fff'});
		P1Left = game.add.text(50, 460,"LEFT: ", {fontSize: '32px', fill: '#fff'});
		P1Right = game.add.text(50, 505,"RIGHT: ", {fontSize: '32px', fill: '#fff'});
		P1Guard = game.add.text(50, 550,"GUARD: ", {fontSize: '32px', fill: '#fff'});
		P1Light = game.add.text(50, 595,"LIGHT ATTACK: ", {fontSize: '32px', fill: '#fff'});
		P1Heavy = game.add.text(50, 640,"HEAVY ATTACK/DIVEKICK: ", {fontSize: '32px', fill: '#fff'});
		
		P2 = game.add.text(800, 365,"PLAYER 2", {fontSize: '35px', fill: '#fff'});
		P2Jump = game.add.text(725, 415,"JUMP: ", {fontSize: '32px', fill: '#fff'});
		P2Left = game.add.text(725, 460,"LEFT: ", {fontSize: '32px', fill: '#fff'});
		P2Right = game.add.text(725, 505,"RIGHT: ", {fontSize: '32px', fill: '#fff'});
		P2Guard = game.add.text(725, 550,"GUARD: ", {fontSize: '32px', fill: '#fff'});
		P2Light = game.add.text(725, 595,"LIGHT ATTACK: ", {fontSize: '32px', fill: '#fff'});
		P2Heavy = game.add.text(725, 640,"HEAVY ATTACK/DIVEKICK: ", {fontSize: '32px', fill: '#fff'});
	   
    },
    
    update: function(){
        //P1 keys
        if(game.input.keyboard.justPressed(P1keyUp) && !P1Chose){
            if(P1index + 2 > sprites.length){
               sprites[P1index].alpha = 0;
			   P1index = 0;
			   sprites[P1index].alpha = 1;
            }else{
				sprites[P1index].alpha = 0;
                P1index++;
				sprites[P1index].alpha = 1;
            }
        }
        
        if(game.input.keyboard.justPressed(P1keyDown) && !P1Chose){
            if(P1index - 1 < 0){
				sprites[P1index].alpha = 0;
                P1index = characters.length-1;
				sprites[P1index].alpha = 1;
            }else{
				sprites[P1index].alpha = 0;
                P1index--;
				sprites[P1index].alpha = 1;
            }
        }
        
        
        //P2 keys
        if(game.input.keyboard.justPressed(P2keyUp) && !P2Chose){
            if(P2index + 2 > sprites2.length){
				sprites2[P2index].alpha = 0;
                P2index = 0;
				sprites2[P2index].alpha = 1;
            }else{
				sprites2[P2index].alpha = 0;
                P2index++;
				sprites2[P2index].alpha = 1;
            }
        }
        
        if(game.input.keyboard.justPressed(P2keyDown) && !P2Chose){
            if(P2index - 1 < 0){
				sprites2[P2index].alpha = 0;
                P2index = characters.length-1;
				sprites2[P2index].alpha = 1;
            }else{
				sprites2[P2index].alpha = 0;
                P2index--;
				sprites2[P2index].alpha = 1;
            }
        }
        
        
        
        //update Text
       // P1Text.text = characters[P1index];
        //P2Text.text = characters[P2index];
		

    }
    
};