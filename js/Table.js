
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Table = function(gomanager) {
  this.manager = gomanager;
	this.game = gomanager.game;
  this.attacks = null;
  this.landed = false;
  this.break_counter = 70;
  this.death_flag = false;
}


Table.prototype = {

	  preload: function() {
        this.game.load.audio('cathit1', ["assets/sounds/Cat_Hit1.wav"]);
        this.game.load.audio('cathit2', ["assets/sounds/Cat_Hit2.wav"]);

        this.game.load.audio('doghit1', ["assets/sounds/Dog_Hit1.wav"]);
        this.game.load.audio('doghit2', ["assets/sounds/Dog_Hit2.wav"]);
        this.game.load.audio('doghit3', ["assets/sounds/Dog_Hit3.wav"]);
	  },

    create: function () {
      this.attacks = this.game.add.group(); 
    },

    shootBullet: function (attacker, startX, startY, direction) {

      var attack = this.attacks.create(startX, startY, 'table');
      attack.headbounce = 0;
      attack.bounce = 0;

      // Can this physics information be added to the group?
      attack.body.bounce.y = 0.4;
      attack.body.gravity.y = 15;
      attack.body.mass = 0.1;
      attack.body.collideWorldBounds = true;
      attack.body.angularVelocity = 200;
      attack.body.setSize(64, 32, 0, 0);
      attack.body.drag.setTo(200, 100);
      attack.body.angularDrag = 50;
      attack.attacker = attacker;
      attack.isWeaponized = true;
      if (direction == LEFT){
        attack.body.angularVelocity = -200;

        this.game.physics.velocityFromAngle(60, -500, attack.body.velocity);
      } 
      else {
        attack.body.angularVelocity = 200;
        this.game.physics.velocityFromAngle(-60, 500, attack.body.velocity);
      }

      attack.anchor.setTo(0.5, 0.5);

    },    

    hitFloor: function (table, platform) {
      table.isWeaponized = false;
      table.bounce++;

      if (table.bounce >= 2){


        table.body.angularVelocity = 0;
        table.body.acceleration.x = 0;
        table.body.velocity.x = 0;
        table.body.bounce.x = 0;
        table.body.bounce.y = 0;
        table.bounce = 0;
        //table.y = 400;
        //table.body.immovable = true;
      }

      if (table.body.velocity.x == 0){

        table.body.velocity.y = 0;
        table.body.velocity.x = 0;
        //table.body.gravity.y = 0;

      }
    },


    hitDefender: function(sprite, table) {
      // Raise the table's death flag
      
      if (sprite.owner.knock_back_is_playing) {
        return;
      }
      killTable(table);

      if (sprite.owner.name == 'p1'){
        var rn = getRandomInt(1,2);
        var cathit = this.game.add.audio('cathit' + rn, 1, true);
        cathit.play('', 0, 1, false);
        
      } else {
        var rn = getRandomInt(1,3);
        var doghit = this.game.add.audio('doghit' + rn, 1, true);
        doghit.play('', 0, 1, false);        
      }

      // Knockback defender
      sprite.owner.knockBack(sprite, table);


    },

    // What should happen when the table hits the player who originally
    // threw it.
    hitAttacker: function (sprite, table) {
        if (table.death_flag) {
          return;
        }

        // Reasons for destroying a table:

        // 1. The player is on top of the table
        // Get rid of this table. Not immediately, since the player might
        // need to jump on it still, but mark it for death since we don't
        // want to count it any more.

        // 2. The player is hitting the table from below, and the headbounces are used up

        // Crashing into tables from the side doesn't destroy them.
        var attacker = table.attacker;

        var tableWasHitFromAbove = table.body.touching.up;
        var tableWasHitFromBelow = sprite.body.touching.up && table.headbounce >= 3;

        if (tableWasHitFromAbove || tableWasHitFromBelow) {
          killTable(table);
          return;
        } 

        if (sprite.body.touching.up) {
          table.headbounce++;
          return;
        } 
    },

    // What should happen when two tables collide:
    // The tables should stick to each other.
    hitTable: function (table1, table2) {
      table1.isWeaponized = false;
      table2.isWeaponized = false;
      table1.headbounce = 999;
      table2.headbounce = 999;

      table2.body.bounce.y = 0;
      table2.body.bounce.x = 0;
      table2.body.angularVelocity = 0;
      table2.body.velocity.x = 0;
      table2.body.velocity.y = 0;
      //table2.body.gravity.y = 0;

      table1.body.velocity.x = 0;
      table1.body.velocity.y = 0;
      //table1.body.gravity.y = 0.0;
    },

    update: function () {
      if (this.break_counter > 0){
        this.break_counter--;
    }

    var _this = this;
    this.game.physics.collide(this.attacks, this.attacks, this.hitTable, null, _this);
    this.game.physics.collide(this.attacks, level.platforms, this.hitFloor, null, _this);
  }
};

killTable = function(table) {
  table.death_flag = true;
  setTimeout(function() {table.frame = 1}, 200);
  setTimeout(function() {
            table.kill();
            table.attacker.num_tables--;
          }, 400); 
};
