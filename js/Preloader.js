Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {
        this.game.load.image('start', 'assets/start_btn.png');
    },

    create: function () {
        this.game.state.start('mainmenu');
    }    

};
