var Game = {};

Game.MainMenu = function (game) {

	//	Our main menu
	this.game = game;

};

Game.MainMenu.prototype = {

	create: function () {

        button = this.game.add.button(this.game.world.centerX, 400, 'start', this.startGame, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);

	},

	startGame: function () {

		console.log('lets play');
		//this.game.state.start('game');

	}
