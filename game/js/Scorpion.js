Scorpion = function(game, key, x, y, playerNum, costumeIndex, french){

    Phaser.Sprite.call(this, game, x, y, key, playerNum, costumeIndex,french);
    
    this.alpha = 0;//0.5;
    this.anchor.y = 1;

    //Vars
    this.charName = "LITERALLY A SCORPION";
    this.playerNum = playerNum; //Player number
    //this.copy = dup;
    this.speed = 60; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    this.maxSpeed = 720;
    this.diveLimit = 400;

    this.jumpHeight = -1550; //AG: was -350 but players couldn't jump over eachother to test collision on multiple sides
    this.floorLevel = game.world.height - 20;

    this.specialEmitter = game.add.emitter(0, 0, 100);
    this.specialEmitter.makeParticles('scorpion_curse');
    game.physics.enable(this.specialEmitter);
    this.specialEmitter.enableBody = true;
    this.specialEmitter.blendMode = 1;
    this.specialEmitter.alpha = 0.75;

    //Animations
    if (this.playerNum == 1){
        if(costumeIndex == 1){
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlas2P');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlas2');
            this.char.animations.add('scorpion_walk',Phaser.Animation.generateFrameNames('Scorpion_walk_',1,2,'',1), 10, false);
            this.char.animations.add('scorpion_stagger',Phaser.Animation.generateFrameNames('Scorpion_stagger',1,2,'',1), 10, false);
        }else{
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlasP');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlas');
            this.char.animations.add('scorpion_walk',Phaser.Animation.generateFrameNames('Scorpion_walk_',1,2,'',1), 10, false);
            this.char.animations.add('scorpion_stagger',Phaser.Animation.generateFrameNames('Scorpion_stagger',1,2,'',1), 10, false);
        }
    }else{
        if(costumeIndex == 1){
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlas2P');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlas2');
            this.char.animations.add('scorpion_walk',Phaser.Animation.generateFrameNames('Scorpion_walk_',1,2,'',1), 10, false);
            this.char.animations.add('scorpion_stagger',Phaser.Animation.generateFrameNames('Scorpion_stagger',1,2,'',1), 10, false);
        }else{
            if(french) this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlasP');
            else this.char = game.add.sprite(this.position.x, this.position.y, 'scorpion_atlas');
            this.char.animations.add('scorpion_walk',Phaser.Animation.generateFrameNames('Scorpion_walk_',1,2,'',1), 10, false);
            this.char.animations.add('scorpion_stagger',Phaser.Animation.generateFrameNames('Scorpion_stagger',1,2,'',1), 10, false);
        }
    }



    this.scaleFactor = 0.4;
    this.char.scale.setTo(this.scaleFactor,this.scaleFactor);
    this.char.anchor.x = 0.5;
    this.char.anchor.y = 1

    //this.scorpwalk = game.add.sprite(15, 30, 'scorp_walk');
   // this.scorpwalk.animations.add('scorpion_walk',[0,1],10,true);

    //gamepad
    game.input.gamepad.start();
    if (this.playerNum==1){
        this.pad1 = game.input.gamepad.pad1;
    }else{
        this.pad1 = game.input.gamepad.pad2;
    }
    

    this.padControl = false;



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
    this.emitter.makeParticles('scorpion_blood');
    //this.emitter.scale.setTo(0.1,0.1);
    game.physics.enable(this.emitter);
    this.emitter.enableBody = true;
    this.emitter.blendMode = 2;
    this.emitter.alpha = 0.8;
    //this.emitter.gravity = 400;

    this.icecube = game.add.sprite(this.position.x, this.position.y, 'frozen_ice');
    this.icecube.anchor.setTo(0.5, 1);
    this.icecube.scale.setTo(0.25,0.20);
    this.icecube.exists = false;


    //Physics
    game.physics.enable(this);
    this.gravFactor = 3000;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    this.body.gravity.y = this.gravFactor;
    
    //AG: Scale to find character sizing

    this.scale.setTo(1.05,0.50);
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
    }else if(this.playerNum == 2){ 
        this.keyLeft = Phaser.Keyboard.K;
        this.keyRight = Phaser.Keyboard.COLON;
        this.keyUp = Phaser.Keyboard.O;
        this.keyDown = Phaser.Keyboard.L;
        this.keyA = Phaser.Keyboard.I;//Phaser.Keyboard.OPEN_BRACKET;
        this.keyB = Phaser.Keyboard.U;//Phaser.Keyboard.CLOSED_BRACKET;
        this.prev_anim =0;
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

    //special
    this.chain = game.add.sprite(this.position.x, this.position.y, 'scorpion_chain');
    this.chain.scale.setTo(0.7,0.7);
    this.chain.animations.add('scorpion_special',Phaser.Animation.generateFrameNames('scorpion_special',1,8,'',2), 20, false,false);
    this.chain.anchor.setTo(1,1);
    this.chain.exists = false;
    this.chainLocation = 0;

    this.specialstart = false;
    this.chainHit = false;



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
    this.action.dive = false;
    this.action.divable =false;
    this.action.cancel = false;
    this.action.perfectguard =false;

    this.action.predown = false;
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
    this.touchLeftWallAt = 131.25;
    this.touchRightWallAt = 1148.75;
    this.hitAgainstWall = false;
    
    this.introFinished = false; //AG: Intro in Main finished

    //misc.
    this.canLightAttack = true;
    
    //Sounds
    this.lightSound = game.add.audio('light');
    this.heavySound = game.add.audio('heavy');
    this.heavyChargeSound = game.add.audio('heavy_charge');
    this.jump_sound = game.add.audio('jump_sound');
    this.block_sound = game.add.audio('block');
    this.perfect_block_sound = game.add.audio('perfect_block');
    this.special_sound = game.add.audio('super');
    
    this.heavyChargeSoundPlayed = false;
    this.heavySoundPlayed = false;
    this.attackHit = false;

    this.hitVolume = .8;
    this.missVolume = .4;
    this.blockVolume = .05;
    
    this.lightSound.volume = this.missVolume;
    this.heavySound.volume = this.missVolume;
    
    //Parisian
    this.Parisian = false;
}

Scorpion.prototype = Object.create(Phaser.Sprite.prototype);
Scorpion.prototype.constructor = Player;

//state to clear state stuff NH
//basically reset stuff every frame
Scorpion.prototype.preState =function (){


    //reset hitbox
    /*
    this.hitbox.position.x = this.position.x +25;
    this.hitbox.position.y = this.position.y +70;
    */
    this.char.position.x = this.position.x ;
    this.char.position.y= this.position.y+18;

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

    //stagger sprite change

    
    if (this.staggered && !this.action.block){
        //this.char.loadTexture('scorpion_stagger');
        this.char.animations.play('scorpion_stagger');
    }
    /*
    else{
        this.char.loadTexture('scorpion_idle');
    }
    */

    


    //cancel velocity when not in input
    //might be the reason why dive kick is so slow
    //also the reason why down does not move in x NH
    if (this.state != this.input && this.state != this.downed && this.state != this.dead && this.state == this.lightAttack && !this.action.jump){
        this.body.velocity.x = 0;
    }

    if (this.state != this.lightAttack || !this.inSpecial){
        //light attack reset
        //this.fist.position.x = -300; //AG: Was at this.position.x; Moving offscreen so doesn't collide when not active
        //this.fist.position.y = this.position.y;
        if (this.position.y < this.diveLimit){
            this.body.gravity.y = this.gravFactor*2;
        }else {
            this.body.gravity.y = this.gravFactor;
        }
        this.lightSoundPlayed = false;
        
    }

    if (this.state != this.heavyAttack){
        this.fist.scale.x = 0.25;
        this.action.dive = false;
    }



    //check if in air
    //if (!this.body.touching.down){

    if (this.position.y != this.floorLevel){
        this.action.jump = true;
        this.maxSpeed = 240;

    }else{
        this.action.jump = false;
        this.canLightAttack = true;
        this.maxSpeed = 720;
    }

    //may need to redo this NH
    if (!this.action.jump && this.action.down){
        this.body.velocity.x = 0;
    }

    //might need some changes here NH
    if (!this.timer.timerDone('downed') && this.action.down){
         //insert sprite change here
         //this.char.loadTexture('scorpion_down');
         this.char.frame = 2;//'Scorpion_Down';
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

    if(this.state != this.chainBuffer && this.state != this.special){
        this.chain.exists = false;
        this.chainHit = false;
        this.inSpecial = false;
    }

    if(this.action.iced){
        this.icecube.exists = true;
        this.icecube.position.x = this.char.position.x;
        this.icecube.position.y = this.char.position.y+20;
    }else{
        this.icecube.exists = false;
    }
        
    
}


// function to change states e.g. this.changeState(this.otherState)
Scorpion.prototype.changeState = function(currentState){
    this.state = currentState;
}


Scorpion.prototype.update = function(){
    //reset some stuff
    this.preState();
    //current state NH
    this.state();
}


//unneeded probably safe to delete NH
Scorpion.prototype.fisting = function(x,y){
    var fist = game.add.sprite(x,y,'fist');
    fist.scale.setTo(0.25,0.25);
    this.fists.add(fist);

}

Scorpion.prototype.dead = function(){
    this.heavyChargeSound.mute = true;
    if (!this.staggered && !this.action.jump){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    this.fist.exists = false;
    
    this.char.frame = 2;
}

Scorpion.prototype.downed = function(){

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

//states
Scorpion.prototype.lightAttack = function(){
    dir = this.faceRIGHT;
    //insert attack animation here
    //this.char.loadTexture('scorpion_A');
    this.char.frame= 5;//('Scorpion_LightAttack');

    this.fist.exists = true;

    if (this.action.jump ){
        this.body.gravity.y = 0;
        this.body.velocity.y =0 ;
    }
    

    if (!this.action.attacking){
        if (dir){
            if(this.action.jump){
                this.body.velocity.x = 700;
            }
            this.fist.position.x = this.position.x + 150; 
        } else{
            if(this.action.jump){
                this.body.velocity.x = -700;
            }
            
            this.fist.position.x = this.position.x - 150; //AG: Brings fist back on screen
        }
        this.action.attacking = true;
        this.inLightAttack = true; //AG: Adding for knockback
        if(!this.attackHit) this.lightSound.play();
    }else{
        if (this.action.jump){
            if (dir){
                this.fist.position.x = this.position.x + 150;
            }else{
                this.fist.position.x = this.position.x - 150
            }
        }

    }
    //this.debugText.text = this.position.x;
    
    if (this.timer.timerDone('light')){
        //this.debugText.text = 'done';
        //this.projectile();
        //this.char.loadTexture('scorpion_idle');
        this.char.frame= 4;//('Scorpion_Idle');
        this.changeState(this.input);
        this.action.attacking = false;
        this.canLightAttack = false;
        this.inLightAttack = false; //AG: Adding for knockback
    }
        
}

Scorpion.prototype.heavyAttack = function(){
    
    //this.char.loadTexture('scorpion_B1');
    //('Scorpion_HeavyAttackCharge');

    if (this.action.jump){
        //dive kick
        if ( this.action.divable){
            this.fist.exists = false;
            this.char.frame = 11;

        
            this.body.velocity.y = 1550;
            if (this.faceRIGHT){
                this.body.velocity.x = 900;
            }else{
                this.body.velocity.x = -900;
            }
            this.action.attacking = true;
            this.action.dive = true;

        }else{
            this.changeState(this.input);
        }

        //this.action.noCollide = true;
        
    }else{
        this.char.frame=3;
        //reset velocity
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (!this.action.attacking && !this.action.dive){
            this.action.cancel = true;
            this.action.attacking = true;
            this.fist.exists = true;
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
                this.heavyChargeSoundPlayed = false; //AG: Sound stuff
                this.heavyChargeSound.stop();
            }else if (this.action.cancel == true && this.pad1.justPressed(Phaser.Gamepad.XBOX360_Y)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback
                this.heavyChargeSoundPlayed = false; //AG: Sound stuff
                this.heavyChargeSound.stop();

            }
        }else{

            if (this.action.cancel == true && game.input.keyboard.isDown(this.keyUp)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.body.velocity.y = this.jumpHeight;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback
                this.heavyChargeSoundPlayed = false; //AG: Sound stuff
                this.heavyChargeSound.stop();
            }else if (this.action.cancel == true && game.input.keyboard.isDown(this.keyDown)){
                this.action.attacking = false;
                this.action.dive = false;
                this.action.cancel = false;
                this.changeState(this.input);
                this.inHeavyAttack = false; //AG: Adding for knockback
                this.heavyChargeSoundPlayed = false; //AG: Sound stuff
                this.heavyChargeSound.stop();

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
            //this.action.cancel = false;
            //this.char.loadTexture('scorpion_B2');
            if(!this.heavySoundPlayed){
                this.heavyChargeSoundPlayed = false;
                this.heavyChargeSound.stop();
                if(!this.attackHit) this.heavySound.play();
                this.heavySoundPlayed = true;
            }

            this.char.frame=12;//('Scorpion_HeavyAttack');
            
            this.fist.position.x = this.position.x; //AG: Brings fist back on screen
            this.fist.position.y = this.position.y -100;
            
            if (this.faceRIGHT){
                this.fist.scale.x = 0.5;
                this.fist.position.x += 110;

            }else{
                this.fist.scale.x = 0.5;
                this.fist.position.x -= 110;
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

Scorpion.prototype.special = function(){
    //AG: HealthBar handling
    if(this.specialBar.width == 315 || this.specialHappening){ //If first time damaged
        
        if(!this.specialHappening) this.special_sound.play(); //AG: Need to put this in another timer/boolean flag fixture to make it not play multiple times and sound like shit

        this.specialHappening = true;

        this.inSpecial = true;
        if (this.action.jump ){
            this.body.gravity.y = 0;
            this.body.velocity.y =0 ;
        }


        this.action.attacking = true;
        if (this.faceRIGHT){
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


        }

        if (this.timer.timerDone('spec') || this.chainHit){

            this.specialHappening = false;
            if (this.chainHit){
                this.chain.animations.stop();
                this.timer.startTimer('chainFreeze', 500);
                this.changeState(this.chainBuffer);
                this.action.attacking = false;
                this.fist.exists = false;
                this.chainHit = false;
                this.inSpecial = false;

            }else{
                this.changeState(this.input);
                this.chain.exists = false;
                this.action.attacking = false;
                this.fist.exists = false;
                this.chainHit = false;
                this.inSpecial = false;

            }

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
Scorpion.prototype.addToSpecialBar = function(amount){
    if(this.specialBarScaleMaster + amount >= 1){
        if(this.specialBarScaleMaster != 1) this.specialFullAnimation();
        this.specialBarScaleMaster = 1;
    }else this.specialBarScaleMaster += amount;
    
    this.specialBar.scale.setTo(this.specialBarScaleMaster,1);
}

Scorpion.prototype.specialFullAnimation = function(){
    //this.specialUsed.alpha = 1;
    this.fullTween = game.add.tween(this.specialUsed).to( { alpha: 0.3 }, 300, "Linear", true, 300);
    this.fullTween.yoyo(true,300).loop();
}

Scorpion.prototype.chainBuffer = function(){
    if (this.timer.timerDone('chainFreeze')){
        this.chain.exists = false;
        this.changeState(this.input);
    }
}    

Scorpion.prototype.chained = function(location){
    //this.action.chained = false;
    this.action.dive = false;
    if (!this.action.block){
        this.timer.startTimer('chainStun', 500);
        this.chainLocation = location;
        this.changeState(this.chainStop);

    }
    

}

Scorpion.prototype.chainStop = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.fist.exists = false;
    if (this.timer.timerDone('chainStun')){
        this.position.x = this.chainLocation;
        this.changeState(this.input);

    }
}

Scorpion.prototype.frozenStun = function(){
    this.action.dive = false;
    if (!this.action.block){
        this.timer.startTimer('frozenStun', 2500);
        this.changeState(this.frozenStop);
        this.action.iced = true;

    }

}

Scorpion.prototype.frozenStop = function(){
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
Scorpion.prototype.projectile = function(){
    var bullet = game.add.sprite(this.position.x, this.position.y-75, 'player');
    this.bullets.add(bullet);
    game.physics.arcade.enable(bullet);
    bullet.startLocation = this.position.x;


    if (this.faceRIGHT){
        bullet.body.velocity.x = 200;
        bullet.headingRight = true;
    }else{
        bullet.body.velocity.x = -200;
        bullet.headingRight = false;
    }

    
}

Scorpion.prototype.killBullets = function(b){
    if (b.headingRight){
        if (b.position.x - b.startLocation > 500){
            b.kill();
        }
    }else{
        if (b.startLocation - b.position.x > 500){
            b.kill();
        }
    }
}

//Should make player take Damage
Scorpion.prototype.takeDamage = function(damage,staggerLength){
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
            this.downCount++;
            console.log(this.downCount);
            this.emitter.x = this.position.x;
            this.emitter.y = this.position.y-75;
            this.emitter.start(true, 2000, null, 10);

        }
         //AG: specialBar handling
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

Scorpion.prototype.applyKnockBack = function(x,y){

    var x1 = x;
    var y1 = y;
    if (this.action.block){
        x1 *= 0.2;
        y1 = 0.1;
    }
    /*
    if (this.action.jump && this.downCount>=3){
            y1 = -2*y;
    }
    */


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

Scorpion.prototype.wallKnockBack = function(x,y,wallFrames){
    
    if(this.hitAgainstWall) return;
    
    var x1 = x;
    var y1 = y;
    if (this.action.block){
        x1 *= 0.2;
        y1 = 0.1;
    }
    this.body.velocity.x = x1;
    this.body.velocity.y = y1;
    this.hitAgainstWall = true;
    this.timer.startTimer('wall',wallFrames);
}

//Handles player input and change state accordingly NH
Scorpion.prototype.input = function(){


        //this.debugText.text = this.position.y;

        if(!this.introFinished){
            //if(this.playerNum == 1) this.char.frame = 5;
            return;
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
            if (this.action.jump && this.staggered == true){
                this.action.stagfall = true;
            }
            
            this.staggered = false;
        }
    
        //AG: if touching ground can jump (Altered code from tutorial)
        //AG: Did an hardcode. Will only jump if at inital spawn y coordinate so not extendable if we want platforms

        /*
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

            this.action.block = false;
            this.action.perfectguard = false;

        }


        //light attack NH
        if (game.input.keyboard.justPressed(this.keyA) && !this.action.block && this.canLightAttack){
            //set timer for half a second
            this.timer.startTimer('light',500);

            //this line might be redundant NH
            this.body.velocity.x = 0
            //this.debugText.text = 'attack facing right';
            this.changeState(this.lightAttack);

            
        }

        //heavy attack NH
        
        if (game.input.keyboard.justPressed(this.keyB) && !this.action.block){
            this.timer.startTimer('heavy_cast',500);
            this.timer.startTimer('heavy',1000);
            //this.timer.startTimer('heavy',1000);
            if (this.position.y < this.diveLimit){
                this.action.divable = true;
            }
            this.changeState(this.heavyAttack);


        }
        */

        
        //fixed your shit NH
        
        if(this.padControl){

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
                
                this.action.block = false;
                this.action.perfectguard = false;

            }


            //light attack NH
            if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_X) && !this.action.block && this.canLightAttack){
                //set timer for half a second
                this.timer.startTimer('light',500);

                //this line might be redundant NH
                this.body.velocity.x = 0
                //this.debugText.text = 'attack facing right';
                this.changeState(this.lightAttack);

                
            }

            //heavy attack NH
            
            if (this.pad1.isDown(Phaser.Gamepad.XBOX360_B) && !this.action.block){
                this.timer.startTimer('heavy_cast',500);
                this.timer.startTimer('heavy',1000);
                //this.timer.startTimer('heavy',1000);
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
                //this.char.animations.play('left');

                if (this.action.jump && !this.staggered){
                    //this.char.setTexture('scorpion_jump');
                    this.char.frame= 10;//('Scorpion_Jump');
                }else if(this.staggered) {
                    //this.char.setTexture('scorpion_stagger');
                    this.char.animation.play('scorpion_stagger');
                }else {
                    //this.char.loadTexture('scorpion_idle');
                    //this.char.setTexture('scorp_walk');
                    //this.char.animations.add('scorpion_walk',[0,1], 10, true);
                    this.char.animations.play('scorpion_walk');
                }
                
                
                //stop that animation shit  NH
                if(this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 && !this.action.block){
                    
                    if (this.prev_anim == 0){
                        //this.char.frame = 0;

                        this.faceRIGHT = false;
                    }else{
                        //this.char.frame = 5;
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
                //this.char.animations.play('right');

                if (this.action.jump){
                    //this.char.setTexture('scorpion_jump');
                    this.char.frame= 10;//('Scorpion_Jump');
                }else{
                    //this.char.loadTexture('scorpion_idle');
                    
                    //this.char.setTexture('scorp_walk');
                    //this.char.animations.add('scorpion_walk',[0,1], 10, true);
                    this.char.animations.play('scorpion_walk');
                }

                this.prev_anim = 1;
                this.faceRIGHT = true;

            }else{
                this.body.velocity.x = 0;

                if (this.action.jump && !this.action.stagfall && !this.action.block){
                    //this.char.setTexture('scorpion_jump');
                    this.char.frame=10;//('Scorpion_Jump');
                }else if (this.action.block){
                    //this.char.setTexture('scorpion_crouch');
                    //this.char.frame=('Scorpion_crouch');
                    this.char.frame=1;
                }else if(this.action.stagfall) {
                    //this.char.setTexture('scorpion_stagger');
                    this.char.animations.play('scorpion_stagger');
                }else {
                    //this.char.setTexture('scorpion_idle');
                    this.char.frame=4;//('Scorpion_Idle');
                }

             
                if (this.prev_anim == 0){
                    //this.char.frame = 0;
                    this.char.scale.x = this.scaleFactor;

                    this.faceRIGHT = false;
                }else{
                    //this.char.frame = 5;
                    this.char.scale.x = -1*this.scaleFactor;
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
                
                this.action.block = false;
                this.action.perfectguard = false;

            }


            //light attack NH
            if (game.input.keyboard.justPressed(this.keyA) && !this.action.block && this.canLightAttack){
                //set timer for half a second
                this.timer.startTimer('light',500);

                //this line might be redundant NH
                this.body.velocity.x = 0
                //this.debugText.text = 'attack facing right';
                this.changeState(this.lightAttack);

                
            }

            //heavy attack NH
            
            if (game.input.keyboard.justPressed(this.keyB) && !this.action.block){
                this.timer.startTimer('heavy_cast',500);
                this.timer.startTimer('heavy',1000);
                //this.timer.startTimer('heavy',1000);
                if (this.position.y < this.diveLimit){
                    this.action.divable = true;
                }
                this.changeState(this.heavyAttack);


            }
            
            if (game.input.keyboard.justPressed(this.keyB) && game.input.keyboard.justPressed(this.keyA) && !this.action.block){
                this.timer.startTimer('specialCharge',200);
                this.timer.startTimer('spec',1200);
                this.specialstart = true;
                

                this.changeState(this.special);


            }
            
    
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
                //this.char.animations.play('left');

                if (this.action.jump && !this.staggered){
                    //this.char.setTexture('scorpion_jump');
                    this.char.frame= 10;//('Scorpion_Jump');
                }else if(this.staggered) {
                    //this.char.setTexture('scorpion_stagger');
                    this.char.animation.play('scorpion_stagger');
                }else {
                    //this.char.loadTexture('scorpion_idle');
                    //this.char.setTexture('scorp_walk');
                    //this.char.animations.add('scorpion_walk',[0,1], 10, true);
                    this.char.animations.play('scorpion_walk');
                }
                
                
                //stop that animation shit  NH
                if(game.input.keyboard.isDown(this.keyRight) && !this.action.block){
                    
                    if (this.prev_anim == 0){
                        //this.char.frame = 0;

                        this.faceRIGHT = false;
                    }else{
                        //this.char.frame = 5;
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
                //this.char.animations.play('right');

                if (this.action.jump){
                    //this.char.setTexture('scorpion_jump');
                    this.char.frame= 10;//('Scorpion_Jump');
                }else{
                    //this.char.loadTexture('scorpion_idle');
                    
                    //this.char.setTexture('scorp_walk');
                    //this.char.animations.add('scorpion_walk',[0,1], 10, true);
                    this.char.animations.play('scorpion_walk');
                }

                this.prev_anim = 1;
                this.faceRIGHT = true;

            }else{
                this.body.velocity.x = 0;

                if (this.action.jump && !this.action.stagfall && !this.action.block){
                    //this.char.setTexture('scorpion_jump');
                    this.char.frame=10;//('Scorpion_Jump');
                }else if (this.action.block){
                    //this.char.setTexture('scorpion_crouch');
                    //this.char.frame=('Scorpion_crouch');
                    this.char.frame=1;
                }else if(this.action.stagfall) {
                    //this.char.setTexture('scorpion_stagger');
                    this.char.animations.play('scorpion_stagger');
                }else {
                    //this.char.setTexture('scorpion_idle');
                    this.char.frame=4;//('Scorpion_Idle');
                }

             
                if (this.prev_anim == 0){
                    //this.char.frame = 0;
                    this.char.scale.x = this.scaleFactor;

                    this.faceRIGHT = false;
                }else{
                    //this.char.frame = 5;
                    this.char.scale.x = -1*this.scaleFactor;
                    this.char.faceRIGHT = true;
                }
                this.body.velocity.x = 0;
            }

        }

        if (this.action.stagfall && !this.action.jump){
            this.action.stagfall = false;
        }

};