//AG: This is pretty much just Nathan's code from the slides
var Player = function Player(game, key, x, y, playerNum){
    Phaser.Sprite.call(this, game, x, y, key, playerNum);
    
    //Vars
    this.playerNum = playerNum; //Player number
    this.speed = 5; //AG: Arbitrarily changing to 5, but having this as a var means we can do speed changes from an item or power later on if we want
    
    //Animations
    this.animations.add('left', [0,1,2,3], 10, true);
    this.animations.add('right', [5,6,7,8], 10, true);

    
    //Physics
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    input();
}

//Handles player input
function input(){
    //if(this.playerNum == 2){ //if Player 2 (Right side of screen)
        if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT)){
            Player.body.velocity.x += this.speed;
            Player.animations.play('left');
        }
        
        if(game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)){
            Player.body.velocity.x -= this.speed;
            Player.animations.play('right');
        }
    //}
}