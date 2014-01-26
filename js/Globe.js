Globe = function(game) {
	this.game = game;
}

Globe.prototype = {

	preload: function(){
		//this.game.load.image('neutral', 'assets/sprites/world.png');

		this.game.load.spritesheet('world', "assets/sprites/catdogworldsheet.png", 80, 80);
		this.game.load.spritesheet('catworld', "assets/sprites/catworldsheet.png", 80, 80);
		this.game.load.spritesheet('dogworld', "assets/sprites/dogworldsheet.png", 80, 80);

	},

	create: function() {
		this.sprite = this.game.add.sprite(this.game.world.width/2, 10, 'world');

	},

	update: function() {

		var n = level.p1_diamonds - level.p2_diamonds;

		switch (n){
			case 0:
				//neutral world
				this.sprite.frame = 0;
			  break;
			case 1:
			  //execute code block 2
			  	this.sprite.frame = 1;
			  break;
			case 2:
				this.sprite.frame = 2;
				break;
			case 3:
				this.sprite.frame = 3;
				break;
			case -1:
				this.sprite.frame = 4;
				break;
			case -2:
				this.sprite.frame = 5;
				break;
			case -3:
				this.sprite.frame = 6;
				break;
			default:
				this.sprite.frame = 0;
				break;
		}
	}


}