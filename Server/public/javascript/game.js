 // Setting up stage renderer

 var type = "WebGL"
 if(!PIXI.utils.isWebGLSupported()){
 	type = "canvas"
 }

 PIXI.utils.sayHello(type)


/*
.slideshow-container
{
	border: 3px solid #ffdd00; 
	border-radius: 5px;
	position: relative;
	margin: auto;
	margin-top: 5px;
}
*/
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

 var currentScreen = "mainMenu";

 var play_button;
 var highscore_button;
 var grphcs;

 console.log(type);

 // Game textures

//setup();

 function setup() {

	PIXI.loader.add('../gameTextures', '../gameTextures/ui.json').load(function(loader, resources) {
		loadMainMenu();
	});


	// render the stage
	renderer.render(stage);
 }

function loadMainMenu() {
	// PLAY BUTTON

 	play_button = new Button(210, 275, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('blue_button04.png'), "PLAY");
  	highscore_button = new Button(590, 275, 190, 49, new PIXI.Sprite.fromFrame('green_button04.png'), new PIXI.Sprite.fromFrame('green_button03.png'), "HIGHSCORE");

 	requestAnimationFrame(animate);
}



// UPDATE FUNCTIONS
function animate() {
	stage.removeChildren();
	//stage.update();
	if (currentScreen == "mainMenu") {
		play_button.render();
		highscore_button.render();
		//stage.addChild(grphcs);
	}

	renderer.render(stage);
    requestAnimationFrame(animate);
}


// OBJECTS
// Button
function Button(x, y, width, height, light, dark, text) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.light = light;
	this.dark = dark;

	this.light.width = this.width;
	this.light.height = this.height;
	this.dark.width = this.width;
	this.dark.height = this.height;

	this.light.x = this.x - (this.width / 2);
	this.light.y = this.y - (this.height / 2);
	this.dark.x = this.x - (this.width / 2);
	this.dark.y = this.y - (this.height / 2);
	
	this.light.alpha = 1;
	this.dark.alpha = 0;

	this.text = new PIXI.Text(text, {font:"50px Arial", fill:"black", align:"center"});
	this.text.x = this.x - (this.text.width / 2);
	this.text.y = this.y - (this.text.height / 2);
	this.text.alpha = 1;
	
	this.mouseOver = false;

	// methods
	this.render = function() {
		if (this.mouseOver) {
			this.light.alpha = 0;
			this.dark.alpha = 1;
		} else {
			this.light.alpha = 1;
			this.dark.alpha = 0;
		}
		stage.addChild(this.light);
		stage.addChild(this.dark);
		stage.addChild(this.text);

		console.log("mouseOver: " + this.mouseOver);
	}

	this.mouseover = function(mouseData){
		this.mouseOver = true;
	}
	this.mouseOut = function(mouseData){
		this.mouseOver = false;
	}
}