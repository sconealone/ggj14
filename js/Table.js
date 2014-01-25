Table = function(game, attacker) {
	this.game = game;
  this.attacker = attacker;

}

Table.prototype = {

	  preload: function() {
      this.game.load.image('table', '../assets/diamond.png');
	  },

    create: function () {
      this.game.add.sprite(this.attacker.sprite.x, 400, 'table');
      

    },

    update: function () {

    	
    }
}