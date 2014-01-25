Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {
        this.game.load.image('start', 'assets/start_btn.png');
        this.game.load.image('diamond', 'assets/diamond.png');
    },

    create: function () {
        this.game.state.start('mainmenu');
        this.game.add.sprite(3,2,'diamond');
}
};
