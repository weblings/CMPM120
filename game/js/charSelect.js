var charSelect = {

    preload: function(){
        var characters = [];

        var P1keyUp;
        var P1keyDown;
        var P1index;
        var P1Chose;
        var P1CharChosen;
        
        var P2keyUp;
        var P2keyDown;
        var PiIndex;
        var P2Chose;
        var P2CharChosen;
        
        var P1Text;
        var P1InstructionText;
        var P2Text;
        var P2InstructionText;

        
        var p1win;
        var p2win;

        var duplicate;
    },
    
    create: function(){
        
        //var logo = game.add.sprite(game.width/2-300,game.height/4-50,"logo");
        //logo.scale.setTo(.7,.7);
		
		var rabbitID = game.add.sprite(150,220,"rabbit_ID");
		rabbitID.scale.setTo(.5,.5);
		var guardID = game.add.sprite(150,220,"guard_ID");
		guardID.scale.setTo(.5,.5);
		var scorpID = game.add.sprite(150,220,"scorp_ID");
		scorpID.scale.setTo(.5,.5);

		var rabbitID2 = game.add.sprite(670,220,"rabbit_ID");
		rabbitID2.scale.setTo(.5,.5);
		var guardID2 = game.add.sprite(670,220,"guard_ID");
		guardID2.scale.setTo(.5,.5);
		var scorpID2 = game.add.sprite(670,220,"scorp_ID");
		scorpID2.scale.setTo(.5,.5);
        
        characters = ["LITERALLY A SCORPION","SECURITY", "SIMON"];//["THE TEMP","LITERALLY A SCORPION","SECURITY"];
		sprites = [scorpID, guardID, rabbitID];
		sprites2 = [scorpID2, guardID2, rabbitID2];

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
        
        game.stage.backgroundColor = "#000";
      //  P1Text = game.add.text(game.width/5,game.height/2,characters[P1index], {fontSize: '32px', fill: '#fff'});
        P1InstructionText = game.add.text(game.width/5,(3 * game.height)/4,"Select with E", {fontSize: '32px', fill: '#fff'});
     //   P2Text = game.add.text((3 * game.width)/5,game.height/2,characters[P2index], {fontSize: '32px', fill: '#fff'});
        P2InstructionText = game.add.text(3 * game.width/5,(3 * game.height)/4,"Select with I", {fontSize: '32px', fill: '#fff'});

        p1win = 0;
        p2win = 0;
    },
    
    update: function(){
            
        //P1 keys
        if(game.input.keyboard.justPressed(P1keyUp) && !P1Chose){
            if(P1index + 2 > characters.length){
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
        
        if(game.input.keyboard.justPressed(P1keyA) && !P1Chose){
            P1Chose = true;
            P1InstructionText.text = "Deselect with R";
        }
        
        if(game.input.keyboard.justPressed(P1keyB) && P1Chose){
            P1Chose = false;
            P1InstructionText.text = "Select with E";
        }
        
        //P2 keys
        if(game.input.keyboard.justPressed(P2keyUp) && !P2Chose){
            if(P2index + 2 > characters.length){
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
        
        if(game.input.keyboard.justPressed(P2keyA) && !P2Chose){
            P2Chose = true;
            P2InstructionText.text = "Deselect with U";
        }
        
        if(game.input.keyboard.justPressed(P2keyB) && P2Chose){
            P2Chose = false;
            P2InstructionText.text = "Select with I";
        }
        
        //update Text
       // P1Text.text = characters[P1index];
        //P2Text.text = characters[P2index];
		
        
        if(P1Chose && P2Chose){
            P1CharChosen = characters[P1index];
            P2CharChosen = characters[P2index];
        game.state.start("main",false,true,P1CharChosen,P2CharChosen,p1win,p2win);
        }
    }
    
};