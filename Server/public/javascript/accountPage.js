
//For Account page
var n = document.getElementById("nicknameArea");
var p = document.getElementById("pictureArea");
var m = document.getElementById("emailArea");
var s = document.getElementById("scoreArea");
var t = document.getElementById("tryArea");

var alert = document.getElementById('alertStar');

n.value = user.name;
m.innerHTML = user.email;
s.innerHTML = user.score + " U";
t.innerHTML = user.tries + " essais";

function nameChange(){
	var elem = document.getElementById('nicknameArea');
	elem.readOnly = false;
	elem.style.backgroundColor = '#ffaa00';
	alert.style.display = "none"
	document.getElementById('btnSubmit').disabled = false;
	document.getElementById('btnChange').disabled = true;
}

//Envoyer le nouveau nom a la base de donnees ici
function nameSubmit(){
	var form = document.getElementById('nameForm');

	if (n.value.length > 0)
	{
		n.readOnly = true;
		n.style.backgroundColor = 'white';
		document.getElementById('btnSubmit').disabled = true;
		document.getElementById('btnChange').disabled = false;
		alert.style.display = "none"
		form.submit();		
	}
	else{
		alert.style.display = "inline"
	}
	
}