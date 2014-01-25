/**
  Player 1, Swordfish cat
*/

var LEFT = 0;
var RIGHT = 1;

// I guess this is like a constructor
Player = function(game) {
  this.game = game;
  this.sprite = null;
  this.direction = RIGHT;
};

Player.prototype = {
  /////////////////
  // Public
  /////////////////
  preload: function() {
    this.game.load.spritesheet('cat', 'assets/placeholder/catcl.png', 64, 64);
  },

  create: function() {
    var spawnOffsetY = 24;
    var spawnOffsetX = 24;
    this.sprite = this.game.add.sprite(spawnOffsetX, this.game.world.height - (64 + spawnOffsetY), 'cat');
    this.sprite.anchor.x = 0.5;

    this.initializeKeys();
    this.addPhysics();
  },

  update: function() {
    this.game.physics.collide(this.sprite, level.platforms);
    this.checkKeyboard();
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
    this.sprite.anchor.x = 0.5;

    // Check movement
    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x = -runSpeed;
      this.tryFaceCorrectDirection(LEFT);
    }
    else if (this.rightKey.isDown) {
      this.sprite.body.velocity.x = runSpeed;
      this.tryFaceCorrectDirection(RIGHT);
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

  // I want to have this read in at the constructor
  // This way one player can choos different characters
  addPhysics: function() {
    this.sprite.body.bounce.y = 0.1;
    this.sprite.body.gravity.y = 30;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.mass = 0.5;
  },

  tryFaceCorrectDirection: function(tryTurnDirection) {
    if (tryTurnDirection == this.direction) {
      return;
    }
    this.direction = tryTurnDirection;
    this.sprite.scale.x *= -1;
  }
}


// What do to here?????
Player2 = function(game) {
  this.game = game;
  this.sprite = null;
  this.direction = RIGHT;
  this.cursors = null;
}

// Public

Player2.prototype = {
  preload: function() {
    this.game.load.spritesheet('dog', 'assets/placeholder/dog.png', 64, 80);
  },
  create: function() {
    var spawnOffsetY = 24;
    var spawnOffsetX = this.game.world.width - 24;
    this.direction = LEFT;
    var spriteHeight = 80;
    var spawnY = this.game.world.height - (spriteHeight + spawnOffsetY);
    this.sprite = this.game.add.sprite(spawnOffsetX, spawnY, 'dog');
    this.sprite.scale.x = -1;

    this.initializeKeys();
    this.addPhysics();
  },

// Private

  initializeKeys: function() {
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.K);

    // Attack
    // Keys subject to change!
    this.weakKey = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
    this.strongKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
  },

// Fake Inherited
  update: function() {
    this.game.physics.collide(this.sprite, level.platforms);
    this.checkKeyboard();
  },

  addPhysics: function() {
    this.sprite.body.bounce.y = 0.1;
    this.sprite.body.gravity.y = 30;
    this.sprite.body.collideWorldBounds = true;
  },

  checkKeyboard: function() {
    var isAirborne = !this.sprite.body.touching.down;
    var tryJump = this.upKey.isDown && !isAirborne;
    var isAirborne = !this.sprite.body.touching.down;
    var jumpSpeed = -800;
    var runSpeed = isAirborne ? 180: 250;

    this.sprite.body.velocity.x = 0;
    this.sprite.anchor.x = 0.5;

    // Check movement
    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x = -runSpeed;
      this.tryFaceCorrectDirection(LEFT);
    }
    else if (this.rightKey.isDown) {
      this.sprite.body.velocity.x = runSpeed;
      this.tryFaceCorrectDirection(RIGHT);
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

  tryFaceCorrectDirection: function(tryTurnDirection) {
    if (tryTurnDirection == this.direction) {
      return;
    }
    this.direction = tryTurnDirection;
    this.sprite.scale.x *= -1;
  }
};
