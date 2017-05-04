//AG: This is pretty much just Nathan's code from the slides
function Player(game, key, x, y, playerNum){
    Phaser.Sprite.call(this, game, x, y, key, playerNum);
    
    //Vars
    this.playerNum = playerNum; //Player number
    this.speed = 5; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    this.maxSpeed = 10;
    
    //Animations
    this.animations.add('left', [0,1,2,3], 10, true);
    this.animations.add('right', [5,6,7,8], 10, true);

    
    //Physics
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    
    //this.body.velocity.x += this.speed;
    //this.animations.play('left');
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    this.input();
}

//Handles player input
Player.prototype.input = function(){
    //if(this.playerNum == 2){ //if Player 2 (Right side of screen)
        if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)){
            this.body.velocity.x -= this.speed;
            this.animations.play('left');
        }
        
        if(game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)){
            this.body.velocity.x += this.speed;
            this.animations.play('right');
        }
    //}
}

//Overly complicated method I was thinking to use to cap velocity or something (WIP)
/*Player.prototype.setVelocity = function(coord,op){
    var sign;
    if(op == "+") 
    
    if(coord = "x"){
        if(this.body.velocity.x + this.speed > this.maxSpeed){
            this.body.velocity.x = this.maxSpeed;
        }else{
            this.body.velocity.x + this.speed;
        }
    }else if(coord = "y"){
        if(this.body.velocity.y + this.speed > this.maxSpeed){
            this.body.velocity.y = this.maxSpeed;
        }else{
            this.body.velocity.y + this.speed;
        }
    }
}*/