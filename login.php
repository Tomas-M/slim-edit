<?php

   require_once('inc_db.php');
   require_once('inc_session.php');
   require_once('inc_lib.php');

   $action=trim($_REQUEST['action']);

   if ($action=='logout')
   {
      $_SESSION['userID']=0;
      $_SESSION['email']='';
      $_SESSION['name']='';
      die(format_response('unsigned'));
   }


   if ($action=='login')
   {
      // check if user is registered and provided correct password
      $row=fetch_assoc(execQuery("SELECT * FROM users WHERE email=\"".escape($_REQUEST['email'])."\""));
      if ($row['email']!='' && $row['pass']!='' && $row['pass']==sha1($_REQUEST['pass']))
      {
         // remember in session
         $_SESSION['userID']=$row['id'];
         $_SESSION['email']=$row['email'];
         $_SESSION['name']=$row['fullName'];
         execQuery("UPDATE users SET lastLogin=NOW() WHERE id=".$row['id']);
      }
      $action='status';
   }


   if ($action=='status')
   {
      if (userID()<1) die(format_response('unsigned'));
      die(format_response('ok',['userID'=>$_SESSION['userID'],"email"=>$_SESSION['email'],"name"=>$_SESSION['name'],"projects"=>list_projects()]));
   }


?>