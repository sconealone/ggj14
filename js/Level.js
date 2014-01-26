/**
  Prototype level. There will just be a floor and some walls.
*/

Level = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.platforms = null;

  this.diamond = 'hey';
}

// Note: nothing to do with this being the prototype level
Level.prototype = {
  preload: function() {
    this.game.load.image('sky', 'assets/placeholder/sky.png');
    this.game.load.image('ground', 'assets/placeholder/floor.png');
    this.game.load.image('wall', 'assets/placeholder/wall.png');

    //object of interest
    this.game.load.spritesheet('diamond', 'assets/diamond.png', 0, 0);
  },

  create: function() {
    // Skybox
    this.game.add.sprite(0, 0, 'sky');

    // Platforms
    // All things that the players can collide with are considered platforms
    this.platforms = this.game.add.group();
    
    var floorHeight = 24;
    // Ground
    this.floor = this.platforms.create(0, this.game.world.height - floorHeight, 'ground');
    this.floor.body.immovable = true;
    this.floor.body.setSize(1280, 24, 0, 0);

    // var platform2 = this.platforms.create(50, this.game.world.height - 70, 'ground');
    // platform2.body.immovable = true;

    // Walls
    var leftWall = this.platforms.create(0, -floorHeight, 'wall');
    var rightWall = this.platforms.create(this.game.world.width - floorHeight, -floorHeight, 'wall');
    leftWall.body.immovable = true;
    rightWall.body.immovable = true;

    // Diamond Spawn
    var spawnOffSetX = this.game.world.width/2;
    var spawnOffSetY = this.game.world.height - 2*floorHeight;
    this.diamond = this.game.add.sprite(spawnOffSetX, spawnOffSetY, 'diamond');
  },

  update: function() {
  }
};
