//For home page

var slideIndex = 1;
showSlides(slideIndex);
var isClicked = false;

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

//For Account page

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

//For Highscore page

function loadTable(){
	var numUsers = 100;
	var superScore = 100000000;
	//Load current user data if it exists
	document.querySelector("#highscoreFirstBody").innerHTML += "<tr style='background-color:#ffaa00;'><td>67</td><td><img src='../pictures/player_sample.jpg' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>FranticZ (Current User)</td><td>13 400 U</td></tr>";
	//load all users and their scores
	for (var i = 1; i <= numUsers; i++) {
		document.querySelector("#highscoreBody").innerHTML += "<tr><td>" + i + "</td><td><img src='../pictures/logo.png' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>User " + i +"</td><td>" + superScore + " U</td></tr>";
		superScore = superScore - 19963*i;
	}		
}
