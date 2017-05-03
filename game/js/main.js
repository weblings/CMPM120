var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;

//Ooh look at me I'm different gittttt

function preload() {

}

function create() {
    //controls
    cursors = game.input.keyboard.createCursorKeys();    
}

function update() {
    
}
  