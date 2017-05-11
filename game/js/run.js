//create game NH

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

//load up states from other files NH
game.state.add('preloader', preloaderState);
game.state.add('main', mainState);


//start preload NH
game.state.start('preloader');