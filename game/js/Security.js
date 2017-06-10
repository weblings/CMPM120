Security = function(game, key, x, y, playerNum,costumeIndex,french){
    Phaser.Sprite.call(this, game, x, y, key, playerNum,costumeIndex,french);
    
    this.alpha = 0;//0.5;
    this.anchor.y = 1;

    //Vars
    this.charName = "SECURITY";
    this.playerNum = playerNum; //Player number
    //this.copy = dup;
    this.speed = 50; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    this.maxSpeed = 550;
    this.diveLimit = 400;

    this.jumpHeight = -1550; //AG: was -350 but players couldn't jump over eachother to test collision on multiple sides
    this.floorLevel = game.world.height - 20;

    //Animations
    
    this.specialEmitter = game.add.emitter(0, 0, 100);
    this.specialEmitter.makeParticles('security_blood');
    game.physics.enable(this.specialEmitter);
    this.specialEmitter.enableBody = true;
    this.specialEmitter.blendMode = 1;
    this.specialEmitter.alpha = 0.75;
    
    //this.char = game.add.sprite(this.position.x, this.position.y, 'security_idle');
    if(this.playerNum == 1){
        if(costumeIndex == 0){
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlasP');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlas');
            this.idleFrame = 10;
            this.downedFrame = 5;
            this.blockFrame = 4;
            this.diveFrame = 11;
        }else if(costumeIndex == 1){
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlas2P');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlas2');
            this.idleFrame = 0;
            this.downedFrame = 8;
            this.blockFrame = 7;
            this.diveFrame = 1;
        }
        /*this.idleFrame = 10;
        this.downedFrame = 5;
        this.blockFrame = 4;
        this.diveFrame = 11;*/
        //this.bottleFrame = 2;
        //this.uiFrame = 3;
        this.char.frame = this.idleFrame;
        this.char.animations.add('security_stagger',Phaser.Animation.generateFrameNames('security_guard_stagger',1,2,'',1), 10, false);
        this.char.animations.add('security_light',Phaser.Animation.generateFrameNames('security_guard_light_attack',1,2,'',1), 10, false);
        this.char.animations.add('security_heavy_cast',Phaser.Animation.generateFrameNames('security_guard_heavy',1,2,'',1), 10, false);
        this.char.animations.add('security_heavy_attack',Phaser.Animation.generateFrameNames('security_guard_heavy',3,4,'',1), 10, false);
    }else{
        if(costumeIndex == 0){
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlasP');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlas');
            this.idleFrame = 10;
            this.downedFrame = 5;
            this.blockFrame = 4;
            this.diveFrame = 11;
        }else if(costumeIndex == 1){
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlas2P');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'security_atlas2');
            this.idleFrame = 0;
            this.downedFrame = 8;
            this.blockFrame = 7;
            this.diveFrame = 1;
        }
        /*this.idleFrame = 0;
        this.downedFrame = 8;
        this.blockFrame = 7;
        this.diveFrame = 1;*/
        //this.bottleFrame = 2;
        //this.uiFrame = 3;
        this.char.frame = this.idleFrame;
        this.char.animations.add('security_stagger',Phaser.Animation.generateFrameNames('security_guard_stagger',1,2,'',1), 10, false);
        this.char.animations.add('security_light',Phaser.Animation.generateFrameNames('security_guard_light_attack',1,2,'',1), 10, false);
        this.char.animations.add('security_heavy_cast',Phaser.Animation.generateFrameNames('security_guard_heavy',1,2,'',1), 10, false);
        this.char.animations.add('security_heavy_attack',Phaser.Animation.generateFrameNames('security_guard_heavy',3,4,'',1), 10, false);
    }
    this.isFrench = french;

    //gamepad
    game.input.gamepad.start();
    if (this.playerNum==1){
        this.pad1 = game.input.gamepad.pad1;
    }else{
        this.pad1 = game.input.gamepad.pad2;
    }
    this.padControl = false;

    this.scaleFactor = 1;
    this.char.scale.setTo(this.scaleFactor,this.scaleFactor);
    this.char.anchor.x = 0.5;
    this.char.anchor.y = 1
    
    //AG: Heavy state shaking
    this.char.xPosPreShake;
    this.char.yPosPreShake;

    /*
    //body hitbox
    this.hitboxes = game.add.physicsGroup();
    this.hitbox = game.add.sprite(this.position.x,this.position.y,'hitbox');
    this.hitbox.scale.setTo(0.25,0.25);
    //this.hitbox.anchor.x = 0.5;
    //this.hitbox.anchor.y = 0.5;
    this.hitboxes.add(this.hitbox);
    */

    //particle
    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('security_blood');
    game.physics.enable(this.emitter);
    this.emitter.enableBody = true;
    this.emitter.blendMode = 2;
    this.emitter.alpha = 0.8;

    this.icecube = game.add.sprite(this.position.x, this.position.y, 'frozen_ice');


    
    this.icecube.anchor.setTo(0.5, 1);
    this.icecube.scale.setTo(0.15,0.25);
    this.icecube.exists = false;

    //Physics
    game.physics.enable(this);
    this.gravFactor = 3000;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    this.body.gravity.y = this.gravFactor;
    
    //AG: Scale to find character sizing

    //this.scale.setTo(1.05,0.50);
    this.scale.setTo(.5,.65);
    this.anchor.x = 0.5;
    //this.anchor.y = 0.5;


    //animation stuff NH
    this.prev_anim = 0;
    this.anim_lock = false;
    this.faceRIGHT = false;
    
    //Health stuff
    this.setHealth(100);
    this.shamed = false; //keeps Phaser from triggering damage more than we want
    this.staggered = false; //immobilizes player;

    //Debug text and health bars
    this.healthBarScaleMaster = 1; //used to scale bars
    this.healthBarHeight = 42;
    this.specialBarScaleMaster = 0;
    this.specialHappening = false;
    this.specialsThrown = 0;
    if(playerNum == 1){
        this.debugText = game.add.text(16,16,'', {fontSize: '32px', fill: '#000000'});
        this.healthBar = game.add.image(20,this.healthBarHeight,'health_full');
        this.specialEmpty = game.add.image(40,112,'special_empty');
        this.specialBar = game.add.image(40,112,'special_full');
        this.specialBar.scale.setTo(0,1);
        this.specialUsed = game.add.image(40,112,'special_used');
        this.specialUsed.alpha = 0;
    }else{ //playerNum == 2
        this.debugText = game.add.text(game.width - 100,16,'', {fontSize: '32px', fill: '#000000'});
        this.healthBar = game.add.image(game.width-470,this.healthBarHeight,'health_full');
        this.specialEmpty = game.add.image(game.width-40,112,'special_empty');
        this.specialEmpty.anchor.setTo(1,0);
        this.specialBar = game.add.image(game.width-40,112,'special_full');
        this.specialBar.anchor.setTo(1,0);
        this.specialBar.scale.setTo(0,1);
        this.specialUsed = game.add.image(game.width-40,112,'special_used');
        this.specialUsed.anchor.setTo(1,0);
        this.specialUsed.alpha = 0;        
    }
    

    //AG: Player input
    this.keyLeft;
    this.keyRight;
    this.keyUp;
    this.keyDown;
    this.keyA; //AG: standard attack button 
    this.keyB; //AG: special attack button
    
    this.uiX; //AG: Where UI element will go
    
    //AG: set keys based on player number
    if(this.playerNum == 1){
        this.keyLeft = Phaser.Keyboard.A;
        this.keyRight = Phaser.Keyboard.D;
        this.keyUp = Phaser.Keyboard.W;
        this.keyDown = Phaser.Keyboard.S;
        this.keyA = Phaser.Keyboard.E; //R
        this.keyB = Phaser.Keyboard.R; //T
        this.prev_anim =1;
        this.faceRIGHT = true; //for Spawning
        this.char.scale.x = -1*this.scaleFactor;
        this.uiX = 10;
    }else if(this.playerNum == 2){ 
        this.keyLeft = Phaser.Keyboard.K;
        this.keyRight = Phaser.Keyboard.COLON;
        this.keyUp = Phaser.Keyboard.O;
        this.keyDown = Phaser.Keyboard.L;
        this.keyA = Phaser.Keyboard.I;//Phaser.Keyboard.OPEN_BRACKET;
        this.keyB = Phaser.Keyboard.U;//Phaser.Keyboard.CLOSED_BRACKET;
        this.prev_anim =0;
        this.uiX = this.game.world.width - 60;
    }

    //hitbox stuff
    this.fists = game.add.physicsGroup();
    this.fist = fist = game.add.sprite(this.position.x,this.position.y,'fist');
    this.fist.scale.setTo(0.25,0.25);
    this.fist.anchor.x = 0.5;
    this.fist.anchor.y = 0.5;
    this.fists.add(this.fist);
    this.fist.exists = false;

    this.fist.alpha = 0;


    //projectile
    this.bullets = game.add.group(); //= game.add.sprite(this.position.x,this.position.y,'player');
    this.specialBullets = game.add.group();
    
    //Special
    this.specialstart = false;
    this.possibleThrowingObjects = ['logo','rabbit_ID','guard_ID','scorp_ID','controller','A','B','X','Y','Start_Button','Joystick_Left','beret1','beret2','beret3','beret4','moustache1','moustache2','moustache3','moustache4','bg'];
	
	
    //set timer
    this.timer = new setTime();

    

    //state change stuff
    //an experiment NH
    this.changeState(this.input);

    //action
    //booleans to use later
    this.action = {}
    this.action.jump = false;
    this.action.block = false;
    this.action.attacking = false;
    this.action.divable = false;
    this.action.dive = false;
    this.action.cancel = false;
    this.action.perfectguard =false;

    this.action.down = false;
    this.action.noCollide =false;

    this.action.stagfall = false;

    this.action.iced = false;

    //down stuff NH
    this.downCount = 0;
    this.downFactor = 700;
    
    //AG: Knockback stuff
    this.inLightAttack = false;
    this.inHeavyAttack = false;
    this.inSpecial = false;
    this.touchLeftWallAt = 62.5;
    this.touchRightWallAt = 1217.5;
    this.hitAgainstWall = false;
    
    this.introFinished = false; //AG: Intro in Main finished

    //misc.
    this.canLightAttack = true;
    this.lightRate = 200;
    this.reloadRate = 400;

    this.chainLocation = 0;
    //this.loaded = true; //AG: can fire another projectile
    
    //ui light attack element
    /*this.ui = game.add.sprite(this.uiX, 105, 'security_atlas');
    this.ui.frame = this.uiFrame;
    this.ui.scale.setTo(.5,.5);*/
    
    //Sounds
    this.lightSound = game.add.audio('throw'); //AG: TO-DO: Get throwing sound
    this.heavySound = game.add.audio('heavy');
    this.heavyChargeSound = game.add.audio('heavy_charge');
    this.jump_sound = game.add.audio('jump_sound');
    this.block_sound = game.add.audio('block');
    this.perfect_block_sound = game.add.audio('perfect_block');
    this.special_sound = game.add.audio('super');

    
    this.heavyChargeSoundPlayed = false;
    this.heavySoundPlayed = false;
    this.attackHit = false;
    
    this.missVolume = .6;
    
    this.lightSound.volume = this.missVolume;
    this.heavySound.volume = this.missVolume;
}



Security.prototype = Object.create(Phaser.Sprite.prototype);
Security.prototype.constructor = Player;

//state to clear state stuff NH
//basically reset stuff every frame
Security.prototype.preState =function (){


    //reset hitbox
    /*
    this.hitbox.position.x = this.position.x +25;
    this.hitbox.position.y = this.position.y +70;
    */
    this.char.position.x = this.position.x ;
    this.char.position.y= this.position.y+50;//18; //AG: Trying to lower character

    if (this.state == this.input){
        this.action.attacking = false;
    }

    //this value needs to be changed when art is finalized NH
    if (!this.action.attacking){
        this.fist.exists = false;
        this.fist.position.x = this.position.x;
        this.fist.position.y = this.position.y-50;
    }
    
    
    
    if (this.position.y > this.floorLevel){
        this.position.y = this.floorLevel;
    }
    

    if (this.staggered && !this.action.block){
        this.char.animations.play('security_stagger');
    }
    
    //cancel velocity when not in input
    //might be the reason why dive kick is so slow
    //also the reason why down does not move in x NH
    if (this.state != this.input && this.state != this.downed && this.state != this.dead ){
        this.body.velocity.x = 0;
    }
    if (this.state != this.lightAttack){
        //light attack reset
        this.fist.position.x = -300; //AG: Was at this.position.x; Moving offscreen so doesn't collide when not active
        this.fist.position.y = this.position.y;
        if (this.position.y < this.diveLimit){
            this.body.gravity.y = this.gravFactor*2;
        }else {
            this.body.gravity.y = this.gravFactor;
        }
    }

    if (this.state != this.heavyAttack){
        this.fist.scale.x = 0.25;
        this.action.dive = false;
    }

    //check if in air
     if (this.position.y != this.floorLevel){
        this.action.jump = true;
         this.maxSpeed = 200;
    }else{
        this.action.jump = false;
        //this.canLightAttack = true;
        this.maxSpeed = 550;
    }
    
    //AG: Pasted from Scorpion for downed state
    if (!this.action.jump && this.action.down){
        this.body.velocity.x = 0;
    }

    //might need some changes here NH
    if (!this.timer.timerDone('downed') && this.action.down){
         //insert sprite change here
         this.char.frame = this.downedFrame;
         //this.action.down = false;
    }

    if (this.timer.timerDone('downed') && this.action.down){
        this.action.down = false;
        this.changeState(this.input);
    }

    if (this.timer.timerDone('downWindow')){
         //insert sprite change here
         this.downCount = 0;
    }

    if (this.downCount >= 3){
        if (!this.staggered && !this.action.jump){
            this.changeState(this.downed);
            this.timer.startTimer('downed', this.downFactor*2);
            this.timer.startTimer('forcedDown', this.downFactor);
            this.downCount = 0;
        }
    }

    if (!this.alive){
        this.heavyChargeSoundPlayed = false;
        this.heavyChargeSound.stop();
        this.changeState(this.dead);
    }

    if (game.input.gamepad.supported && game.input.gamepad.active && this.pad1.connected){
        this.padControl = true;
    }
    else{
        this.padControl = false;
    }

    if(this.action.iced){
        this.icecube.exists = true;
        this.icecube.position.x = this.char.position.x;
        this.icecube.position.y = this.char.position.y;
    }else{
        this.icecube.exists = false;
    }
    
}


// function to change states e.g. this.changeState(this.otherState)
Security.prototype.changeState = function(currentState){
    this.state = currentState;
}


Security.prototype.update = function(){
    //reset some stuff
    this.preState();
    //current state NH
    this.state();
}


//unneeded probably safe to delete NH
Security.prototype.fisting = function(x,y){
    var fist = game.add.sprite(x,y,'fist');
    fist.scale.setTo(0.25,0.25);
    this.fists.add(fist);

}

Security.prototype.dead = function(){
    if (!this.staggered && !this.action.jump){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    this.fist.exists = false;
    
    this.char.frame = this.downedFrame;
}

Security.prototype.downed = function(){
     this.action.down = true;
     this.action.attacking = false;
     this.action.dive = false;
     
     //set timer down max down time
     //this.timer.startTimer('downed', 2500);
 
     if (this.padControl){
        if ((this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
            || this.pad1.isDown(Phaser.Gamepad.XBOX360_X) || this.pad1.isDown(Phaser.Gamepad.XBOX360_Y) ||
            this.pad1.isDown(Phaser.Gamepad.XBOX360_A) || this.pad1.isDown(Phaser.Gamepad.XBOX360_B) && this.timer.timerDone('forcedDown')){
            this.action.down = false;
            this.changeState(this.input);
        }


     }else{
 
         if ((game.input.keyboard.isDown(this.keyUp) || game.input.keyboard.isDown(this.keyDown) ||
            game.input.keyboard.isDown(this.keyLeft) || game.input.keyboard.isDown(this.keyRight) ||
            game.input.keyboard.isDown(this.keyA) || game.input.keyboard.isDown(this.keyB)) && this.timer.timerDone('forcedDown')){
            this.action.down = false;
            this.changeState(this.input);
         }
    }
 
     
}

//--States--//

Security.prototype.lightAttack = function(){
    dir = this.faceRIGHT;

    if (!this.action.attacking){//(this.timer.timerDone('light2') && !this.action.attacking){ 
        this.fist.position.x = -300; //AG: Keeps fist offscreen
        this.action.attacking = true;
        this.inLightAttack = true; //AG: Adding for knockback
        this.projectile(); //launches projectile
        this.char.animations.play('security_light');
        //this.ui.alpha = 0;
        if(!this.attackHit){
            this.lightSound.play();
        }
    }

    
    /*if (this.timer.timerDone('light2')){
        this.char.loadTexture('security_A2'); //Second animation frame
    }*/
    
    if (this.timer.timerDone('light')){
        this.char.frame = this.idleFrame;
        this.changeState(this.input);
        this.action.attacking = false;
        this.canLightAttack = false;
        this.inLightAttack = false; //AG: Adding for knockback
    }
        
}

Security.prototype.heavyAttack = function(){
    this.fist.exists = true;

     if (this.action.jump){
        //dive kick
        if ( this.action.divable){
            this.fist.exists = false;
            this.char.frame = this.diveFrame;

        
            this.body.velocity.y = 1500;
            if (this.faceRIGHT){
                this.body.velocity.x = 750;
            }else{
                this.body.velocity.x = -750;
            }
            this.action.attacking = true;
            this.action.dive = true;

        }else{
            this.changeState(this.input);
        }
        //this.action.noCollide = true;
        
    }else{
        //reset velocity
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (!this.action.attacking && !this.action.dive){
            this.char.animations.play('security_heavy_cast');
            this.action.cancel = true;
            this.action.attacking = true;
            this.inHeavyAttack = true; //AG: Adding for knockback
            this.char.xPosPreShake = this.char.position.x;
            this.char.yPosPreShake = this.char.position.y;
        }


        if(this.padControl){
            if (this.action.cancel == true && this.pad1.justPressed(Phaser.Gamepad.XBOX360_A)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.body.velocity.y = this.jumpHeight;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback
            }else if(this.action.cancel == true && this.pad1.justPressed(Phaser.Gamepad.XBOX360_Y)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback

            }
        }else{

            if (this.action.cancel == true && game.input.keyboard.isDown(this.keyUp)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.body.velocity.y = this.jumpHeight;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback
            }else if(this.action.cancel == true && game.input.keyboard.isDown(this.keyDown)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback

            }
        }
        
        if(!this.timer.timerDone('heavy_cast') && !this.action.dive){
            this.char.position.x = this.char.xPosPreShake + game.rnd.between(-1,1);
            this.char.position.y = this.char.yPosPreShake + game.rnd.between(-1,1);
            if(!this.heavyChargeSoundPlayed){
                this.heavyChargeSound.loop = true;
                this.heavyChargeSound.play();
                this.heavyChargeSoundPlayed = true;
            }
        }

        if (this.timer.timerDone('heavy_cast') && !this.action.dive){
            //AG: Reset to positions before shaking
            this.char.position.x = this.char.xPosPreShake;
            this.char.position.y = this.char.yPosPreShake;
            
            //can cancel out of attack NH
            this.action.cancel = false;
            this.char.animations.play("security_heavy_attack");
            if(!this.heavySoundPlayed){
                this.heavyChargeSoundPlayed = false;
                this.heavyChargeSound.stop();
                if(!this.attackHit) this.heavySound.play();
                this.heavySoundPlayed = true;
            }
            
            this.fist.position.x = this.position.x; //AG: Brings fist back on screen
            var fistYScale = 1;
            var fistXScale = .4;
            var fistYPosOffset = 150;
            
            if (this.faceRIGHT){
                this.fist.scale.x = fistXScale;//1;
                this.fist.scale.y = fistYScale;
                this.fist.position.x += 125;//250;
                this.fist.position.y -= fistYPosOffset;
            }else{
                this.fist.scale.x = fistXScale;//1;
                this.fist.scale.y = fistYScale;
                this.fist.position.x -= 125;//250;
                this.fist.position.y -= fistYPosOffset;
            }
            
        }



        if (this.timer.timerDone('heavy') && !this.action.dive){
            this.action.dive = true;
            this.heavySoundPlayed = false;
        }


            
        if (this.action.attacking && this.action.dive){
            this.action.attacking = false;
            this.action.dive = false;
            this.action.cancel = false;
            this.changeState(this.input);
            this.inHeavyAttack = false; //AG: Adding for knockback
            this.action.divable = false;
        }
        
    }
    
}

Security.prototype.special = function(){
    //AG: HealthBar handling
    if(this.specialBar.width == 315 || this.specialHappening){ //If first time damaged
        
        if(!this.specialHappening) this.special_sound.play(); //AG: Need to put this in another timer/boolean flag fixture to make it not play multiple times and sound like shit

        this.specialHappening = true;

        this.inSpecial = true;
        if (this.action.jump ){
            this.body.gravity.y = 0;
            this.body.velocity.y =0 ;
        }


        if (!this.action.attacking || timer.timerDone('specFire')){
            if(!this.action.attacking){
                this.specialEmitter.x = this.position.x;
                this.specialEmitter.y = this.position.y-75;
                this.specialEmitter.minParticleScale = 7;
                this.specialEmitter.maxParticleScale = 7;
                this.specialEmitter.start(true, 2000, null, 10);
            }   
            if(this.specialsThrown < 4){
                timer.startTimer('specFire',300)
                this.fist.position.x = -300; //AG: Keeps fist offscreen
                this.action.attacking = true;
                this.inSpecial = true; //AG: Adding for knockback
                this.specialProjectile(); //launches projectile
                this.char.animations.play('security_light');
                //this.ui.alpha = 0;
                if(!this.attackHit){
                    this.lightSound.play();
                }
            }
        }
        
        this.action.attacking = true;

        /*if (this.timer.timerDone('light')){
            this.char.frame = this.idleFrame;
            this.changeState(this.input);
            this.action.attacking = false;
            //this.canLightAttack = false;
            //this.inLightAttack = false; //AG: Adding for knockback
        }*/
        
        /*if (this.faceRIGHT){
            this.chain.scale.x = -0.7;
            var mir = 1;
        }else{
            this.chain.scale.x = 0.7;
            var mir = -1;
        }

        if (this.specialstart){
            if (this.timer.timerDone('specialCharge')){
                this.fist.exists = true;
                this.chain.exists = true;
                this.chain.position.x = this.position.x;
                this.chain.position.y = this.position.y;
                this.chain.play('scorpion_special');
                this.specialstart = false;
            }
            this.specialEmitter.x = this.position.x;
            this.specialEmitter.y = this.position.y-75;
            this.specialEmitter.start(true, 2000, null, 10);

        }else{
            if(this.faceRIGHT){
                if (this.fist.position.x - this.position.x < 735){
                    this.fist.position.x += (mir*35);
                }

            }else{
                if (this.position.x - this.fist.position.x < 735){
                    this.fist.position.x += (mir*35);
                }

            }


        }*/

        if (this.timer.timerDone('spec')){// || this.chainHit){

            this.specialHappening = false;
            /*if (this.chainHit){
                this.chain.animations.stop();
                this.timer.startTimer('chainFreeze', 500);
                this.changeState(this.chainBuffer);
                this.action.attacking = false;
                this.fist.exists = false;
                this.chainHit = false;
                this.inSpecial = false;*/

            //}else{
                this.char.frame = this.idleFrame;
                this.changeState(this.input);
                this.inSpecial = false;
                this.specialsThrown = 0;
                /*this.chain.exists = false;
                this.action.attacking = false;
                this.fist.exists = false;
                this.chainHit = false;
                

            }*/

        }
    

        //this.specialBarScaleMaster = 1 - ((damage*def)/100);
        //console.log(this.specialBarScaleMaster);
        //this.specialBar.scale.x *= this.specialBarScaleMaster;
        this.specialUsed.alpha = 1;
        this.specialBarScaleMaster = 0;
        this.specialBar.scale.setTo(this.specialBarScaleMaster,1);
        this.fullTween.stop();
        game.add.tween(this.specialUsed).to( { alpha: 0 }, 50, "Linear", true, 200);
    }else{
        this.changeState(this.input);
    }
    
}

//AG: Enter decimals
Security.prototype.addToSpecialBar = function(amount){
    if(this.specialBarScaleMaster + amount >= 1){
        if(this.specialBarScaleMaster != 1) this.specialFullAnimation();
        this.specialBarScaleMaster = 1;
    }else this.specialBarScaleMaster += amount;
    
    this.specialBar.scale.setTo(this.specialBarScaleMaster,1);
}

Security.prototype.specialFullAnimation = function(){
    //this.specialUsed.alpha = 1;
    this.fullTween = game.add.tween(this.specialUsed).to( { alpha: 0.3 }, 300, "Linear", true, 300);
    this.fullTween.yoyo(true,300).loop();
}

Security.prototype.chained = function(location){
    //this.action.chained = false;
    this.action.dive = false;
    if (!this.action.block){
        this.timer.startTimer('chainStun', 500);
        this.chainLocation = location;
        this.changeState(this.chainStop);

    }
    

}

Security.prototype.chainStop = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (this.timer.timerDone('chainStun')){
        this.position.x = this.chainLocation;
        this.changeState(this.input);

    }
}

Security.prototype.frozenStun = function(){
    this.action.dive = false;
    if (!this.action.block){
        this.timer.startTimer('frozenStun', 2500);
        this.changeState(this.frozenStop);
        this.action.iced = true;

    }

}

Security.prototype.frozenStop = function(){
    this.body.velocity.x = 0;
    //this.body.velocity.y = 0;
    this.action.iced = true;
    this.action.attacking = false;
    if(this.timer.timerDone('shamed')){
        this.shamed = false;
    }
    if (this.timer.timerDone('frozenStun')){
        this.action.iced = false;
        this.changeState(this.input);
    }

}


//projectile
Security.prototype.projectile = function(){
    var choice = game.rnd.between(0,1);
    var bullet;
    if(!this.isFrench){
        if(choice == 0){
            bullet = game.add.sprite(this.position.x,this.position.y-200,'water_bottle');//water_bottle'); //'player');
            //bullet.frame = 2;
        }else if(choice == 1){
            bullet = game.add.sprite(this.position.x,this.position.y-200,'pepsi');//water_bottle'); //'player');
            //bullet.frame = 5;
        }
        bullet.scale.setTo(0.04,0.04);
    }else{
        if(choice == 0){
            bullet = game.add.sprite(this.position.x,this.position.y-200,'croissant');//water_bottle'); //'player');
            //bullet.frame = 2;
        }else if(choice == 1){
            bullet = game.add.sprite(this.position.x,this.position.y-200,'eiffel');//water_bottle'); //'player');
            //bullet.frame = 5;
        }
        bullet.scale.setTo(0.1,0.1);
    }
    bullet.anchor.setTo(0.5,0.5);
    this.bullets.add(bullet);
    //console.log("In Security: "+this.bullets.length);
    game.physics.arcade.enable(bullet);
    bullet.startLocation = this.position.x;
    var projectileSpeed = 800;

    if (this.faceRIGHT){
        bullet.body.velocity.x = projectileSpeed;
        bullet.body.angularVelocity = 800;
        bullet.headingRight = true;
    }else{
        bullet.body.velocity.x = -projectileSpeed;
        bullet.body.angularVelocity = -800;
        bullet.headingRight = false;
    }

    
}

//projectile
Security.prototype.specialProjectile = function(){
    this.specialsThrown++;
    //console.log("st: "+this.specialsThrown);
    //console.log(this.possibleThrowingObjects.length);
    //if(this.specialsThrown != 4){
        var choice = game.rnd.between(0,this.possibleThrowingObjects.length-1);
        //console.log("choice:"+choice);
        var bullet = game.add.sprite(this.position.x,this.position.y-200,this.possibleThrowingObjects[choice]);
        bullet.scale.setTo(.2,.2);
    /*}else{
        var bullet = game.add.sprite(this.position.x,this.position.y-200,'bg');
        bullet.scale.setTo(.15,.15);
    }*/
    
    bullet.anchor.setTo(0.5,0.5);
    this.specialBullets.add(bullet);
    game.physics.arcade.enable(bullet);
    bullet.startLocation = this.position.x;
    var projectileSpeed = 800;

    if (this.faceRIGHT){
        if(this.specialsThrown == 2) bullet.body.velocity.y = -projectileSpeed/3;
        else if(this.specialsThrown == 3) bullet.body.velocity.y = -projectileSpeed/1.5;
        bullet.body.velocity.x = projectileSpeed;
        bullet.body.angularVelocity = 200;
        bullet.headingRight = true;
    }else{
        if(this.specialsThrown == 2) bullet.body.velocity.y = -projectileSpeed/3;
        else if(this.specialsThrown == 3) bullet.body.velocity.y = -projectileSpeed/1.5;
        bullet.body.velocity.x = -projectileSpeed;
        bullet.body.angularVelocity = -200;
        bullet.headingRight = false;
    }

    
}

Security.prototype.killBullets = function(b){
    var killLocation = 600;
    if (b.headingRight){
        if (b.position.x - b.startLocation > killLocation){
            b.destroy();//kill();
        }
    }else{
        if (b.startLocation - b.position.x > killLocation){
            b.destroy();//kill();
        }
    }
}

Security.prototype.killSpecialBullets = function(b){
    var killLocation = 1800;
    if (b.headingRight){
        if (b.position.x - b.startLocation > killLocation){
            b.destroy();//kill();
        }
    }else{
        if (b.startLocation - b.position.x > killLocation){
            b.destroy();//kill();
        }
    }
}

//Should make player take Damage
Security.prototype.takeDamage = function(damage,staggerLength){
    var def = 1;
    if(!this.shamed){
        if (this.action.block){
            if (!this.timer.timerDone('perfectguard')){
                def = 0;
                this.perfect_block_sound.play();
            }else{
                def = 0.2;
                this.block_sound.play();
            }
        }else if (this.action.down){
            def = 0;
        }
        if(this.health - damage*def < 0){
            this.health = 0;
            this.alive = false;
        }else this.damage(damage*def);
        this.addToSpecialBar((damage*def)/100);
        this.shamed = true;
        this.staggered = true;
        
        //count for down NH
        if (!this.action.block && !this.action.down && !this.action.iced){
            this.timer.startTimer('downWindow',2000);
            if (!this.inHeavyAttack){
                this.downCount++;
            }else{
                this.staggered = false;
            }
            
            this.emitter.x = this.position.x;
            this.emitter.y = this.position.y-200;
            this.emitter.start(true, 2000, null, 10);
        }
        
        //AG: HealthBar handling
        if(this.healthBar.width == 450){ //If first time damaged
            this.healthBarScaleMaster = 1 - ((damage*def)/100);
            console.log(this.healthBarScaleMaster);
            this.healthBar.scale.x *= this.healthBarScaleMaster;
            if(this.playerNum == 2){
                this.damageBar = game.add.image(game.width-470,this.healthBarHeight,"health_empty");
                this.damageBar.scale.x *= (damage*def)/100;
                this.healthBar.x = this.damageBar.x + this.damageBar.width;
                //Red from hit
                var damaged = game.add.image(game.width-470,this.healthBarHeight,"health_damage");
                damaged.scale.x *= (damage*def)/100;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }else{ //playerNum == 1
                var calcDamageX = this.healthBar.x + this.healthBar.width;
                this.damageBar = game.add.image(calcDamageX,this.healthBarHeight,"health_empty");
                this.damageBarScaledMaster = 0;
                this.damageBar.scale.x *= (damage*def)/100;
                this.damageBarScaledMaster += this.damageBar.scale.x;
                //Red from hit
                var damaged = game.add.image(calcDamageX,this.healthBarHeight,"health_damage");
                damaged.scale.x *= (damage*def)/100;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }
        }else if(this.health != 0){ //subsequent times
            var newScaler = (damage*def)/100;
            this.healthBarScaleMaster -= newScaler;
            this.healthBar.scale.x = 1;
            this.healthBar.scale.x *= this.healthBarScaleMaster;
            if(this.playerNum == 2){
                var oldDamageEnd = this.damageBar.x + this.damageBar.width;
                this.damageBar.scale.x = 1;
                this.damageBar.scale.x *= 1 - this.healthBarScaleMaster;
                this.healthBar.x = this.damageBar.x + this.damageBar.width;
                //Red from hit
                var damaged = game.add.image(oldDamageEnd,this.healthBarHeight,"health_damage");
                damaged.scale.x *= newScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }else{ //playerNum == 1
                var calcDamageX = this.healthBar.x + this.healthBar.width;
                this.damageBar.x = calcDamageX;
                this.damageBar.scale.x = 1;
                this.damageBar.scale.x *= 1 - this.healthBarScaleMaster;
                //Red from hit
                var damaged = game.add.image(calcDamageX,this.healthBarHeight,"health_damage");
                damaged.scale.x *= newScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear",true, 800); 
            } 
        }else{ //if health = 0
            var lastScaler = this.healthBarScaleMaster;
            this.healthBar.scale = 0;
            if(this.playerNum == 2){
                var oldDamageEnd = this.damageBar.x + this.damageBar.width;
                this.damageBar.scale.x = 1;
                //Red from hit
                var damaged = game.add.image(oldDamageEnd,this.healthBarHeight,"health_damage");
                damaged.scale.x *= lastScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }else{ //playerNum == 1
                this.damageBar.x = 20;
                this.damageBar.scale.x = 1;
                //Red from hit
                var damaged = game.add.image(20,this.healthBarHeight,"health_damage");
                damaged.scale.x *= lastScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear",true, 800); 
            } 
        }
    }
    //this.debugText.text = this.health;
    this.timer.startTimer('shamed',50);
    this.timer.startTimer('staggered',staggerLength);
}

Security.prototype.applyKnockBack = function(x,y){

    var x1 = x;
    var y1 = y;
    if (this.action.block){
        x1 *= 0.2;
        y1 = 0.1;
    }
    //Added for downed state NH
    if (this.downCount >= 3 && this.action.jump){
        y1 = -100*y;
        x1 = 50*x;
    }else if(this.staggered && this.downCount >= 3){
        y1 *= 10;
        x1 *= 10;    
    }else if (this.action.down){
        y1=0.1;
        x1=0;
    }
    this.body.velocity.x = x1;
    this.body.velocity.y = y1;
}

Security.prototype.wallKnockBack = function(x,y,wallFrames){
    
    if(this.hitAgainstWall) return;
    
    var x1 = x;
    var y1 = y;
    if (this.action.block){
        x1 *= 0.2;
        y1 = 0;
    }
    this.body.velocity.x = x1;
    this.body.velocity.y = y1;
    this.hitAgainstWall = true;
    this.timer.startTimer('wall',wallFrames);
}

//Handles player input and change state accordingly NH
Security.prototype.input = function(){
	
        //this.debugText.text = this.position.y;

        if(!this.introFinished){
            return;
        }

        //AG: Reload
        if(this.timer.timerDone('reload')){
            this.canLightAttack = true;
            //this.debugText.text = "loaded";
            //this.ui.alpha = 1;
        }
    
        //AG: Turn off shamed
        if(this.timer.timerDone('shamed')){
            this.shamed = false;
        }
    
        //AG: Turn off wallFrames
        if(this.timer.timerDone('wall')){
            this.hitAgainstWall = false;
        }
        
        //AG: Keeps heavy_cast sound from continuing if heavy is cancelled
        if(!this.action.heavyAttack){
            this.heavyChargeSoundPlayed = false; //AG: Sound stuff
            this.heavyChargeSound.stop();
        }
    
        //AG: If staggered on: player can't move, else: turn staggered off
        if(this.staggered == true && !this.timer.timerDone('staggered')){
            return;
        }else{
            this.staggered = false;
        }
    
        //AG: if touching ground can jump (Altered code from tutorial)
        //AG: Did an hardcode. Will only jump if at inital spawn y coordinate so not extendable if we want platforms


        if (this.padControl){
            if(this.pad1.justPressed(Phaser.Gamepad.XBOX360_A) && this.body.touching.down && !this.action.block ){
                this.body.velocity.y = this.jumpHeight;
                this.jump_sound.play();
            }

            //blocking NH
            if (this.pad1.isDown(Phaser.Gamepad.XBOX360_Y)){
                this.action.block = true;
                if (!this.action.perfectguard){
                    this.timer.startTimer('perfectguard',250);
                    this.action.perfectguard = true;
                }
            }else{
                //possibly have a millisecond of un guarding? NH
                this.action.block = false;
                this.action.perfectguard = false;

            }

            //test combat inputs


            //light attack NH
            if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_X) && !this.action.block && this.canLightAttack){
                //set timer for half a second
                this.timer.startTimer('light',this.lightRate); //AG: done light attacking
                //this.timer.startTimer('light2',200); //AG: Triggers second animation frame
                this.timer.startTimer('reload',this.reloadRate); //AG: Allows player to throw again
                //this.debugText.text = "empty";
                //this.loaded = false;

                //this line might be redundant NH
                this.body.velocity.x = 0
                //this.debugText.text = 'attack facing right';
                this.changeState(this.lightAttack);

                
            }

            //heavy attack NH
            
            if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_B) && !this.action.block){
                this.timer.startTimer('heavy_cast',1000);
                this.timer.startTimer('heavy',1500);
                if (this.position.y < this.diveLimit){
                    this.action.divable = true;
                }
                this.changeState(this.heavyAttack);


            }

            if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER) && this.pad1.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER) && !this.action.block){
                this.timer.startTimer('specialCharge',200);
                this.timer.startTimer('spec',1200);
                this.specialstart = true;
                

                this.changeState(this.special);


            }

            //projectile 

            this.bullets.forEachAlive(this.killBullets,this);
            this.specialBullets.forEachAlive(this.killSpecialBullets,this);




            //fixed your shit NH
            

        
            //AG: Left controls
            if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 && !this.action.block ){
                this.char.scale.x = this.scaleFactor;

                if (this.body.velocity.x > 0){
                    this.body.velocity.x = 0;
                }
                if (this.body.velocity.x > -1*this.maxSpeed){
                    this.body.velocity.x -= this.speed;      
                }else{
                    this.body.velocity.x = -1*this.maxSpeed;
                }

                if (this.action.jump){
                    //this.char.loadTexture('scorpion_jump');
                }else{
                    this.char.frame = this.idleFrame;
                }
                
                
                //stop that animation shit  NH
                if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1  && !this.action.block){
                    
                    if (this.prev_anim == 0){
                        //this.char.frame = 0;
                        this.faceRIGHT = false;
                    }else{
                        this.char.scale.x = -1*this.scaleFactor;
                        this.anim_lock = true;
                    }
                    this.body.velocity.x = 0;
                }

                //for frame changes NH
                if (!this.anim_lock){
                    this.prev_anim = 0;
                    this.faceRIGHT = false;
                }
                this.anim_lock = false;
                
                

            //AG: Right controls
            }else if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1  && !this.action.block){
                this.char.scale.x = -1*this.scaleFactor;

                if (this.body.velocity.x < 0){
                    this.body.velocity.x = 0;
                }
                if (this.body.velocity.x < this.maxSpeed){
                    this.body.velocity.x += this.speed;        
                }else{
                    this.body.velocity.x = this.maxSpeed;
                }

                if (this.action.jump){
                    //this.char.loadTexture('scorpion_jump');
                }else{
                    this.char.frame = this.idleFrame;
                }

                this.prev_anim = 1;
                this.faceRIGHT = true;

            }else{
                this.body.velocity.x = 0;
                if (this.action.jump && !this.action.block){
                    //this.char.loadTexture('scorpion_jump');
                }else if (this.action.block){
                    this.char.frame = this.blockFrame;
                }else{
                    this.char.frame = this.idleFrame;
                }
                
                if (this.prev_anim == 0){
                    //this.char.frame = 0;
                    //this.char.scale.x = this.scaleFactor;

                    this.faceRIGHT = false;
                }else{
                    this.char.faceRIGHT = true;
                }
                this.body.velocity.x = 0;
            }
        }else{

            if(game.input.keyboard.justPressed(this.keyUp) && this.body.touching.down && !this.action.block ){
                this.body.velocity.y = this.jumpHeight;
                this.jump_sound.play();
            }

            //blocking NH
            if (game.input.keyboard.isDown(this.keyDown)){
                this.action.block = true;
                if (!this.action.perfectguard){
                    this.timer.startTimer('perfectguard',250);
                    this.action.perfectguard = true;
                }
            }else{
                //possibly have a millisecond of un guarding? NH
                this.action.block = false;
                this.action.perfectguard = false;

            }

            //test combat inputs


            //light attack NH
            if (game.input.keyboard.justPressed(this.keyA) && !this.action.block && this.canLightAttack){
                //set timer for half a second
                this.timer.startTimer('light',this.lightRate); //AG: done light attacking
                this.timer.startTimer('light2',200); //AG: Triggers second animation frame
                this.timer.startTimer('reload',this.reloadRate); //AG: Allows player to throw again
                //this.debugText.text = "empty";
                //this.loaded = false;

                //this line might be redundant NH
                this.body.velocity.x = 0
                //this.debugText.text = 'attack facing right';
                this.changeState(this.lightAttack);

                
            }

            //heavy attack NH
            
            if (game.input.keyboard.justPressed(this.keyB) && !this.action.block){
                this.timer.startTimer('heavy_cast',1000);
                this.timer.startTimer('heavy',1500);
                if (this.position.y < this.diveLimit){
                    this.action.divable = true;
                }
                this.changeState(this.heavyAttack);


            }
            
            //Special
            if (game.input.keyboard.justPressed(this.keyB) && game.input.keyboard.justPressed(this.keyA) && !this.action.block){
                this.timer.startTimer('specialCharge',200);
                this.timer.startTimer('spec',1200);
                this.specialstart = true;
                

                this.changeState(this.special);


            }

            //projectile 

            this.bullets.forEachAlive(this.killBullets,this);
            




            //fixed your shit NH
            

        
            //AG: Left controls
            if(game.input.keyboard.isDown(this.keyLeft) && !this.action.block ){
                this.char.scale.x = this.scaleFactor;

                if (this.body.velocity.x > 0){
                    this.body.velocity.x = 0;
                }
                if (this.body.velocity.x > -1*this.maxSpeed){
                    this.body.velocity.x -= this.speed;      
                }else{
                    this.body.velocity.x = -1*this.maxSpeed;
                }

                if (this.action.jump){
                    //this.char.loadTexture('scorpion_jump');
                }else{
                    this.char.frame = this.idleFrame;
                }
                
                
                //stop that animation shit  NH
                if(game.input.keyboard.isDown(this.keyRight) && !this.action.block){
                    
                    if (this.prev_anim == 0){
                        //this.char.frame = 0;
                        this.faceRIGHT = false;
                    }else{
                        this.char.scale.x = -1*this.scaleFactor;
                        this.anim_lock = true;
                    }
                    this.body.velocity.x = 0;
                }

                //for frame changes NH
                if (!this.anim_lock){
                    this.prev_anim = 0;
                    this.faceRIGHT = false;
                }
                this.anim_lock = false;
                
                

            //AG: Right controls
            }else if(game.input.keyboard.isDown(this.keyRight) && !this.action.block){
                this.char.scale.x = -1*this.scaleFactor;

                if (this.body.velocity.x < 0){
                    this.body.velocity.x = 0;
                }
                if (this.body.velocity.x < this.maxSpeed){
                    this.body.velocity.x += this.speed;        
                }else{
                    this.body.velocity.x = this.maxSpeed;
                }

                if (this.action.jump){
                    //this.char.loadTexture('scorpion_jump');
                }else{
                    this.char.frame = this.idleFrame;
                }

                this.prev_anim = 1;
                this.faceRIGHT = true;

            }else{
                this.body.velocity.x = 0;
                if (this.action.jump && !this.action.block){
                    //this.char.loadTexture('scorpion_jump');
                }else if (this.action.block){
                    this.char.frame = this.blockFrame;
                }else{
                    this.char.frame = this.idleFrame;
                }
                
                if (this.prev_anim == 0){
                    //this.char.frame = 0;
                    //this.char.scale.x = this.scaleFactor;

                    this.faceRIGHT = false;
                }else{
                    this.char.faceRIGHT = true;
                }
                this.body.velocity.x = 0;
            }
        }

};