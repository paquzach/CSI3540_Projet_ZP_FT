
//For Account page
var n = document.getElementById("nicknameArea");
var p = document.getElementById("pictureArea");
var m = document.getElementById("emailArea");
var s = document.getElementById("scoreArea");
var t = document.getElementById("tryArea");

if(user.name != "none")
{
	n.innerHTML = user.name;
	m.innerHTML = user.email;
	s.innerHTML = user.score + " U";
	t.innerHTML = user.tries + " essais";
}
else{
	n.innerHTML = "Rockman";
	m.innerHTML = "metagame@mail.ca";
	s.innerHTML = "123456" + " U";
	t.innerHTML = "42" + " essais";
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
	var form = document.getElementById('nameForm');
	elem.readOnly = true;
	elem.style.backgroundColor = 'white';
	document.getElementById('btnSubmit').disabled = true;
	document.getElementById('btnChange').disabled = false;

	form.submit();
}