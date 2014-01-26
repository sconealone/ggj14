/**
  Prototype level. There will just be a floor and some walls.
*/

Level1 = function(gomanager) {
  this.manager = gomanager;
  this.game = gomanager.game;
  this.platforms = null;

  this.diamonds = null;
  this.total_diamonds = 5;

  this.p1_diamonds = 0; //number of diamonds player 1 collected
  this.p2_diamonds = 0; //number of diamonds player 2 collected
  this.winner = null;
  this.goals = null;

  this.offsetX = [
    this.game.world.width/2,
    40,
    this.game.world.width - 40,
    this.game.world.width/2 + 290,
    this.game.world.width/2 - 290
  ];
  this.offsetY = [this.game.world.height/2 - 10, 0, 0, this.game.world.height/2 + 100,this.game.world.height/2 + 100];
  var spriteHeight = 80;
  this.p1Spawn = [32 + 24, this.game.world.height - (32 + 24)];
  this.p2Spawn = [this.game.world.width - 24, this.game.world.height - (spriteHeight + 24)];
}

// Note: nothing to do with this being the prototype level
Level1.prototype = {
  preload: function() {

    this.goals = ["meteorite", "petfood", "toaster", "kettle"];
    
    this.game.load.image('sky', 'assets/backgrounds/bg2.png');

    for (var i =0; i < 4; i++) {
      this.game.load.image(this.goals[i], 'assets/sprites/' + this.goals[i] + '.png');
    }

    this.game.load.image('plat', 'assets/backgrounds/junglefloor.png');
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

    this.makePlatforms();



    // Diamond Spawn

    this.diamonds = this.game.add.group();
    this.spawnDiamond(this.offsetX[0], this.offsetY[0]);

  },

  spawnDiamond: function(offsetX, offsetY) {
    var spawnOffSetX = offsetX;
    var spawnOffSetY = offsetY;

    var item = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    var diamond = this.diamonds.create(spawnOffSetX, spawnOffSetY, this.goals[item]);
    diamond.body.gravity.y = 8;
    diamond.body.bounce.y = 0.4 + Math.random() * 0.2;
    diamond.anchor.setTo(0.5, 0.5);
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
  },

  makePlatforms: function() {
    // naming key
    // plat = platform
    // b = bottom, m = middle, t = top
    // l = left, r = right, m = middle

    this.plat_tll = this.platforms.create(
      0,
      this.game.world.height/2 - 120, 'plat');
    this.plat_tll.scale.setTo(3, 1);
    this.plat_tll.anchor.setTo(0, 0.5);
    this.plat_tll.body.immovable = true;

    this.plat_bl = this.platforms.create(
      this.game.world.width/2 - 300,
      this.game.world.height/2 + 200, 'plat');
    this.plat_bl.scale.setTo(6, 1);
    this.plat_bl.anchor.setTo(0.5, 0.5);
    this.plat_bl.body.immovable = true;

    this.plat_ml = this.platforms.create(
      this.game.world.width/2 - 360,
      this.game.world.height/2 + 30, 'plat');
    this.plat_ml.scale.setTo(3, 1);
    this.plat_ml.anchor.setTo(0, 0.5);
    this.plat_ml.body.immovable = true;

    this.plat_tl = this.platforms.create(
      this.game.world.width/2 - 268,
      this.game.world.height/2 - 140, 'plat');
    this.plat_tl.scale.setTo(8, 1);
    this.plat_tl.anchor.setTo(0.5, 0.5);
    this.plat_tl.body.immovable = true;


    this.plat_bm = this.platforms.create(
      this.game.world.width/2,
      this.game.world.height/2 + 70, 'plat');
    this.plat_bm.scale.setTo(1, 1);
    this.plat_bm.anchor.setTo(0.5, 0.5);
    this.plat_bm.body.immovable = true;

    this.plat_mml = this.platforms.create(
      this.game.world.width/2,
      this.game.world.height/2 - 100, 'plat');
    this.plat_mml.scale.setTo(0.5, 0.5);
    this.plat_mml.anchor.setTo(0.5, 0.5);
    this.plat_mml.body.immovable = true;

    /*
    this.plat_mmr = this.platforms.create(
      this.game.world.width/2 + 65,
      this.game.world.height/2 - 80, 'ground');
    this.plat_mmr.scale.setTo(2, 0.5);
    this.plat_mmr.anchor.setTo(0.5, 0.5);
    this.plat_mmr.body.immovable = true;
    */


    this.plat_trr = this.platforms.create(
      this.game.world.width,
      this.game.world.height/2 - 120, 'plat');
    this.plat_trr.scale.setTo(3, 1);
    this.plat_trr.anchor.setTo(1, 0.5);
    this.plat_trr.body.immovable = true;

    this.plat_br = this.platforms.create(
      this.game.world.width/2 + 300,
      this.game.world.height/2 + 200, 'plat');
    this.plat_br.scale.setTo(6, 1);
    this.plat_br.anchor.setTo(0.5, 0.5);
    this.plat_br.body.immovable = true;

    this.plat_mr = this.platforms.create(
      this.game.world.width/2 + 360,
      this.game.world.height/2 + 30, 'plat');
    this.plat_mr.scale.setTo(3, 1);
    this.plat_mr.anchor.setTo(1, 0.5);
    this.plat_mr.body.immovable = true;

    this.plat_tr = this.platforms.create(
      this.game.world.width/2 + 268,
      this.game.world.height/2 - 140, 'plat');
    this.plat_tr.scale.setTo(8, 1);
    this.plat_tr.anchor.setTo(0.5, 0.5);
    this.plat_tr.body.immovable = true;


  }
};
