var ale = document.getElementById("alertArea");

if (problem == "none"){
	ale.style.display = "none"; 
}
else if (problem == "account"){
	ale.innerHTML = "Vous devez vous connecter avant de pouvoir voir votre compte" ;
}
else if (problem == "game"){
	ale.innerHTML = "Vous devez vous connecter avant de pouvoir jouer au jeu" ;
}