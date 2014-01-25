Game = function(game) {
	this.game = game;
	this.level = null;
}

Game.prototype = {

	preload: function() {
		this.level = new Level(this.game);
  		this.level.preload();
	},

    create: function () {
        console.log('hi! this is the game state');

  		this.level.create();
    },

    update: function () {
        
    }
}