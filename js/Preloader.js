Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {

        this.game.load.image('start', 'assets/start_btn.png');

    },

    create: function () {

        console.log('Preload finished, lets go to the main menu automatically');

        this.game.state.start('mainmenu');

    }    

};
