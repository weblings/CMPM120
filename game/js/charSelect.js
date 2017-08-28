var charSelect = {

    preload: function(){
        var characters = [];

        var P1keyUp;
        var P1keyDown;
        var P1index;
        var P1Chose;
        var P1CharChosen;
        var P1Costume;
        var P1CostumeIndex;
        var P1CostumeChose;
        var P1CostumeChosen;
        
        var P2keyUp;
        var P2keyDown;
        var P2Index;
        var P2Chose;
        var P2CharChosen;
        var P2Costume;
        var P2CostumeIndex;
        var P2CostumeChose;
        var P2CostumeChosen;
        
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
        
        var waiting;
        var waited;
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
        P1CostumeIndex = 0;
        P1CostumeChose = false;
        
        P2keyUp = Phaser.Keyboard.O;
        P2keyDown = Phaser.Keyboard.L;
        P2keyA = Phaser.Keyboard.I;//Phaser.Keyboard.OPEN_BRACKET;
        P2keyB = Phaser.Keyboard.U;//Phaser.Keyboard.CLOSED_BRACKET;
        P2index = 0;
        P2Chose = false;
        P2CostumeIndex = 0;
        P2CostumeChose = false;
        

        game.stage.backgroundColor = "#162160";//"#000";

      //  P1Text = game.add.text(game.width/5,game.height/2,characters[P1index], {fontSize: '32px', fill: '#fff'});
        P1InstructionText = game.add.text(game.width/5,(3 * game.height)/4,"Select with E", {fontSize: '32px', fill: '#000'});
     //   P2Text = game.add.text((3 * game.width)/5,game.height/2,characters[P2index], {fontSize: '32px', fill: '#fff'});
        P2InstructionText = game.add.text(3 * game.width/5,(3 * game.height)/4,"Select with I", {fontSize: '32px', fill: '#000'});
        
        P1InstructionText2 = game.add.text(game.width/5,(3 * game.height)/4+75,"Deslect with R", {fontSize: '32px', fill: '#000'});
        P1InstructionText2.alpha = 0;
        P2InstructionText2 = game.add.text(3 * game.width/5,(3 * game.height)/4+75,"Deselect with U", {fontSize: '32px', fill: '#000'});
        P2InstructionText2.alpha = 0;

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
        
        p1BButton2 = game.add.sprite(game.width/5+210,((3 * game.height)/4-5)+75,'B');
        p1BButton2.scale.setTo(.1, .1);
        p1BButton2.alpha = 0;
        
        p2AButton = game.add.sprite(3 * game.width/5+175,(3 * game.height)/4-5,'A');
        p2AButton.scale.setTo(.1, .1);
        p2AButton.alpha = 0;
        
        p2BButton = game.add.sprite(3 * game.width/5+210,(3 * game.height)/4-5,'B');
        p2BButton.scale.setTo(.1, .1);
        p2BButton.alpha = 0;
        
        p2BButton2 = game.add.sprite(3 * game.width/5+210,((3 * game.height)/4-5)+75,'B');
        p2BButton2.scale.setTo(.1, .1);
        p2BButton2.alpha = 0;
        
        JoyStickUp = game.add.sprite(610,425,'Joystick_Up');
        JoyStickUp.scale.setTo(.2,.2);
        JoyStickUp.anchor.setTo(.5,.5);
        JoyStickUp.alpha = 0;
        JoyStickDown = game.add.sprite(610,275,'Joystick_Down');
        JoyStickDown.scale.setTo(.2,.2);
        JoyStickDown.anchor.setTo(.5,.5);
        JoyStickDown.alpha = 0;
        
        upJoyTween = game.add.tween(JoyStickUp).to( { y: 450 }, 450, "Linear", true, 450);
        upJoyTween.yoyo(true,200).loop();
        downJoyTween =  game.add.tween(JoyStickDown).to( { y: 250 }, 450, "Linear", true, 450);
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
        
        //Costumes
        
            //Player 1
            Scorp1 = game.add.sprite(175,220, 'scorpion_atlas');
            Scorp1.scale.setTo(.4,.4);
            Scorp1.frame = 4;
            Scorp1.alpha = 0;

            Scorp2 = game.add.sprite(175,220, 'scorpion_atlas2');
            Scorp2.scale.setTo(.4,.4);
            Scorp2.frame = 4;
            Scorp2.alpha = 0;

            scorpCostume = [Scorp1,Scorp2];

            Security1 =  game.add.sprite(275,220, 'security_atlas');
            Security1.frame = 10;
            Security1.alpha = 0;

            Security2 =  game.add.sprite(275,220, 'security_atlas2');
            Security2.alpha = 0;

            securityCostume = [Security1, Security2];

            Simon1 = game.add.sprite(225,240, 'rabbit_atlas');
            Simon1.scale.setTo(.32,.32);
            Simon1.alpha = 0;

            Simon2 = game.add.sprite(225,240, 'rabbit_atlas2');
            Simon2.scale.setTo(.32,.32);
            Simon2.alpha = 0;

            simonCostume = [Simon1,Simon2];

            costume = [scorpCostume, securityCostume, simonCostume];
        
            //Player2
            Scorp1_2 = game.add.sprite(175+520,220, 'scorpion_atlas');
            Scorp1_2.scale.setTo(.4,.4);
            Scorp1_2.frame = 4;
            Scorp1_2.alpha = 0;

            Scorp2_2 = game.add.sprite(175+520,220, 'scorpion_atlas2');
            Scorp2_2.scale.setTo(.4,.4);
            Scorp2_2.frame = 4;
            Scorp2_2.alpha = 0;

            scorpCostume_2 = [Scorp1_2,Scorp2_2];

            Security1_2 =  game.add.sprite(275+520,220, 'security_atlas');
            Security1_2.frame = 10;
            Security1_2.alpha = 0;

            Security2_2 =  game.add.sprite(275+520,220, 'security_atlas2');
            Security2_2.alpha = 0;

            securityCostume_2 = [Security1_2, Security2_2];

            Simon1_2 = game.add.sprite(225+520,240, 'rabbit_atlas');
            Simon1_2.scale.setTo(.32,.32);
            Simon1_2.alpha = 0;

            Simon2_2 = game.add.sprite(225+520,240, 'rabbit_atlas2');
            Simon2_2.scale.setTo(.32,.32);
            Simon2_2.alpha = 0;

            simonCostume_2 = [Simon1_2,Simon2_2];

            costume_2 = [scorpCostume_2, securityCostume_2, simonCostume_2];
            
            //Preventing button input from carrying over from previous screen
            waiting = timer.startTimer('waiting',100);
            waited = false;
    },
    
    update: function(){
        
        //If text reaches final point of tweens, reset it
        if(battleCryText1.y <= battleCryTextY3){
            battleCry1Done = false;
            battleCryText1.position.y = battleCryTextY;
            battleCryText1.position.x = battleCryText1X;
            battleCryText1.fontSize = 32;
            battleCryText1.alpha = 0;
        }
        
        if(battleCryText2.y <= battleCryTextY3){
            battleCry2Done = false;
            battleCryText2.position.y = battleCryTextY;
            battleCryText2.position.x = battleCryText2X;
            battleCryText2.fontSize = 32;
            battleCryText2.alpha = 0;
        }
        
        if(timer.timerDone('waiting')){
            waited = true;
        }else{
            return;
        }
        
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
            
            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && !P1CostumeChose && timer.timerDone('selectLock1')){
                timer.startTimer('selectLock1',200);
                moveSound.play();
                if(!P1Chose){
                    if(P1index + 2 > characters.length){
                       sprites[P1index].alpha = 0;
                       P1index = 0;
                       sprites[P1index].alpha = 1;
                    }else{
                        sprites[P1index].alpha = 0;
                        P1index++;
                        sprites[P1index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume[P1index][P1CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(1);
                    costume[P1index][P1CostumeIndex].alpha = 1;
                }
            }
            
            if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && !P1CostumeChose && timer.timerDone('selectLock1')){
                timer.startTimer('selectLock1',200);
                moveSound.play();
                if(!P1Chose){
                    if(P1index - 1 < 0){
                        sprites[P1index].alpha = 0;
                        P1index = characters.length-1;
                        sprites[P1index].alpha = 1;
                    }else{
                        sprites[P1index].alpha = 0;
                        P1index--;
                        sprites[P1index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume[P1index][P1CostumeIndex].alpha = 0;
                    charSelect.decrCostumeIndex(1);
                    costume[P1index][P1CostumeIndex].alpha = 1;
                }
            }
            
            if(pad1.isDown(Phaser.Gamepad.XBOX360_A) && !P1CostumeChose && timer.timerDone('ALock1') && waited){
                timer.startTimer('ALock1',200);
                if(!P1Chose){ //Costume Handling
                    P1Chose = true;
                    P1InstructionText.text = "Select with A";
                    p1AButton.alpha = 1;
                    p1BButton.alpha = 0;
                    p1BButton2.alpha = 1;
                    P1InstructionText2.alpha = 1;
                    P1InstructionText2.text = "Deselect with B";
                    if(P2Chose){
                        if(P1index == P2index && P1CostumeIndex == P2CostumeIndex && P2Chose){
                            charSelect.incrCostumeIndex(1);
                        }
                    }
                    costume[P1index][P1CostumeIndex].alpha = 1;
                    charSelect.battleCry(1);
                    selectSound.play();
                }else{
                    P1InstructionText.text = "Deselect with B";
                    p1AButton.alpha = 0;
                    p1BButton.alpha = 1;
                    p1BButton2.alpha = 0;
                    P1InstructionText2.alpha = 0;
                    P1CostumeChose = true;
                    selectSound.play();
                }
            }
            
            if(pad1.isDown(Phaser.Gamepad.XBOX360_B) && (P1CostumeChose || P1Chose) && timer.timerDone('BLock1')){
                timer.startTimer('BLock1',200);
                
                if(!P1CostumeChose){
                    P1Chose = false;
                    P1InstructionText.text = "Select with A";
                    p1AButton.alpha = 1;
                    p1BButton.alpha = 0;
                    p1BButton2.alpha = 0;
                    P1InstructionText2.alpha = 0;
                    costume[P1index][P1CostumeIndex].alpha = 0;
                    deselectSound.play();
                }else{ //Costume Handling
                    P1InstructionText.text = "Select with A";
                    p1AButton.alpha = 1;
                    p1BButton.alpha = 0;
                    p1BButton2.alpha = 1;
                    P1InstructionText2.alpha = 1;
                    P1InstructionText2.text = "Deselect with B";
                    P1CostumeChose = false;
                    costume[P1index][P1CostumeIndex].alpha = 1;
                    deselectSound.play();
                }
                
            }
        }else{
            
            //P1 keys
            if(game.input.keyboard.justPressed(P1keyUp) && !P1CostumeChose){
                moveSound.play();
                if(!P1Chose){
                    if(P1index + 2 > characters.length){
                       sprites[P1index].alpha = 0;
                       P1index = 0;
                       sprites[P1index].alpha = 1;
                    }else{
                        sprites[P1index].alpha = 0;
                        P1index++;
                        sprites[P1index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume[P1index][P1CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(1);
                    costume[P1index][P1CostumeIndex].alpha = 1;
                }
            }
            
            if(game.input.keyboard.justPressed(P1keyDown) && !P1CostumeChose){
                moveSound.play();
                if(!P1Chose){
                    if(P1index - 1 < 0){
                        sprites[P1index].alpha = 0;
                        P1index = characters.length-1;
                        sprites[P1index].alpha = 1;
                    }else{
                        sprites[P1index].alpha = 0;
                        P1index--;
                        sprites[P1index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume[P1index][P1CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(1);
                    costume[P1index][P1CostumeIndex].alpha = 1;
                }
            }
            
            if(game.input.keyboard.justPressed(P1keyA) && !P1CostumeChose){
                if(!P1Chose){ //Costume Handling
                    P1Chose = true;
                    P1InstructionText.text = "Select with E";
                    P1InstructionText2.alpha = 1;
                    P1InstructionText2.text = "Deselect with R";
                    if(P1Chose){
                        if(P1index == P2index && P1CostumeIndex == P2CostumeIndex && P2Chose){
                            charSelect.incrCostumeIndex(1);
                        }
                    }
                    costume[P1index][P1CostumeIndex].alpha = 1;
                    charSelect.battleCry(1);
                    selectSound.play();
                }else{
                    P1InstructionText.text = "Deselect with R";
                    P1InstructionText2.alpha = 0;
                    P1CostumeChose = true;
                    selectSound.play();
                }
            }
            
            if(game.input.keyboard.justPressed(P1keyB) && P1Chose){
                if(!P1CostumeChose){
                    P1Chose = false;
                    P1InstructionText.text = "Select with E";
                    P1InstructionText2.alpha = 0;
                    costume[P1index][P1CostumeIndex].alpha = 0;
                    deselectSound.play();
                }else{ //Costume Handling
                    P1InstructionText.text = "Select with E";
                    P1InstructionText2.alpha = 1;
                    P1InstructionText2.text = "Deselect with R";
                    P1CostumeChose = false;
                    costume[P1index][P1CostumeIndex].alpha = 1;
                    deselectSound.play();
                }

            }
        }

        if (padControl2){
            
            if(!padControls2Shown){
                p2AButton.alpha = 1;
                p2BButton.alpha = 0;
                padControls2Shown = true;                
            }
            
            //P2 keys
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 &&  !P2CostumeChose && timer.timerDone('selectLock2')){
                timer.startTimer('selectLock2',200);
                moveSound.play();
                if(!P2Chose){
                    if(P2index + 2 > characters.length){
                       sprites2[P2index].alpha = 0;
                       P2index = 0;
                       sprites2[P2index].alpha = 1;
                    }else{
                        sprites2[P2index].alpha = 0;
                        P2index++;
                        sprites2[P2index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume_2[P2index][P2CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(2);
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                }
            }
            
            if(pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && !P2CostumeChose && timer.timerDone('selectLock2')){
                timer.startTimer('selectLock2',200);
                moveSound.play();
                if(!P2Chose){
                    if(P2index - 1 < 0){
                        sprites2[P2index].alpha = 0;
                        P2index = characters.length-1
                        sprites2[P2index].alpha = 1;
                    }else{
                        sprites2[P2index].alpha = 0;
                        P2index--;
                        sprites2[P2index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume_2[P2index][P2CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(2);
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                }
            }
            
            if(pad2.isDown(Phaser.Gamepad.XBOX360_A) && !P2CostumeChose && timer.timerDone('ALock2') && waited){
                timer.startTimer('ALock2',200);
                if(!P2Chose){ //Costume Handling
                    P2Chose = true;
                    P2InstructionText.text = "Select with A";
                    p2AButton.alpha = 1;
                    p2BButton.alpha = 0;
                    p2BButton2.alpha = 1;
                    P2InstructionText2.alpha = 1;
                    P2InstructionText2.text = "Deselect with B";
                    if(P1Chose){
                        if(P1index == P2index && P1CostumeIndex == P2CostumeIndex && P1Chose){
                            charSelect.incrCostumeIndex(2);
                        }
                    }
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                    charSelect.battleCry(2);
                    selectSound.play();
                }else{
                    P2InstructionText.text = "Deselect with B";
                    p2AButton.alpha = 0;
                    p2BButton.alpha = 1;
                    p2BButton2.alpha = 0;
                    P2InstructionText2.alpha = 0;
                    P2CostumeChose = true;
                    selectSound.play();
                }
            }
            
            if(pad2.isDown(Phaser.Gamepad.XBOX360_B) && (P2CostumeChose || P2Chose) && timer.timerDone('BLock2')){
                timer.startTimer('BLock2',200);
                
                if(!P2CostumeChose){
                    P2Chose = false;
                    P2InstructionText.text = "Select with A";
                    p2AButton.alpha = 1;
                    p2BButton.alpha = 0;
                    p2BButton2.alpha = 0;
                    P2InstructionText2.alpha = 0;
                    costume_2[P2index][P2CostumeIndex].alpha = 0;
                    deselectSound.play();
                }else{ //Costume Handling
                    P2InstructionText.text = "Select with A";
                    p2AButton.alpha = 1;
                    p2BButton.alpha = 0;
                    p2BButton2.alpha = 1;
                    P2InstructionText2.alpha = 1;
                    P2InstructionText2.text = "Deselect with B";
                    P2CostumeChose = false;
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                    deselectSound.play();
                }
            }

        }else{
            //P2 keys
            if(game.input.keyboard.justPressed(P2keyUp) && !P2CostumeChose){
                moveSound.play();
                if(!P2Chose){
                    if(P2index + 2 > characters.length){
                       sprites2[P2index].alpha = 0;
                       P2index = 0;
                       sprites2[P2index].alpha = 1;
                    }else{
                        sprites2[P2index].alpha = 0;
                        P2index++;
                        sprites2[P2index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume_2[P2index][P2CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(2);
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                }
            }
            
            if(game.input.keyboard.justPressed(P2keyDown) && !P2CostumeChose){
                moveSound.play();
                if(!P2Chose){
                    if(P2index - 1 < 0){
                        sprites2[P2index].alpha = 0;
                        P2index = characters.length-1;
                        sprites2[P2index].alpha = 1;
                    }else{
                        sprites2[P2index].alpha = 0;
                        P2index--;
                        sprites2[P2index].alpha = 1;
                    }
                }else{ //Costume Handling
                    costume_2[P2index][P2CostumeIndex].alpha = 0;
                    charSelect.incrCostumeIndex(2);
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                }
            }
            
            if(game.input.keyboard.justPressed(P2keyA) && !P2CostumeChose){
                if(!P2Chose){ //Costume Handling
                    P2Chose = true;
                    if(P1Chose){
                        if(P1index == P2index && P1CostumeIndex == P2CostumeIndex && P1Chose){
                            charSelect.incrCostumeIndex(2);
                        }
                    }
                    P2InstructionText.text = "Select with I";
                    P2InstructionText2.alpha = 1;
                    P2InstructionText2.text = "Deselect with U";
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                    charSelect.battleCry(2);
                    selectSound.play();
                }else{
                    P2InstructionText.text = "Deselect with U";
                    P2InstructionText2.alpha = 0;
                    P2CostumeChose = true;
                    selectSound.play();
                }
            }
            
            if(game.input.keyboard.justPressed(P2keyB) && P2Chose){
                if(!P2CostumeChose){
                    P2Chose = false;
                    P2InstructionText.text = "Select with I";
                    P2InstructionText2.alpha = 0;
                    costume_2[P2index][P2CostumeIndex].alpha = 0;
                    deselectSound.play();
                }else{ //Costume Handling
                    P2InstructionText.text = "Select with I";
                    P2InstructionText2.alpha = 1;
                    P2InstructionText2.text = "Deselect with U";
                    P2CostumeChose = false;
                    costume_2[P2index][P2CostumeIndex].alpha = 1;
                    deselectSound.play();
                }
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
        
        if(P1Chose){
            //charSelect.showCostume(1);
        }
        
        if(P1CostumeChose && P2CostumeChose){// && battleCry1Done && battleCry2Done){
			//backgroundSwitch();
            P1CharChosen = characters[P1index];
            P2CharChosen = characters[P2index];
            /*if (P1CharChosen == P2CharChosen){
                duplicate = true;
            }else{
                duplicate = false;
            }*/
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
				game.state.start("controls",true,false,P1CharChosen,P2CharChosen,p1win,p2win,P1CostumeIndex,P2CostumeIndex,round);
				//game.state.start("main",true,false,P1CharChosen,P2CharChosen,p1win,p2win,duplicate,round);
			}
		}
    },
    
    playMainMusic: function() {	main_music.play('', 0, 1, true);},
    
    battleCry: function(inputNumber){
        if(!battleCry1Done && inputNumber == 1 && battleCryText1.fontSize == 32){
            battleCryText1.text = battleCries[P1index];
            var room = 50;
            if(P1index == 1 || P1index == 2) room = 150; 
            var tween1 = game.add.tween(battleCryText1).to( { alpha: 1, y:battleCryTextY2 -10, fontSize:'16px', x: battleCryText1X - room }, 200, "Linear", true, 400);
            tween1.onComplete.add(charSelect.Tween1completed, this);
            battleCry1Done = false;
        }else if(!battleCry2Done && inputNumber == 2 && battleCryText2.fontSize == 32){
            battleCryText2.text = battleCries[P2index];
            var room = 50;
            if(P2index == 1 || P2index == 2) room = 150;
            var tween1_2 = game.add.tween(battleCryText2).to( { alpha: 1, y:battleCryTextY2 -10, fontSize:'16px', x: battleCryText2X - room }, 200, "Linear", true, 400);
            tween1_2.onComplete.add(charSelect.Tween1_2completed, this);
            battleCry2Done = false;
        }  
    },
    
    Tween1completed: function(){
        if(battleCryText1.fontSize == 48){
            tween2 = game.add.tween(battleCryText1).to( { alpha: 0, y: battleCryTextY3 }, 600, "Linear", true, 600);
        }
    },
    
    Tween1_2completed: function(){
        if(battleCryText2.fontSize == 48){
            tween2_2 = game.add.tween(battleCryText2).to( { alpha: 0, y: battleCryTextY3 }, 600, "Linear", true, 600);
        }
    },
    
    //Used if two players select same character so that they can't have the costume
    incrCostumeIndex: function(playerNum){
        //if(playerNum == 1) console.log("P1 Entering: "+P1CostumeIndex);
        //else console.log("P2 Entering: "+P2CostumeIndex);
        if(playerNum == 1){
            if(P1CostumeIndex + 2 > costume[P1index].length){
                P1CostumeIndex = 0;
                if(P2Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.incrCostumeIndex(1);
                }
            }else{
                P1CostumeIndex++;
                if(P2Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.incrCostumeIndex(1);
                }
            }
        }else{
            if(P2CostumeIndex + 2 > costume_2[P2index].length){
                P2CostumeIndex = 0;
                if(P1Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.incrCostumeIndex(2);
                }
            }else{
                P2CostumeIndex++;
                if(P1Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.incrCostumeIndex(2);
                }
            }
        }
        //if(playerNum == 1) console.log("P1 Leaving: "+P1CostumeIndex);
        //else console.log("P2 Leaving: "+P2CostumeIndex);
    },
    
    decrCostumeIndex: function(playerNum){
        if(playerNum == 1){
            if(P1CostumeIndex - 1 < 0){
               P1CostumeIndex = costume[P1index].length-1;
                if(P2Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.decrCostumeIndex(1);
                }
            }else{
                P1CostumeIndex--;
                if(P2Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.decrCostumeIndex(1);
                }
            }
        }else{
            if(P2CostumeIndex - 1 < 0){
               P2CostumeIndex = costume_2[P2index].length-1;
                if(P1Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.decrCostumeIndex(2);
                }
            }else{
                P2CostumeIndex--;
                if(P1Chose && P2index == P1index){
                    if(P1CostumeIndex == P2CostumeIndex) charSelect.decrCostumeIndex(2);
                }
            }
        }
    }

	

    
};