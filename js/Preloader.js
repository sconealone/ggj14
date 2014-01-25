Preloader = function(game) {
    this.game = game;
}

Preloader.prototype = {
    preload: function () {

            this.game.load.image('start', 'assets/start_btn.png')
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('ground', 'assets/platform.png');
            this.game.load.image('star', 'assets/star.png');
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    },

    create: function () {

        console.log('Preloade finished, lets go to the main menu automatically');
        // this.game.add.sprite(400,400,'start');
        this.game.state.start('mainmenu');

    }    

};
