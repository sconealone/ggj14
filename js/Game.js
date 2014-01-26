// Level is global
// All managers are global
Game1ObjectManager = function(game) {
	this.game = game;
	level = null;
  tableManager = null;
}

Game1ObjectManager.prototype = {

	preload: function() {
    this.load.spritesheet('dog', 'assets/sprites/dogsheet.png', 64, 80);
    this.load.spritesheet('cat', 'assets/sprites/catsheet.png', 64, 64);
		this.load.spritesheet('world', "assets/sprites/catdogworldsheet.png", 80, 80);
		this.load.spritesheet('catworld', "assets/sprites/catworldsheet.png", 80, 80);
		this.load.spritesheet('dogworld', "assets/sprites/dogworldsheet.png", 80, 80);
		this.load.image('dogwin', "assets/backgrounds/dogwin.png");
		this.load.image('fliplevel', "assets/backgrounds/fliptonext.png");
		this.load.image('catwin', "assets/backgrounds/catwin.png");
    this.load.spritesheet('table', 'assets/sprites/tablesheet.png', 80, 32);
    _this = this;
		level = new Level1(_this);
		player1 = new Player(_this);
		player2 = new Player2(_this);
		tableManager = new Table(_this);
    globe = new Globe(_this);
    hud = new Hud(_this);

  		level.preload();
      globe.preload();
  		player1.preload();
  		player2.preload();
  		tableManager.preload();
      hud.preload();
	},

  create: function () {
    	level.create();
      globe.create();
  		player1.create();
  		player2.create();
  		tableManager.create();
      hud.create();
    },

    update: function () {

      globe.update();
    	player1.update();
    	player2.update();
    	tableManager.update(); 
      level.update();
    },
    render: function() {
      this.game.debug.renderSpriteBody(level.floor2);
    }
}



//second level

// Level is global
// All managers are global
Game2ObjectManager = function(game) {
  this.game = game;
  level = null;
  tableManager = null;
}

Game2ObjectManager.prototype = {

  preload: function() {
    this.load.spritesheet('dog', 'assets/sprites/dogsheet.png', 64, 80);
    this.load.spritesheet('cat', 'assets/sprites/catsheet.png', 64, 64);
    this.load.spritesheet('world', "assets/sprites/catdogworldsheet.png", 80, 80);
    this.load.spritesheet('catworld', "assets/sprites/catworldsheet.png", 80, 80);
    this.load.spritesheet('dogworld', "assets/sprites/dogworldsheet.png", 80, 80);
    this.load.image('dogwin', "assets/backgrounds/dogwin.png");
    this.load.image('fliplevel', "assets/backgrounds/fliptonext.png");
    this.load.image('catwin', "assets/backgrounds/catwin.png");
    this.load.spritesheet('table', 'assets/sprites/tablesheet.png', 80, 32);
    _this = this;
    level = new Level2(_this);
    player1 = new Player(_this);
    player2 = new Player2(_this);
    tableManager = new Table(_this);
    globe = new Globe(_this);
    hud = new Hud(_this);

      level.preload();
      globe.preload();
      player1.preload();
      player2.preload();
      tableManager.preload();
      hud.preload();
  },

  create: function () {
      level.create();
      globe.create();
      player1.create();
      player2.create();
      tableManager.create();
      hud.create();
    },

    update: function () {

      globe.update();
      player1.update();
      player2.update();
      tableManager.update(); 
      level.update();
    },
    render: function() {
      this.game.debug.renderSpriteBody(level.floor2);
    }
}


//original level
// Level is global
// All managers are global
Game3ObjectManager = function(game) {
  this.game = game;
  level = null;
  tableManager = null;
}

Game3ObjectManager.prototype = {

  preload: function() {
    this.load.spritesheet('dog', 'assets/sprites/dogsheet.png', 64, 80);
    this.load.spritesheet('cat', 'assets/sprites/catsheet.png', 64, 64);
    this.load.spritesheet('world', "assets/sprites/catdogworldsheet.png", 80, 80);
    this.load.spritesheet('catworld', "assets/sprites/catworldsheet.png", 80, 80);
    this.load.spritesheet('dogworld', "assets/sprites/dogworldsheet.png", 80, 80);
    this.load.image('dogwin', "assets/backgrounds/dogwin.png");
    this.load.image('fliplevel', "assets/backgrounds/fliptonext.png");
    this.load.image('catwin', "assets/backgrounds/catwin.png");
    this.load.spritesheet('table', 'assets/sprites/tablesheet.png', 80, 32);
    _this = this;
    level = new Level(_this);
    player1 = new Player(_this);
    player2 = new Player2(_this);
    tableManager = new Table(_this);
    globe = new Globe(_this);
    hud = new Hud(_this);

      level.preload();
      globe.preload();
      player1.preload();
      player2.preload();
      tableManager.preload();
      hud.preload();
  },

  create: function () {
      level.create();
      globe.create();
      player1.create();
      player2.create();
      tableManager.create();
      hud.create();
    },

    update: function () {

      globe.update();
      player1.update();
      player2.update();
      tableManager.update(); 
      level.update();
    },
    render: function() {
      this.game.debug.renderSpriteBody(level.floor2);
    }
}
