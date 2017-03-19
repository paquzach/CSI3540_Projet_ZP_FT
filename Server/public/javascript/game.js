 // Setting up stage renderer

 var type = "WebGL"
 if(!PIXI.utils.isWebGLSupported()){
 	type = "canvas"
 }

 PIXI.utils.sayHello(type)

 var renderer = PIXI.autoDetectRenderer(800, 550);
 renderer.view.style.border = "3px solid #ffdd00";
 renderer.backgroundColor = 0xffffff;
 renderer.view.style.position = "absolute";
 renderer.view.style.display = "block";
 document.body.appendChild(renderer.view);
 renderer.view.style.position = 'relative';
 renderer.view.style.margin = "15px auto";

 var stage = new PIXI.Container();
 stage.interactive = true;

 var fps = 60;
 var now;
 var then = Date.now();
 var interval = 1000/fps;
 var delta;

 var currentScreen = "none";

// Main menu
 var fruity_background;
 var play_button;
 var highscore_button;
 var title;
 var leaderboard;

 // Game
 var test_banana;
 var test_coconut;
 var test_mango;
 var test_orange;
 var test_pear;
 var test_pineapple;
 var test_squash_spin;
 var test_squash_tumble;
 var test_watermelon;


 console.log(type);

 // Game textures

//setup();

function setup() {

	PIXI.loader.add('../gameTextures', '../gameTextures/ui.json').add('../gameTextures/fruity_background.json').add('../gameTextures/title.json').add('../gameTextures/leaderboard.json').add('../gameTextures/fruits.json').load(function(loader, resources) {
		if (true) {
			loadMainMenu()
		} else {
			loadHighscore();
		}
	});

	requestAnimationFrame(update);
}

function loadMainMenu() {
	// PLAY BUTTON
	fruity_background = new Background(400, 275, 800, 550, new PIXI.Sprite.fromFrame('fruity_background.png'));
	play_button = new Button(280, 380, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "JOUER");
	highscore_button = new Button(520, 380, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "CLASSEMENTS");
	title = new Title (400, 150, 417, 153, new PIXI.Sprite.fromFrame('title.png'));

	play_button.container.mousedown = function(mousedata) {
		currentScreen = "none";
		loadGame();
	}
	highscore_button.container.mousedown = function(mousedata) {
		currentScreen = "none";
		loadHighscores();
	}
	currentScreen = "mainMenu";
}

function loadGame() {

	test_banana = new Fruit(400, 100, 75, 121, new PIXI.Sprite.fromFrame('banana_01.png'), new PIXI.Sprite.fromFrame('banana_02.png'), new PIXI.Sprite.fromFrame('banana_03.png'), new PIXI.Sprite.fromFrame('banana_04.png'), new PIXI.Sprite.fromFrame('banana_05.png'));
 	test_coconut = new Fruit(100, 225, 50, 65, new PIXI.Sprite.fromFrame('coconut_01.png'), new PIXI.Sprite.fromFrame('coconut_02.png'), new PIXI.Sprite.fromFrame('coconut_03.png'), new PIXI.Sprite.fromFrame('coconut_04.png'), new PIXI.Sprite.fromFrame('coconut_05.png'));
 	test_mango = new Fruit(300, 225, 40, 60, new PIXI.Sprite.fromFrame('mango_01.png'), new PIXI.Sprite.fromFrame('mango_02.png'), new PIXI.Sprite.fromFrame('mango_03.png'), new PIXI.Sprite.fromFrame('mango_04.png'), new PIXI.Sprite.fromFrame('mango_05.png'));
 	test_orange = new Fruit(500, 225, 60, 55, new PIXI.Sprite.fromFrame('orange_01.png'), new PIXI.Sprite.fromFrame('orange_02.png'), new PIXI.Sprite.fromFrame('orange_03.png'), new PIXI.Sprite.fromFrame('orange_04.png'), new PIXI.Sprite.fromFrame('orange_05.png'));
 	test_pear = new Fruit(700, 225, 45, 60, new PIXI.Sprite.fromFrame('pear_01.png'), new PIXI.Sprite.fromFrame('pear_02.png'), new PIXI.Sprite.fromFrame('pear_03.png'), new PIXI.Sprite.fromFrame('pear_04.png'), new PIXI.Sprite.fromFrame('pear_05.png'));
 	test_pineapple = new Fruit(100, 450, 75, 200, new PIXI.Sprite.fromFrame('pineapple_01.png'), new PIXI.Sprite.fromFrame('pineapple_02.png'), new PIXI.Sprite.fromFrame('pineapple_03.png'), new PIXI.Sprite.fromFrame('pineapple_04.png'), new PIXI.Sprite.fromFrame('pineapple_05.png'));
 	test_squash_spin = new Fruit(300, 450, 80, 75, new PIXI.Sprite.fromFrame('squash_spin_01.png'), new PIXI.Sprite.fromFrame('squash_spin_02.png'), new PIXI.Sprite.fromFrame('squash_spin_03.png'), new PIXI.Sprite.fromFrame('squash_spin_04.png'), new PIXI.Sprite.fromFrame('squash_spin_05.png'));
 	test_squash_tumble = new Fruit(500, 450, 80, 80, new PIXI.Sprite.fromFrame('squash_tumble_01.png'), new PIXI.Sprite.fromFrame('squash_tumble_02.png'), new PIXI.Sprite.fromFrame('squash_tumble_03.png'), new PIXI.Sprite.fromFrame('squash_tumble_04.png'), new PIXI.Sprite.fromFrame('squash_tumble_05.png'));
 	test_watermelon = new Fruit(700, 450, 80, 75, new PIXI.Sprite.fromFrame('watermelon_01.png'), new PIXI.Sprite.fromFrame('watermelon_02.png'), new PIXI.Sprite.fromFrame('watermelon_03.png'), new PIXI.Sprite.fromFrame('watermelon_04.png'), new PIXI.Sprite.fromFrame('watermelon_05.png'));
	currentScreen = "game";
}

function loadHighscores() {
	fruity_background = new Background(400, 275, 800, 550,new PIXI.Sprite.fromFrame('fruity_background.png'));
	highscore_button = new Button(280, 500, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "MENU");
	play_button = new Button(520, 500, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "JOUER");
	leaderboard = new Title (400, 150, 417, 153, new PIXI.Sprite.fromFrame('leaderboard.png'));

	highscore_button.container.mousedown = function(mousedata) {
		currentScreen = "none";
		loadMainMenu();
	}
	play_button.container.mousedown = function(mousedata) {
		currentScreen = "none";
		loadGame();
	}

	currentScreen = "highscores"
}


// UPDATE FUNCTIONS
function update() {

	requestAnimationFrame(update);
     
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
		stage.removeChildren();

		if (currentScreen == "mainMenu") {
			// Updates
    		title.update();

    		// Renders
			fruity_background.render();
			play_button.render();
			highscore_button.render();
			title.render();
		} else if(currentScreen == "game") {
			// Updates
			test_banana.update();
			test_coconut.update();
 			test_mango.update();
 			test_orange.update();
 			test_pear.update();
 			test_pineapple.update();
 			test_squash_spin.update();
 			test_squash_tumble.update();
 			test_watermelon.update();

			// Renders
			test_banana.render();
			test_coconut.render();
 			test_mango.render();
 			test_orange.render();
 			test_pear.render();
 			test_pineapple.render();
 			test_squash_spin.render();
 			test_squash_tumble.render();
 			test_watermelon.render();
		} else if (currentScreen == "highscores") {
			fruity_background.render();
			play_button.render();
			highscore_button.render();
			leaderboard.render();
		}

		if (currentScreen != "none") {
			renderer.render(stage);

			then = now - (delta % interval);
		}
	}

}


// OBJECTS
// Button
function Button(x, y, width, height, light, dark, text) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.text = new PIXI.Text(text, {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"center"});
	this.text.x = this.x - (this.text.width / 2);
	this.text.y = this.y - (this.text.height / 2);

	if (this.text.width > (this.width - 16)) {
		this.width = this.text.width + 16;
	}
	
	this.light = light;
	this.dark = dark;

	this.light.width = this.width;
	this.light.height = this.height;
	this.dark.width = this.width;
	this.dark.height = this.height;

	this.light.x = this.x - (this.light.width / 2);
	this.light.y = this.y - (this.light.height / 2);
	this.dark.x = this.x - (this.dark.width / 2);
	this.dark.y = this.y - (this.dark.height / 2);
	
	this.mouseOver = false;

	// Create container for mouse event
	this.container = new PIXI.Graphics();
	this.container.lineStyle(5, 0xFFFFFF, 1);
	this.container.beginFill(0x0000FF, 1);
	this.container.drawRect((this.x - (this.width / 2)), (this.y - (this.height / 2)), this.width, this.height);
	this.container.endFill();
	this.container.alpha = 0;
	this.container.interactive = true;
	this.container.hitArea = new PIXI.Rectangle((this.x - (this.width / 2)), (this.y - (this.height / 2)), this.width, this.height);
	this.container.p = this;


	// methods
	this.render = function() {

		if (this.mouseOver) {
			stage.addChild(this.dark);
			this.text.style = {font:"50px Arial", fontWeight: "bold", fill:"#262626", align:"center"};
			this.text.y = this.y - (this.text.height / 2) + 2;
		} else {
			stage.addChild(this.light);
			this.text.style = {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"center"};
			this.text.y = this.y - (this.text.height / 2);
		}
		stage.addChild(this.text);
		stage.addChild(this.container);
	}

	this.container.mouseover = function(mouseData){
		this.p.mouseOver = true;
	}
	this.container.mouseout = function(mouseData){
		this.p.mouseOver = false;
	}
}

// Background
function Background(x, y, width, height, background) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.background = background;

	this.background.x = this.x - (this.width / 2);
	this.background.y = this.y - (this.height / 2);
	this.background.width = this.width;
	this.background.height = this.height;

	this.render = function() {
		stage.addChild(this.background);
	}
}

function Title(x, y, width, height, title) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.sinX = 0;
	this.sinY = 0;

	this.title = title;
	this.title.width = this.width;
	this.title.height = this.height;
	this.title.x = this.x - (this.title.width/2);
	this.title.y = this.y - (this.title.height/2);
	this.originalY = this.title.y;

	this.update = function() {
		this.sinX += 0.05;

		if (this.sinX > 360) {
			this.sinX -= 360;
		}

		this.sinY = Math.sin(this.sinX);
		this.title.y = this.originalY + (this.sinY*4);
	}
	this.render = function() {
		stage.addChild(this.title);
	}
}

function Fruit(x, y, width, height, fruit_01, fruit_02, fruit_03, fruit_04, fruit_05) {
	this.spinning_state = 0;
	this.stationary_state = 1;
	this.state = this.spinning_state;
	this.animationCounter = 0;
	this.animationSpeed = 5;
	this.frameKeeper = 1;

	this.fruit_01 = fruit_01;
	this.fruit_02 = fruit_02;
	this.fruit_03 = fruit_03;
	this.fruit_04 = fruit_04;
	this.fruit_05 = fruit_05;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.fruit_01.width = this.width;
	this.fruit_01.height = this.height;
	this.fruit_01.x = this.x - (this.fruit_01.width/2);
	this.fruit_01.y = this.y - (this.fruit_01.height/2);

	this.fruit_02.width = this.width;
	this.fruit_02.height = this.height;
	this.fruit_02.x = this.x - (this.fruit_02.width/2);
	this.fruit_02.y = this.y - (this.fruit_02.height/2);

	this.fruit_03.width = this.width;
	this.fruit_03.height = this.height;
	this.fruit_03.x = this.x - (this.fruit_03.width/2);
	this.fruit_03.y = this.y - (this.fruit_03.height/2);

	this.fruit_04.width = this.width;
	this.fruit_04.height = this.height;
	this.fruit_04.x = this.x - (this.fruit_04.width/2);
	this.fruit_04.y = this.y - (this.fruit_04.height/2);

	this.fruit_05.width = this.width;
	this.fruit_05.height = this.height;
	this.fruit_05.x = this.x - (this.fruit_05.width/2);
	this.fruit_05.y = this.y - (this.fruit_05.height/2);

	this.update = function() {
		this.animationCounter++;

		if (this.animationCounter > this.animationSpeed) {
			this.animationCounter = 0;
			this.frameKeeper++;
			if (this.frameKeeper > 5) {
				this.frameKeeper = 1;
			}
		}
	}

	this.render = function() {
		if (this.frameKeeper == 1) {
			stage.addChild(this.fruit_01);
		} else if (this.frameKeeper == 2) {
			stage.addChild(this.fruit_02);
		} else if (this.frameKeeper == 3) {
			stage.addChild(this.fruit_03);
		} else if (this.frameKeeper == 4) {
			stage.addChild(this.fruit_04);
		} else if (this.frameKeeper == 5) {
			stage.addChild(this.fruit_05);
		}
	}
}

function Board(x, y, width, height, board) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.board = board;
	this.board.width = this.width;
	this.board.height = this.height;
	this.board.x = this.x - (this.board.width/2);
	this.board.y = this.y - (this.board.height/2);

	this.render = function() {
		stage.addChild(this.board);
	}
}