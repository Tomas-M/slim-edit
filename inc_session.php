<?php
   require_once('inc_db.php');

   function userID()
   {
      return $_SESSION['userID']+0;
   }


   session_set_cookie_params(0);
   session_set_save_handler
   (
      function(){ return true; }, // open
      function(){ return true; }, // close
      function($id) // read
      {
         execQuery("DELETE FROM sessions WHERE lastUpdate < NOW() - INTERVAL 60 MINUTE");
         $row=fetch_assoc(execQuery("SELECT sessionData FROM sessions WHERE id=\"".escape($id)."\" LIMIT 1"));
         return (string) $row['sessionData'];
      },
      function($id,$data) // write
      {
         if (trim($id)=='') return;
         execQuery("REPLACE sessions SET id=\"".escape($id)."\", userID=".userID().", lastUpdate=NOW(), sessionData=\"".escape($data)."\"");
         return true;
      },
      function($id) // destroy
      {
         execQuery("DELETE FROM sessions WHERE id=\"".escape($id)."\"");
         return true;
      },
      function($maxlifetime) // Garbage Collector
      {
         // not needed since gc is done in read function
      }
   );

   session_start();
?>
