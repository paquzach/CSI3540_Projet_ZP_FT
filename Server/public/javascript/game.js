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
 renderer.render(stage);