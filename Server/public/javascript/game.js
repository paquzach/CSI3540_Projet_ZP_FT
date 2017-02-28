 // Setting up stage renderer
alert(user.name);

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

setup();

 function setup() {
 	// Define the different sprites in the sprite sheet
 	//var sprite;
	var loaderCharacter = new PIXI.loaders.Loader("../gameTextures/", 24);
	loaderCharacter.add('character.png', 'character.json');
	loaderCharacter.on('complete', onAssetLoad);
	loaderCharacter.load();

	// add texture to stage
	//stage.addChild(redSquareSprite);

	// render the stage
	renderer.render(stage);
 }

 function onAssetLoad(){
  //attach sprite to stage etc...

  adventurer_idle = PIXI.Sprite.fromFrame("adventurer_idle.png");
  adventurer_idle.anchor.x = 0.5;
  adventurer_idle.x = 400;
  adventurer_idle.y = 275;

  console.log("adventurer_idle: " + adventurer_idle);
  stage.addChild(adventurer_idle);
}

 function loadAssets() {
 	var loader = new PIXI.JsonLoader(url);
 	loader.on('loaded', function(evt) {
 		//data is in evt.content.json    
 		evt.content.json
 	});
 	loader.load();
 }
