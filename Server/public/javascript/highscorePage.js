//For Highscore page

userRank = 0; 

function loadTable(){
	//load all users and their scores
	for (var i = 0; i < rows.length; i++) {
			document.querySelector("#highscoreBody").innerHTML += "<tr><td style='font-size: 25px;'>" + (i+1) + "</td><td><img src='../pictures/logo.png' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>" + rows[i].username + "</td><td style='font-size: 25px;'>" + rows[i].highscore + " U</td></tr>";
			
			if(user.name != "none"){
				if (rows[i].username.trim() == user.name.trim()){
					userRank = i+1;
				}
			}
		}

	//Load current user data if it exists
	if(user.name != "none"){	
		document.querySelector("#highscoreFirstBody").innerHTML += "<tr style='background-color:#ffaa00;'><td style='font-size: 28px;'>" + userRank + "</td><td><img src='../pictures/logo.png' alt='Group Logo' height='35' width='35' style='margin-top:3px;'></td><td>" + user.name + "</td><td style='font-size: 28px;'>" + user.score + " U</td></tr>";
	}
}