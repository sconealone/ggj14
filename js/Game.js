// Level is global
Game = function(game) {
	this.game = game;
	level = null;
}

Game.prototype = {

	preload: function() {
		level = new Level(this.game);
		this.player = new Player(this.game);
		this.player2 = new Player2(this.game);
		this.table = new Table(this.game, this.player);

  		level.preload();
  		this.player.preload();
  		this.player2.preload();
  		this.table.preload();
	},

  create: function () {
    	level.create();

  		this.player.create();
  		this.player2.create();
  		this.table.create();

      	this.cursors = this.game.input.keyboard.createCursorKeys(); 

      	this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Q); 		
    },

    update: function () {

    	this.player.update();
    	this.player2.update();
    	this.table.update(); 
    }

}
