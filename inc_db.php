<?php

   //
   // put require_once() of this script everywhere you need to call execQuery()
   // 

   // properly escape string to be used in query
   function escape($text)
   {
      return str_replace(['\\', "\0", "\n", "\r", "'", '"', "\x1a"], ['\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'], $text); //"
   }

   // execute sql query
   function execQuery($queryString,$dieOnError=true)
   {
      GLOBAL $mysqli_link;

      $sql_settings['dbname']='cordetfwed';      // database name (sometimes the same like username)
      $sql_settings['user']  ='cordetuser';      // username to the database
      $sql_settings['pass']  ='brmbrmbrm';       // password to the database
      $sql_settings['host']  ='127.0.0.1';       // database host or IP

      // if mysql connection is not set, setup it now
      if (!$mysqli_link)
      {
         for ($i=1;$i<50;$i++)
         {
            $mysqli_link=mysqli_connect($sql_settings['host'],$sql_settings['user'],$sql_settings['pass'],$sql_settings['dbname']);
            if ($mysqli_link) break; // ok
            trigger_error("MySQLi connect attempt ".($i+1),E_USER_NOTICE);
            if ($i<20) sleep(1);
         }

         if (!$mysqli_link) // can't connect
         {
            trigger_error("Fatal error: Can't connect to MySQL. ".mysqli_connect_error()." Query: $queryString",E_USER_NOTICE);
            if ($dieOnError) die(); else return -1;
         }

         mysqli_query($mysqli_link,"SET NAMES 'UTF8'");
      }

      $result=mysqli_query($mysqli_link,$queryString);
      if (!$result)
      {
         trigger_error("Fatal error: The query $queryString has generated error ".mysqli_error($mysqli_link),E_USER_NOTICE);
         if ($dieOnError) die(); else return -1;
      }

      return $result;
   }


   function fetch_row($result)
   {
      return mysqli_fetch_row($result);
   }

   function fetch_assoc($result)
   {
      return mysqli_fetch_assoc($result);
   }

   function num_rows($result)
   {
      return mysqli_num_rows($result);
   }

   function result_column($result,$col=0)
   {
      $row=fetch_row($result);
      return $row[$col];
   }

   function last_insert_id()
   {
      GLOBAL $mysqli_link;
      return mysqli_insert_id($mysqli_link);
   }

   function affected_rows()
   {
      GLOBAL $mysqli_link;
      return mysqli_affected_rows($mysqli_link);
   }

   function close_db_connection()
   {
      GLOBAL $mysqli_link;
      mysqli_close($mysqli_link);
      $mysqli_link=0;
   }

?>