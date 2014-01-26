/**
  Prototype level. There will just be a floor and some walls.
*/

Level = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.platforms = null;

  this.diamonds = null;
  this.total_diamonds = 5;

  this.p1_diamonds = 0; //number of diamonds player 1 collected
  this.p2_diamonds = 0; //number of diamonds player 2 collected
  this.winner = null;
  this.goals = null;
}

// Note: nothing to do with this being the prototype level
Level.prototype = {
  preload: function() {

    this.goals = ["meteorite", "petfood", "toaster", "kettle"];
    
    this.game.load.image('sky', 'assets/backgrounds/bg1.png');

    for (var i =0; i < 4; i++) {
      this.game.load.image(this.goals[i], 'assets/sprites/' + this.goals[i] + '.png');
    }

    this.game.load.image('ground', 'assets/backgrounds/floor1.png');

    //object of interest
    this.game.load.spritesheet('diamond', 'assets/sprites/meteorite.png', 0, 0);
  },

  create: function() {
    // Skybox
    var background = this.game.add.sprite(0, 0, 'sky');
    background.scale.setTo(0.8,0.8);



    // Platforms
    // All things that the players can collide with are considered platforms
    this.platforms = this.game.add.group();
    
    var floorHeight = 24;
    // Ground
    this.floor = this.platforms.create(0, this.game.world.height - floorHeight, 'ground');
    this.floor.body.immovable = true;
    this.floor.body.setSize(1280, 32, 0, 0);
    this.floor.scale.setTo(40, 1);

    var floor2 = this.platforms.create(300, this.game.world.height/2 + 300, 'ground');
    floor2.body.setSize(300, 32, 0 , 0);
    floor2.scale.setTo(12.5, 1);
    floor2.body.immovable = true;

    // Diamond Spawn

    this.diamonds = this.game.add.group();
    this.spawnDiamond();

  },

  spawnDiamond: function() {
    var spawnOffSetX = this.game.world.width/2;
    var spawnOffSetY = this.game.world.height/2;

    var item = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    var diamond = this.diamonds.create(spawnOffSetX, spawnOffSetY, this.goals[item]);
    diamond.body.gravity.y = 6;
  },

  update: function() {
    if (this.p1_diamonds >= 3) {
      //console.log('player1 wins');
      setTimeout(function() {

        level.game.state.start('mainmenu');
      }, 2000);


    }
    else if (this.p2_diamonds >= 3){
      //console.log('player2 wins');
      setTimeout(function() {

        level.game.state.start('mainmenu');
      }, 2000);

    }

    this.game.physics.collide(this.diamonds, this.platforms);
  }
};
