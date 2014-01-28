/**
  Player 1, Swordfish cat
*/

var LEFT = 0;
var RIGHT = 1;
var MAX_TABLES = 10;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  this.wasChannelSuccessful = false;
  this.isChanneling = false;
  this.loss = false;
  this.loss_frame = 15;
  this.knock_back_is_playing = false;
  this.isImmune = false;
  this.name='p1';
  this.channelingSound = false;

  this.counter1 = null;
  this.counter2 = null;
  this.counter3 = null;

  //count # of collected diamonds
  this.num_diamonds = 0;
};

Player.prototype = {
  /////////////////
  // Public
  /////////////////
  preload: function() {
    this.game.load.spritesheet('cat', 'assets/sprites/catsheet.png', 64, 64);
    this.game.load.image('hud_icon', "assets/sprites/table.png");
    this.game.load.image('dogicon', "assets/sprites/dogicon.png");
    this.game.load.image("caticon", "assets/sprites/caticon.png");


    this.game.load.audio('catjump1', ['assets/sounds/Cat_Jump1.wav']);
    this.game.load.audio('catjump2', ['assets/sounds/Cat_Jump2.wav']);

    this.game.load.audio('woosh1', ['assets/sounds/Table_Whoosh1.wav']);
    this.game.load.audio('woosh2', ['assets/sounds/Table_Whoosh1.wav']);
    this.game.load.audio('woosh3', ['assets/sounds/Table_Whoosh1.wav']);
    this.game.load.audio('woosh4', ['assets/sounds/Table_Whoosh1.wav']);    

    this.game.load.audio('cathit1', ["assets/sounds/Cat_Hit1.wav"]);
    this.game.load.audio('cathit2', ["assets/sounds/Cat_Hit2.wav"]);


    this.game.load.audio('channeling1', ['assets/sounds/Channeling_sound_1.wav']);

    this.game.load.spritesheet('diamondCounter', 'assets/sprites/hudsheet.png', 32, 32);
  },

  create: function() {
    this.createHud();

    this.initializeKeys();
    this.sprite = this.game.add.sprite(level.p1Spawn[0], level.p1Spawn[1], 'cat');
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.owner = this;

    this.sprite.animations.add('left', [1, 2, 3, 4], 12, true);
    this.sprite.animations.add('right', [1, 2, 3, 4], 12, true);
    this.sprite.animations.add('jump', [22], 10, true);
    this.sprite.animations.add('flip', [7,8,9], 8, false);    
    this.sprite.animations.add('crouch', [15], 8, false);    
    this.sprite.animations.add('channel', [29, 30], 18, true);    
    this.sprite.animations.add('knockback', [36], 10, true);  

    for (var i = 1; i <= 3; i++){
      this.game.add.audio("dogthrow" + i, 1, true);
      this.game.add.audio("dogthrow" + i, 1, true);
      this.game.add.audio("dogthrow" + i, 1 , true);
    }

    this.addPhysics();
  },
  collidePlayers: function (player1_p, player2_p) {
    var stompee = null;
    var stomper = null;
    if (player1_p.body.touching.up) { // getting stomped on
      stompee = player1_p;
      stomper = player2_p;
    }
    else {
      stompee = player2_p;
      stomper = player1_p;
    }
    if (stompee.owner.knock_back_is_playing || stompee.owner.isImmune) {
      return;
    }
    stompee.owner.knock_back_is_playing = true;
    stompee.animations.play('knockback');
    setTimeout(function(){stompee.owner.makeImmuneToKnockback();stompee.owner.knock_back_is_playing=false;stompee.animations.stop;stompee.frame=0;}, 500);
  },
  createHud: function(num_tables){
    this.icon = this.game.add.sprite(100, 20, "caticon");


    this.hud = this.game.add.sprite(100, 70, 'hud_icon');
    this.hud.scale.setTo(0.5,0.5);
    this.num_table_display = this.game.add.text(100 + 60, 60, 'x 10', { fontSize: '14px', fill: '#000' });
    this.counter1 = this.game.add.sprite(150 + 60 + 60 + 00, 75, 'diamondCounter');
    this.counter2 = this.game.add.sprite(150 + 60 + 60 + 40, 75, 'diamondCounter');
    this.counter3 = this.game.add.sprite(150 + 60 + 60 + 80, 75, 'diamondCounter');
    this.counter1.anchor.setTo(0.5, 0.5);
    this.counter2.anchor.setTo(0.5, 0.5);
    this.counter3.anchor.setTo(0.5, 0.5);
  },

  update: function() {
    if (this.sprite.y > level.floor.y - this.sprite.height/2) {
      this.sprite.y = level.floor.y - this.sprite.height/2;
    }
    this.game.physics.collide(this.sprite, level.platforms);
    this.game.physics.overlap(this.sprite, level.diamonds, this.tryCollectDiamond, null, this);
    player1.sprite.body.allowCollision.left =  false;
    player1.sprite.body.allowCollision.right = false;
    player2.sprite.body.allowCollision.left =  false;
    player2.sprite.body.allowCollision.right = false;
    this.game.physics.collide(player1.sprite, player2.sprite, this.collidePlayers, null, this);
    player1.sprite.body.allowCollision.left =  true;
    player1.sprite.body.allowCollision.right = true;
    player2.sprite.body.allowCollision.left =  true;
    player2.sprite.body.allowCollision.right = true;
    if (this.cooldown > 0){
      this.cooldown--;
    }
    var _this = this;
    this.game.physics.collide(tableManager.attacks, this.sprite, this.hitPlayer, null, _this);
    this.isAirborne = !this.sprite.body.touching.down || this.isAirborne;
    if (!this.loss){
      this.checkKeyboard();
      this.isAirborne = false;

    } else {
      this.sprite.animations.stop();
      this.sprite.frame = this.loss_frame; // 46 
      this.sprite.body.velocity.x = 0;
    }
    //this.createHud(this.num_tables);
    this.num_table_display.content = "x " + (MAX_TABLES - this.num_tables);
  },

  hitPlayer: function(sprite, table) {
    var attacker = table.attacker;
    if (sprite != attacker.sprite && table.isWeaponized) {
      this.wasChannelSuccessful = false;
      this.isChanneling = false;
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
    this.weakKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
    this.strongKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);

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
    if (this.done_flip && !this.knock_back_is_playing && !this.isChanneling) {
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
    else if (this.isChanneling) {
      this.sprite.animations.play('channel');
      //channeling sound here 

      if (!this.channelingSound){
        if (this.name = 'p1'){
          var sound = this.game.add.audio('channeling1', 1, false);
          sound.play('', 0, 1, false);
          this.channelingSound = true;
        } 
        else {
          var sound = this.game.add.audio('channeling2', 1, false);
          sound.play('', 0, 1, false);
          this.channelingSound = true;
        }
      }

      return;
    }


    if ((this.weakKey.isDown || this.strongKey.isDown) && !this.knock_back_is_playing) {


      // Actually is it better to play the animation?
      if (this.cooldown > 0 || this.num_tables >= MAX_TABLES) {
        return;
      }

      this.cooldown = 45;
      this.done_flip = false;
      var _this = this;
      setTimeout(function(){_this.shootBullet();}, 200);
      this.sprite.animations.play('flip');

      var rn = getRandomInt(1,4);
      var woosh = this.game.add.audio('woosh' + rn, 1, true);
      woosh.play('',0,1,false);

      var _this = this;
      this.sprite.events.onAnimationComplete.add(function(){
            this.done_flip = true;
          }, _this);
    }

    // Check jumps
    if (tryJump) {
      this.sprite.body.velocity.y = jumpSpeed;
        var rn = getRandomInt(1,2);
        if (this.name == 'p1'){
          var jump_sound = this.game.add.audio('catjump' + rn, 1 ,false);
          jump_sound.play('', 0, 1, false);

        }
        else {
          var jump_sound = this.game.add.audio('dogjump' + rn, 1, false);
          jump_sound.play('', 0, 1, false);
        }

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

  makeImmuneToKnockback: function() {
    this.isImmune = true;
    var _this = this;
    setTimeout(function(){_this.isImmune = false;}, 300);
  },

  // Fire a table. Weak attack.
  shootBullet: function() {
    if (this.num_tables >= MAX_TABLES) {
      return;
    }
    
    if (this.name == 'p2'){
    var rn = getRandomInt(1, 3);
    var dogthrow = this.game.add.audio('dogthrow' + rn, 1, true);
    dogthrow.play('',0,1,false);
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
    this.num_diamonds++;
    level.total_diamonds--;

    switch (this.num_diamonds){
      case 0:
        this.counter1.frame = 0;
        this.counter2.frame = 0;
        this.counter3.frame = 0;
        break;
      case 1:
        this.counter1.frame = 1;
        this.counter2.frame = 0;
        this.counter3.frame = 0;
        break;
      case 2:
        this.counter1.frame = 1;
        this.counter2.frame = 1;
        this.counter3.frame = 0;
        break;
      case 3:
        this.counter1.frame = 1;
        this.counter2.frame = 1;
        this.counter3.frame = 1;
        break;
      default:
    };

    setTimeout(
      function() {
        if(level.p1_diamonds < 3 && level.p2_diamonds < 3){
          var point = 5 - level.total_diamonds;
          level.spawnDiamond(level.offsetX[point], level.offsetY[point]);
        }
      }, 3000);

  },
  tryCollectDiamond: function(player, diamond) {
    // Channel
    if (this.isChanneling) {
      return;
    }
    diamond.kill();
    this.wasChannelSuccessful = true;
    this.isChanneling = true;
    var _this = this;
    setTimeout(
      function(){
        if (_this.wasChannelSuccessful) {
          _this.collectDiamond(player, diamond);
        }
        else {
          var point = (5 - level.total_diamonds);
          level.spawnDiamond(level.offsetX[point], level.offsetY[point]);
        }
        _this.isChanneling = false;
        _this.channelingSound = false;
      },
      2600
    );
  }
}




Player2 = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.sprite = null;
  this.direction = LEFT;
  this.num_tables = 0;
  this.done_flip = true;
  this.cooldown = 0;
  this.isAirborne = false;
  this.loss = false;
  this.loss_frame = 46;
  this.knock_back_is_playing = false;
  this.wasChannelSuccessful = false;
  this.isChanneling = false;
  this.isImmune = false;
  this.name = 'p2';
  this.counter1 = null;
  this.counter2 = null;
  this.counter3 = null;


  //count # of collected diamonds
  this.num_diamonds = 0;
}

// Public

Player2.prototype = {
  preload: function() {
    //load sounds 
    this.game.load.audio('dogthrow1', ['assets/sounds/Dog_Throw1.wav']);
    this.game.load.audio('dogthrow2', ['assets/sounds/Dog_Throw2.wav']);
    this.game.load.audio('dogthrow3', ['assets/sounds/Dog_Throw3.wav']);

    this.game.load.audio('dogjump1', ['assets/sounds/Dog_Jump1.wav']);
    this.game.load.audio('dogjump2', ['assets/sounds/Dog_Jump2.wav']);

    this.game.load.audio('woosh1', ['assets/sounds/Table_Whoosh1.wav']);
    this.game.load.audio('woosh2', ['assets/sounds/Table_Whoosh1.wav']);
    this.game.load.audio('woosh3', ['assets/sounds/Table_Whoosh1.wav']);
    this.game.load.audio('woosh4', ['assets/sounds/Table_Whoosh1.wav']);

    this.game.load.audio('doghit1', ["assets/sounds/Dog_Hit1.wav"]);
    this.game.load.audio('doghit2', ["assets/sounds/Dog_Hit2.wav"]);
    this.game.load.audio('doghit3', ["assets/sounds/Dog_Hit2.wav"]);

    this.game.load.audio('channeling2', ['assets/sounds/Channeling_sound_2.wav']);

  },
  create: function() {
    this.createHud();

    this.initializeKeys();

    this.sprite = this.game.add.sprite(level.p2Spawn[0], level.p2Spawn[1], 'dog');
    this.direction = LEFT;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.owner = this;
    this.sprite.scale.x = -1;

    this.sprite.animations.add('left',  [1, 2, 3, 4, 4, 5, 6], 17, true);
    this.sprite.animations.add('right', [1, 2, 3, 4, 4, 5, 6], 17, true);
    this.sprite.animations.add('jump', [28], 10, true);
    this.sprite.animations.add('flip', [9,10,11], 8, false);   
    this.sprite.animations.add('crouch', [19], 10, true);
    this.sprite.animations.add('channel', [37, 38], 18, true);
    this.sprite.animations.add('knockback', [46], 10, true);

    this.addPhysics();
  },

// Private

  initializeKeys: function() {
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    // Attack
    // Keys subject to change!
    this.weakKey = this.game.input.keyboard.addKey(Phaser.Keyboard.QUESTION_MARK);
    this.strongKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.knockBackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  },
  collectDiamond: function(player, diamond) {

    level.p2_diamonds++;
    this.num_diamonds++;
    switch (this.num_diamonds){
      case 0:
        this.counter1.frame = 0;
        this.counter2.frame = 0;
        this.counter3.frame = 0;
        break;
      case 1:
        this.counter1.frame = 0;
        this.counter2.frame = 0;
        this.counter3.frame = 1;
        break;
      case 2:
        this.counter1.frame = 0;
        this.counter2.frame = 1;
        this.counter3.frame = 1;
        break;
      case 3:
        this.counter1.frame = 1;
        this.counter2.frame = 1;
        this.counter3.frame = 1;
        break;
      default:
    };

    diamond.kill();
    level.total_diamonds--;

    if(level.p2_diamonds < 3 && level.p1_diamonds < 3){
      var point = 5 - level.total_diamonds;
      level.spawnDiamond(level.offsetX[point], level.offsetY[point]);
    }

  },

  createHud: function(num_tables){
    this.icon = this.game.add.sprite(this.game.world.width - 200, 20, "dogicon");
    this.hud = this.game.add.sprite(this.game.world.width - 200, 70, 'hud_icon');
    this.hud.scale.setTo(0.5,0.5);
    this.num_table_display = this.game.add.text(this.game.world.width - 200 + 60, 60, 'x 10', { fontSize: '14px', fill: '#000' });
    this.counter1 = this.game.add.sprite(this.game.world.width/2 + 310 + 6 + 00, 75, 'diamondCounter');
    this.counter2 = this.game.add.sprite(this.game.world.width/2 + 310 + 6 + 40, 75, 'diamondCounter');
    this.counter3 = this.game.add.sprite(this.game.world.width/2 + 310 + 6 + 80, 75, 'diamondCounter');
    this.counter1.anchor.setTo(0.5, 0.5);
    this.counter2.anchor.setTo(0.5, 0.5);
    this.counter3.anchor.setTo(0.5, 0.5);
  },    
};

// Fake Inherited
Player2.prototype.update = Player.prototype.update;
Player2.prototype.addPhysics = Player.prototype.addPhysics;
Player2.prototype.checkKeyboard = Player.prototype.checkKeyboard;
Player2.prototype.tryFaceCorrectDirection = Player.prototype.tryFaceCorrectDirection;
Player2.prototype.shootBullet = Player.prototype.shootBullet;
Player2.prototype.hitPlayer = Player.prototype.hitPlayer;
Player2.prototype.knockBack = Player.prototype.knockBack;
Player2.prototype.tryCollectDiamond = Player.prototype.tryCollectDiamond;
Player2.prototype.collidePlayers = Player.prototype.collidePlayers;
Player2.prototype.makeImmuneToKnockback = Player.prototype.makeImmuneToKnockback;
