//AG: This is pretty much just Nathan's code from the slides
function Player(game, key, x, y, playerNum){
    Phaser.Sprite.call(this, game, x, y, key, playerNum);
    
    //Vars
    this.playerNum = playerNum; //Player number
    this.speed = 5; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    this.maxSpeed = 25;
    
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
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.preload = function(){
    game.load.image('fist', 'assets/img/fist.jpg');

}

Player.prototype.create = function(){
    this.fists = game.add.group();

}

Player.prototype.update = function(){
    this.input();
}

Player.prototype.fisting = function(x,y){
    var fist = game.add.sprite(x,y,'fist');
    this.fists.add(fist);

}

//Handles player input
Player.prototype.input = function(){
    
        //AG: if touching ground can jump (Altered code from tutorial)
        //AG: Did an hardcode. Will only jump if at inital spawn y coordinate so not extendable if we want platforms
        if(game.input.keyboard.isDown(this.keyUp) && this.body.touching.down){
            this.body.velocity.y = -350;
        }

        //test combat inputs

        if (game.input.keyboard.isDown(this.keyA)){
            this.body.velocity.x = 0
            if (this.faceRIGHT ){
                this.debugText.text = 'attack facing right';
            } else {
                this.debugText.text = 'attack facing left';
            }
            
        }




        //fixed your shit NH
        

    
        //AG: Left controls
        if(game.input.keyboard.isDown(this.keyLeft)){

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
            if(game.input.keyboard.isDown(this.keyRight)){
                
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
        }else if(game.input.keyboard.isDown(this.keyRight)){
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