Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {
    	this.game.load.image('splash', 'assets/backgrounds/splashfinal.png');
        this.game.load.image('start', 'assets/sprites/startbutton.png');

        this.game.load.image('level1', 'assets/sprites/level1.png');
        this.game.load.image('level2', 'assets/sprites/level2.png');
        this.game.load.image('level3', 'assets/sprites/level3.png');
    },

    create: function () {
        this.game.state.start('mainmenu');
	}
};
