Globe = function(game) {
	this.game = game;
	this.final_frame = 0;
  this.changed_state = false;
}

Globe.prototype = {

	preload: function(){
		//this.game.load.image('neutral', 'assets/sprites/world.png');


	},

	create: function() {
		this.sprite = this.game.add.sprite(this.game.world.width/2, 10, 'world');
    this.sprite.anchor.x = 0.5;
		this.final_animation = this.sprite.animations.add('final', [0, this.final_frame], 6, true);   

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
    if (this.changed_state) {
      return;
    }
    this.changed_state = true;

		//this.fadeOut();
	  this.sprite.animations.play('final');

    player.owner.knock_back_is_playing = true;
    var _this = this;
    setTimeout(function(){_this.sprite.kill();}, 300)
    setTimeout(function() {
      if (level.p1_diamonds > level.p2_diamonds){
        level.game.state.start('catwin');
      } else {
        	level.game.state.start('dogwin');
    	}
      }, 2000);
	},	

	update: function() {
		var p1 = level.p1_diamonds;
		var p2 = level.p2_diamonds;
		var n = p1 - p2;

		switch (n){
			case 0:
				//neutral world
				var frame = 0
				this.sprite.frame = frame;
				this.final_frame = frame;
			  break;
			case 1:
			  //execute code block 2
			  	var frame = 1
			  	this.sprite.frame = frame;
			  	this.final_frame = frame;
			  break;
			case 2:
				var frame = 2
				this.sprite.frame = frame;
				this.final_frame = frame;
				break;
			case 3:
				var frame = 3
				this.sprite.frame = frame;
				this.final_frame = frame;
				break;
			case -1:
				var frame = 4
				this.sprite.frame = frame;
				this.final_frame = frame;
				break;
			case -2:
				var frame = 5
				this.sprite.frame = frame;
				this.final_frame = frame;
				break;
			case -3:
				var frame = 6
				this.sprite.frame = frame;
				this.final_frame = frame;
				break;
			default:
				this.sprite.frame = 0;
				this.final_frame = frame;
				break;
		}

      var winBreakPoint = 3;
	    if (p1 >= winBreakPoint || p2 >= winBreakPoint){

	      globe.sprite.body.gravity.y = 6;
	      this.game.physics.collide(this.sprite, level.platforms);
	      
	      if (p1 >= 3){
	      	//overlap the world with p1
	      	this.game.physics.overlap(this.sprite, player1.sprite, this.changeState, null, this);
	      	
	      	//console.log('overlapped');
	      }
	      if (p2 >= 3){
	      	this.game.physics.overlap(this.sprite, player2.sprite, this.changeState, null, this);
	      }

	    }

	}


}
