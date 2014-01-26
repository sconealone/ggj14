Globe = function(game) {
	this.game = game;
}

Globe.prototype = {

	preload: function(){
		//this.game.load.image('neutral', 'assets/sprites/world.png');

		this.game.load.spritesheet('world', "assets/sprites/catdogworldsheet.png", 80, 80);
		this.game.load.spritesheet('catworld', "assets/sprites/catworldsheet.png", 80, 80);
		this.game.load.spritesheet('dogworld', "assets/sprites/dogworldsheet.png", 80, 80);

	},

	create: function() {
		this.sprite = this.game.add.sprite(this.game.world.width/2, 10, 'world');

	},
	fade: function (nextState) 
	    {
	        var spr_bg = this.game.add.graphics(0, 0);
	        spr_bg.beginFill(this.fadeColor, 1);
	        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
	        spr_bg.alpha = 0;
	        spr_bg.endFill();

	        this.nextState = nextState;

	        s = this.game.add.tween(spr_bg)
	        s.to({ alpha: 1 }, 500, null)
	        s.onComplete.add(this.changeState, this)
	        s.start();
	    },


    fadeOut: function () 
    {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill(this.fadeColor, 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 1;
        spr_bg.endFill();

        s = this.game.add.tween(spr_bg)
        s.to({ alpha: 0 }, 600, null)
        s.start();
    },
	changeState: function(world, player) {

		//this.fadeOut();
		
		setTimeout(function (){
		level.game.state.start('mainmenu')
		}, 2000);
	},	

	update: function() {
		var p1 = level.p1_diamonds;
		var p2 = level.p2_diamonds;
		var n = p1 - p2;

		switch (n){
			case 0:
				//neutral world
				this.sprite.frame = 0;
			  break;
			case 1:
			  //execute code block 2
			  	this.sprite.frame = 1;
			  break;
			case 2:
				this.sprite.frame = 2;
				break;
			case 3:
				this.sprite.frame = 3;
				break;
			case -1:
				this.sprite.frame = 4;
				break;
			case -2:
				this.sprite.frame = 5;
				break;
			case -3:
				this.sprite.frame = 6;
				break;
			default:
				this.sprite.frame = 0;
				break;
		}

	    if (p1 >= 3 || p2 >= 3){

	      globe.sprite.body.gravity.y = 6;
	      this.game.physics.collide(this.sprite, level.platforms);

	      if (p1 >= 3){
	      	//overlap the world with p1
	      	this.game.physics.overlap(this.sprite, this.game.player1.sprite, this.changeState, null, this);
	      	//console.log('overlapped');
	      }
	      if (p2 >= 3){
	      	this.game.physics.overlap(this.sprite, this.game.player2.sprite, this.changeState, null, this);
	      }

	    }

	}


}