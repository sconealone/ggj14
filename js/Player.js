/**
  Player 1, Swordfish cat
*/

// I guess this is like a constructor
Player = function(game) {
  this.game = game;
  this.sprite = null;
  // Cursors are how we control the player
  this.cursors = null;

  //count # of overlaps
  this.count = 0;
};

Player.prototype = {
  /////////////////
  // Public
  /////////////////
  preload: function() {
    this.game.load.spritesheet('cat', 'assets/placeholder/cat-small.png', 64, 64);
  },

  create: function() {
    var spawnOffsetY = 24;
    var spawnOffsetX = 24;
    this.sprite = this.game.add.sprite(spawnOffsetX, this.game.world.height - (64 + spawnOffsetY), 'cat');

    this.initializeKeys();
    this.addPhysics();

    console.log(level.diamond);
  },

  update: function() {
    this.game.physics.collide(this.sprite, level.platforms);
    this.checkKeyboard();
    this.game.physics.overlap(this.sprite, level.diamond, this.collectDiamond, null, this);
  },

  /////////////////
  // Private
  /////////////////
  initializeKeys: function() {
    // Movement
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

    // Attack
    // Keys subject to change!
    this.weakKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
    this.strongKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
  },

  checkKeyboard: function() {
    var isAirborne = !this.sprite.body.touching.down;
    var tryJump = this.upKey.isDown && !isAirborne;
    var isAirborne = !this.sprite.body.touching.down;
    var jumpSpeed = -800;
    var runSpeed = isAirborne ? 180: 250;
    this.sprite.body.velocity.x = 0;

    // Check movement
    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x = -runSpeed;
    }
    else if (this.rightKey.isDown) {
      this.sprite.body.velocity.x = runSpeed;
    }
    else {
      // stop animation code will go here
    }

    // Check attacks

    // Check jumps
    if (tryJump) {
      this.sprite.body.velocity.y = jumpSpeed;
    }
  },

  addPhysics: function() {
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 30;
    this.sprite.body.collideWorldBounds = true;
  },

  collectDiamond: function(player, diamond) {
    console.log(this.count);
    this.count++;
    console.log(this.count);
    diamond.kill();
}
};

