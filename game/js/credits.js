var creditState = {

	create: function(){
		var textStyle = { font: '40px', fill: '#facade'};
		var artist = game.add.text(game.world.centerX-200, game.world.centerY-200, 'Artists:', textStyle);
		var evie = game.add.text(game.world.centerX, game.world.centerY-150, 'Evie', textStyle);
		var nikki = game.add.text(game.world.centerX, game.world.centerY-100, 'Nikki', textStyle);

		var programmer = game.add.text(game.world.centerX-200, game.world.centerY+50, 'Programmers:', textStyle);
		var andrew = game.add.text(game.world.centerX, game.world.centerY+100, 'Andrew', textStyle);
		var nick = game.add.text(game.world.centerX, game.world.centerY+150, 'Nick', textStyle);

		var back = game.add.text(1200, 700, 'Back', textStyle);
		back.anchor.setTo(0.5);
		back.inputEnabled = true;
		back.events.onInputUp.add(function(){
			game.state.start('title');
		});
		back.events.onInputOver.add(function(target){
			target.fill = '#ff8928';
		});
		back.events.onInputOut.add(function(target){
			target.fill = '#facade';
		});
	}
}