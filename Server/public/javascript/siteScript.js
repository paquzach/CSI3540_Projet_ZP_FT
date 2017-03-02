//For all pages
var topBlock = document.getElementById("topBlock");

if (user.name == "none"){
	topBlock.innerHTML += "<a href='login.html' class='login' style='margin-right:20%;'>Se connecter</a>";
}
else{
	topBlock.innerHTML += "<a href='logout' class='login' style='margin-right:20%;'>Se deconnecter</a>" + "<a class='login'>Bienvenue " + user.name + " &#124; &nbsp;" + "</a>" ;
}
