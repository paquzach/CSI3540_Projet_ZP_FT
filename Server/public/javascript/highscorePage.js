//For Highscore page

userRank = 0; 

function loadTable(){
	//load all users and their scores
	for (var i = 0; i < rows.length; i++) {
		document.querySelector("#highscoreBody").innerHTML += "<tr><td>" + (i+1) + "</td><td><img src='../pictures/logo.png' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>" + rows[i].username + "</td><td>" + rows[i].highscore + " U</td></tr>";
		
		if(user.name != "none"){
			if (rows[i].email.trim() == user.email.trim()){
				userRank = i+1;
			}
		}
	}

	//Load current user data if it exists
	if(user.name != "none"){	
		document.querySelector("#highscoreFirstBody").innerHTML += "<tr style='background-color:#ffaa00; color: #3a001c;'><td>" + userRank + "</td><td><img src='../pictures/logo.png' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>" + user.name + "</td><td>" + user.score + " U</td></tr>";
	}
}