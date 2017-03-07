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
 var background;
 var play_button_01;
 var play_button_02;

 console.log(type);

 // Game textures

//setup();

 function setup() {

	PIXI.loader.add('../gameTextures/', 'ui.json').load(function(loader, resources) {
		initialiseScene();
	});



	// render the stage
	renderer.render(stage);
 }

function initialiseScene() {
  createObjects();
  //animate();
}

function createObjects() {
  //background = new PIXI.Sprite.fromFrame('bg.png');
  play_button_01 = new PIXI.Sprite.fromFrame('blue_button04.png');
  play_button_01.x = 400;
  play_button_01.y = 275;

  console.log("");
  console.log("================================================");
  console.log("play_button_01: " + play_button_01);
  console.log("play_button_01.x: " + play_button_01.x);
  console.log("play_button_01.y: " + play_button_01.y);
  console.log("================================================");
  console.log("");

  play_button_02 = new PIXI.Sprite.fromFrame('blue_button03.png')
  stage.addChild(play_button_01); 
}