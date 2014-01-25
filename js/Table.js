Table = function(game, attacker) {
	this.game = game;
  this.attacker = attacker;
  this.attacks = null;
  this.cooldown = 0;
  this.bounce = 0;

}


Table.prototype = {

	  preload: function() {
      this.game.load.image('table', '../assets/diamond.png');
	  },

    create: function () {

      this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.E);  
      this.attacks = this.game.add.group();      

    },

    shootBullet: function () {

      if (this.cooldown == 0){
        var attack = this.attacks.create(this.attacker.sprite.x + 10, this.attacker.sprite.y +10, 'table');
        attack.body.bounce.y = 0.4;
        attack.body.gravity.y = 15;
        attack.body.collideWorldBounds = true;
        attack.body.angularVelocity = 200;

        if (this.attacker.direction == 1){
        this.game.physics.velocityFromAngle(300, 500, attack.body.velocity);
        }

        else {

        //throwing to the left
        attack.body.angularVelocity = -200;

        this.game.physics.velocityFromAngle(60, -500, attack.body.velocity);
        }

        attack.anchor.setTo(0.5, 0.5);
        this.cooldown += 70;
      }

    },    

    hitFloor: function (table) {
      this.bounce++;

      if (this.bounce == 2){
        table.kill();
        this.bounce = 0;
      }

    },

    update: function () {
      if (this.cooldown > 0){
        this.cooldown--;
      }


      this.shootButton.onDown.add(this.shootBullet, this);
      this.game.physics.collide(this.attacks, this.attacks);
      this.game.physics.collide(this.attacks, level.platforms, this.hitFloor, null, this);
      this.game.physics.collide(this.attacks, this.attacker.sprite);
    	
    }
}