/**
  Player 1, Swordfish cat
*/

var LEFT = 0;
var RIGHT = 1;

// I guess this is like a constructor
Player = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.sprite = null;
  this.direction = RIGHT;
  this.num_tables = 10;
  this.done_flip = true;
  this.knock_back = true;

  //count # of overlaps
  this.count = 0;
};

Player.prototype = {
  /////////////////
  // Public
  /////////////////
  preload: function() {
    this.game.load.spritesheet('cat', 'assets/sprites/catsheet.png', 64, 64);
  },

  create: function() {

    this.initializeKeys();
    var spawnOffsetY = 24;
    var spawnOffsetX = 32 + 24;
    this.sprite = this.game.add.sprite(spawnOffsetX, this.game.world.height - (64 + spawnOffsetY), 'cat');
    this.sprite.anchor.x = 0.5;

    this.sprite.animations.add('left', [1, 2, 3, 4, 5], 10, true);
    this.sprite.animations.add('right', [1, 2, 3, 4, 5], 10, true);
    this.sprite.animations.add('jump', [22], 10, true);
    this.sprite.animations.add('flip', [7,8,9], 10, false);  

    // knock back animation
    this.sprite.animations.add('knockback', [36], 10, true);  

    this.addPhysics();

    console.log(level.diamond);
  },

  update: function() {
    this.game.physics.collide(this.sprite, level.platforms);
    this.game.physics.collide(this.sprite, tableManager.attacks);
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
    this.weakKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.strongKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

    // Getting Knocked Back
    this.knockBackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
  },

  checkKeyboard: function() {
    var isAirborne = !this.sprite.body.touching.down;
    var tryJump = this.upKey.isDown && !isAirborne;
    var jumpSpeed = -800;
    var runSpeed = isAirborne ? 180: 250;

    this.sprite.body.velocity.x = 0;
    this.sprite.anchor.x = 0.5;

    // Check movement
    if (this.done_flip && this.knock_back){
      if (this.leftKey.isDown) {
        this.sprite.body.velocity.x = -runSpeed;
        this.tryFaceCorrectDirection(LEFT);
        this.sprite.animations.play('left');
      }
      else if (this.rightKey.isDown) {
        this.sprite.body.velocity.x = runSpeed;
        this.tryFaceCorrectDirection(RIGHT);
        console.log('right key pressed');
        this.sprite.animations.play('right');
      }
      else if (this.upKey.isDown && isAirborne){
        this.sprite.animations.play('jump');
      }
      else {
        // stop animation code will go here
        this.sprite.animations.stop();
        this.sprite.frame = 0;
      }
    }


    if (this.weakKey.isDown) {
      this.done_flip = false;
      this.shootBullet();
      this.sprite.animations.play('flip');
      this.sprite.events.onAnimationComplete.add(function(){
            this.done_flip = true;
          }, this);
    }

    // Check jumps
    if (tryJump) {
      this.sprite.body.velocity.y = jumpSpeed;

    }

    // Knocked Back
    if (this.knockBackKey.isDown){
      this.knock_back = false;
      knockBack(this.sprite, this.sprite.body.velocity.x, this.sprite.body.touching);
      console.log('X key pressed');
      this.sprite.animations.play('knockback');
      this.sprite.events.onAnimationComplete.add(function(){
            this.knock_back = true;
          }, this);
    }
  },

  // Knock Back function
  knockBack: function(player, playerDirection, tableHitPlayerFrom){
    console.log(tableHit)

    // player right, table left
    if ( playerDirection > 0 && tableHitPlayerFrom.touching.right)
    this.sprite.body.velocity.x = (-1 * playerDirection) ;
    this.sprite.body.velocity.y = -400 ;
    this.sprite.body.rotation = 325;
    this.sprite.body.angularVelocity = -90;
    this.sprite.body.angularDrag = 90;
    this.sprite.body.mass = 0.1;
    this.sprite.body.gravity.y = 15;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.bounce.y = 0.3;
    this.sprite.body.collideWorldBounds = true;



    // player right, table right
    // player right, table top
    // player right, table bottom
    // player left, table left
    // player left, table right
    // player left, table top
    // player left, table bottom

    this.sprite.body.velocity.x = (-1 * playerDirection) ;
    this.sprite.body.velocity.y = -400 ;
    this.sprite.body.rotation = 325;
    this.sprite.body.angularVelocity = -90;
    this.sprite.body.angularDrag = 90;
    this.sprite.body.mass = 0.1;
    this.sprite.body.gravity.y = 15;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.bounce.y = 0.3;
    this.sprite.body.collideWorldBounds = true;
  },

  // Fire a table. Weak attack.
  shootBullet: function() {
    var tableSpawnX = this.sprite.x + 10;
    var tableSpawnY =  this.sprite.y - 10;
    var _this = this;
    tableManager.shootBullet(_this,tableSpawnX, tableSpawnY, this.direction);
  },

  // I want to have this read in at the constructor
  // This way one player can choos different characters
  addPhysics: function() {
    this.sprite.body.bounce.y = 0.1;
    this.sprite.body.gravity.y = 30;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.mass = 0.1;
  },

  tryFaceCorrectDirection: function(tryTurnDirection) {
    if (tryTurnDirection == this.direction) {
      return;
    }
    this.direction = tryTurnDirection;
    this.sprite.scale.x *= -1;
  },
  collectDiamond: function(player, diamond) {
    console.log(this.count);
    this.count++;
    console.log(this.count);
    diamond.kill();

}
}


// What do to here?????
Player2 = function(game) {
  this.game = game;
  this.sprite = null;
  this.direction = RIGHT;
  this.cursors = null;

  this.done_flip = true;

  //count # of overlaps
  this.count = 0;
}

// Public

Player2.prototype = {
  preload: function() {
    this.game.load.spritesheet('dog', 'assets/sprites/dogsheet.png', 64, 80);
  },
  create: function() {
    this.initializeKeys();

    var spawnOffsetY = 24;
    var spawnOffsetX = this.game.world.width - 24;
    this.direction = LEFT;
    var spriteHeight = 80;
    var spawnY = this.game.world.height - (spriteHeight + spawnOffsetY);
    this.sprite = this.game.add.sprite(spawnOffsetX, spawnY, 'dog');
    this.sprite.scale.x = -1;

    this.sprite.animations.add('left', [1, 2, 3, 4, 5, 6, 7], 10, true);
    this.sprite.animations.add('right', [1, 2, 3, 4, 5, 6, 7], 10, true);
    this.sprite.animations.add('jump', [37], 10, true);
    this.sprite.animations.add('flip', [9,10,11], 6, false);   

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
    this.knockBackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  }

};

// Fake Inherited
Player2.prototype.update = Player.prototype.update;
Player2.prototype.addPhysics = Player.prototype.addPhysics;
Player2.prototype.checkKeyboard = Player.prototype.checkKeyboard;
Player2.prototype.tryFaceCorrectDirection = Player.prototype.tryFaceCorrectDirection;
Player2.prototype.collectDiamond = Player.prototype.collectDiamond;
Player2.prototype.shootBullet = Player.prototype.shootBullet;

