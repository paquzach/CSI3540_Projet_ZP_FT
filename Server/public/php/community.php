<!DOCTYPE html>
<html>
<head>
<title>Communaut&eacute </title>
<link rel="stylesheet" type="text/css" href="../css/style.css">
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

<a href="myAccount.php" style="color:inherit; text-decoration: none;">
<div class="communityBox" id="communityBox1" style="margin-top: 35px;">
	<h1 class="communityHeader">Information du compte</h1>
	<p id="communityText1">Appuyez ici pour voir vos donn&eacutees</p>
</div>
</a>

<a href="highscore.php" style="color:inherit; text-decoration: none;">
<div class="communityBox" id="communityBox2">
	<h1 class="communityHeader">Classements</h1>
	<p id="communityText2">Appuyez ici pour voir votre classement</p>
</div>
</a>

</body>
</html>