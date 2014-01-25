/**
  Prototype level. There will just be a floor and some walls.
*/

Level = function(game) {
  this.game = game;
  this.platforms = null;
}

// Note: nothing to do with this being the prototype level
Level.prototype = {
  preload: function() {
    this.game.load.image('sky', 'assets/placeholder/sky.png');
    this.game.load.image('ground', 'assets/placeholder/floor.png');
    this.game.load.image('wall', 'assets/placeholder/wall.png');
  },

  create: function() {
    // Skybox
    this.game.add.sprite(0, 0, 'sky');
    
    var floorHeight = 24;
    // Ground
    this.floor = this.game.add.sprite(0, game.world.height - floorHeight, 'ground');
    this.floor.body.immovable = true;

    // Walls
    walls = this.game.add.group();
    var leftWall = walls.create(0, -floorHeight, 'wall');
    var rightWall = walls.create(game.world.width - floorHeight, -floorHeight, 'wall');
    leftWall.body.immovable = true;
    rightWall.body.immovable = true;
  },

  update: function() {
  }
};
