var controlState = {

    
    create: function(){
		//PLAYER 1 SELECT
		var layoutSelect = game.add.sprite(70, 40, "selectBox");
		
		var jumpSelect1 = game.add.sprite(40, 410, "selectBox2");
		jumpSelect1.scale.setTo(.23, .14);
		jumpSelect1.alpha = 0;
		
		var leftSelect1 = game.add.sprite(40, 455, "selectBox2");
		leftSelect1.scale.setTo(.21, .14);
		leftSelect1.alpha = 0;
		
		var rightSelect1 = game.add.sprite(40, 500, "selectBox2");
		rightSelect1.scale.setTo(.24, .14);
		rightSelect1.alpha = 0;
		
		var guardSelect1 = game.add.sprite(40, 545, "selectBox2");
		guardSelect1.scale.setTo(.28, .14);
		guardSelect1.alpha = 0;
		
		var lightAttackSelect1 = game.add.sprite(38, 590, "selectBox2");
		lightAttackSelect1.scale.setTo(.52, .14);
		lightAttackSelect1.alpha = 0;
		
		var heavyAttackSelect1 = game.add.sprite(28, 635, "selectBox2");
		heavyAttackSelect1.scale.setTo(.9, .14);
		heavyAttackSelect1.alpha = 0;
		
		//PLAYER 2 SELECT
		var layoutSelect2 = game.add.sprite(720, 40, "selectBox");
		
		var jumpSelect2 = game.add.sprite(720, 410, "selectBox2");
		jumpSelect2.scale.setTo(.23, .14);
		jumpSelect2.alpha = 0;
		
		var leftSelect2 = game.add.sprite(720, 455, "selectBox2");
		leftSelect2.scale.setTo(.21, .14);
		leftSelect2.alpha = 0;
		
		var rightSelect2 = game.add.sprite(720, 500, "selectBox2");
		rightSelect2.scale.setTo(.24, .14);
		rightSelect2.alpha = 0;
		
		var guardSelect2 = game.add.sprite(720, 545, "selectBox2");
		guardSelect2.scale.setTo(.28, .14);
		guardSelect2.alpha = 0;
		
		var lightAttackSelect2 = game.add.sprite(710, 590, "selectBox2");
		lightAttackSelect2.scale.setTo(.52, .14);
		lightAttackSelect2.alpha = 0;
		
		var heavyAttackSelect2 = game.add.sprite(700, 635, "selectBox2");
		heavyAttackSelect2.scale.setTo(.9, .14);
		heavyAttackSelect2.alpha = 0;
		
		
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
	   selectBoxes = [layoutSelect, jumpSelect1, leftSelect1, rightSelect1, guardSelect1, lightAttackSelect1, heavyAttackSelect1];
	   selectBoxes2 = [layoutSelect2, jumpSelect2, leftSelect2, rightSelect2, guardSelect2, lightAttackSelect2, heavyAttackSelect2];
	   
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
        if(game.input.keyboard.justPressed(P1keyDown)){
            if(P1index + 2 > selectBoxes.length){
               selectBoxes[P1index].alpha = 0;
			   P1index = 0;
			   selectBoxes[P1index].alpha = 1;
            }else{
				selectBoxes[P1index].alpha = 0;
                P1index++;
				selectBoxes[P1index].alpha = 1;
            }
        }
        
        if(game.input.keyboard.justPressed(P1keyUp)){
            if(P1index - 1 < 0){
				selectBoxes[P1index].alpha = 0;
                P1index = selectBoxes.length-1;
				selectBoxes[P1index].alpha = 1;
            }else{
				selectBoxes[P1index].alpha = 0;
                P1index--;
				selectBoxes[P1index].alpha = 1;
            }
        }
        
        
        //P2 keys
        if(game.input.keyboard.justPressed(P2keyDown)){
            if(P2index + 2 > selectBoxes2.length){
				selectBoxes2[P2index].alpha = 0;
                P2index = 0;
				selectBoxes2[P2index].alpha = 1;
            }else{
				selectBoxes2[P2index].alpha = 0;
                P2index++;
				selectBoxes2[P2index].alpha = 1;
            }
        }
        
        if(game.input.keyboard.justPressed(P2keyUp)){
            if(P2index - 1 < 0){
				selectBoxes2[P2index].alpha = 0;
                P2index = selectBoxes2.length-1;
				selectBoxes2[P2index].alpha = 1;
            }else{
				selectBoxes2[P2index].alpha = 0;
                P2index--;
				selectBoxes2[P2index].alpha = 1;
            }
        }
        
        
        
        //update Text
       // P1Text.text = characters[P1index];
        //P2Text.text = characters[P2index];
		

    }
    
};