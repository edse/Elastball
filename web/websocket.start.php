#!/php -q
<?php  
	// Run from command prompt > php -q websocket.demo.php

	// Basic WebSocket demo echoes msg back to client
	include "websocket.class.php";
  $port = 8082;
  $master = new WebSocket ("elastball.possum-cms.com", $port);
