#!/php -q
<?php  
	// Run from command prompt > php -q websocket.demo.php

	// Basic WebSocket demo echoes msg back to client
	include "websocket.class.php";
  $port = 8080;
  for($i=0; $i<=10; $i++){
    try{
      $master = new WebSocket ("elastball.possum-cms.com", $port+$i);
      break;
    } catch (Exception $e) {
      echo "\n>>".$e->getMessage();
    }
  }
