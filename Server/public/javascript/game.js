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
 var lastScore = 10000;


 // Game
 var sky_and_ground;

 var fruitCollection;

 var fruitCount;
 var maxFruits;
 var fruitCooldown;
 var fruitCooldownCounter;
 var xSpeedMin;
 var xSpeedMax;
 var ySpeedMin;
 var ySpeedMax;

 var tim;

 //Keyboard

 //Si tim va vers la droite et on release la droite, arete. Sinon ignore 
 var left = keyboard(37);
 var right = keyboard(39);
 var up = keyboard(38);

 left.press = function() {
 	console.log("LEFT");
 	if (!left.isDown){
 		tim.moveDirection("l");
 	}
 	else{
 		left.release();
 	}
 };
 left.release = function() {
 	console.log("LEFT RELEASE");
 	if (!right.isDown) {
 		tim.stopRunning();
    }
 };
 right.press = function() {
 	console.log("RIGHT");
 	if (!right.isDown){
 		tim.moveDirection("r");
 	}
 	else{
 		right.release();
 	}
 };
 right.release = function() {
 	console.log("RIGHT RELEASE");
 	if (!left.isDown) {
      tim.stopRunning();
    }
 };
 up.press = function() {
 	console.log("UP");
 	tim.isJumping();
 };
 up.release = function() {
 	console.log("UP RELEASE");
 };

 console.log(type);

 // Game textures

//setup();

function setup() {

	PIXI.loader.add('../gameTextures', '../gameTextures/ui.json').add('../gameTextures/fruity_background.json').add('../gameTextures/title.json').add('../gameTextures/leaderboard.json').add('../gameTextures/fruits.json').add('../gameTextures/sky.json').add('../gameTextures/tim.json').add('../gameTextures/hitbox.json').load(function(loader, resources) {
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

	sky_and_ground = new Background(400, 275, 800, 550, new PIXI.Sprite.fromFrame('sky.png'));
	tim = new Player(400, 470, 90, 115); 

	xSpeedMin = 0;
	xSpeedMax = 70;
	ySpeedMin = 4;
	ySpeedMax = 12;

	fruitCount = 0;
	maxFruits = 9;
	fruitCooldown = 19;
	fruitCooldownCounter = 0;
	fruitCollection = [];
	for (var i=0; i < maxFruits-1; i++) {
		fruitCollection[i] = null;
	}
	createFruits();

	currentScreen = "game";
}

function loadHighscores() {
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

			tim.update();
			createFruits();
			updateAllFruits();
			checkCollisions();

			// Renders
			sky_and_ground.render();
			tim.render();
			renderAllFruits();

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

function Player(x, y, width, height){ // at 30, 35 with 25x65
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.dir = "l";
	this.vx = 0;
	this.sinX = 0;
	this.sinY = 0;
	this.originalY = y;
	this.jump = false;
	this.frameKeeper = 1;
	this.animationCounter = 0;
	this.animationSpeed = 4;

	this.idleL = new PIXI.Sprite.fromFrame('idle_left.png');
	this.idleR = new PIXI.Sprite.fromFrame('idle_right.png');

	this.jumpL = new PIXI.Sprite.fromFrame('jump_left.png');
	this.jumpR = new PIXI.Sprite.fromFrame('jump_right.png');

	this.runL1 = new PIXI.Sprite.fromFrame('run_left_01.png');
	this.runL2 = new PIXI.Sprite.fromFrame('run_left_02.png');
	this.runL3 = new PIXI.Sprite.fromFrame('run_left_03.png');
	this.runL4 = new PIXI.Sprite.fromFrame('run_left_04.png');
	this.runL5 = new PIXI.Sprite.fromFrame('run_left_05.png');
	this.runL6 = new PIXI.Sprite.fromFrame('run_left_06.png');
	this.runL7 = new PIXI.Sprite.fromFrame('run_left_07.png');
	this.runL8 = new PIXI.Sprite.fromFrame('run_left_08.png');
	this.runL9 = new PIXI.Sprite.fromFrame('run_left_09.png');

	this.runR1 = new PIXI.Sprite.fromFrame('run_right_01.png');
	this.runR2 = new PIXI.Sprite.fromFrame('run_right_02.png');
	this.runR3 = new PIXI.Sprite.fromFrame('run_right_03.png');
	this.runR4 = new PIXI.Sprite.fromFrame('run_right_04.png');
	this.runR5 = new PIXI.Sprite.fromFrame('run_right_05.png');
	this.runR6 = new PIXI.Sprite.fromFrame('run_right_06.png');
	this.runR7 = new PIXI.Sprite.fromFrame('run_right_07.png');
	this.runR8 = new PIXI.Sprite.fromFrame('run_right_08.png');
	this.runR9 = new PIXI.Sprite.fromFrame('run_right_09.png');
	
	//Idle left and right

	this.idleL.width = this.width;
	this.idleL.height = this.height;
	this.idleL.x = this.x - (this.idleL.width/2);
	this.idleL.y = this.y - (this.idleL.height/2);

	this.idleR.width = this.width;
	this.idleR.height = this.height;
	this.idleR.x = this.x - (this.idleR.width/2);
	this.idleR.y = this.y - (this.idleR.height/2);

	//Jump left and right

	this.jumpL.width = this.width;
	this.jumpL.height = this.height;
	this.jumpL.x = this.x - (this.jumpL.width/2);
	this.jumpL.y = this.y - (this.jumpL.height/2);

	this.jumpR.width = this.width;
	this.jumpR.height = this.height;
	this.jumpR.x = this.x - (this.jumpR.width/2);
	this.jumpR.y = this.y - (this.jumpR.height/2);

	//Run left 1-9

	this.runL1.width = this.width;
	this.runL1.height = this.height;
	this.runL1.x = this.x - (this.runL1.width/2);
	this.runL1.y = this.y - (this.runL1.height/2);

	this.runL2.width = this.width;
	this.runL2.height = this.height;
	this.runL2.x = this.x - (this.runL2.width/2);
	this.runL2.y = this.y - (this.runL2.height/2);

	this.runL3.width = this.width;
	this.runL3.height = this.height;
	this.runL3.x = this.x - (this.runL3.width/2);
	this.runL3.y = this.y - (this.runL3.height/2);

	this.runL4.width = this.width;
	this.runL4.height = this.height;
	this.runL4.x = this.x - (this.runL4.width/2);
	this.runL4.y = this.y - (this.runL4.height/2);

	this.runL5.width = this.width;
	this.runL5.height = this.height;
	this.runL5.x = this.x - (this.runL5.width/2);
	this.runL5.y = this.y - (this.runL5.height/2);

	this.runL6.width = this.width;
	this.runL6.height = this.height;
	this.runL6.x = this.x - (this.runL6.width/2);
	this.runL6.y = this.y - (this.runL6.height/2);

	this.runL7.width = this.width;
	this.runL7.height = this.height;
	this.runL7.x = this.x - (this.runL7.width/2);
	this.runL7.y = this.y - (this.runL7.height/2);

	this.runL8.width = this.width;
	this.runL8.height = this.height;
	this.runL8.x = this.x - (this.runL8.width/2);
	this.runL8.y = this.y - (this.runL8.height/2);

	this.runL9.width = this.width;
	this.runL9.height = this.height;
	this.runL9.x = this.x - (this.runL9.width/2);
	this.runL9.y = this.y - (this.runL9.height/2);

	//Run right 1-9

	this.runR1.width = this.width;
	this.runR1.height = this.height;
	this.runR1.x = this.x - (this.runR1.width/2);
	this.runR1.y = this.y - (this.runR1.height/2);

	this.runR2.width = this.width;
	this.runR2.height = this.height;
	this.runR2.x = this.x - (this.runR2.width/2);
	this.runR2.y = this.y - (this.runR2.height/2);

	this.runR3.width = this.width;
	this.runR3.height = this.height;
	this.runR3.x = this.x - (this.runR3.width/2);
	this.runR3.y = this.y - (this.runR3.height/2);

	this.runR4.width = this.width;
	this.runR4.height = this.height;
	this.runR4.x = this.x - (this.runR4.width/2);
	this.runR4.y = this.y - (this.runR4.height/2);

	this.runR5.width = this.width;
	this.runR5.height = this.height;
	this.runR5.x = this.x - (this.runR5.width/2);
	this.runR5.y = this.y - (this.runR5.height/2);

	this.runR6.width = this.width;
	this.runR6.height = this.height;
	this.runR6.x = this.x - (this.runR6.width/2);
	this.runR6.y = this.y - (this.runR6.height/2);

	this.runR7.width = this.width;
	this.runR7.height = this.height;
	this.runR7.x = this.x - (this.runR7.width/2);
	this.runR7.y = this.y - (this.runR7.height/2);

	this.runR8.width = this.width;
	this.runR8.height = this.height;
	this.runR8.x = this.x - (this.runR8.width/2);
	this.runR8.y = this.y - (this.runR8.height/2);

	this.runR9.width = this.width;
	this.runR9.height = this.height;
	this.runR9.x = this.x - (this.runR9.width/2);
	this.runR9.y = this.y - (this.runR9.height/2);

	// Player hitbox
	this.hitbox = new SAT.Box(new SAT.Vector((this.x - (25/2)),(this.y - (35/2))), 25, 35);
	this.unhit_hitbox = new PIXI.Sprite.fromFrame('square_green.png');
	this.unhit_hitbox.x = this.hitbox.pos.x;
	this.unhit_hitbox.y = this.hitbox.pos.y;
	this.unhit_hitbox.width = this.hitbox.w;
	this.unhit_hitbox.height = this.hitbox.h;

	this.hit_hitbox = new PIXI.Sprite.fromFrame('square_red.png');
	this.hit_hitbox.x = this.hitbox.pos.x;
	this.hit_hitbox.y = this.hitbox.pos.y;
	this.hit_hitbox.width = this.hitbox.w;
	this.hit_hitbox.height = this.hitbox.h;


	this.update = function(){
		// update hitbox
		this.hitbox.pos.x = this.x - (this.hitbox.w/2);
 		this.hitbox.pos.y = this.y - (this.hitbox.h/2);
		this.unhit_hitbox.x = this.hitbox.pos.x;
		this.unhit_hitbox.y = this.hitbox.pos.y;

		this.hit_hitbox.x = this.hitbox.pos.x;
		this.hit_hitbox.y = this.hitbox.pos.y;

		this.x += this.vx;
		this.y = this.originalY - (this.sinY * 200);

		if (this.jump == true){
			this.sinX += 0.05;
			this.sinY = Math.sin(this.sinX);
		}		
		else{

		}
		if (this.sinX > 3.14){
			this.jump = false;
			this.sinX = 0;
			this.sinY = 0;
		}

		this.idleL.x = this.x - (this.idleL.width/2);
		this.idleL.y = this.y - (this.idleL.height/2); 
		this.idleR.x = this.x - (this.idleR.width/2); 
		this.idleR.y = this.y - (this.idleL.height/2);

		this.jumpL.x = this.x - (this.jumpL.width/2);
		this.jumpL.y = this.y - (this.jumpL.height/2);
		this.jumpR.x = this.x - (this.jumpR.width/2);
		this.jumpR.y = this.y - (this.jumpR.height/2);

		this.runL1.x = this.x - (this.runL1.width/2);
		this.runL1.y = this.y - (this.runL1.height/2);
		this.runL2.x = this.x - (this.runL2.width/2);
		this.runL2.y = this.y - (this.runL2.height/2);
		this.runL3.x = this.x - (this.runL3.width/2);
		this.runL3.y = this.y - (this.runL3.height/2);
		this.runL4.x = this.x - (this.runL4.width/2);
		this.runL4.y = this.y - (this.runL4.height/2);
		this.runL5.x = this.x - (this.runL5.width/2);
		this.runL5.y = this.y - (this.runL5.height/2);
		this.runL6.x = this.x - (this.runL6.width/2);
		this.runL6.y = this.y - (this.runL6.height/2);
		this.runL7.x = this.x - (this.runL7.width/2);
		this.runL7.y = this.y - (this.runL7.height/2);
		this.runL8.x = this.x - (this.runL8.width/2);
		this.runL8.y = this.y - (this.runL8.height/2);
		this.runL9.x = this.x - (this.runL9.width/2);
		this.runL9.y = this.y - (this.runL9.height/2);

		this.runR1.x = this.x - (this.runR1.width/2);
		this.runR1.y = this.y - (this.runR1.height/2);
		this.runR2.x = this.x - (this.runR2.width/2);
		this.runR2.y = this.y - (this.runR2.height/2);
		this.runR3.x = this.x - (this.runR3.width/2);
		this.runR3.y = this.y - (this.runR3.height/2);
		this.runR4.x = this.x - (this.runR4.width/2);
		this.runR4.y = this.y - (this.runR4.height/2);
		this.runR5.x = this.x - (this.runR5.width/2);
		this.runR5.y = this.y - (this.runR5.height/2);
		this.runR6.x = this.x - (this.runR6.width/2);
		this.runR6.y = this.y - (this.runR6.height/2);
		this.runR7.x = this.x - (this.runR7.width/2);
		this.runR7.y = this.y - (this.runR7.height/2);
		this.runR8.x = this.x - (this.runR8.width/2);
		this.runR8.y = this.y - (this.runR8.height/2);
		this.runR9.x = this.x - (this.runR9.width/2);
		this.runR9.y = this.y - (this.runR9.height/2);

		this.animationCounter++;

		if (this.animationCounter > this.animationSpeed) {
			this.animationCounter = 0;
			this.frameKeeper++;
			if (this.frameKeeper > 9) {
				this.frameKeeper = 1;
			}
		}

		if(this.x > 800){
			this.x = 0;
		}
		else if(this.x < 0){
			this.x = 800;
		}
	}

	this.render = function() {
		if (this.dir == "l" && this.vx == 0 & this.y == this.originalY){
			stage.addChild(this.idleL);
		}
		else if (this.dir == "r" && this.vx == 0 && this.y == this.originalY){
			stage.addChild(this.idleR);
		}
		else if (this.dir == "l" && this.y != this.originalY){
			stage.addChild(this.jumpL);
		}
		else if (this.dir == "r" && this.y != this.originalY){
			stage.addChild(this.jumpR);
		}
		else if (this.dir == "l" && this.vx != 0 && this.y == this.originalY){
			if (this.frameKeeper == 1) {
				stage.addChild(this.runL1);
			} else if (this.frameKeeper == 2) {
				stage.addChild(this.runL2);
			} else if (this.frameKeeper == 3) {
				stage.addChild(this.runL3);
			} else if (this.frameKeeper == 4) {
				stage.addChild(this.runL4);
			} else if (this.frameKeeper == 5) {
				stage.addChild(this.runL5);
			} else if (this.frameKeeper == 6) {
				stage.addChild(this.runL6);
			} else if (this.frameKeeper == 7) {
				stage.addChild(this.runL7);
			} else if (this.frameKeeper == 8) {
				stage.addChild(this.runL8);
			} else if (this.frameKeeper == 9) {
				stage.addChild(this.runL9);
			}
		}
		else if (this.dir == "r" && this.vx != 0 && this.y == this.originalY){
			if (this.frameKeeper == 1) {
				stage.addChild(this.runR1);
			} else if (this.frameKeeper == 2) {
				stage.addChild(this.runR2);
			} else if (this.frameKeeper == 3) {
				stage.addChild(this.runR3);
			} else if (this.frameKeeper == 4) {
				stage.addChild(this.runR4);
			} else if (this.frameKeeper == 5) {
				stage.addChild(this.runR5);
			} else if (this.frameKeeper == 6) {
				stage.addChild(this.runR6);
			} else if (this.frameKeeper == 7) {
				stage.addChild(this.runR7);
			} else if (this.frameKeeper == 8) {
				stage.addChild(this.runR8);
			} else if (this.frameKeeper == 9) {
				stage.addChild(this.runR9);
			}
		}
	}

	this.isJumping = function(){
		this.jump = true;
	}

	this.moveDirection = function(x){
		this.dir = x;
		if (x == "l")
		{
			this.vx = -10; 
		}
		else if (x == "r")
		{
			this.vx = 10; 
		}
	}

	this.stopRunning = function(){
		this.vx = 0;
	}

}

function Fruit(x, y, width, height, fruit_01, fruit_02, fruit_03, fruit_04, fruit_05) {
	
	this.spinning_state = 0;
	this.stationary_state = 1;
	this.state = this.spinning_state;
	this.animationCounter = 0;
	this.animationSpeed = 5;
	this.frameKeeper = 1;

	this.xSpeed = (getRandomArbitrary(xSpeedMin, xSpeedMax) / 10) - 4;
	this.ySpeed = (getRandomArbitrary(ySpeedMin, ySpeedMax));
	this.angle = Math.atan(this.xSpeed/this.ySpeed) * (-1);

	this.fruit_01 = fruit_01;
	this.fruit_02 = fruit_02;
	this.fruit_03 = fruit_03;
	this.fruit_04 = fruit_04;
	this.fruit_05 = fruit_05;

	this.x = getRandomArbitrary(-10, 810);
	this.y = getRandomArbitrary(-500, -150);
	//this.x = x;
	//this.y = y;
	this.width = width;
	this.height = height;

	this.fruit_01.width = this.width;
	this.fruit_01.height = this.height;
	this.fruit_01.x = this.x - (this.fruit_01.width/2);
	this.fruit_01.y = this.y - (this.fruit_01.height/2);
	this.fruit_01.anchor.set(0.5);
	this.fruit_01.rotation = this.angle;

	this.fruit_02.width = this.width;
	this.fruit_02.height = this.height;
	this.fruit_02.x = this.x - (this.fruit_02.width/2);
	this.fruit_02.y = this.y - (this.fruit_02.height/2);
	this.fruit_02.anchor.set(0.5)
	this.fruit_02.rotation = this.angle;

	this.fruit_03.width = this.width;
	this.fruit_03.height = this.height;
	this.fruit_03.x = this.x - (this.fruit_03.width/2);
	this.fruit_03.y = this.y - (this.fruit_03.height/2);
	this.fruit_03.anchor.set(0.5)
	this.fruit_03.rotation = this.angle;

	this.fruit_04.width = this.width;
	this.fruit_04.height = this.height;
	this.fruit_04.x = this.x - (this.fruit_04.width/2);
	this.fruit_04.y = this.y - (this.fruit_04.height/2);
	this.fruit_04.anchor.set(0.5)
	this.fruit_04.rotation = this.angle;

	this.fruit_05.width = this.width;
	this.fruit_05.height = this.height;
	this.fruit_05.x = this.x - (this.fruit_05.width/2);
	this.fruit_05.y = this.y - (this.fruit_05.height/2);
	this.fruit_05.anchor.set(0.5)
	this.fruit_05.rotation = this.angle;

	this.collisionBox

	this.update = function() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		this.fruit_01.x = this.x - (this.fruit_01.width/2);
		this.fruit_01.y = this.y - (this.fruit_01.height/2);

		this.fruit_02.x = this.x - (this.fruit_02.width/2);
		this.fruit_02.y = this.y - (this.fruit_02.height/2);

		this.fruit_03.x = this.x - (this.fruit_03.width/2);
		this.fruit_03.y = this.y - (this.fruit_03.height/2);

		this.fruit_04.x = this.x - (this.fruit_04.width/2);
		this.fruit_04.y = this.y - (this.fruit_04.height/2);

		this.fruit_05.x = this.x - (this.fruit_05.width/2);
		this.fruit_05.y = this.y - (this.fruit_05.height/2);

		this.animationCounter++;

		if (this.animationCounter > this.animationSpeed) {
			this.animationCounter = 0;
			this.frameKeeper++;
			if (this.frameKeeper > 5) {
				this.frameKeeper = 1;
			}
		}

		if (this.y > 700) {
			removeFruit(this);
		}
		
		if(this.x > 800){
			this.x = 0;
		}
		else if(this.x < 0){
			this.x = 800;
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

function createFruits() {
	fruitCooldownCounter++;

	if (fruitCooldownCounter > fruitCooldown && fruitCount != maxFruits) {
		fruitCooldownCounter = 0;

		var fruitToAdd;

		var fruitType = Math.floor(getRandomArbitrary(0, 9));
		if (fruitType == 0) {
			fruitToAdd = getNewBanana(0, 0);
		} else if (fruitType == 1) {
			fruitToAdd = getNewCoconut(0, 0);
		} else if (fruitType == 2) {
			fruitToAdd = getNewMango(0, 0);
		} else if (fruitType == 3) {
			fruitToAdd = getNewOrange(0, 0);
		} else if (fruitType == 4) {
			fruitToAdd = getNewPear(0, 0);
		} else if (fruitType == 5) {
			fruitToAdd = getNewPineapple(0, 0);
		} else if (fruitType == 6) {
			fruitToAdd = getNewSquashSpin(0, 0);
		} else if (fruitType == 7) {
			fruitToAdd = getNewSquashTumble(0, 0);
		} else {
			fruitToAdd = getNewWatermelon(0, 0);
		}

		for (var i=0; i < maxFruits-1; i++) {
			if (fruitCollection[i] == null) {
				fruitCollection[i] = fruitToAdd;
				fruitCount++;
				break;
			}
		}
	}
}

function removeFruit(fruitToRemove) {
	for (var i=0; i < maxFruits-1; i++) {
		if (fruitCollection[i] == fruitToRemove) {
			fruitCollection[i] = null;
			fruitCount--;
			break;
		}
	}
}

function updateAllFruits() {
	for (var i=0; i < maxFruits-1; i++) {
		if (fruitCollection[i] != null) {
			fruitCollection[i].update();
		}
	}
}

function renderAllFruits() {
	for (var i=0; i < maxFruits-1; i++) {
		if (fruitCollection[i] != null) {
			fruitCollection[i].render();
		}
	}
}

function getNewBanana(x, y) {
	return new Fruit(x, y, 75, 121, new PIXI.Sprite.fromFrame('banana_01.png'), new PIXI.Sprite.fromFrame('banana_02.png'), new PIXI.Sprite.fromFrame('banana_03.png'), new PIXI.Sprite.fromFrame('banana_04.png'), new PIXI.Sprite.fromFrame('banana_05.png'));
}

function getNewCoconut(x, y) {
	return new Fruit(x, y, 50, 65, new PIXI.Sprite.fromFrame('coconut_01.png'), new PIXI.Sprite.fromFrame('coconut_02.png'), new PIXI.Sprite.fromFrame('coconut_03.png'), new PIXI.Sprite.fromFrame('coconut_04.png'), new PIXI.Sprite.fromFrame('coconut_05.png'));
}

function getNewMango(x, y) {
	return new Fruit(x, y, 40, 60, new PIXI.Sprite.fromFrame('mango_01.png'), new PIXI.Sprite.fromFrame('mango_02.png'), new PIXI.Sprite.fromFrame('mango_03.png'), new PIXI.Sprite.fromFrame('mango_04.png'), new PIXI.Sprite.fromFrame('mango_05.png'));
}

function getNewOrange(x, y) {
	return new Fruit(x, y, 60, 55, new PIXI.Sprite.fromFrame('orange_01.png'), new PIXI.Sprite.fromFrame('orange_02.png'), new PIXI.Sprite.fromFrame('orange_03.png'), new PIXI.Sprite.fromFrame('orange_04.png'), new PIXI.Sprite.fromFrame('orange_05.png'));
}

function getNewPear(x, y) {
	return new Fruit(x, y, 45, 60, new PIXI.Sprite.fromFrame('pear_01.png'), new PIXI.Sprite.fromFrame('pear_02.png'), new PIXI.Sprite.fromFrame('pear_03.png'), new PIXI.Sprite.fromFrame('pear_04.png'), new PIXI.Sprite.fromFrame('pear_05.png'));
}

function getNewPineapple(x, y) {
	return new Fruit(x, y, 75, 200, new PIXI.Sprite.fromFrame('pineapple_01.png'), new PIXI.Sprite.fromFrame('pineapple_02.png'), new PIXI.Sprite.fromFrame('pineapple_03.png'), new PIXI.Sprite.fromFrame('pineapple_04.png'), new PIXI.Sprite.fromFrame('pineapple_05.png'));
}

function getNewSquashSpin(x, y) {
	return new Fruit(x, y, 80, 75, new PIXI.Sprite.fromFrame('squash_spin_01.png'), new PIXI.Sprite.fromFrame('squash_spin_02.png'), new PIXI.Sprite.fromFrame('squash_spin_03.png'), new PIXI.Sprite.fromFrame('squash_spin_04.png'), new PIXI.Sprite.fromFrame('squash_spin_05.png'));
}

function getNewSquashTumble(x, y) {
	return new Fruit(x, y, 80, 80, new PIXI.Sprite.fromFrame('squash_tumble_05.png'), new PIXI.Sprite.fromFrame('squash_tumble_04.png'), new PIXI.Sprite.fromFrame('squash_tumble_03.png'), new PIXI.Sprite.fromFrame('squash_tumble_02.png'), new PIXI.Sprite.fromFrame('squash_tumble_01.png'));
}

function getNewWatermelon(x, y) {
	return new Fruit(x, y, 80, 75, new PIXI.Sprite.fromFrame('watermelon_01.png'), new PIXI.Sprite.fromFrame('watermelon_02.png'), new PIXI.Sprite.fromFrame('watermelon_03.png'), new PIXI.Sprite.fromFrame('watermelon_04.png'), new PIXI.Sprite.fromFrame('watermelon_05.png'));
}

//hit(spriteOne, spriteTwo, true, true)

function checkCollisions() {
	for (var i=0; i < maxFruits; i++) {
		if (i < maxFruits-1) {
			for (var j = (i+1); j < maxFruits; j++) {
				if (maxFruits[i] != null && maxFruits[j] != null) {
					if (b.hit(maxFruits[i].fruit_01, maxFruits[j].fruit_01)) {
						console.log("Collision");
					}
				}
			}
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

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function keyboard(keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;

	key.downHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) {
				key.press();
			}
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) 
			{
				key.release();
			}
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

  //Attach event listeners
  window.addEventListener(
  	"keydown", key.downHandler.bind(key), false
  	);
  window.addEventListener(
  	"keyup", key.upHandler.bind(key), false
  	);
  return key;
}
