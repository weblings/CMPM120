var initControls = {

    preload: function() {
	 	
        var jumpSelect1;
        var leftSelect1;
        var rightSelect1;
        var guardSelect1;
        var lightAttackSelect1;
        var heavyAttackSelect1;
        
        var layoutSelect2;
        var leftSelect2;
        var rightSelect2;
        var guardSelect2;
        var lightAttackSelect2;
        var heavyAttackSelect2;
        
        var controls1;
        var controls2;
        var controls1_2;
        var controls2_2;
        var controller1;
        var controller2;
        
        var AButton;
        var joystick;
        var joystick2;
        var Ybutton;
        var Xbutton;
        var Bbutton;
        var BumperL;
        var BumperR;
        var padButtons1;
        
        var P1Jump;
        var P1Left;
        var P1Right;
        var P1Guard;
        var P1Light;
        var P1Heavy;
        var P1Special;
        var P1ControlText;
                
        var AButton2;
        var joystick2_1;
        var joystick2_2;
        var Ybutton2;
        var Xbutton2;
        var Bbutton2;
        var BumperL;
        var BumperR2;
        var padButtons2; 
        
        var P2Jump;
        var P2Left;
        var P2Right;
        var P2Guard;
        var P2Light;
        var P2Heavy;
        var P2Special;
        var PControlText;
        
        var escTweenStarted;
        var escTween;
        var escTween2;
    },
    
    create: function(){
		//console.log("Press ESC to go to CharSelect");
		//PLAYER 1 SELECT
		layoutSelect = game.add.sprite(70, 40, "selectBox");
		
		jumpSelect1 = game.add.sprite(40, 410, "selectBox2");
		jumpSelect1.scale.setTo(.23, .14);
		jumpSelect1.alpha = 0;
		
		leftSelect1 = game.add.sprite(40, 455, "selectBox2");
		leftSelect1.scale.setTo(.21, .14);
		leftSelect1.alpha = 0;
		
		rightSelect1 = game.add.sprite(40, 500, "selectBox2");
		rightSelect1.scale.setTo(.24, .14);
		rightSelect1.alpha = 0;
		
		guardSelect1 = game.add.sprite(40, 545, "selectBox2");
		guardSelect1.scale.setTo(.28, .14);
		guardSelect1.alpha = 0;
		
		lightAttackSelect1 = game.add.sprite(38, 590, "selectBox2");
		lightAttackSelect1.scale.setTo(.52, .14);
		lightAttackSelect1.alpha = 0;
		
		heavyAttackSelect1 = game.add.sprite(28, 635, "selectBox2");
		heavyAttackSelect1.scale.setTo(.9, .14);
		heavyAttackSelect1.alpha = 0;
		
		//PLAYER 2 SELECT
		layoutSelect2 = game.add.sprite(720, 40, "selectBox");
		
		jumpSelect2 = game.add.sprite(720, 410, "selectBox2");
		jumpSelect2.scale.setTo(.23, .14);
		jumpSelect2.alpha = 0;
		
		leftSelect2 = game.add.sprite(720, 455, "selectBox2");
		leftSelect2.scale.setTo(.21, .14);
		leftSelect2.alpha = 0;
		
		rightSelect2 = game.add.sprite(720, 500, "selectBox2");
		rightSelect2.scale.setTo(.24, .14);
		rightSelect2.alpha = 0;
		
		guardSelect2 = game.add.sprite(720, 545, "selectBox2");
		guardSelect2.scale.setTo(.28, .14);
		guardSelect2.alpha = 0;
		
		lightAttackSelect2 = game.add.sprite(710, 590, "selectBox2");
		lightAttackSelect2.scale.setTo(.52, .14);
		lightAttackSelect2.alpha = 0;
		
		heavyAttackSelect2 = game.add.sprite(700, 635, "selectBox2");
		heavyAttackSelect2.scale.setTo(.9, .14);
		heavyAttackSelect2.alpha = 0;
		
		
       controls1 = game.add.sprite(105,60,"control1");
	   controls1.scale.setTo(.75,.75);
	   controls1.alpha = 0;
        
	   controls2 = game.add.sprite(80,50,"control2");
       controls2.scale.setTo(.75,.75);
       controls2.scale.setTo(.75,.75);
	   
	   controls1_2 = game.add.sprite(755,60,"control1");
	   controls1_2.scale.setTo(.75,.75);
	   controls1_2.alpha = 0;
        
	   controls2_2 = game.add.sprite(730,50,"control2");
       controls2_2.scale.setTo(.75,.75);
	   
	   controller1 = game.add.sprite(105,30,"controller");
	   controller1.scale.setTo(.75,.75);
	   controller1.alpha = 0;
	   
	   controller2 = game.add.sprite(755,30,"controller");
	   controller2.scale.setTo(.75,.75);
	   controller2.alpha = 0;
	   
	   sprites = [controls1, controls2, controller1];
	   sprites2 = [controls1_2, controls2_2, controller2];
	   selectBoxes = [layoutSelect, jumpSelect1, leftSelect1, rightSelect1, guardSelect1, lightAttackSelect1, heavyAttackSelect1];
	   selectBoxes2 = [layoutSelect2, jumpSelect2, leftSelect2, rightSelect2, guardSelect2, lightAttackSelect2, heavyAttackSelect2];
	   
	   preset1_1 = ['W', 'A', 'S', 'D', 'E', 'Q', 'E   +   Q'];
	   preset1_2 = ['W', 'A', 'S', 'D', 'E', 'R', 'E   +   R'];
	   
	   preset2_1 = ['O', 'K', 'L', 'COLON', 'I', 'P', 'I   +   P'];
	   preset2_2 = ['O', 'K', 'L', 'COLON', 'I', 'U', 'I   +   U'];
	   
       //Pad Control Images
	   Abutton = game.add.sprite(155, 410-30,"A");
	   Abutton.scale.setTo(.08, .08);
	   
       joystick = game.add.sprite(145, 422, "JoystickL");
	   joystick.scale.setTo(.09, .09);
	   
       joystick2 = game.add.sprite(170, 500-30, "JoystickR");
	   joystick2.scale.setTo(.09, .09);
	  
       Ybutton = game.add.sprite(185, 550-30, "Y");
	   Ybutton.scale.setTo(.08, .08);
	   
       Xbutton = game.add.sprite(300, 595-30, "X");
	   Xbutton.scale.setTo(.08, .08);
	   
       Bbutton = game.add.sprite(475, 640-30, "B");
	   Bbutton.scale.setTo(.08, .08);
       
       BumperL = game.add.sprite(350, 690-25, "bumperL");
       BumperL.scale.setTo(.3,.3);
       
       BumperR = game.add.sprite(465, 690-25, "bumperR");
       BumperR.scale.setTo(.3,.3);
        
       padButtons1 = [Abutton, joystick, joystick2, Ybutton, Xbutton, Bbutton, BumperL, BumperR];
        
       for(let i=0; i < padButtons1.length; i++){
           padButtons1[i].alpha = 0;
       }    
        
	   Abutton2 = game.add.sprite(835, 410-30,"A");
	   Abutton2.scale.setTo(.08, .08);
        
	   joystick2_1 = game.add.sprite(825, 422, "JoystickL");
	   joystick2_1.scale.setTo(.09, .09);
        
	   joystick2_2 = game.add.sprite(850, 500-30, "JoystickR");
	   joystick2_2.scale.setTo(.09, .09);
        
	   Ybutton2 = game.add.sprite(865, 550-30, "Y");
	   Ybutton2.scale.setTo(.08, .08);
        
	   Xbutton2 = game.add.sprite(980, 595-30, "X");
	   Xbutton2.scale.setTo(.08, .08);
        
	   Bbutton2 = game.add.sprite(1155, 640-30, "B");
	   Bbutton2.scale.setTo(.08, .08);
        
       BumperL2 = game.add.sprite(1020, 690-25, "bumperL");
       BumperL2.scale.setTo(.3,.3);
        
       BumperR2 = game.add.sprite(1140, 690-25, "bumperR");
       BumperR2.scale.setTo(.3,.3);
        
       padButtons2 = [Abutton2, joystick2_1, joystick2_2, Ybutton2, Xbutton2, Bbutton2, BumperL2, BumperR2];
        
       for(let i=0; i < padButtons2.length; i++){
           padButtons2[i].alpha = 0;
       } 
	   
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
		
		ESCKey = Phaser.Keyboard.ESC;
		
		P1 = game.add.text(145, 365-30,"PLAYER 1", {fontSize: '35px', fill: '#fff'});
		
		P1Jump = game.add.text(50, 415-30,"JUMP: ", {fontSize: '32px', fill: '#cbdaed'});
		P1JumpButton = game.add.text(160, 415-30,"W", {fontSize: '32px', fill: '#fff'});
		P1JumpButton.alpha = 0;
		
		P1Left = game.add.text(50, 460-30,"LEFT: ", {fontSize: '32px', fill: '#cbdaed'});
		P1LeftButton = game.add.text(155, 460-30,"A", {fontSize: '32px', fill: '#fff'});
		P1LeftButton.alpha = 0;
		
		P1Right = game.add.text(50, 505-30,"RIGHT: ", {fontSize: '32px', fill: '#cbdaed'});
		P1RightButton = game.add.text(165, 505-30,"D", {fontSize: '32px', fill: '#fff'});
		P1RightButton.alpha = 0;
		
		P1Guard = game.add.text(50, 550-30,"GUARD: ", {fontSize: '32px', fill: '#cbdaed'});
		P1GuardButton = game.add.text(185, 550-30,"S", {fontSize: '32px', fill: '#fff'});
		P1GuardButton.alpha = 0;
		
		P1Light = game.add.text(50, 595-30,"LIGHT ATTACK: ", {fontSize: '32px', fill: '#cbdaed'});
		P1LightButton = game.add.text(300, 595-30,"E", {fontSize: '32px', fill: '#fff'});
		P1LightButton.alpha = 0;
		
		P1Heavy = game.add.text(50, 640-30,"HEAVY ATTACK/DIVEKICK: ", {fontSize: '32px', fill: '#cbdaed'});
		P1HeavyButton = game.add.text(480, 640-30,"R", {fontSize: '32px', fill: '#fff'});
		P1HeavyButton.alpha = 0;
        
        P1Special = game.add.text(50, 690-35,"SPECIAL ATTACK: ", {fontSize: '32px', fill: '#cbdaed'});
		P1SpecialButton = game.add.text(360, 690-35,"R   +   E", {fontSize: '32px', fill: '#fff'});
        //P1SpecialButton.alpha = 0;
        
        P1ControlText = [P1Jump, P1Left, P1Right, P1Guard, P1Light, P1Heavy, P1Special];
        P1Keys = [P1JumpButton, P1LeftButton, P1RightButton, P1GuardButton, P1LightButton, P1HeavyButton, P1SpecialButton];
		
		P2 = game.add.text(800, 365-30,"PLAYER 2", {fontSize: '35px', fill: '#fff'});
		
		P2Jump = game.add.text(725, 415-30,"JUMP: ", {fontSize: '32px', fill: '#cbdaed'});
		P2JumpButton = game.add.text(835, 415-30,"O", {fontSize: '32px', fill: '#fff'});
		P2JumpButton.alpha = 0;
		
		P2Left = game.add.text(725, 460-30,"LEFT: ", {fontSize: '32px', fill: '#cbdaed'});
		P2LeftButton = game.add.text(830, 460-30,"K", {fontSize: '32px', fill: '#fff'});
		P2LeftButton.alpha = 0;
		
		P2Right = game.add.text(725, 505-30,"RIGHT: ", {fontSize: '32px', fill: '#cbdaed'});
		P2RightButton = game.add.text(840, 505-30,";", {fontSize: '32px', fill: '#fff'});
		P2RightButton.alpha = 0;
		
		P2Guard = game.add.text(725, 550-30,"GUARD: ", {fontSize: '32px', fill: '#cbdaed'});
		P2GuardButton = game.add.text(860, 550-30,"L", {fontSize: '32px', fill: '#fff'});
		P2GuardButton.alpha = 0;
		
		P2Light = game.add.text(725, 595-30,"LIGHT ATTACK: ", {fontSize: '32px', fill: '#cbdaed'});
		P2LightButton = game.add.text(975, 595-30,"I", {fontSize: '32px', fill: '#fff'});
		P2LightButton.alpha = 0;
		
		P2Heavy = game.add.text(725, 640-30,"HEAVY ATTACK/DIVEKICK: ", {fontSize: '32px', fill: '#cbdaed'});
		P2HeavyButton = game.add.text(1155, 640-30,"U", {fontSize: '32px', fill: '#fff'});
        P2HeavyButton.alpha = 0;
        
        P2Special = game.add.text(725, 690-35,"SPECIAL ATTACK: ", {fontSize: '32px', fill: '#cbdaed'});
		P2SpecialButton = game.add.text(1025, 690-35,"U   +   I", {fontSize: '32px', fill: '#fff'});
        //P2SpecialButton.alpha = 0;
        
        P2ControlText = [P2Jump, P2Left, P2Right, P2Guard, P2Light, P2Heavy, P2Special];
        P2Keys = [P2JumpButton, P2LeftButton, P2RightButton, P2GuardButton, P2LightButton, P2HeavyButton, P2SpecialButton];
    
        //Making Xbox Default for Sammy Demo
        layoutSelect.alpha = 0;
                
        layoutSelect2.alpha = 0;
        
        //Controllers
        var pad1;
        var pad2;
        var padControl1;
        var padControl2;
        
        ContinuingText = game.add.text(game.world.width/2-20,50,"PUSH ESC TO GO BACK", {fontSize: '16px', fill: '#fff'});
        ContinuingText.anchor.setTo(.5,.5);
        
        BButton3 = game.add.sprite(592,46,'B');
        BButton3.anchor.setTo(.5,.5);
        BButton3.scale.setTo(.07,.07);
        BButton3.alpha = 0;

        
        this.timer = new setTime();
        this.timer.startTimer('controlExit', 20000);
        
        escTweenStarted = false;

    },

    update: function(){
        
        //Detect Controls
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
        
        if((padControl1 || padControl2) && !escTweenStarted){
            ContinuingText.text = "PUSH          TO GO BACK"
            BButton3.alpha = 1;
            escTween = game.add.tween(ContinuingText).to( { alpha: 0 }, 600, "Linear", true, 600);
            escTween.yoyo(true,600).loop();
            escTween2 = game.add.tween(BButton3).to( { alpha: 0 }, 600, "Linear", true, 600);
            escTween2.yoyo(true,600).loop();
            escTweenStarted = true;
        }else if(!escTweenStarted){
            escTween = game.add.tween(ContinuingText).to( { alpha: 0 }, 600, "Linear", true, 600);
            escTween.yoyo(true,600).loop();
            escTweenStarted = true;
        }
        
        if(padControl1){
            //startButton.alpha = 1;
            
            controls2.alpha = 0;
            sprites[2].alpha = 1;
            P1JumpButton.text = "A";
            P1LeftButton.text = "MOVE LEFT";
            P1RightButton.text = "MOVE RIGHT";
            P1GuardButton.text = "Y";
            P1LightButton.text = "X";
            P1HeavyButton.text = "B";
            P1SpecialButton.text = "        +  ";
            
            for(let i=0; i < padButtons1.length; i++){
                padButtons1[i].alpha = 1;
            }    
            
            for(let i=0; i < P1ControlText.length; i++){
                P1ControlText[i].fill = '#fff';       
            } 
            
            if(pad1.isDown(Phaser.Gamepad.XBOX360_B)){
                main_music.mute = true;
			     game.state.start('title');
            }
        }else{
            for(let i=0; i < P1Keys.length; i++){
                P1Keys[i].text = preset1_2[i];
                P1Keys[i].alpha = 1;
            }
        }
        
        if(padControl2){
            //startButton.alpha = 1;
            
            layoutSelect2.alpha = 0;
            controls2_2.alpha = 0;
            sprites2[2].alpha = 1;
            P2JumpButton.text = "A";
            P2LeftButton.text = "MOVE LEFT";
            P2RightButton.text = "MOVE RIGHT";
            P2GuardButton.text = "Y";
            P2LightButton.text = "X";
            P2HeavyButton.text = "B";
            P2SpecialButton.text = "         +  ";
            
            for(let i=0; i < padButtons2.length; i++){
                padButtons2[i].alpha = 1;
            } 
            
            for(let i=0; i < P2ControlText.length; i++){
                P2ControlText[i].fill = '#fff';       
            } 
            
            if(pad2.isDown(Phaser.Gamepad.XBOX360_B)){
                main_music.mute = true;
			     game.state.start('title');
            }
        }else{
            for(let i=0; i < P2Keys.length; i++){
                P2Keys[i].text = preset2_2[i];
                P2Keys[i].alpha = 1;
            }
        }

        //keyboard
        if(game.input.keyboard.justPressed(ESCKey)){
            main_music.mute = true;
			game.state.start('title',false);
		}
    }
}