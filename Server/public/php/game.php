<!DOCTYPE html>
<html>
<head>
	<title>Jeu</title>
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<script src="../javascript/pixi.min.js"></script>
</head>
<body>

<div style="width: 100%; height: 40px; margin-top:-8px;">
	<img src="../pictures/logo.png" alt="Group Logo" height="40" width="40">
	<h3 style="vertical-align: top;  display:inline-block; line-height: 0; color:white;">Projet de CSI3540</h3>
	<a href="login.php" class="login">Se connecter</a>
</div>

<ul>
<div style="margin:auto; width: 846px;">
	<li><a href="home.php">Frantic MeteorZ</a> </li>
	<li class="dropdown">
		<a href="community.php" class="dropbtn">Communaut&eacute;</a> 
	
		<div class="dropdown-content">
			<a href="myAccount.php">Mon compte</a>
      		<a href="highscore.php">Classements</a>
		</div>
	</li>
	<li><a href="game.php" class="gameTab">Jouer</a> </li>
</div>
</ul>

<div style="width:800px; margin:0 auto;">
    <script type="text/javascript">
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

	    var stage = new PIXI.Container();
	    renderer.render(stage);
  </script>
</div>

</body>
</html>