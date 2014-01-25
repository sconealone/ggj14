MainMenu = function(game) {
	this.game = game;
}

MainMenu.prototype = {
    create: function () {
        console.log('hi! this is the main menu');

        button = this.game.add.button(this.game.world.centerX, 400, 'start', this.startGame, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        console.log('start this darn game');
        this.game.state.start('game');
    }	
}