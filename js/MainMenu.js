MainMenu = function(game) {
	this.game = game;
}

MainMenu.prototype = {
    create: function () {

        button = this.game.add.button(this.game.world.centerX, 400, 'start', this.startGame, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        this.game.state.start('game');
    }	
}
