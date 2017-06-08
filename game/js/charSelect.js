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
        var P2Index;
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
        
        var padControls1Shown;
        var padControls2Shown;
		
		var upArrow;
		var backgrounds;
		var bg_GC;
		var bg_NB;
		
        var selectSound;
        var deselectSound;
        var moveSound;
    },
    
    create: function(){
        backgrounds = game.add.group();
		
		bg_GC = game.add.sprite(0,-30,'CharBG_GC');
		bg_GC.scale.setTo(1, .8);
		
		bg_NB = game.add.sprite(0,-30,'CharBG_NB');
		bg_NB.scale.setTo(1, .8);
		bg_NB.alpha = 0;
		
		backgrounds.add(bg_NB);
		
        //var logo = game.add.sprite(game.width/2-300,game.height/4-50,"logo");
        //logo.scale.setTo(.7,.7);
		
		upArrow = game.add.sprite(585,275,"arrow");
		upArrow.scale.setTo(.25, .25);
        
        upTween = game.add.tween(upArrow).to( { y: 250 }, 450, "Linear", true, 450);
        upTween.yoyo(true,200).loop();
                                                             
		var downArrow = game.add.sprite(585,425,"arrow");
		downArrow.scale.setTo(.25, -.25);
        
        downTween =  game.add.tween(downArrow).to( { y: 450 }, 450, "Linear", true, 450);
        downTween.yoyo(true,200).loop();

		
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
        

        game.stage.backgroundColor = "#162160";//"#000";

      //  P1Text = game.add.text(game.width/5,game.height/2,characters[P1index], {fontSize: '32px', fill: '#fff'});
        P1InstructionText = game.add.text(game.width/5,(3 * game.height)/4,"Select with E", {fontSize: '32px', fill: '#000'});
     //   P2Text = game.add.text((3 * game.width)/5,game.height/2,characters[P2index], {fontSize: '32px', fill: '#fff'});
        P2InstructionText = game.add.text(3 * game.width/5,(3 * game.height)/4,"Select with I", {fontSize: '32px', fill: '#000'});

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
        main_music.volume = 0.5;

        game.input.gamepad.start();
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;

        timer = new setTime();
        
        //Xbox Input Images
        p1AButton = game.add.sprite(game.width/5+175,(3 * game.height)/4-5,'A');
        p1AButton.scale.setTo(.1, .1);
        p1AButton.alpha = 0;
        
        p1BButton = game.add.sprite(game.width/5+210,(3 * game.height)/4-5,'B');
        p1BButton.scale.setTo(.1, .1);
        p1BButton.alpha = 0;
        
        p2AButton = game.add.sprite(3 * game.width/5+175,(3 * game.height)/4-5,'A');
        p2AButton.scale.setTo(.1, .1);
        p2AButton.alpha = 0;
        
        p2BButton = game.add.sprite(3 * game.width/5+210,(3 * game.height)/4-5,'B');
        p2BButton.scale.setTo(.1, .1);
        p2BButton.alpha = 0;
        
        JoyStickUp = game.add.sprite(610,425,'Joystick_Up');
        JoyStickUp.scale.setTo(.2,.2);
        JoyStickUp.anchor.setTo(.5,.5);
        JoyStickUp.alpha = 0;
        JoyStickDown = game.add.sprite(610,275,'Joystick_Down');
        JoyStickDown.scale.setTo(.2,.2);
        JoyStickDown.anchor.setTo(.5,.5);
        JoyStickDown.alpha = 0;
        
        upJoyTween = game.add.tween(upArrow).to( { y: 250 }, 450, "Linear", true, 450);
        upJoyTween.yoyo(true,200).loop();
        downJoyTween =  game.add.tween(downArrow).to( { y: 450 }, 450, "Linear", true, 450);
        downJoyTween.yoyo(true,200).loop();
        
        padControls1Shown = false;
        padControls2Shown = false;
        
        battleCryText1X = 255;
        battleCryText2X = 775;
        battleCryTextY = 250;
        battleCryTextY2 = 160;
        battleCryTextY3 = 100;
        
        //		sprites = [scorpID, guardID, rabbitID];
        battleCries = ["*SNIP* *SNIP*","   TESTOTERONE!!!","*ICE RABBIT NOISES*"]
        
        battleCryText1 = game.add.text(battleCryText1X,battleCryTextY,"", {fontSize: '32px', fill: '#000'});
        battleCryText2 = game.add.text(battleCryText2X,battleCryTextY,"", {fontSize: '32px', fill: '#000'});
        
        battleCryText1.alpha = 0;
        battleCryText2.alpha = 0;
        
        battleCry1Done = false;
        battleCry2Done = false;
		
        //steve is a timer that keeps frame transition at bay for a bit
		steveSet = false;
        
        selectSound = game.add.audio('select');
        selectSound.volume = .7;
        deselectSound = game.add.audio('deselect');
        deselectSound.volume = .7;
        moveSound = game.add.audio('throw');
        moveSound.volume = 1;
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
            
            if(!padControls1Shown){
                p1AButton.alpha = 1;
                p1BButton.alpha = 0;
                padControls1Shown = true;                
            }
            
            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && !P1Chose && timer.timerDone('selectLock1')){
                timer.startTimer('selectLock1',200);
                moveSound.play();
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
                moveSound.play();
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
                p1AButton.alpha = 0;
                p1BButton.alpha = 1;
                charSelect.battleCry(1);
                selectSound.play();
            }
            
            if(pad1.isDown(Phaser.Gamepad.XBOX360_B) && P1Chose){
                P1Chose = false;
                P1InstructionText.text = "Select with A";
                p1AButton.alpha = 1;
                p1BButton.alpha = 0;
                battleCry1Done = false;
                deselectSound.play();
            }
        }else{
            
            //P1 keys
            if(game.input.keyboard.justPressed(P1keyUp) && !P1Chose){
                moveSound.play();
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
                moveSound.play();
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
                //battleCryText1.text = battleCries[P1index]; 
                charSelect.battleCry(1);
                selectSound.play();
            }
            
            if(game.input.keyboard.justPressed(P1keyB) && P1Chose){
                P1Chose = false;
                P1InstructionText.text = "Select with E";
                battleCry1Done = false;
                deselectSound.play();



            }
        }

        if (padControl2){
            
            if(!padControls2Shown){
                p2AButton.alpha = 1;
                p2BButton.alpha = 0;
                padControls2Shown = true;                
            }
            
            //P2 keys
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && !P2Chose && timer.timerDone('selectLock2')){
                timer.startTimer('selectLock2',200);
                moveSound.play();
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
                moveSound.play();
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
                p2AButton.alpha = 0;
                p2BButton.alpha = 1;
                charSelect.battleCry(2);
                selectSound.play();
            }
            
            if(pad2.isDown(Phaser.Gamepad.XBOX360_B) && P2Chose){
                P2Chose = false;
                P2InstructionText.text = "Select with A";
                p2AButton.alpha = 1;
                p2BButton.alpha = 0;
                battleCry2Done = false;
                deselectSound.play();
            }

        }else{
            //P2 keys
            if(game.input.keyboard.justPressed(P2keyUp) && !P2Chose){
                moveSound.play();
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
                moveSound.play();
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
                charSelect.battleCry(2);
                selectSound.play();
            }
            
            if(game.input.keyboard.justPressed(P2keyB) && P2Chose){
                P2Chose = false;
                P2InstructionText.text = "Select with I";
                battleCry2Done = false;
                deselectSound.play();   
            }
        }
        //update Text

       // P1Text.text = characters[P1index];
        //P2Text.text = characters[P2index];
		
        if(padControl1 && padControl2){
            JoyStickDown.alpha = 1;
            JoyStickUp.alpha = 1;
        }else{
            JoyStickUp.alpha = 0;
            JoyStickDown.alpha = 0;
        }
        
        if(P1Chose && P2Chose && battleCry1Done && battleCry2Done){
			//backgroundSwitch();
            P1CharChosen = characters[P1index];
            P2CharChosen = characters[P2index];
            if (P1CharChosen == P2CharChosen){
                duplicate = true;
            }else{
                duplicate = false;
            }
			if(!steveSet){
                timer.startTimer("tom",1500);
				timer.startTimer("steve", 2200); 
				steveSet = true;
			}
            if(timer.timerDone("tom")){
                bg_GC.alpha = 0;
			    bg_NB.alpha = 1;
            }
			if(timer.timerDone("steve")){
				//main_music.mute = true;
				game.state.start("controls",true,false,P1CharChosen,P2CharChosen,p1win,p2win,duplicate,round);
				//game.state.start("main",true,false,P1CharChosen,P2CharChosen,p1win,p2win,duplicate,round);
			}
		}
    },
    
    playMainMusic: function() {	main_music.play('', 0, 1, true);},
    
    battleCry: function(inputNumber){
        if(!battleCry1Done && inputNumber == 1){
            charSelect.resetBattleCryVars1();
            battleCryText1.text = battleCries[P1index];
            var room = 50;
            if(P1index == 1 || P1index == 2) room = 150; 
            var tween1 = game.add.tween(battleCryText1).to( { alpha: 1, y:battleCryTextY2 -10, fontSize:'16px', x: battleCryText1X - room }, 200, "Linear", true, 400);
            tween1.onComplete.add(charSelect.Tween1completed, this);
        }else if(!battleCry2Done && inputNumber == 2){
            charSelect.resetBattleCryVars2();
            battleCryText2.text = battleCries[P2index];
            var room = 50;
            if(P2index == 1 || P2index == 2) room = 150;
            var tween1_2 = game.add.tween(battleCryText2).to( { alpha: 1, y:battleCryTextY2 -10, fontSize:'16px', x: battleCryText2X - room }, 200, "Linear", true, 400);
            tween1_2.onComplete.add(charSelect.Tween1_2completed, this);
        }  
    },
    
    resetBattleCryVars1: function(){
            //battleCry1Done = false;
            battleCryText1.position.y = battleCryTextY;
            battleCryText1.position.x = battleCryText1X;
            battleCryText1.fontSize = 32;
    },    
    
    resetBattleCryVars2: function(){
            battleCryText2.position.y = battleCryTextY;
            battleCryText2.position.x = battleCryText2X;
            battleCryText2.fontSize = 32;
    },
    
    Tween1completed: function(){
        tween2 = game.add.tween(battleCryText1).to( { alpha: 0, y: battleCryTextY3 }, 600, "Linear", true, 600);
        tween2.onComplete.add(charSelect.resetBattleCryVars1,this);
        battleCry1Done = true;
    },
    
    Tween1_2completed: function(){
        tween2_2 = game.add.tween(battleCryText2).to( { alpha: 0, y: battleCryTextY3 }, 600, "Linear", true, 600);
        tween2_2.onComplete.add(charSelect.resetBattleCryVars2, this);
        battleCry2Done = true;
    }
	

    
};