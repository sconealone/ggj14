Table = function(game, attacker) {
	this.game = game;
  this.attacker = attacker;
  this.attacks = null;
  this.cooldown = 0;
  this.bounce = 0;
  this.headbounce = 0;
  this.landed = false;
  this.break_counter = 70;
  this.death_flag = false;


}


Table.prototype = {

	  preload: function() {
      this.game.load.image('table', '../assets/placeholder/table.png');
	  },

    create: function () {

      this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.E);  
      this.attacks = this.game.add.group();      

    },

    shootBullet: function () {
      console.log(this.attacker.num_tables);
      if (this.cooldown == 0 && this.attacker.num_tables > 0){
        var attack = this.attacks.create(this.attacker.sprite.x + 10, this.attacker.sprite.y +10, 'table');
        attack.body.bounce.y = 0.4;
        attack.body.gravity.y = 15;
        attack.body.mass = 0.1;
        attack.body.collideWorldBounds = true;
        attack.body.angularVelocity = 200;
        attack.body.setSize(64, 32, 0, 0);

        if (this.attacker.direction == 1){
        this.game.physics.velocityFromAngle(300, 500, attack.body.velocity);
        }

        else {

        //throwing to the left
        attack.body.angularVelocity = -200;

        this.game.physics.velocityFromAngle(60, -500, attack.body.velocity);
        }

        this.attacker.num_tables--;
        attack.anchor.setTo(0.5, 0.5);
        this.cooldown += 70;
      }

    },    

    hitFloor: function (table, platform) {
      this.bounce++;

      if (this.bounce >= 2){


        table.body.angularVelocity = 0;
        table.body.acceleration.x = 0;
        table.body.velocity.x = 0;
        table.body.bounce.x = 0;
        table.body.bounce.y = 0;
        this.bounce = 0;
        //table.y = 400;
        //table.body.immovable = true;
      }

      if (table.body.velocity.x == 0){

        table.body.velocity.y = 0;
        table.body.velocity.x = 0;
        table.body.gravity.y = 0;

      }



    },

    hitAttacker: function (player, table) {

        //console.log(this.attacker.num_tables);
        var num_tables = this.attacker.num_tables;

        if (table.body.touching.up){

          if (!table.death_flag){
            this.attacker.num_tables++;

            table.death_flag = true;
          }

          setTimeout(function() {
            table.kill();
          }, 600); 
        }

        if (!player.body.touching.down){
          this.headbounce++;
        }

        if (this.headbounce == 3 || (table.body.velocity.x == 0 && table.body.velocity.y == 0)){
          table.kill();
          this.attacker.num_tables++;
          this.headbounce = 0;
        }

        console.log(this.attacker.num_tables);
      

    },

    hitTable: function (table1, table2) {
        table2.body.bounce.y = 0;
        table2.body.bounce.x = 0;
        table2.body.angularVelocity = 0;
        table2.body.velocity.x = 0;
        table2.body.velocity.y = 0;
        table2.body.gravity.y = 0;

        table1.body.velocity.x = 0;
        table1.body.velocity.y = 0;
        table1.body.gravity.y = 0.1;

        // table2.body.immovable = true;
        // table1.body.immovable = true;
        // table1.body.gravity.y = 0;
        // table2.body.gravity.y = 0;
    },

    update: function () {

      if (this.cooldown > 0){
        this.cooldown--;
      }

      if (this.break_counter > 0){
        this.break_counter--;
      }

      this.shootButton.onDown.add(this.shootBullet, this);

      
      this.game.physics.collide(this.attacks, this.attacks, this.hitTable, null, this);
      this.game.physics.collide(this.attacks, this.attacker.sprite, this.hitAttacker, null, this);
      this.game.physics.collide(this.attacks, level.platforms, this.hitFloor, null, this);
      

    	
    }
}
