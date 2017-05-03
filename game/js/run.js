//create game NH

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//load up states from other files NH
game.state.add('preloader', preloader);
game.state.add('main', mainState);

//start preload NH
game.state.start('preloader');