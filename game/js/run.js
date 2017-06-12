//create game NH

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

//load up states from other files NH
game.state.add('preloader', preloaderState);
game.state.add('title', titleState);
game.state.add('credits', creditState);
game.state.add('main', mainState);
game.state.add('charSelect', charSelect);
game.state.add('controls', controlState);
game.state.add('altControls', initControls);


//start preload NH
game.state.start('preloader');