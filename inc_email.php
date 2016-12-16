<?php

   // send mail
   // returns boolean true on success, error message or false otherwise
   //
   function sendmail($from,$to,$subject,$body,$headers='')
   {
      $CRLF="\r\n";

      // build headers for the mail message
      if (is_array($headers)) $headers=join($CRLF,$headers);

      // try php's internal function first
      if (function_exists("mail"))
      {
         $ok=mail($to,$subject,$body,'From: '.$from,$headers);
         if ($ok) return $ok;
      }

      // if PHP's mail does not seem to work, try direct connection to the most priorized mx server
      $host=preg_replace("{.*@}","",$to);
      @getmxrr($host,$mxhosts,$weights);
      if (count($mxhosts)<1) $mxhosts=array($host);
      if (count($weights)>0)
      {
         $max=false;
         foreach($weights as $k=>$w) if ($max===false || $max>$w)
         {
            $max=$w;
            $mx=$mxhosts[$k];
         }
      }
      if ($mx=='') $mx=reset($mxhosts);

      $sock=fsockopen($mx,25,$errno,$errstr,30);
      if (!$sock) return false;
      stream_set_timeout($sock,30);

      // read the initial welcome line
      $s=fgets($sock);
      while (!preg_match("{^[0-9]+[ ]}",$s)) $s=fgets($sock);
      if ($s+0!=220) return false;

      // send the mail headers
      fwrite($sock,"HELO hitslap.com".$CRLF);
      $s=fgets($sock);
      if ($s+0!=250) return $s;
      fwrite($sock,"MAIL FROM: <$from>".$CRLF);
      $s=fgets($sock);
      if ($s+0!=250) return $s;
      fwrite($sock,"RCPT TO: <$to>".$CRLF);
      $s=fgets($sock);
      if ($s+0!=250) return $s;
      fwrite($sock,"DATA".$CRLF);
      $s=fgets($sock);
      if ($s+0!=354) return $s;

      $data="From: $from".$CRLF."To: $to".$CRLF.($headers?$headers.$CRLF:'')
           ."Content-Type: text/plain; charset=UTF-8".$CRLF
           ."Content-Transfer-Encoding: base64".$CRLF
           ."Subject: $subject".$CRLF.$CRLF
           .preg_replace("{[\n][.]}","\n..",chunk_split(base64_encode($body),76,$CRLF));

      // send the data
      fwrite($sock,$data.$CRLF.".".$CRLF);
      $s=fgets($sock);
      if ($s+0!=250)
      {
         while (!feof($sock)) $s.=fgets($sock);
         return $s;
      }
      fwrite($sock,"QUIT".$CRLF);
      return true;
   }

?>
