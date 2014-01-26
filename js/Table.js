Table = function(gomanager) {
  this.manager = gomanager;
	this.game = gomanager.game;
  this.attacks = null;
  this.bounce = 0;
  this.landed = false;
  this.break_counter = 70;
  this.death_flag = false;
}


Table.prototype = {

	  preload: function() {
      this.game.load.image('table', '../assets/sprites/table.png');
	  },

    create: function () {
      this.attacks = this.game.add.group(); 
    },

    shootBullet: function (attacker, startX, startY, direction) {

      var attack = this.attacks.create(startX, startY, 'table');
      attack.headbounce = 0;
      attack.bonce = 0;

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

      var scaleX = (direction == LEFT) ? -1 : 1;
      var tableAngle = scaleX * 60;
      var tableSpeed = 500;

      this.game.physics.velocityFromAngle(tableAngle, tableSpeed, attack.body.velocity);

      attack.anchor.setTo(0.5, 0.5);

    },    

    hitFloor: function (table, platform) {
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
        table.body.gravity.y = 0;

      }
    },

    // What should happen when the table hits the player who originally
    // threw it.
    hitAttacker: function (sprite, table) {
        if (table.death_flag) {
          return;
        }

        // The player isn't neccessarily an attacker
        var attacker = table.attacker;

        // Reasons for destroying a table:

        // 1. The player is on top of the table
        // Get rid of this table. Not immediately, since the player might
        // need to jump on it still, but mark it for death since we don't
        // want to count it any more.

        // 2. The player is hitting the table from below, and the headbounces are used up

        // Crashing into tables from the side doesn't destroy them.

        var tableWasHitFromAbove = table.body.touching.up;
        var tableWasHitFromBelow = sprite.body.touching.up && table.headbounce >= 3;

        if (tableWasHitFromAbove || tableWasHitFromBelow) {
          table.death_flag = true;

          setTimeout(function() {
            table.kill();
            attacker.num_tables--;
          }, 600); 
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
      table2.body.bounce.y = 0;
      table2.body.bounce.x = 0;
      table2.body.angularVelocity = 0;
      table2.body.velocity.x = 0;
      table2.body.velocity.y = 0;
      table2.body.gravity.y = 0;

      table1.body.velocity.x = 0;
      table1.body.velocity.y = 0;
      table1.body.gravity.y = 0.0;
    },

    update: function () {
      if (this.break_counter > 0){
        this.break_counter--;
    }

    var _this = this;
    this.game.physics.collide(this.attacks, this.manager.player1.sprite, this.hitAttacker, null, _this);
    this.game.physics.collide(this.attacks, this.attacks, this.hitTable, null, _this);
    this.game.physics.collide(this.attacks, level.platforms, this.hitFloor, null, _this);
  }
};
