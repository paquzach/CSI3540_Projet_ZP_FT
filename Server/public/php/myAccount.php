<!DOCTYPE html>
<html>
<head>
	<title>Mon compte</title>
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

<div class="siteBoxes" style="width: 60%;height: 400px; margin: 5px auto;">
	<h1 style="margin-left: 10px;">Mon compte</h1>
	<div style="display: inline-block; width: 45%; height: 44%; margin-bottom: 85px;">
		<img style="width: 75%; display: block; margin: 5px auto; border: 3px solid #40a558; border-radius: 5px;" src="../pictures/player_sample.jpg" />
	</div>
	<div style="display: inline-block; width: 54%; height: 44%; margin-bottom: 85px; vertical-align: top;">
		<p style="vertical-align: top; position: relative; font-size: 25px; font-weight: bold; margin: 5px 0px 0px 10px; line-height: 2.3; ">
			Surnom: 
			<textarea readonly="true;" id="nicknameArea" style="width: 250px; height: 25px; font-size: 22px; font-weight: bold;"><%= user.name %></textarea>
			<br>
			Couriel: <a style="color: #0645ad;">fran-san@rogers.ca</a><br>
			Meilleur score: 13 400 U<br>
			Nombre d'essais: 13<br>
		</p>
	</div>
	<div style="display: block; width: 50%; margin: 0px auto;">
		<button id = "btnChange" style="width:49%; height: 35px; margin: 5px 0px; border-radius: 5px; display: inline-block; background-color: #91d4a1; font-size: 18px;" onclick="nameChange();">Changer mon surnom</button>
		<button id= "btnSubmit" disabled style="width:49%; height: 35px; margin: 5px 0px; border-radius: 5px; display: inline-block; background-color: #91d4a1; font-size: 18px; float: right;" onclick="nameSubmit();">Soumettre</button>
	</div>
</div>

<script type="text/javascript">

	function nameChange(){
		var elem = document.getElementById('nicknameArea');
		elem.readOnly = false;
		elem.style.backgroundColor = '#ffaa00';
		document.getElementById('btnSubmit').disabled = false;
		document.getElementById('btnChange').disabled = true;
	}

	//Envoyer le nouveau nom a la base de donnees ici
	function nameSubmit(){
		var elem = document.getElementById('nicknameArea');
		elem.readOnly = true;
		elem.style.backgroundColor = 'white';
		document.getElementById('btnSubmit').disabled = true;
		document.getElementById('btnChange').disabled = false;
	}
</script>

</body>
</html>