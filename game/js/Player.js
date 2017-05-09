//AG: This is pretty much just Nathan's code from the slides
Player = function(game, key, x, y, playerNum){
    Phaser.Sprite.call(this, game, x, y, key, playerNum);
    
    //Vars
    this.playerNum = playerNum; //Player number
    this.speed = 8; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    this.maxSpeed = 32;
    
    //Animations
    this.animations.add('left', [0,1,2,3], 10, true);
    this.animations.add('right', [5,6,7,8], 10, true);
    
    //Physics
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    this.body.gravity.y = 600;
    
    //AG: Scale to find character sizing
    this.scale.setTo(4,4);

    //animation stuff NH
    this.prev_anim = 0;
    this.anim_lock = false;
    this.faceRIGHT = false;

    //Debug text
    //AG: Made it so the debugText for each player is on their side of the screen
    if(playerNum == 1) this.debugText = game.add.text(16,16,'test', {fontSize: '32px', fill: '#FFFFFF'});
    if(playerNum == 2) this.debugText = game.add.text(game.width - 100,16,'test', {fontSize: '32px', fill: '#FFFFFF'});

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
        this.keyA = Phaser.Keyboard.R;
        this.keyB = Phaser.Keyboard.T;
        this.prev_anim =1;
    }else if(this.playerNum == 2){ 
        this.keyLeft = Phaser.Keyboard.K;
        this.keyRight = Phaser.Keyboard.COLON;
        this.keyUp = Phaser.Keyboard.O;
        this.keyDown = Phaser.Keyboard.L;
        this.keyA = Phaser.Keyboard.OPEN_BRACKET;
        this.keyB = Phaser.Keyboard.CLOSED_BRACKET;
        this.prev_anim =0;
    }

    //hitbox stuff
    this.fists = game.add.group();
    this.fist = fist = game.add.sprite(this.position.x,this.position.y,'fist');
    this.fist.scale.setTo(0.25,0.25);
    this.fists.add(this.fist);


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

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//state to clear state stuff NH
//basically reset stuff every frame
Player.prototype.preState =function (){

    //cancel velocity when not in input
    if (this.state != this.input){
        this.body.velocity.x = 0;
    }
    if (this.state != this.lightAttack){
        //light attack reset
        this.fist.position.x = this.position.x;
        this.fist.position.y = this.position.y;
        this.body.gravity.y = 600;
    }

    //check if in air
    if (!this.body.touching.down){
        this.action.jump = true;
    }else{
        this.action.jump = false;
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

    if (this.action.jump){
        this.body.gravity.y = 0;
        this.body.velocity.y =0 ;
    }
    

    if (!this.action.attacking){
        if (dir){
            //var fist = game.add.sprite(this.position.x+50,this.position.y,'fist');
            //fist.scale.setTo(0.25,0.25);
            //this.fists.add(fist);
            this.fist.position.x += 50;
        } else{
            //var fist = game.add.sprite(this.position.x-50,this.position.y,'fist');
            //fist.scale.setTo(0.25,0.25);
            //this.fists.add(fist);
            this.fist.position.x -= 50;
        }
        this.action.attacking = true;
    }
    //this.debugText.text = this.position.x;
    
    if (this.timer.timerDone('light')){
        this.debugText.text = 'done';
        this.changeState(this.input);
        this.action.attacking = false;
    }



}

Player.prototype.heavyAttack = function(){

    if (this.action.jump){
        //dive kick
        
        this.body.velocity.y = 550;
        if (this.faceRIGHT){
            this.body.velocity.x = 250;
        }else{
            this.body.velocity.x = -250;
        }
        this.action.attacking = true;
        
    }else{
        //reset velocity
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        //if (!this.action.attacking){do normal heavy}
        //else{}
        this.action.attacking = false;
        this.changeState(this.input);
    }


}



//Handles player input
Player.prototype.input = function(){
        //this.fists.removeAll(true);
    
        //AG: if touching ground can jump (Altered code from tutorial)
        //AG: Did an hardcode. Will only jump if at inital spawn y coordinate so not extendable if we want platforms
        if(game.input.keyboard.justPressed(this.keyUp) && this.body.touching.down && !this.action.block ){
            this.body.velocity.y = -350;
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
        if (game.input.keyboard.isDown(this.keyA) && !this.action.block){
            //set timer for half a second
            this.timer.startTimer('light',300);

            //this line might be redundant NH
            this.body.velocity.x = 0
            this.debugText.text = 'attack facing right';
            this.changeState(this.lightAttack);

            
        }

        //heavy attack NH
        
        if (game.input.keyboard.isDown(this.keyB) && !this.action.block){
            //this.timer.startTimer('heavy',1000);
            this.changeState(this.heavyAttack);


        }
        




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
            this.animations.play('left');
            
            
            //stop that animation shit  NH
            if(game.input.keyboard.isDown(this.keyRight) && !this.action.block){
                
                if (this.prev_anim == 0){
                    this.frame = 0;
                }else{
                    this.frame = 5;
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
            this.animations.play('right');
            this.prev_anim = 1;
            this.faceRIGHT = true;

        }else{
            this.body.velocity.x = 0;

            
            if (this.prev_anim == 0){
                this.frame = 0;
                this.faceRIGHT = false;
            }else{
                this.frame = 5;
                this.faceRIGHT = true;
            }
            this.body.velocity.x = 0;
        }

}