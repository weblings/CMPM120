//create game NH

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//load up states from other files NH
game.state.add('main', mainState);
game.state.add('preloader', preloader);

//start preload NH
game.state.start('preloader');