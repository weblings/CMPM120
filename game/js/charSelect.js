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
    },
    
    create: function(){
        characters = ["THE TEMP","LITERALLY A SCORPION"];

        P1keyUp = Phaser.Keyboard.W;
        P1keyDown = Phaser.Keyboard.S;
        P1keyA = Phaser.Keyboard.R;
        P1keyB = Phaser.Keyboard.T;
        P1index = 0;
        P1Chose = false;
        
        P2keyUp = Phaser.Keyboard.O;
        P2keyDown = Phaser.Keyboard.L;
        P2keyA = Phaser.Keyboard.OPEN_BRACKET;
        P2keyB = Phaser.Keyboard.CLOSED_BRACKET;
        P2index = 0;
        P2Chose = false;
        
        game.stage.backgroundColor = "#000";
        P1Text = game.add.text(game.width/5,game.height/2,characters[P1index], {fontSize: '32px', fill: '#fff'});
        P1InstructionText = game.add.text(game.width/5,(3 * game.height)/4,"Select with R", {fontSize: '32px', fill: '#fff'});
        P2Text = game.add.text((3 * game.width)/5,game.height/2,characters[P2index], {fontSize: '32px', fill: '#fff'});
        P2InstructionText = game.add.text(3 * game.width/5,(3 * game.height)/4,"Select with [", {fontSize: '32px', fill: '#fff'});
    },
    
    update: function(){
            
        //P1 keys
        if(game.input.keyboard.justPressed(P1keyUp) && !P1Chose){
            if(P1index + 2 > characters.length){
                P1index = 0;
            }else{
                P1index++;
            }
        }
        
        if(game.input.keyboard.justPressed(P1keyDown) && !P1Chose){
            if(P1index - 1 < 0){
                P1index = characters.length-1;
            }else{
                P1index--;
            }
        }
        
        if(game.input.keyboard.justPressed(P1keyA) && !P1Chose){
            P1Chose = true;
            P1InstructionText.text = "Deselect with T";
        }
        
        if(game.input.keyboard.justPressed(P1keyB) && P1Chose){
            P1Chose = false;
            P1InstructionText.text = "Select with R";
        }
        
        //P2 keys
        if(game.input.keyboard.justPressed(P2keyUp) && !P2Chose){
            if(P2index + 2 > characters.length){
                P2index = 0;
            }else{
                P2index++;
            }
        }
        
        if(game.input.keyboard.justPressed(P2keyDown) && !P2Chose){
            if(P2index - 1 < 0){
                P2index = characters.length-1;
            }else{
                P2index--;
            }
        }
        
        if(game.input.keyboard.justPressed(P2keyA) && !P2Chose){
            P2Chose = true;
            P1InstructionText.text = "Deselect with ]";
        }
        
        if(game.input.keyboard.justPressed(P2keyB) && P2Chose){
            P2Chose = false;
            P1InstructionText.text = "Select with T";
        }
        
        //update Text
        P1Text.text = characters[P1index];
        P2Text.text = characters[P2index];
        
        if(P1Chose && P2Chose){
            P1CharChosen = characters[P1index];
            P2CharChosen = characters[P2index];
            game.stage.backgroundColor = "#000";
            game.state.start("main",false,true,P1CharChosen,P2CharChosen);
        }
    }
    
};