//For Account page
var n = document.getElementById("nicknameArea");
var p = document.getElementById("pictureArea");
var m = document.getElementById("emailArea");
var s = document.getElementById("scoreArea");
var t = document.getElementById("tryArea");

if(user.name != "none")
{
	n.innerHTML = user.name;
	p.src = user.picture;
	m.innerHTML = user.email;
	s.innerHTML = user.score + " U";
	t.innerHTML = user.tries + " essais";
}
else{
	n.innerHTML = "NOT LOGGED IN";
	//p.src = user.picture; Default Picture
	m.innerHTML = "NOT LOGGED IN";
	s.innerHTML = "-1" + " U";
	t.innerHTML = "-1" + " essais";
}

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