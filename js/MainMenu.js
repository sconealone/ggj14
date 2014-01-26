MainMenu = function(game) {
	this.game = game;
}

MainMenu.prototype = {
    create: function () {
    	splash_screen = this.game.add.sprite(0, 0, 'splash');
    	splash_screen.scale.setTo(0.72, 0.75);

        button = this.game.add.button(this.game.world.centerX, 400, 'start', this.startGame, this, 2, 1, 0);
       	button.scale.setTo(0.7, 0.7);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        this.game.state.start('game');
    }	
}
