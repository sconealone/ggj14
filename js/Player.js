/**
  Player 1, Swordfish cat
*/

// I guess this is like a constructor
Player = function(game) {
  this.game = game;
  this.sprite = null;
  // Cursors are how we control the player
  this.cursors = null;
};

function addPhysics(player) {
  player.sprite.body.bounce.y = 0.2;
  player.sprite.body.gravity.y = 20;
  player.sprite.body.collideWorldBounds = true;
};

Player.prototype = {
  preload: function() {
    this.game.load.spritesheet('cat', 'assets/placeholder/cat-small.png', 64, 64);
  },

  create: function() {
    var spawnOffsetY = 24;
    var spawnOffsetX = 24;
    this.sprite = this.game.add.sprite(spawnOffsetX, this.game.world.height - (64 + spawnOffsetY), 'cat');

    addPhysics(this);
  },

  update: function() {
    this.game.physics.collide(this.sprite, level.platforms);
  }
}
