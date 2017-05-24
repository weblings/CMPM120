//AG: This is pretty much just Nathan's code from the slides
Player = function(game, key, x, y, playerNum){
    Phaser.Sprite.call(this, game, x, y, key, playerNum);
    
    this.alpha = 0.5;
    this.anchor.y = 1;

    //Vars
    this.charName = "THE TEMP"
    this.playerNum = playerNum; //Player number
    this.speed = 8; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    this.maxSpeed = 32;

    this.jumpHeight = -600; //AG: was -350 but players couldn't jump over eachother to test collision on multiple sides
    this.floorLevel = game.world.height - 20;

    //Animations
    this.char = game.add.sprite(this.position.x, this.position.y, 'player');
    this.char.animations.add('left', [0,1,2,3], 10, true);
    this.char.animations.add('right', [5,6,7,8], 10, true);
    this.char.scale.setTo(4,4);
    this.char.anchor.y = 1


    /*
    //body hitbox
    this.hitboxes = game.add.physicsGroup();
    this.hitbox = game.add.sprite(this.position.x,this.position.y,'hitbox');
    this.hitbox.scale.setTo(0.25,0.25);
    //this.hitbox.anchor.x = 0.5;
    //this.hitbox.anchor.y = 0.5;
    this.hitboxes.add(this.hitbox);
    */



    //Physics
    this.gravFactor = 1234;
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    this.body.gravity.y = this.gravFactor;
    
    //AG: Scale to find character sizing

    this.scale.setTo(0.15,0.25);


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
    if(playerNum == 1){
        this.debugText = game.add.text(16,16,'100', {fontSize: '32px', fill: '#000000'});
        this.healthBar = game.add.image(10,48,'health_full');
    }else{ //playerNum == 2
        this.debugText = game.add.text(game.width - 100,16,'100', {fontSize: '32px', fill: '#000000'});
        this.healthBar = game.add.image(game.width-460,48,'health_full');
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
    this.fist.anchor.x = 0;
    this.fist.anchor.y = 1.5;
    this.fists.add(this.fist);

    //projectile
    this.bullets = game.add.physicsGroup(); //= game.add.sprite(this.position.x,this.position.y,'player');
    



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
    this.action.cancel = false;

    this.action.down = false;
    this.action.noCollide =false;




    
    //AG: Knockback stuff
    this.inLightAttack = false;
    this.inHeavyAttack = false;
    this.touchLeftWallAt = 0;
    this.touchRightWallAt = 1242.5;
    this.hitAgainstWall = false;
    
    this.introFinished = false; //AG: Intro in Main finished

    //misc.
    this.canLightAttack = true; 
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//state to clear state stuff NH
//basically reset stuff every frame
Player.prototype.preState =function (){


    //reset hitbox
    /*
    this.hitbox.position.x = this.position.x +25;
    this.hitbox.position.y = this.position.y +70;
    */
    this.char.position = this.position;

    //this value needs to be changed when art is finalized NH
    
    
    if (this.position.y > this.floorLevel){
        this.position.y = this.floorLevel;
    }
    


    //cancel velocity when not in input
    if (this.state != this.input){
        this.body.velocity.x = 0;
    }
    if (this.state != this.lightAttack){
        //light attack reset
        this.fist.position.x = -300; //AG: Was at this.position.x; Moving offscreen so doesn't collide when not active
        this.fist.position.y = this.position.y;
        this.body.gravity.y = this.gravFactor;
    }

    if (this.state != this.heavyAttack){
        this.fist.scale.x = 0.25;
    }

    //check if in air
    if (!this.body.touching.down){
        this.action.jump = true;
    }else{
        this.action.jump = false;
        this.canLightAttack = true;
    }
    
    
}


// function to change states e.g. this.changeState(this.otherState)
Player.prototype.changeState = function(currentState){
    this.state = currentState;
}


Player.prototype.update = function(){
    //reset some stuff
    this.preState();
    //current state NH
    this.state();
}


//unneeded probably safe to delete NH
Player.prototype.fisting = function(x,y){
    var fist = game.add.sprite(x,y,'fist');
    fist.scale.setTo(0.25,0.25);
    this.fists.add(fist);

}

//states
Player.prototype.lightAttack = function(){
    dir = this.faceRIGHT;
    //insert attack animation here

    if (this.action.jump ){
        this.body.gravity.y = 0;
        this.body.velocity.y =0 ;
    }
    

    if (!this.action.attacking){
        if (dir){
            //var fist = game.add.sprite(this.position.x+50,this.position.y,'fist');
            //fist.scale.setTo(0.25,0.25);
            //this.fists.add(fist);
            //this.fist.position.x += 50;
            this.fist.position.x = this.position.x + 50; //AG: Brings fist back on screen
        } else{
            //var fist = game.add.sprite(this.position.x-50,this.position.y,'fist');
            //fist.scale.setTo(0.25,0.25);
            //this.fists.add(fist);
            //this.fist.position.x -= 50;
            this.fist.position.x = this.position.x - 50; //AG: Brings fist back on screen
        }
        this.action.attacking = true;
        this.inLightAttack = true; //AG: Adding for knockback

    }
    //this.debugText.text = this.position.x;
    
    if (this.timer.timerDone('light')){
        //this.debugText.text = 'done';
        this.projectile();
        this.changeState(this.input);
        this.action.attacking = false;
        this.canLightAttack = false;
        this.inLightAttack = false; //AG: Adding for knockback
    }
        
}

Player.prototype.heavyAttack = function(){

    if (this.action.jump || (this.position.y < this.floorLevel)){
        //dive kick
        
        this.body.velocity.y = 550;
        if (this.faceRIGHT){
            this.body.velocity.x = 250;
        }else{
            this.body.velocity.x = -250;
        }
        this.action.attacking = true;
        this.action.dive = true;
        //this.action.noCollide = true;
        
    }else{
        //reset velocity
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (!this.action.attacking && !this.action.dive){
            this.action.cancel = true;
            this.action.attacking = true;
            this.inHeavyAttack = true; //AG: Adding for knockback
        }

        if (this.action.cancel == true && game.input.keyboard.isDown(this.keyUp)){
            this.action.attacking = false;
            this.action.dive = false;
            this.action.cancel = false;
            this.body.velocity.y = this.jumpHeight;
            this.changeState(this.input);
            this.inHeavyAttack = false; //AG: Adding for knockback
        }

        if (this.timer.timerDone('heavy_cast') && !this.action.dive){
            //can cancel out of attack NH
            //this.action.cancel = false;
            
            this.fist.position.x = this.position.x; //AG: Brings fist back on screen
            
            if (this.faceRIGHT){
                this.fist.scale.x = 1;
            }else{
                this.fist.scale.x = -1;
            }
            
        }



        if (this.timer.timerDone('heavy') && !this.action.dive){
            this.action.dive = true;
        }


            
        if (this.action.attacking && this.action.dive){
            this.action.attacking = false;
            this.action.dive = false;
            this.action.cancel = false;
            this.changeState(this.input);
            this.inHeavyAttack = false; //AG: Adding for knockback
        }
        
    }
    
}

//projectile
Player.prototype.projectile = function(){
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

Player.prototype.killBullets = function(b){
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
Player.prototype.takeDamage = function(damage,staggerLength){
    var def = 1;
    if(!this.shamed){
        if (this.action.block){
            def = 0.2;
        }
        if(this.health - damage*def < 0){
            this.health = 0;
            this.alive = false;
        }else this.damage(damage*def);
        this.shamed = true;
        this.staggered = true;
        
        //AG: HealthBar handling
        if(this.healthBar.width == 450){ //If first time damaged
            this.healthBarScaleMaster = 1 - ((damage*def)/100);
            this.healthBar.scale.x *= this.healthBarScaleMaster;
            if(this.playerNum == 2){
                this.damageBar = game.add.image(game.width-460,48,"health_empty");
                this.damageBar.scale.x *= (damage*def)/100;
                this.healthBar.x = this.damageBar.x + this.damageBar.width;
                //Red from hit
                var damaged = game.add.image(game.width-460,48,"health_damage");
                damaged.scale.x *= (damage*def)/100;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }else{ //playerNum == 1
                var calcDamageX = this.healthBar.x + this.healthBar.width;
                this.damageBar = game.add.image(calcDamageX,48,"health_empty");
                this.damageBarScaledMaster = 0;
                this.damageBar.scale.x *= (damage*def)/100;
                this.damageBarScaledMaster += this.damageBar.scale.x;
                //Red from hit
                var damaged = game.add.image(calcDamageX,48,"health_damage");
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
                var damaged = game.add.image(oldDamageEnd,48,"health_damage");
                damaged.scale.x *= newScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }else{ //playerNum == 1
                var calcDamageX = this.healthBar.x + this.healthBar.width;
                this.damageBar.x = calcDamageX;
                this.damageBar.scale.x = 1;
                this.damageBar.scale.x *= 1 - this.healthBarScaleMaster;
                //Red from hit
                var damaged = game.add.image(calcDamageX,48,"health_damage");
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
                var damaged = game.add.image(oldDamageEnd,48,"health_damage");
                damaged.scale.x *= lastScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear", true, 800);
            }else{ //playerNum == 1
                this.damageBar.x = 10;
                this.damageBar.scale.x = 1;
                //Red from hit
                var damaged = game.add.image(10,48,"health_damage");
                damaged.scale.x *= lastScaler;
                var tween1 = game.add.tween(damaged).to( { alpha: 0 }, 800, "Linear",true, 800); 
            } 
        }
    }
    this.debugText.text = this.health;
    this.timer.startTimer('shamed',50);
    this.timer.startTimer('staggered',staggerLength);
}

Player.prototype.applyKnockBack = function(x,y){

    var x1 = x;
    var y1 = y;
    if (this.action.block){
        x1 *= 0.2;
        y1 = 0;
    }
    
    this.body.velocity.x = x1;
    this.body.velocity.y = y1;
}

Player.prototype.wallKnockBack = function(x,y,wallFrames){
    
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
Player.prototype.input = function(){


        //this.debugText.text = this.position.y;

        if(!this.introFinished){
            if(this.playerNum == 1) this.char.frame = 5;
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
    
        //AG: If staggered on: player can't move, else: turn staggered off
        if(this.staggered == true && !this.timer.timerDone('staggered')){
            return;
        }else{
            this.staggered = false;
        }
    
        //AG: if touching ground can jump (Altered code from tutorial)
        //AG: Did an hardcode. Will only jump if at inital spawn y coordinate so not extendable if we want platforms
        if(game.input.keyboard.justPressed(this.keyUp) && this.body.touching.down && !this.action.block ){
            this.body.velocity.y = this.jumpHeight;
        }

        //blocking NH
        if (game.input.keyboard.isDown(this.keyDown)){
            this.action.block = true;
        }else{
            //possibly have a millisecond of un guarding? NH
            this.action.block = false;
        }

        //test combat inputs


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
            this.timer.startTimer('heavy_cast',1000);
            this.timer.startTimer('heavy',1500);
            //this.timer.startTimer('heavy',1000);
            this.changeState(this.heavyAttack);


        }

        //projectile 

        this.bullets.forEachAlive(this.killBullets,this);
        




        //fixed your shit NH
        

    
        //AG: Left controls
        if(game.input.keyboard.isDown(this.keyLeft) && !this.action.block ){

            if (this.body.velocity.x > 0){
                this.body.velocity.x = 0;
            }
            if (this.body.velocity.x > -200){
                this.body.velocity.x -= this.speed;      
            }else{
                this.body.velocity.x = -200;
            }
            this.char.animations.play('left');
            
            
            //stop that animation shit  NH
            if(game.input.keyboard.isDown(this.keyRight) && !this.action.block){
                
                if (this.prev_anim == 0){
                    this.char.frame = 0;
                }else{
                    this.char.frame = 5;
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
            if (this.body.velocity.x < 0){
                this.body.velocity.x = 0;
            }
            if (this.body.velocity.x < 200){
                this.body.velocity.x += this.speed;        
            }else{
                this.body.velocity.x = 200;
            }
            this.char.animations.play('right');
            this.prev_anim = 1;
            this.faceRIGHT = true;

        }else{
            this.body.velocity.x = 0;

            
            if (this.prev_anim == 0){
                this.char.frame = 0;
                this.faceRIGHT = false;
            }else{
                this.char.frame = 5;
                this.char.faceRIGHT = true;
            }
            this.body.velocity.x = 0;
        }

}