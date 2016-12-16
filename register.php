<?php

   require_once('inc_db.php');
   require_once('inc_lib.php');
   require_once('inc_email.php');

   $pass=nicePassword();

   // register the user

   if (trim($_POST['email'])=='' || trim($_POST['name'])=='') die(format_response("error","Both fields are mandatory and cannot be empty"));
   execQuery("INSERT IGNORE INTO users SET email=\"".escape($_POST['email'])."\", fullName=\"".$_POST['name']."\", registered=NOW(), pass='".sha1($pass)."'");
   if (affected_rows()>0) echo format_response("ok","Thank you for your registration. Check email for your password.");
   else die(format_response("error","Username (email) already exists"));

   // mail him his password
   sendmail("cordet.fw@pnp-software.com",$_POST['email'],"Your password for Cordet Editor","Dear ".$_POST['name'].",\n\nthank you for your interest in Cordet Editor.\n"
   ."Your free account has been set up,\nplease login using the following:\n\nusername: ".$_POST['email']."\npassword: ".$pass."\n\nFeel free to reply to this email if you have any question\n\nCordet Editor team");

?>