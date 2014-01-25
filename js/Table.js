Table = function(game, attacker) {
	this.game = game;
  this.attacker = attacker;
  this.attacks = null;
  this.cooldown = 0;

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
      console.log('shoot tables');

      if (this.cooldown == 0){
        var attack = this.attacks.create(this.attacker.sprite.x + 10, this.attacker.sprite.y +10, 'table');
        attack.body.bounce.y = 0.4;
        attack.body.gravity.y = 20;
        attack.body.collideWorldBounds = true;
        attack.body.angularAcceleration += 20;
        attack.body.angularVelocity = 30;

        this.game.physics.velocityFromAngle(attack.angle, 300, attack.body.velocity);

        this.cooldown += 70;
      }

    },    

    update: function () {
      if (this.cooldown > 0){
        this.cooldown--;
        console.log(this.cooldown);
      }



      this.shootButton.onDown.add(this.shootBullet, this);
      this.game.physics.collide(this.attacks, this.attacks);
      this.game.physics.collide(this.attacks, level.platforms);
      this.game.physics.collide(this.attacks, this.attacker.sprite);
    	
    }
}