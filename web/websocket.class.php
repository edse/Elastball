<?php
/**
 * Simple implementation of HTML5 WebSocket server-side.
 *
 * PHP versions 5
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @package    WebSocket
 * @author     George Nava <georgenava@gmail.com>
 * @author     Vincenzo Ferrari <wilk3ert@gmail.com>
 * @copyright  2010-2011
 * @license    http://www.gnu.org/licenses/gpl.txt GNU GPLv3
 * @version    1.1.0
 * @link       http://code.google.com/p/phpwebsocket/
 */
	
	/**
	 * @usage $master = new WebSocket ("localhost", 12345);
	 */
	class WebSocket {
		var $master;
		var $sockets = array ();
    var $users = array ();
    var $games = array ();
		// true to debug
		var $debug = true;
		// frame mask
		var $masks;
		// initial frames
		var $initFrame;

		function __construct ($address, $port) {
			error_reporting (E_ALL);
			set_time_limit (0);
			ob_implicit_flush ();

      try{
  			// Socket creation
  			$this->master = socket_create (AF_INET, SOCK_STREAM, SOL_TCP)/* or die("socket_create() failed")*/;
  			socket_set_option ($this->master, SOL_SOCKET, SO_REUSEADDR, 1)/* or die("socket_option() failed")*/;
  			socket_bind ($this->master, $address, $port)/* or die("socket_bind() failed")*/;
  			socket_listen ($this->master, 20)/* or die("socket_listen() failed")*/;
  			$this->sockets[] = $this->master;
  			$this->say ("Server Started : " . date ('Y-m-d H:i:s'));
  			$this->say ("Listening on   : {$address} {$port}");
  			$this->say ("Master socket  : {$this->master}\n");
      } catch (Exception $e) {
        throw new Exception("Error Processing Request", 1);
      }
			
			// Main loop
			while (true) {
				$changed = $this->sockets;
				socket_select ($changed, $write = NULL, $except = NULL, NULL);
				
				foreach ($changed as $socket) {
					if ($socket == $this->master) {
						$client = socket_accept ($this->master);
						
						if ($client < 0) {
							$this->log ("socket_accept() failed");
							continue;
						}
						else {
							// Connects the socket
							$this->connect ($client);
						}
					}
					else {
						$bytes = @socket_recv($socket, $buffer, 20480, 0);
						if ($bytes == 0) {
							// On socket.close ();
							$this->disconnect ($socket);
						}
						else {
							// Retrieve the user from his socket
							$user = $this->getuserbysocket ($socket);
							if (!$user->handshake) {
								$this->dohandshake ($user, $buffer);
							}
							else {
                //$this->process($user, $this->decode($buffer));
                $this->process($user, $buffer);
							}
						}
					}
				}
			}
		}

		/**
		 * @brief Echo incoming messages back to the client
		 * @note Extend and modify this method to suit your needs
		 * @param $user {User} : owner of the message
		 * @param $msg {String} : the message to echo
		 * @return void
		 */
		function process($user, $msg) {
		  
      if($user->protocol_version == "76")
        $msg = $this->unwrap($msg);
      else
        $msg = $this->decode($msg);

      $n = count($this->users);
      for($i = 0; $i < $n; $i++) {
        if($this->users[$i]->id != $user->id){
          if($this->users[$i]->protocol_version == "76")
            $this->send($this->users[$i]->socket, $msg);
          else
            $this->send($this->users[$i]->socket, $msg);
        }
      }
      
      if($msg == "admin<->shutdown"){
        $this->say("Shutting down at : " . date ('Y-m-d H:i:s'));
        socket_close($this->master);
        $master = null;
        $sockets = array ();
        $users = array ();
        $games = array ();
        $masks = null;
        $initFrame = null;
        die('bye');
      }
      
      return;

      
		  $parts = explode("<->", $msg);
      if(count($parts)>1){
        if(($parts[0] == "hello")&&(intval($parts[1]) > 0)){
          //ONLINE
          $user->user_id = $parts[1];
          /*
          require_once(dirname(__FILE__).'/../config/ProjectConfiguration.class.php');
          $configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
          sfContext::createInstance($configuration)->dispatch();

          $u = Doctrine::getTable('sfGuardUser')->findOneById($parts[1]);
          $user->user_id = $parts[1];
          $user->nick = $u->getNickname();
          $online = new Online();
          $online->setUserId($parts[1]);
          $online->setSocketUserId($user->id);
          $online->save();
          */
        }
        elseif(($parts[0] == "want2play")&&(intval($parts[1]) > 0)){
          //GAME REQUEST
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id == $parts[1]){
              if($this->users[$i]->protocol_version == "76")
                $this->send2($this->users[$i]->socket, "want2play<->".$user->id);
              else
                $this->send($this->users[$i]->socket, "want2play<->".$user->id);
            }
          }
        }
        elseif(($parts[0] == "yeswant2play")&&(intval($parts[1]) > 0)){
          //GAME REQUEST ACCEPTED
          if($user->protocol_version == "76")
            $this->send2($user->socket, "startgame<->23");
          else
            $this->send($user->socket, "startgame<->23");
          /*
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id == $parts[1]){
              $this->send($this->users[$i]->socket, "startgame<->23");
            }
          }
          */
              /*
              $away_user_id = $this->users[$i]->user_id;

              //CREATE GAME
              $game = new Game();
              $game->setHomeUserId($parts[1]);
              $game->setAwayUserId($away_user_id);
              $game->setHomeScore(0);
              $game->setAwayScore(0);
              $game->setAccessCode($parts[1]."".$away_user_id."".uniqid());
              $game->save();
              
              //$this->users[$i]->game_id = $game->getId();
              //$user->game_id = $game->getId();

              $this->send($this->users[$i]->socket, "startgame<->23");
              //$this->send($user->socket, "startgame<->".$game->getId());
              */
        }
        elseif(($parts[0] == "startgame")&&(intval($parts[1]) > 0)){
          //START GAME
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id == $user->id){
              if($this->users[$i]->protocol_version == "76")
                $this->send2($this->users[$i]->socket, $msg);
              else
                $this->send($this->users[$i]->socket, $msg);
            }
          }
        }
        elseif(($parts[0] == "nowant2play")&&(intval($parts[1]) > 0)){
          //GAME REQUEST REFUSED
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id == $parts[1]){
              if($this->users[$i]->protocol_version == "76")
                $this->send2($this->users[$i]->socket, $msg);
              else
                $this->send($this->users[$i]->socket, $msg);
            }
          }
        }
        elseif(($parts[0] == "gamemove")&&(intval($parts[1]) > 0)){
          //GAME MOVEMENT
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            //if($this->users[$i]->id != $user->id)
            if($this->users[$i]->protocol_version == "76")
              $this->send2($this->users[$i]->socket, $msg);
            else
              $this->send($this->users[$i]->socket, $msg);
          }
          /*
          require_once(dirname(__FILE__).'/../config/ProjectConfiguration.class.php');
          $configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
          sfContext::createInstance($configuration)->dispatch();
          $move = new Movement();
          $move->setGameId($parts[1]);
          $move->setUserId($user->user_id);
          $move->setMessage($msg);
          $move->save();
          */
        }
        elseif(($parts[0] == "admin")&&($parts[1] == "whoisonline")){
          $message = "";
          $n = count($this->users);
          for($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id != $user->id){
              $message .= "elastball.possum-cms.com".$this->users[$i]->id."elastball.possum-cms.com";
            }
          }
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            if($this->users[$i]->protocol_version == "76")
              $this->send2($this->users[$i]->socket, $msg);
            else
              $this->send($this->users[$i]->socket, $msg);
          }
        }
        elseif(($parts[0] == "admin")&&($parts[1] == "kick")&&($parts[2] != "")){
          $kick = false;
          $this->say("kicking : ".$parts[2]);
          $n = count($this->users);
          for($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id == $parts[2]){
              $this->process($user, $parts[2].", you has been kicked! Bye!");
              $this->disconnect($this->users[$i]->socket);
              $kick = true;
              break;
            }
          }
          if(!$kick){
            if($user->protocol_version == "76")
              $this->send2($user->socket, "Sorry, ".$parts[2]." not found!");
            else
              $this->send($user->socket, "Sorry, ".$parts[2]." not found!");
          }
        }
        elseif(($parts[0] == "admin")&&($parts[1] == "shutdown")){
          $this->say("Shutting down at : " . date ('Y-m-d H:i:s'));
          socket_close($this->master);
          $master = null;
          $sockets = array ();
          $users = array ();
          $games = array ();
          $masks = null;
          $initFrame = null;
          die('bye');
        }
      }
      else{
        //SEND MSG TO EVERYONE except user
        $n = count($this->users);
        for ($i = 0; $i < $n; $i++) {
          if($user != $this->users[$i]){
            if($this->users[$i]->protocol_version == "76")
              $this->send2($this->users[$i]->socket, $msg);
            else
              $this->send($this->users[$i]->socket, $msg);
          }
        }
        
        //CHAT MESSAGE
        /*
        require_once(dirname(__FILE__).'/../config/ProjectConfiguration.class.php');
        $configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
        sfContext::createInstance($configuration)->dispatch();

        $chat = new Chat();
        $chat->setUserId($user->user_id);
        $chat->setMessage($msg);
        $chat->save();
        */
      }

		}

		/**
		 * @brief Send a message to a client
		 * @param $client {Socket} : socket to send the message
		 * @param $msg {String} : the message to send
		 * @return void
		 */
		function send ($client, $msg) {
			$this->say ("hybi> {$msg}");
			$msg = $this->encode($msg);
			socket_write($client, $msg, strlen ($msg));
		}

		/**
		 * @brief Connect a new client (socket)
		 * @param $socket {Socket} : socket to connect
		 * @return void
		 */
		function connect ($socket) {
			$user = new User ();
			$user->id = uniqid ();
			$user->socket = $socket;
			
			array_push ($this->users, $user);
			array_push ($this->sockets, $socket);
			
			$this->log ("{$socket} CONNECTED!");
			$this->log (date ("d/n/Y ") . "at " . date ("H:i:s T"));

      //$this->send($user->socket, $user->id." Conected");
      //$this->send($user->socket, "TEST FROM SERVER");

		}

		/**
		 * @brief Disconnect a client (socket)
		 * @param $socket {Socket} : socket to disconnect
		 * @return void
		 */
		function disconnect ($socket) {
		  $socket_id = 0;
			$found = null;
			$n = count ($this->users);
			// Finds the right user index from the given socket
			for ($i = 0; $i < $n; $i++) {
				if ($this->users[$i]->socket == $socket) {
					$found = $i;
					break;
				}
			}
			if (!is_null ($found)) {
			  $socket_id = $this->users[$found]->id;
				array_splice ($this->users, $found, 1);

        $index = array_search ($socket, $this->sockets);
        socket_close ($socket);
        $this->log ("{$socket} DISCONNECTED!");
        
        if($index >= 0) {
          array_splice ($this->sockets, $index, 1);
        }

			}
      
      //OFFLINE
      /*
      require_once(dirname(__FILE__).'/../config/ProjectConfiguration.class.php');
      $configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
      sfContext::createInstance($configuration)->dispatch();
      if($socket_id != 0){
        $online = Doctrine::getTable('Online')->findOneBySocketUserId($socket_id);
        $online->delete();
      }
      */
		}

		/**
		 * @brief Do the handshake between server and client
		 * @param $user {User} : user to handshake
		 * @param $buffer {String} : user's request
		 * @return Boolean
		 */
		function dohandshake($user, $buffer) {
			$this->log("\nRequesting handshake...");
			$this->log($buffer);
			
			list($resource, $host, $connection, $version, $origin, $key, $upgrade) = $this->getheaders($buffer);

      if($version == ''){
        $this->dohandshake2($user, $buffer);
      }else{
        $this->log ("Handshaking...");
        $reply  = 
          "HTTP/1.1 101 Switching Protocols\r\n" .
          "Upgrade: {$upgrade}\r\n" .
          "Connection: {$connection}\r\n" .
          "Sec-WebSocket-Version: {$version}\r\n" .
          "Sec-WebSocket-Origin: {$origin}\r\n" .
          "Sec-WebSocket-Location: ws://{$host}{$resource}\r\n" .
          "Sec-WebSocket-Accept: " . $this->calcKey ($key) . "\r\n" .
          "\r\n";
        
        // Closes the handshake
        socket_write($user->socket, $reply, strlen ($reply));
        $user->handshake = true;
        $user->protocol_version = "HyBi-17";
        $this->log ($reply);
        $this->log ("Done handshaking...");
      }
			return true;
		}

		/**
		 * @brief Calculate Sec-WebSocket-Accept
		 * @note For more info look at: http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-17
		 * @param $key {String} : key to calculate
		 * @return Calculated key
		 */
		function calcKey ($key) {
			// Constant string as specified in the ietf-hybi-17 draft
			$key .= "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		       	$key = sha1 ($key);
		       	$key = pack ('H*', $key);
		       	$key = base64_encode ($key);
		       	
		       	return $key;
		}

		/**
		 * @brief Get the client request headers
		 * @param $buffer {String} : buffer from which to draw the headers.
		 * @return Array
		 */
		function getheaders ($buffer) {
			$resource = $host = $connection = $version = $origin = $key = $upgrade = null;
			
			preg_match ('#GET (.*?) HTTP#', $buffer, $match) && $resource = $match[1];
			preg_match ("#Host: (.*?)\r\n#", $buffer, $match) && $host = $match[1];
			preg_match ("#Connection: (.*?)\r\n#", $buffer, $match) && $connection = $match[1];
			preg_match ("#Sec-WebSocket-Version: (.*?)\r\n#", $buffer, $match) && $version = $match[1];
			preg_match ("#Sec-WebSocket-Origin: (.*?)\r\n#", $buffer, $match) && $origin = $match[1];
			preg_match ("#Sec-WebSocket-Key: (.*?)\r\n#", $buffer, $match) && $key = $match[1];
			preg_match ("#Upgrade: (.*?)\r\n#", $buffer, $match) && $upgrade = $match[1];
			
			return array ($resource, $host, $connection, $version, $origin, $key, $upgrade);
		}

//////////////////////////////////////////

  function dohandshake2($user,$buffer){
    $this->log("\nRequesting handshake...");
    $this->log($buffer);
    list($resource,$host,$origin,$key1,$key2,$l8b) = $this->getheaders2($buffer);
    $this->log("Handshaking...");
    //$port = explode(":",$host);
    //$port = $port[1];
    //$this->log($origin."\r\n".$host);
    $upgrade  = "HTTP/1.1 101 WebSocket Protocol Handshake\r\n" .
                "Upgrade: WebSocket\r\n" .
                "Connection: Upgrade\r\n" .
                                //"WebSocket-Origin: " . $origin . "\r\n" .
                                //"WebSocket-Location: ws://" . $host . $resource . "\r\n" .
                "Sec-WebSocket-Origin: " . $origin . "\r\n" .
                    "Sec-WebSocket-Location: ws://" . $host . $resource . "\r\n" .
                    //"Sec-WebSocket-Protocol: icbmgame\r\n" . //Client doesn't send this
                "\r\n" .
                    $this->calcKey2($key1,$key2,$l8b) . "\r\n";// .
                        //"\r\n";
    socket_write($user->socket,$upgrade.chr(0),strlen($upgrade.chr(0)));
    $user->handshake=true;
    $user->protocol_version = "76";
    $this->log($upgrade);
    $this->log("Done handshaking...");
    return true;
  }
  
  function calcKey2($key1,$key2,$l8b){
        //Get the numbers
        preg_match_all('/([\d]+)/', $key1, $key1_num);
        preg_match_all('/([\d]+)/', $key2, $key2_num);
        //Number crunching [/bad pun]
        $this->log("Key1: " . $key1_num = implode($key1_num[0]) );
        $this->log("Key2: " . $key2_num = implode($key2_num[0]) );
        //Count spaces
        preg_match_all('/([ ]+)/', $key1, $key1_spc);
        preg_match_all('/([ ]+)/', $key2, $key2_spc);
        //How many spaces did it find?
        $this->log("Key1 Spaces: " . $key1_spc = strlen(implode($key1_spc[0])) );
        $this->log("Key2 Spaces: " . $key2_spc = strlen(implode($key2_spc[0])) );
        if($key1_spc==0|$key2_spc==0){ $this->log("Invalid key");return; }
        //Some math
        $key1_sec = pack("N",$key1_num / $key1_spc); //Get the 32bit secret key, minus the other thing
        $key2_sec = pack("N",$key2_num / $key2_spc);
        //This needs checking, I'm not completely sure it should be a binary string
        return md5($key1_sec.$key2_sec.$l8b,1); //The result, I think
  }
  
  function getheaders2($req){
    $r=$h=$o=null;
    if(preg_match("/GET (.*) HTTP/"               ,$req,$match)){ $r=$match[1]; }
    if(preg_match("/Host: (.*)\r\n/"              ,$req,$match)){ $h=$match[1]; }
    if(preg_match("/Origin: (.*)\r\n/"            ,$req,$match)){ $o=$match[1]; }
    if(preg_match("/Sec-WebSocket-Key1: (.*)\r\n/",$req,$match)){ $this->log("Sec Key1: ".$sk1=$match[1]); }
    if(preg_match("/Sec-WebSocket-Key2: (.*)\r\n/",$req,$match)){ $this->log("Sec Key2: ".$sk2=$match[1]); }
    if($match=substr($req,-8)){
      $this->log("Last 8 bytes: ".$l8b=$match);
    }
    return array($r,$h,$o,$sk1,$sk2,$l8b);
  }

  function send2($client,$msg){
    /*
    $this->say("> {$msg}");
    $msg1 = $this->wrap($msg);
    socket_write($client,$msg1,strlen($msg1));
    $this->say("! <{$msg1}> ".strlen($msg1));
    */
    $this->say("76> {$msg}");
    $msg = $this->wrap($msg);
    //$msg =$this->encode($msg);
    socket_write($client, $msg, strlen ($msg));
  } 

  function    wrap($msg=""){ return chr(0).$msg.chr(255); }
  function  unwrap($msg=""){ return substr($msg,1,strlen($msg)-2); }

//////////////////////////////////////////


		/**
		 * @brief Retrieve an user from his socket
		 * @param $socket {Socket} : socket of the user to search
		 * @return User or null
		 */
		function getuserbysocket ($socket) {
			$found = null;
			
			foreach ($this->users as $user) {
				if ($user->socket == $socket) {
					$found = $user;
					break;
				}
			}
			
			return $found;
		}
		
		/**
		 * @brief Decode messages as specified in the ietf-hybi-17 draft
		 * @param $msg {String} : message to decode
		 * @return Message decoded
		 */
		function decode ($msg) {
			$len = $data = $decoded = $index = null;
			$len = $msg[1] & 127;
		
			if ($len === 126) {
				$this->masks = substr ($msg, 4, 4);
				$data = substr ($msg, 8);
				$this->initFrame = substr ($msg, 0, 4);
			}
			else if ($len === 127) {
				$this->masks = substr ($msg, 10, 4);
				$data = substr ($msg, 14);
				$this->initFrame = substr ($msg, 0, 10);
			}
			else {
				$this->masks = substr ($msg, 2, 4);
				$data = substr ($msg, 6);
				$this->initFrame = substr ($msg, 0, 2);
			}
		
			for ($index = 0; $index < strlen ($data); $index++) {
				$decoded .= $data[$index] ^ $this->masks[$index % 4];
			}
		
			return $decoded;
		}
	
		/**
		 * @brief Encode messages
		 * @param $msg {String} : message to encode
		 * @return Message encoded
		 */
		function encode ($msg) {
			$index = $encoded = null;
		
			for ($index = 0; $index < strlen ($msg); $index++) {
				$encoded .= $msg[$index] ^ $this->masks[$index % 4];
			}
		
			$encoded = $this->initFrame . $this->masks . $encoded;
		
			return $encoded;
		}

		/**
		 * @brief Local echo messages
		 * @param $msg {String} : message to echo
		 * @return void
		 */
		function say ($msg = "") {
			echo "{$msg}\n";
      echo "users: ".count($this->users)."\n";
      /*
      $n = count($this->users);      
      for ($i = 0; $i < $n; $i++) {
        $this->send($this->users[$i], $msg);
      }
      */
		}
		
		/**
		 * @brief Log function
		 * @param $msg {String} : message to log
		 * @return void
		 */
		function log ($msg = "") {
			if ($this->debug) {
				echo "{$msg}\n";
			}
		}
	}

	class User {
		var $id;
		var $socket;
    var $handshake;
    var $protocol_version;
    var $status;
    var $user_id;
    var $game_id;
    var $nick;
	}

