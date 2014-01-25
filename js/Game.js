// Level is global
Game = function(game) {
	this.game = game;
	level = null;
}

Game.prototype = {

	preload: function() {
		level = new Level(this.game);
		this.player = new Player(this.game);
  		level.preload();
  		this.player.preload();
	},

  create: function () {
    level.create();

    this.player.create();
  },

  update: function () {
    this.player.update()        
  }
}
