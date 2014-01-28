function playSound(scene){
    this.game = scene.game;
    var click = this.game.add.audio('click', 10, true);
    click.play('', 0, 1, false);
}

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

        instruction = this.game.add.button(600, 600, 'instruction_btn', this.startInstruction, this, 2, 1, 0);  
        instruction.anchor.setTo(0.5, 0.5);
        instruction.scale.setTo(0.4,0.5);  


    },

    startL1: function () {
        playSound(this);
        this.game.state.start('level1');
    },
    startL2: function (){
        playSound(this);
        this.game.state.start('level2');
    },
    startL3: function () {
        playSound(this);
        this.game.state.start('level3');
    },

    startInstruction: function() {
        playSound(this);
        this.game.state.start('instruction');

    }


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
        playSound(this);
        this.game.state.start('level1');
    },
    startL2: function (){
        playSound(this);
        this.game.state.start('level2');
    },
    startL3: function () {
        playSound(this);
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
        playSound(this);
        this.game.state.start('level1');
    },
    startL2: function (){
        playSound(this);
        this.game.state.start('level2');
    },
    startL3: function () {
        playSound(this);
        this.game.state.start('level3');
    }
}

Instruction = function(game){
    this.game = game;
}

Instruction.prototype = {
    preload: function(){
        this.game.load.image('instruction_page', "assets/backgrounds/instructionspage.png");
        //this.game.load.image('start', "assets/sprites/starbutton.png");
    },
    create: function() {
        var page = this.game.add.sprite(0,0,'instruction_page');
        page.scale.setTo(0.68, 0.75);
       
        button = this.game.add.button(1100, 750, 'start', this.back, this, 2, 1, 0);
        button.anchor.setTo(0.5,0.5);
        button.scale.setTo(0.4,0.5);
    },
    back: function(){
        playSound(this);
        this.game.state.start("mainmenu");
    }

}


