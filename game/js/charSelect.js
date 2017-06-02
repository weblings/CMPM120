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

        var pad1;
        var pad2;
        var padControl1;
        var padControl2;
        var timer;
    },
    
    create: function(){
        
        //var logo = game.add.sprite(game.width/2-300,game.height/4-50,"logo");
        //logo.scale.setTo(.7,.7);
		
		var upArrow = game.add.sprite(585,275,"arrow");
		upArrow.scale.setTo(.25, .25);
		var downArrow = game.add.sprite(585,425,"arrow");
		downArrow.scale.setTo(.25, -.25);
		
		var rabbitID = game.add.sprite(150,220,"rabbit_ID");
		rabbitID.scale.setTo(.5,.5);
		rabbitID.alpha = 0;
		var guardID = game.add.sprite(150,220,"guard_ID");
		guardID.scale.setTo(.5,.5);
		guardID.alpha = 0;
		var scorpID = game.add.sprite(150,220,"scorp_ID");
		scorpID.scale.setTo(.5,.5);

		var rabbitID2 = game.add.sprite(670,220,"rabbit_ID");
		rabbitID2.scale.setTo(.5,.5);
		rabbitID2.alpha = 0;
		var guardID2 = game.add.sprite(670,220,"guard_ID");
		guardID2.scale.setTo(.5,.5);
		guardID2.alpha = 0;
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
        round = 0;
        
        //musicVolume = 0.7;
        
        main_music = game.add.audio('local_forecast');
        //solution for looping bug from http://www.html5gamedevs.com/topic/13947-audio-not-looping-in-chrome/
        main_music.play('',0, 1, true);
        //main_music.onLoop.add(playMainMusic, this);       
        main_music.mute = false;  
        main_music.loop = true;
        main_music.volume = 0.7;

        game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;

        timer = new setTime();
    },
    
    update: function(){

        if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected){
            padControl1 = true;
        }
        else{
            padControl1 = false;
        }

        if (game.input.gamepad.supported && game.input.gamepad.active && pad2.connected){
            padControl2 = true;
        }
        else{
            padControl2 = false;
        }

        if (padControl1){
            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && !P1Chose && timer.timerDone('selectLock1')){
                timer.startTimer('selectLock1',200);
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
            
            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && !P1Chose && timer.timerDone('selectLock1')){
                timer.startTimer('selectLock1',200);
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
            
            if(pad1.isDown(Phaser.Gamepad.XBOX360_A) && !P1Chose){
                P1Chose = true;
                P1InstructionText.text = "Deselect with B";
            }
            
            if(pad1.isDown(Phaser.Gamepad.XBOX360_B) && P1Chose){
                P1Chose = false;
                P1InstructionText.text = "Select with A";
            }
        }else{
            
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
        }

        if (padControl2){
            //P2 keys
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && !P2Chose && timer.timerDone('selectLock2')){
                timer.startTimer('selectLock2',200);
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
            
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && !P2Chose && timer.timerDone('selectLock2')){
                timer.startTimer('selectLock2',200);
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
            
            if(pad2.isDown(Phaser.Gamepad.XBOX360_A) && !P2Chose){
                P2Chose = true;
                P2InstructionText.text = "Deselect with B";
            }
            
            if(pad2.isDown(Phaser.Gamepad.XBOX360_B) && P2Chose){
                P2Chose = false;
                P2InstructionText.text = "Select with A";
            }

        }else{
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
        }
        //update Text

       // P1Text.text = characters[P1index];
        //P2Text.text = characters[P2index];
		

        
        if(P1Chose && P2Chose){
            P1CharChosen = characters[P1index];
            P2CharChosen = characters[P2index];
            if (P1CharChosen == P2CharChosen){
                duplicate = true;
            }else{
                duplicate = false;
            }
        main_music.mute = true;
        game.state.start("main",false,true,P1CharChosen,P2CharChosen,p1win,p2win,duplicate,round);
        }
    },
    
    playMainMusic: function() {	main_music.play('', 0, 1, true);}

    
};