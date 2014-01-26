Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {
    	this.game.load.image('splash', 'assets/backgrounds/splashfinal.png');
        this.game.load.image('start', 'assets/sprites/startbutton.png');

        this.game.load.image('level2', 'assets/backgrounds/fliptonext.png');
    },

    create: function () {
        this.game.state.start('mainmenu');
	}
};
