MainMenu = function(game) {
	this.game = game;
}

MainMenu.prototype = {
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'splash');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        button = this.game.add.button(this.game.world.centerX, 400, 'start', this.startGame, this, 2, 1, 0);
       	button.scale.setTo(0.7, 0.7);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        this.game.state.start('game');
    }	
}

CatWin = function(game) {
	this.game = game;
}

CatWin.prototype = {
	preload: function() {
	},
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'catwin');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        button = this.game.add.button(this.game.world.centerX + 400, 400, 'fliplevel', this.startGame, this, 2, 1, 0);
       	button.scale.setTo(0.7, 0.7);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        this.game.state.start('game');
    }	
}

DogWin = function(game) {
	this.game = game;
}

DogWin.prototype = {
	preload: function() {
	},
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'dogwin');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        button = this.game.add.button(this.game.world.centerX - 400, 400, 'fliplevel', this.startGame, this, 2, 1, 0);
       	button.scale.setTo(0.7, 0.7);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        this.game.state.start('game');
    }	
}


