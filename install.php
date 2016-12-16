<?php
   require_once('inc_db.php');

   execQuery("CREATE TABLE IF NOT EXISTS sessions (
              id char(32) NOT NULL,
              lastUpdate datetime NOT NULL,
              userID varchar(255) NOT NULL,
              sessionData text NOT NULL,
              PRIMARY KEY (id),
              KEY lastUpdate (lastUpdate),
              KEY userID (userID)
              ) ENGINE=MyISAM;");


   execQuery("CREATE TABLE IF NOT EXISTS users (
              id int(10) unsigned NOT NULL AUTO_INCREMENT,
              email varchar(255) NOT NULL,
              pass varchar(255) NOT NULL,
              fullName varchar(255) NOT NULL,
              registered datetime NOT NULL,
              lastLogin datetime NOT NULL,
              passResetCode varchar(255) NOT NULL,
              PRIMARY KEY (id),
              UNIQUE KEY email (email)
              ) ENGINE=MyISAM");


   execQuery("CREATE TABLE IF NOT EXISTS projects (
              id int(10) unsigned NOT NULL AUTO_INCREMENT,
              name varchar(255) NOT NULL,
              ownerID int(10) unsigned NOT NULL,
              data MEDIUMTEXT NOT NULL,
              PRIMARY KEY (id),
              KEY ownerID (ownerID)
              ) ENGINE=MyISAM");


   echo "done";
?>