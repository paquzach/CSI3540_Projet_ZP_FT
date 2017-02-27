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
 renderer.view.style.position = 'absolute';
 renderer.view.style.left = '50%';
 renderer.view.style.top = '50%';
 renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';

 var stage = new PIXI.Container();
 

 console.log(type);

 // Shorthands

 var loadTexture = PIXI.loader.resources;

 // Game textures

 PIXI.loader
 	.add("../gameTextures/redSquare.png")
 	.load(setup);

 function setup() {
 	var redSquareSprite = new PIXI.Sprite(loadTexture["../gameTextures/redSquare.png"].texture);

 	// position sprites
 	redSquareSprite.x = 286;
 	redSquareSprite.y = 165;

 	// sprite size

 	// redSquareSprite.width = 500;
 	// redSquareSprite.height = 400;
 	//			or
 	// redSquareSprite.scale.set(0.5, 0.5);


 	// rotation
 	redSquareSprite.anchor.x = 0.5;
 	redSquareSprite.anchor.y = 0.5;
 	
 	redSquareSprite.rotation = 0.5;

	// add texture to stage
	stage.addChild(redSquareSprite);

	// render the stage
	renderer.render(stage);
 }