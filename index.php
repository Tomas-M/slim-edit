<?php
   require('version.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head><title>Table Editor</title>
<meta name="description" content="Data editor">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Language" content="en">
<link rel="shortcut icon" href="favicon.ico">

<script src="jquery/jquery-3.1.1.js"></script>
<script src="jquery/jquery-ui.js"></script>
<link rel="stylesheet" type="text/css" href="jquery/jquery-ui.css">

<script src="globals.js<?=$rev?>"></script>
<script src="functions.js<?=$rev?>"></script>
<script src="events.js<?=$rev?>"></script>
<script src="config.js<?=$rev?>"></script>
<script src="windows.js<?=$rev?>"></script>
<script src="taskbar.js<?=$rev?>"></script>
<script src="editor.js<?=$rev?>"></script>

<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="custom.css<?=$rev?>">

</head>
<body>

   <div class=topmenu>
      <li id=menubut><i class="fa fa-bars"></i></li><span id=taskbar></span>
   </div>

   <div id=desktop>
      <div id=options><div id=optionsinside></div></div>
   </div>

   <script src="main.js<?=$rev?>"></script>

</body>
</html>
