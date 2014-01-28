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

        this.game.load.image('instruction_page', "assets/backgrounds/instructionspage.png");
        this.game.load.image('instruction_btn', "assets/sprites/instructions.png");

        this.game.load.audio('click', ['assets/sounds/UI_Selector.wav']);
        //game.load.audio('click', ['assets/sounds/squit.mp3', 'assets/audio/SoundEffects/squit.ogg']);
    },

    create: function () {
        this.game.state.start('mainmenu');
	}
};
