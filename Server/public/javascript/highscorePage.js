//For Highscore page

function loadTable(){
	var numUsers = 26;
	var superScore = 100000000;
	//Load current user data if it exists
	if(user.name != "none"){
		document.querySelector("#highscoreFirstBody").innerHTML += "<tr style='background-color:#ffaa00;'><td>67</td><td><img src='"+ user.picture +"' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>" + user.name + "</td><td>" + user.score + " U</td></tr>";
	}
	//load all users and their scores
	for (var i = 1; i <= numUsers; i++) {
		document.querySelector("#highscoreBody").innerHTML += "<tr><td>" + i + "</td><td><img src='../pictures/logo.png' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>User " + i +"</td><td>" + superScore + " U</td></tr>";
		superScore = superScore - 19963*i;
	}		
}