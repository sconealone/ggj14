Game = function(game) {
	this.game = game;
	this.level = null;
}

Game.prototype = {

	preload: function() {
		this.level = new Level(this.game);
		this.player = new Player(this.game);
		this.table = new Table(this.game, this.player);

  		this.level.preload();
  		this.player.preload();
  		this.table.preload();
	},

    create: function () {
        console.log('hi! this is the game state');

  		this.level.create();

  		this.player.create();
  		this.table.create();

      	this.cursors = this.game.input.keyboard.createCursorKeys(); 

      	this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 		
    },

    shootBullet: function () {
    	console.log('shoot tables');

    },
    update: function () {

    	this.shootButton.onDown.add(this.shootBullet, this);


        
    }
}