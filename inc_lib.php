<?php

   function json_toString($js)
   {
      return json_encode($js);
   }

   function json_fromString($str)
   {
      return json_decode($str,true);
   }

   function format_response($status,$data='') // status = ok, error, unsigned
   {
      $response=[];
      $response['status']=$status;
      $response['data']=$data;
      return json_toString($response);
   }

   function nicePassword($length=8)
   {
       $w1='aeiou';
       $w2='bcdfghjklmnprstvxz';
       for ($i=1;$i<$length;$i++)
       {
          $pass.=$w2[mt_rand(0,strlen($w2)-1)].$w1[mt_rand(0,strlen($w1)-1)];
          $i++;
       }
       return $pass;
   }


   function list_projects()
   {
      $projects=[];
      $result=execQuery("SELECT * FROM projects WHERE ownerID=".userID());
      while($row=fetch_assoc($result)) $projects[]=$row;
      return $projects;
   }
?>