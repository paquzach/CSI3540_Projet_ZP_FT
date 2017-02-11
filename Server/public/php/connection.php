<?php
    $user = 'sa';
    $pass = 'RAPA999!';
    $server = 'RAPA\RAPAInsight';
    $database = 'Meteorz';
    
    $connection_string = "DRIVER={SQL Server};SERVER=$server;DATABASE=$database";
    $conn = odbc_connect ( $connection_string, $user, $pass );

    $email = "zpaqu021@uottawa.ca";
    $query2 = odbc_exec ( $conn, "SELECT * FROM GameInfo WHERE [email] = 'ftrem026@uottawa.ca'" );
	
	$userEmail = odbc_result ( $query2, 1 );
	$userName = odbc_result ( $query2, 2 );
	$userPic = odbc_result ( $query2, 3 );	
	$userHighscore = odbc_result ( $query2, 4 );
	$userAttemps = odbc_result ( $query2, 5 );
	echo $userEmail;
	echo "\n";
	echo $userName;
	echo "\n";
	echo $userHighscore;
	echo "\n";
	echo $userAttemps;
?>