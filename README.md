# FruitZ - 2017
![Alt](/Server/public/pictures/logo.png "Logo")

## SYNOPSIS

Ceci est notre projet de classe CSI 3540. Notre site web va contenir un jeux accessible au visiteur lorsqu'il est connecté a leurs compte Google.
Le but du jeu est de survivre le plus longtemp possible sans ce faire frapper par les fruits qui tombent du ciel.
Les classements vont être sauvgardé en ligne et accessible à tous les joueurs pouvant se comparer sur une page dédié.
Toute information sauvegardée va être lié avec le compte Google de l'utilisateur et enregistré sur une base de données.

## ACCÈS AU SITE WEB

Pour le moment, il est possible d'acceder notre site web avec l'adresse IP de notre serveur. Voici le lien pour notre [site](http://99.236.195.44:8282 "WEBSITE").


## MOTIVATION

À part de vouloir bien réussir dans le cours, nous aimons construire des jeux. Construire un site web contenant un jeu simple sera de la bonne pratique si nous décidons de continuer dans cette direction dans le futur. 

## RÉFÉRENCES POUR LA CONSTRUCTION DU PROJET

[HTML 5](https://dev.w3.org/html5/html-author/ "HTML 5") pour la construction du site web

[Node.js](https://nodejs.org/api/ "Node.js") pour la connection au serveur 

[MSSQL](https://msdn.microsoft.com/en-us/library/dn198336.aspx "MSSQL") pour l'interaction avec la base de données

[SQL](https://www.w3schools.com/sql/sql_quickref.asp "SQL") language pour la collecte de données d'une base de données

[Google Identity Platform](https://developers.google.com/identity/ "Google Identity Platform") pour la connection par compte google

[Pixi.js](http://pixijs.download/v4.2.2/docs/index.html "Pixi.js") pour le game engine

[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API "Canvas") est un framework qui construit des graphiques

## CONTRIBUTEURS

Zaquary Paquette, 7230016

Francis Tremblay Pelletier, 7221721

## LICENCE

Aucune license n'est utilisé pour ce projet.

## INSTALATION ET DÉPLOIEMENT
1. Télécharger le l'application de github: https://github.com/paquzach/CSI3540_Projet_ZP_FT
2. Navigué dans le répertoir "NodeInstallation" et exécuter l'installation qui correspond a votre système d'exploitation.
3. Lorsque Node est installé, vous pouvé exécuter "node -v" dans votre ligne de commande pour confirmer que l'installation a succédé.
	
4. Pour la base de donné, il est suggéré d'utilisé Microsoft SQL (mssql) server. Il faut créer une table qui contient les colones suivante:
	email(PK, nchar(50), not null)
	username(nchar(15), not null)
	ppicture(image, null)
	highscore(int, null)
	attemps(int, null)
	timePlayed(int, null)
		
5. Pour que l'application puisse connecter a la base de donné, modifié dbConfig dans Serveur/app/routes.js pour que les informations reflecte votre base de donné.
	*Si vous voulez utiliser une differente base de donnée, il va falloir modifié le code pour implémenter sont support
6. Finalement, pour partir le serveur, il faut executé "node app.js" de la ligne de commande dans le répertoir "Serveur".