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
		var $debug = false;
		// frame mask
		var $masks;
		// initial frames
		var $initFrame;

		function __construct ($address, $port) {
			error_reporting (E_ALL);
			set_time_limit (0);
			ob_implicit_flush ();
			
			// Socket creation
			$this->master = socket_create (AF_INET, SOCK_STREAM, SOL_TCP) or die("socket_create() failed");
			socket_set_option ($this->master, SOL_SOCKET, SO_REUSEADDR, 1) or die("socket_option() failed");
			socket_bind ($this->master, $address, $port) or die("socket_bind() failed");
			socket_listen ($this->master, 20) or die("socket_listen() failed");
			$this->sockets[] = $this->master;
			$this->say ("Server Started : " . date ('Y-m-d H:i:s'));
			$this->say ("Listening on   : {$address} {$port}");
			$this->say ("Master socket  : {$this->master}\n");
			
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
						$bytes = @socket_recv ($socket, $buffer, 2048, 0);
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
								$this->process ($user, $this->decode ($buffer));
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
		  $parts = explode("<->", $msg);
      if(count($parts)>1){
        if(($parts[0] == "hello")&&(intval($parts[1]) > 0)){
          //ONLINE
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
            if($this->users[$i]->id == $parts[1])
              $this->send($this->users[$i]->socket, "want2play<->".$user->id);
          }
        }
        elseif(($parts[0] == "yeswant2play")&&(intval($parts[1]) > 0)){
          //GAME REQUEST ACCEPTED
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
            if($this->users[$i]->id == $user->id)
              $this->send($this->users[$i]->socket, $msg);
          }
        }
        elseif(($parts[0] == "nowant2play")&&(intval($parts[1]) > 0)){
          //GAME REQUEST REFUSED
          $n = count($this->users);
          for ($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id == $parts[1])
              $this->send($this->users[$i]->socket, $msg);
          }
        }
        elseif(($parts[0] == "gamemove")&&(intval($parts[1]) > 0)){
          //GAME MOVEMENT
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
          $msg = "";
          $n = count($this->users);
          for($i = 0; $i < $n; $i++) {
            if($this->users[$i]->id != $user->id){
              $msg .= "- ".$this->users[$i]->id."\n";
            }
          }
          $this->send($user->socket, base64_encode($msg));
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
          if(!$kick)
            $this->send($user->socket, "Sorry, ".$parts[2]." not found!");
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
        //SEND MSG TO EVERYONE
        $n = count($this->users);
        for ($i = 0; $i < $n; $i++) {
          if($user != $this->users[$i])
            $this->send($this->users[$i]->socket, $msg);
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
			$this->say ("> {$msg}");
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
		function dohandshake ($user, $buffer) {
			$this->log ("\nRequesting handshake...");
			$this->log ($buffer);
			
			list ($resource, $host, $connection, $version, $origin, $key, $upgrade) = $this->getheaders ($buffer);
			
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
			socket_write ($user->socket, $reply, strlen ($reply));
			
			$user->handshake = true;
			$this->log ($reply);
			$this->log ("Done handshaking...");
			
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
    var $status;
    var $user_id;
    var $game_id;
    var $nick;
	}
