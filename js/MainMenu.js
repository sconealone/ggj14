MainMenu = function(game) {
	this.game = game;
}

MainMenu.prototype = {
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'splash');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        l1 = this.game.add.button(300, 400, 'level1', this.startL1, this, 2, 1, 0);
       	l1.scale.setTo(0.4, 0.5);
        l1.anchor.setTo(0.5, 0.5);

        l2 = this.game.add.button(600, 400, 'level2', this.startL2, this, 2, 1, 0);
        l2.scale.setTo(0.4, 0.5);
        l2.anchor.setTo(0.5, 0.5);    

        l3 = this.game.add.button(900, 400, 'level3', this.startL3, this, 2, 1, 0);
        l3.scale.setTo(0.4, 0.5);
        l3.anchor.setTo(0.5, 0.5);    

        //instruction = this.game.add.button(600, 'instruction', this.startInstruction, this, 2, 1, 0);       
    },

    startL1: function () {
        this.game.state.start('level1');
    },
    startL2: function (){
        this.game.state.start('level2');
    },
    startL3: function () {
        this.game.state.start('level3');
    }
    // startInstruction: function() {
    //     this.game.state.start('instruction');
    // }


}

CatWin = function(game) {
	this.game = game;
}

CatWin.prototype = {
	preload: function() {
	},
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'catwin');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        l1 = this.game.add.button(300, 400, 'level1', this.startL1, this, 2, 1, 0);
        l1.scale.setTo(0.2, 0.3);
        l1.anchor.setTo(0.5, 0.5);

        l2 = this.game.add.button(600, 400, 'level2', this.startL2, this, 2, 1, 0);
        l2.scale.setTo(0.2, 0.3);
        l2.anchor.setTo(0.5, 0.5);    

        l3 = this.game.add.button(900, 400, 'level3', this.startL3, this, 2, 1, 0);
        l3.scale.setTo(0.2, 0.3);
        l3.anchor.setTo(0.5, 0.5);    
    },

    startL1: function () {
        this.game.state.start('level1');
    },
    startL2: function (){
        this.game.state.start('level2');
    },
    startL3: function () {
        this.game.state.start('level3');
    }	
}

DogWin = function(game) {
	this.game = game;
}

DogWin.prototype = {
	preload: function() {
	},
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'dogwin');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        l1 = this.game.add.button(300, 400, 'level1', this.startL1, this, 2, 1, 0);
        l1.scale.setTo(0.2, 0.3);
        l1.anchor.setTo(0.5, 0.5);

        l2 = this.game.add.button(600, 400, 'level2', this.startL2, this, 2, 1, 0);
        l2.scale.setTo(0.2, 0.3);
        l2.anchor.setTo(0.5, 0.5);    

        l3 = this.game.add.button(900, 400, 'level3', this.startL3, this, 2, 1, 0);
        l3.scale.setTo(0.2, 0.3);
        l3.anchor.setTo(0.5, 0.5);   
    },

    startL1: function () {
        this.game.state.start('level1');
    },
    startL2: function (){
        this.game.state.start('level2');
    },
    startL3: function () {
        this.game.state.start('level3');
    }
}

 


