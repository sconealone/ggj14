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
		this.player1 = new Player(_this);
		this.player2 = new Player2(_this);
		tableManager = new Table(_this);
    globe = new Globe(_this);

  		level.preload();
      globe.preload();
  		this.player1.preload();
  		this.player2.preload();
  		tableManager.preload();
	},

  create: function () {
    	level.create();
      globe.create();
  		this.player1.create();
  		this.player2.create();
  		tableManager.create();
    },

    update: function () {

      globe.update();
    	this.player1.update();
    	this.player2.update();
    	tableManager.update(); 
      level.update();
    }
}
