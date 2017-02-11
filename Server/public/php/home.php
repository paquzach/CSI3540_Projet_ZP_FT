<!DOCTYPE html>
<html>
<head>
<title>Details du jeu</title>
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

<div class="slideshow-container" style="width: 90%; height:500px ; margin-left: auto; margin-right: auto;">
	<div class="mySlides fade">
		<div class="numbertext">1/3</div>
		<img src="../pictures/gameImage.jpg" alt="Image du jeu" style="width: 100%; height: 500px;">
	</div>
	<div class="mySlides fade">
		<div class="numbertext">2/3</div>
		<img src="../pictures/gameImage2.jpg" alt="Image du jeu" style="width: 100%; height: 500px;">
	</div>
	<div class="mySlides fade">
		<div class="numbertext">3/3</div>
		<img src="../pictures/gameImage3.jpg" alt="Image du jeu" style="width: 100%; height: 500px;">
	</div>
	<a class="prev" onclick="clickSlide(); plusSlides(-1); ">&laquo</a>
	<a class="next" onclick="clickSlide(); plusSlides(1); ">&raquo</a>
</div>

<div class="siteBoxes" style="text-align: center; width:100px; height: 18px; margin-left: auto; margin-right: auto; margin-top: -80px; position:relative; z-index: 10; background-color: #a5d9b2;">
	<span class="dot" onclick="currentSlide(1); clickSlide();"></span> 
	<span class="dot" onclick="currentSlide(2); clickSlide();"></span> 
	<span class="dot" onclick="currentSlide(3); clickSlide();"></span> 
</div>


<div class="siteBoxes" style="width: 900px; height:200px ; margin-left:auto; margin-right: auto; margin-top: -12px; z-index: 9; position: relative;">
	<div style="margin-left:50px;">
		<h1>Frantic MeteorZ</h1>
		<p>Description du jeu, comment jouer, details importants, idees<br>
		Aussi, l'image par dessus sera chang&eacute;e avec des images du jeu en action (slideshow). <br>
		Cet image d&eacute;montrera a l'usager comment le jeu parait
		</p>
	</div>
</div>

<script type="text/javascript">
var slideIndex = 1;
showSlides(slideIndex);
var isClicked = false;

window.onload = function(){setInterval(function(){plusSlides(1);}, 8000);}

function clickSlide(){
	isClicked = true;
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

</script>


</body>
</html>