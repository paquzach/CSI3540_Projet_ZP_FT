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

 // Classements
 var nom1, nom2, nom3, nom4, nom5;
 var score1, score2, score3, score4, score5;
 var scoreMsg = null;
 lastScore = 10000;

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
	currentScreen = "mainMenu";
	fruity_background = new Background(400, 275, 800, 550,new PIXI.Sprite.fromFrame('fruity_background.png'));
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

}

function loadGame() {
	currentScreen = "game";
}

function loadHighscores() {
	currentScreen = "highscores"

	fruity_background = new Background(400, 275, 800, 550,new PIXI.Sprite.fromFrame('fruity_background.png'));
	play_button = new Button(280, 500, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "JOUER");
	highscore_button = new Button(520, 500, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "MENU");
	leaderboard = new Board (400, 170, 700, 280, new PIXI.Sprite.fromFrame('leaderboard.png'));

	nom1 = new PIXI.Text(rows[0].username, {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	nom1.x = 125;
	nom1.y = 86;
	nom2 = new PIXI.Text(rows[1].username, {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	nom2.x = 125;
	nom2.y = 132;
	nom3 = new PIXI.Text(rows[2].username, {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	nom3.x = 125;
	nom3.y = 177;
	nom4 = new PIXI.Text(rows[3].username, {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	nom4.x = 125;
	nom4.y = 222;
	nom5 = new PIXI.Text(rows[4].username, {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	nom5.x = 125;
	nom5.y = 270;

	score1 = new PIXI.Text(rows[0].highscore + " U", {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	score1.x = 730 - score1.width;
	score1.y = 86;
	score2 = new PIXI.Text(rows[1].highscore + " U", {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	score2.x = 730 - score2.width;
	score2.y = 132;
	score3 = new PIXI.Text(rows[2].highscore + " U", {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	score3.x = 730 - score3.width;
	score3.y = 177;
	score4 = new PIXI.Text(rows[3].highscore + " U", {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	score4.x = 730 - score4.width;
	score4.y = 222;
	score5 = new PIXI.Text(rows[4].highscore + " U", {font:"50px Arial", fontWeight: "bold", fill:"#000000", align:"left"});
	score5.x = 730 - score5.width;
	score5.y = 270;

	//check if there is a score from a previous game. If so, post it
	if(lastScore > rows[4].highscore){
		scoreMsg = new PIXI.Text("Felicitation! Vous avez atteint le top 5 avec un score de \n" + lastScore + " U la dernière joute!", {font:"45px Arial", fontWeight: "bold", fill:"#e73295", align:"left"});
		scoreMsg.x = 400 - scoreMsg.width/2;
		scoreMsg.y = 360;
	}
	else {
		scoreMsg = new PIXI.Text("Pas pire! Vous avez eu un score de " + lastScore + " U \nla dernière joute.", {font:"45px Arial", fontWeight: "bold", fill:"#e73295", align:"left"});
		scoreMsg.x = 400 - scoreMsg.width/2;
		scoreMsg.y = 360;
	}
	


	play_button.container.mousedown = function(mousedata) {
		currentScreen = "none";
		loadGame();
	}
	highscore_button.container.mousedown = function(mousedata) {
		currentScreen = "none";
		loadMainMenu();
	}

	requestAnimationFrame(update);
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

			fruity_background.render();
			play_button.render();
			highscore_button.render();
			title.render();
		} else if(currentScreen == "game") {

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

function Banana(x, y, width, height, banana) {

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
		stage.addChild(nom1);
		stage.addChild(nom2);
		stage.addChild(nom3);
		stage.addChild(nom4);
		stage.addChild(nom5);
		stage.addChild(score1);
		stage.addChild(score2);
		stage.addChild(score3);
		stage.addChild(score4);
		stage.addChild(score5);
		if (scoreMsg != null)
		{
			stage.addChild(scoreMsg);
		}
	}
}