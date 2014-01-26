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

  this.offsetX = [1280/2, 1100, 300, 1050, 640];
  this.offsetY = [300, 300, 100, 500, 500];
  this.p1Spawn = [32 + 24, this.game.world.height - (32 + 24)];
  this.p2Spawn = [this.game.world.width - 24, this.game.world.height - (80 + 24)];
}

// Note: nothing to do with this being the prototype level
Level.prototype = {
  preload: function() {

    this.goals = ["meteorite", "petfood", "toaster", "kettle"];
    
    this.game.load.image('sky', 'assets/backgrounds/bg3.png');

    for (var i =0; i < 4; i++) {
      this.game.load.image(this.goals[i], 'assets/sprites/' + this.goals[i] + '.png');
    }

    this.game.load.image('plat', 'assets/backgrounds/duskfloor.png');

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
    this.floor = this.platforms.create(0, this.game.world.height - floorHeight, 'plat');
    this.floor.body.immovable = true;
    this.floor.body.setSize(1280, 32, 0, 0);
    this.floor.scale.setTo(40, 1);


    // Ledges
    var l1 = this.platforms.create(this.game.world.width/2, 350, 'plat');
    l1.scale.setTo(6.25,1);
    l1.body.immovable = true;
    l1.anchor.setTo(0.5,0.5);

    var l2 = this.platforms.create(this.game.world.width/2 - 300, 500, 'plat');
    l2.scale.setTo(6.25,1);
    l2.body.immovable = true;
    l2.anchor.setTo(0.5,0.5);    

    var l3 = this.platforms.create(this.game.world.width/2 + 300, 500, 'plat');
    l3.scale.setTo(6.25,1);
    l3.body.immovable = true;
    l3.anchor.setTo(0.5,0.5);  

    var l4 = this.platforms.create(this.game.world.width/2 + 500, 350, 'plat');
    l4.scale.setTo(3,1);
    l4.body.immovable = true;
    l4.anchor.setTo(0.5,0.5);  

    var l5 = this.platforms.create(this.game.world.width/2 - 500, 350, 'plat');
    l5.scale.setTo(3,1);
    l5.body.immovable = true;
    l5.anchor.setTo(0.5,0.5);              

    var l6 = this.platforms.create(this.game.world.width/2, 600, 'plat');
    l6.scale.setTo(6.25,1);
    l6.body.immovable = true;
    l6.anchor.setTo(0.5,0.5);


    // Diamond Spawn

    this.diamonds = this.game.add.group();

    this.spawnDiamond(this.offsetX[0], this.offsetY[0]);

    //this.total_diamonds--;

  },

  spawnDiamond: function(x, y) {
    var spawnOffSetX = x;
    var spawnOffSetY = y;    

    var item = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    var diamond = this.diamonds.create(spawnOffSetX, spawnOffSetY, this.goals[item]);
    diamond.body.gravity.y = 8;
    diamond.body.bounce.y = 0.4 + Math.random() * 0.2;
  },

  update: function() {


    if (this.p1_diamonds >= 3) {
      globe.sprite.body.gravity.y = 6;
      player2.loss = true;


    }
    else if (this.p2_diamonds >= 3){

      globe.sprite.body.gravity.y = 6;
      player1.loss = true;
    }

    this.game.physics.collide(this.diamonds, this.platforms);
  }
};
