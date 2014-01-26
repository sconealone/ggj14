Hud = function (game){
	this.game = game;
	this.cat_header = null;
	this.cat_tables = null;
	this.dog_header = null;
	this.dog_tables = null;
}

Hud.prototype = {
	preload: function(){
		this.game.load.image('tb', "assets/sprites/table.png");
	},
	create: function(){
		//this.splash_screen = this.game.add.sprite(30, 30, 'tb');
		//table.scale.setTo(0.5,0.5);
	},
	update: function(){

	}
}
