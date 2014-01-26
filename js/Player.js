/**
  Player 1, Swordfish cat
*/

var LEFT = 0;
var RIGHT = 1;
var MAX_TABLES = 10;

// I guess this is like a constructor
Player = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.sprite = null;
  this.direction = RIGHT;
  this.num_tables = 0;
  this.done_flip = true;
  this.cooldown = 0;
  this.isAirborne = false;
  this.knock_back_is_playing = false;

  //count # of collected diamonds
  this.num_diamonds = 0;
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
    this.sprite.anchor.y = 0.5;
    this.sprite.owner = this;

    this.sprite.animations.add('left', [1, 2, 3, 4], 12, true);
    this.sprite.animations.add('right', [1, 2, 3, 4], 12, true);
    this.sprite.animations.add('jump', [22], 10, true);
    this.sprite.animations.add('flip', [7,8,9], 8, false);    
    this.sprite.animations.add('crouch', [15], 8, false);    
    this.sprite.animations.add('channel', [41], 8, true);    
    this.sprite.animations.add('knockback', [36], 10, true);  

    this.addPhysics();
  },

  update: function() {
    this.game.physics.collide(this.sprite, level.platforms);
    this.game.physics.overlap(this.sprite, level.diamonds, this.collectDiamond, null, this);
    this.game.physics.overlap(this.sprite, level.diamond, this.collectDiamond, null, this);
    if (this.cooldown > 0){
      this.cooldown--;
    }
    var _this = this;
    this.game.physics.collide(tableManager.attacks, this.sprite, this.hitPlayer, null, _this);
    this.isAirborne = !this.sprite.body.touching.down || this.isAirborne;
    this.checkKeyboard();
    this.isAirborne = false;
  },

  hitPlayer: function(sprite, table) {
    var attacker = table.attacker;
    if (sprite != attacker.sprite && table.isWeaponized) {
      tableManager.hitDefender(sprite, table);
    } else {
      tableManager.hitAttacker(sprite, table);
    }
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
    var tryJump = this.upKey.isDown && !this.isAirborne && !this.knock_back_is_playing;
    var jumpSpeed = -800;
    var runSpeed = this.isAirborne ? 180: 250;

    if (!this.knock_back_is_playing) {
      this.sprite.body.velocity.x = 0;
    }
    this.sprite.anchor.x = 0.5;

    // Check movement
    if (this.done_flip && !this.knock_back_is_playing){
      if (this.leftKey.isDown) {
        this.sprite.body.velocity.x = -runSpeed;
        this.tryFaceCorrectDirection(LEFT);
        var animationName = this.isAirborne ? 'jump' : 'left';
        this.sprite.animations.play(animationName);
      }
      else if (this.rightKey.isDown) {
        this.sprite.body.velocity.x = runSpeed;
        this.tryFaceCorrectDirection(RIGHT);
        var animationName = this.isAirborne ? 'jump' : 'right';
        this.sprite.animations.play(animationName);
      }
      else if (this.isAirborne) {
        this.sprite.animations.play('jump');
      }
      else if (this.downKey.isDown) {
        this.sprite.animations.play('crouch');
      }
      else {
        // stop animation code will go here
        this.sprite.animations.stop();
        this.sprite.frame = 0;
      }
    }


    if (this.weakKey.isDown && !this.knock_back_is_playing) {
      // Actually is it better to play the animation?
      if (this.cooldown > 0 || this.num_tables >= MAX_TABLES) {
        return;
      }
      this.cooldown = 60;
      this.done_flip = false;
      var _this = this;
      setTimeout(function(){_this.shootBullet();}, 200);
      this.sprite.animations.play('flip');
      var _this = this;
      this.sprite.events.onAnimationComplete.add(function(){
            this.done_flip = true;
          }, _this);
    }

    // Check jumps
    if (tryJump) {
      this.sprite.body.velocity.y = jumpSpeed;

    }

  },

  // Knock Back function
  knockBack: function(sprite, table) {
    if (this.knock_back_is_playing) {
      return;
    }
    this.knock_back_is_playing = true;
    sprite.animations.play('knockback');
    var isTableGoingRight = table.body.x < sprite.body.x;
    var angle = 180;
    var speed = 80;
    if (isTableGoingRight)
    {
      angle = 0;
    }
    this.game.physics.velocityFromAngle(angle, speed, sprite.body.velocity);
    var _this = this;
    setTimeout(function(){_this.knock_back_is_playing=false;sprite.animations.stop;sprite.frame=0;}, 700);
  },

  // Fire a table. Weak attack.
  shootBullet: function() {
    if (this.num_tables >= MAX_TABLES) {
      return;
    }
    var tableSpawnX = this.sprite.x + 10;
    var tableSpawnY =  this.sprite.y + 10;
    var _this = this;
    this.num_tables++;
    tableManager.shootBullet(_this,tableSpawnX, tableSpawnY, this.direction);
  },

  // I want to have this read in at the constructor
  // This way one player can choos different characters
  addPhysics: function() {
    this.sprite.body.bounce.y = 0.0;
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

    level.p1_diamonds++;

    diamond.kill();
    level.total_diamonds--;

    if(level.p1_diamonds < 3 && level.p2_diamonds < 3){
      level.spawnDiamond();
    }

  }  
}


// What do to here?????
Player2 = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.sprite = null;
  this.direction = LEFT;
  this.num_tables = 0;
  this.done_flip = true;
  this.cooldown = 0;
  this.isAirborne = false;
  this.knock_back_is_playing = false;

  //count # of collected diamonds
  this.num_diamonds = 0;
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
    this.sprite.owner = this;
    this.sprite.scale.x = -1;

    this.sprite.animations.add('left',  [1, 2, 3, 4, 4, 5, 6], 17, true);
    this.sprite.animations.add('right', [1, 2, 3, 4, 4, 5, 6], 17, true);
    this.sprite.animations.add('jump', [28], 10, true);
    this.sprite.animations.add('flip', [9,10,11], 8, false);   
    this.sprite.animations.add('crouch', [19], 10, true);
    this.sprite.animations.add('channel', [37], 10, true);
    this.sprite.animations.add('knockback', [46], 10, true);

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
    this.weakKey = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
    this.strongKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.knockBackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  },
  collectDiamond: function(player, diamond) {

    level.p2_diamonds++;

    diamond.kill();
    level.total_diamonds--;

    if(level.p2_diamonds < 3 && level.p1_diamonds < 3){
      level.spawnDiamond();
    }

  }  
};

// Fake Inherited
Player2.prototype.update = Player.prototype.update;
Player2.prototype.addPhysics = Player.prototype.addPhysics;
Player2.prototype.checkKeyboard = Player.prototype.checkKeyboard;
Player2.prototype.tryFaceCorrectDirection = Player.prototype.tryFaceCorrectDirection;
Player2.prototype.shootBullet = Player.prototype.shootBullet;
Player2.prototype.hitPlayer = Player.prototype.hitPlayer;
Player2.prototype.knockBack = Player.prototype.knockBack;
