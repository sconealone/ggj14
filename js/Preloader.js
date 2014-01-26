Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {
    	this.game.load.image('splash', 'assets/backgrounds/splash.png');
        this.game.load.image('start', 'assets/sprites/startbutton.png');
    },

    create: function () {
        this.game.state.start('mainmenu');
	}
};
