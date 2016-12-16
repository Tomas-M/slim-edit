<?php

   require_once('inc_db.php');
   require_once('inc_session.php');
   require_once('inc_lib.php');

   if (userID()<1) die(format_response('unsigned'));

   $action=trim($_REQUEST['action']);
   $id=$_REQUEST['id']+0;
   $name=trim($_REQUEST['name']);
   $data=trim($_REQUEST['data']);

   if ($action=='add')
   {
      if ($name=='') die(format_response("error","Project name must not be empty"));
      execQuery("INSERT INTO projects SET name=\"".escape($name)."\", data=\"".escape($data)."\", ownerID=".userID());
   }

   if ($action=='delete')
   {
      execQuery("DELETE FROM projects WHERE id=\"".$id."\" AND ownerID=".userID());
   }

   if ($action=='rename')
   {
      execQuery("UPDATE projects SET name=\"".escape($name)."\" WHERE id=\"".$id."\" AND ownerID=".userID());
   }

   if ($action=='load')
   {
      echo format_response('ok',["tables"=>result_column(execQuery("SELECT data FROM projects WHERE id=\"".$id."\" AND ownerID=".userID()))]);
      die();
   }

   if ($action=='save')
   {
      execQuery("UPDATE projects SET data=\"".escape($data)."\" WHERE id=\"".$id."\" AND ownerID=".userID());
   }

   echo format_response('ok',list_projects());

?>