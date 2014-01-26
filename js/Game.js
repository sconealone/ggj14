// Level is global
// All managers are global
GameObjectManager = function(game) {
	this.game = game;
	level = null;
  tableManager = null;
}

GameObjectManager.prototype = {

	preload: function() {
    _this = this;
		level = new Level(_this);
		player1 = new Player(_this);
		player2 = new Player2(_this);
		tableManager = new Table(_this);
    globe = new Globe(_this);

  		level.preload();
      globe.preload();
  		player1.preload();
  		player2.preload();
  		tableManager.preload();
	},

  create: function () {
    	level.create();
      globe.create();
  		player1.create();
  		player2.create();
  		tableManager.create();
    },

    update: function () {

      globe.update();
    	player1.update();
    	player2.update();
    	tableManager.update(); 
      level.update();
    },
    render: function() {
      this.game.debug.renderSpriteBody(level.floor2);
    }
}
