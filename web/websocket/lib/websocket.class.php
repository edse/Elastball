<?php

require_once 'wsuser.class.php';
require_once 'handshaker.interface.php';
require_once "wsutil.php";
require_once 'handshakehybi.class.php';
require_once 'handshake76.class.php';
require_once 'handshake75.class.php';
require_once "wsexceptions.class.php";
require_once "appfactory.class.php";


/**
 * WebSocket implements the basic websocket protocol handling initial handshaking and also
 * dispatching requests up to the clients bound to the socket.
 */
class WebSocket {
	private $user;
	private $log;
	private $wsapp;
	
	/**
	 * Default constructor 
	 * $user is the WSUser object associated with the request
	 * $log is the path for the log file
	 */
	function WebSocket(WsUser $user, $log) {
		$this->user = $user;
	}
	
	/**
	 * Entry point for all client requests. This function
	 * determines if handshaking has been done and if not selects the
	 * specific handshaking protocol and invokes it.
	 * 
	 * If handshaking has been done this function dispatches the request
	 * to the service bound to the request associated with the user object
	 */
	function handleRequest($socket, $users) {
	  global $socket_id;
	  //die(">>>".count($users));
		// Check the handshake required
		if(!$this->user->handshakeDone()) {
			logToFile($socket."Performing the handshake\n");
			$bytes = @socket_recv($socket, $buffer, 2048, 0);
			if($bytes == 0) {
					WsDisconnect($socket);
					logToFile($socket." DISCONNECTED!");
					return;
			}
			$headers = WsParseHeaders2($buffer);
			if(count($headers) == 0 || !isset($headers['Upgrade'])) {
				// Not good send back an error status
				$this->sendFatalErrorResponse();
				return;
			} else {
				if(strtolower($headers['Upgrade']) != 'websocket')
					$this->sendFatalErrorResponse();
				// now get the handshaker for this request
				$hs = $this->getHandshaker($headers);
				$hs->dohandshake($this->user, $headers);
				logToFile($socket."Handshake Done\n");
				return;
			}
		}
		$appID = $this->user->appId();
    if(true){
		//if($appID === "_ECHO_") {
			try {
				$protocol = $this->user->protocol();
				if(isset($protocol)) {
					$protocol->setSocket($socket);
					$result = $protocol->read();
					$bytesRead = $result['size'];
					
					if($bytesRead !== -1 && $bytesRead !== -2) {
					  echo "\n".$result["frame"]."\n";
            $commands = explode("➤", $result["frame"]);
            $controls = explode("✓", $result["frame"]);
            if(count($commands)==2){
              $cmd = $commands[1];
              $args = explode("➾", $commands[0]);
              if($cmd == "shutdown"){
                shutdown();
              }
              elseif($cmd == "whoisonline"){
                echo "\nwhoisonline\n";
                whoisonline($this->user,$users,$result);
              }
            }
            elseif(count($controls)==2){
              $args = explode("➾", $controls[1]);
              $cmd = $args[0];
              if($cmd == "hello"){
                $this->user->user_id = $args[1];
                hello($this->user, $socket_id);
                notifyUsers($result, "⟽reload-users", $appID);
              }
              elseif($cmd == "bye"){
                echo "\nbye bye... ($socket_id)\n";
                bye($this->user, $socket_id);
                notifyUsers($result, "⟽reload-users", $appID);
              }
              elseif($cmd == "challenge"){
                $user_id = $args[1];
                $name = $args[2];
                echo "\nchallenge $user_id - $name ...\n";
                challenge($result, $user_id, $this->user, "⟽challenge-request⟻".$this->user->socket_user_id."⟻".$name."⟻".$this->user->user_id);
                //notifyUsers($result, "⟽reload-users", $appID);
              }
              elseif($cmd == "challenge-rejected"){
                $user_id = $args[1];
                $name = $args[2];
                echo "\challenge-rejected $user_id - ".$this->user->socket_user_id." - $name ...\n";
                challengeReject($result, $user_id, $name, $this->user, "⟽challenge-rejected⟻".$name);
              }
              elseif($cmd == "create-game"){
                $usr1 = $args[1];
                $usr2 = $args[2];
                $uid = $args[3];
                echo "\ncreating game $usr1 x $usr2 ...\n";
                createGame($result, $usr1, $usr2, $this->user, "⟽go-to-game⟻", $uid, $socket_id);
              }
            }
            else{
              //die(">>".count($commands));
              echo "\n".$result["frame"]."\n";
              foreach($users as $u){
                if($appID==$u->appId()){
                  $p = $u->protocol();
                  $p->setSocket($u->socket());
                  
                  $p->send($result);
                }
              }
            }
					} else {
						// badness must close
						$protocol->close();
						//WsDisconnect($socket);
						return;
					}
				} else {
					$this->sendFatalErrorResponse();
					return;
				}
			}
			catch (WSClientClosedException $e) {
				return;
			}
		} else {
			// Load the application class and send the message
			try {
				AppFactory::autoload($appID);
				$this->wsapp = AppFactory::create($appID);
				$protocol = $this->user->protocol();
				if(isset($protocol)) {
					$protocol->setSocket($socket);
					$this->wsapp->setProtocol($protocol);
					$result = $protocol->read();
					$bytesRead = $result['size'];
					if($bytesRead !== -1 && $bytesRead !== -2) {
						$this->wsapp->onMessage($result);
						/* if($resp['size'] != 0) {
							logToFile($socket."Calling send on APP\n");
							$protocol->send($resp);
						} */
					} else {
						$this->wsapp->onError();
						$protocol->close();
						WsDisconnect($socket);
						return;
					}
				} else {
					$this->sendFatalErrorResponse();
				}
			}
			catch (WSClientClosedException $e) {
				if(isset($this->wsapp))
					$this->wsapp->onClose();
				return;
			}
			catch (WSAppNotInstalled $e) {
				//$this->sendFatalErrorResponse();
				WsDisconnect($socket);
				return;
			}
		}
		return;
	}
	
	/**
	 * Takes the appropriate action to close the connection down
	 */
	private function sendFatalErrorResponse() {
		// Just close the socket if in handhake mode
		if(!$this->user->handshakeDone()) {
			WsDisconnect($this->user->socket());
			return;
		} else {
			//send a status code and then close
		}
	}
	
	/**
	 * Looks at the headers to determine which handshaker to 
	 * use
	 * $headers are the headers in the request
	 */
	private function getHandshaker($headers) {
		// Lets check which handshaker we need
		if(isset($headers['Sec-WebSocket-Version'])) {
			// The HyBi protocol is still in draft form but each version now just seems
			// to be semantic changes in the specification
			// Forcing version numbers above 8 to be HyBi, things might fail if actual protocol
			// changes are made but at least the resulting errors will be more informative
			if(intval($headers['Sec-WebSocket-Version']) >= 8) { 
				// This is the HyBI handshaker
				return new HandshakeHyBi();
			}
			// Not a version we support
			$this->sendFatalErrorResponse();
		} else if(isset($headers['Sec-WebSocket-Key1']) && isset($headers['Sec-WebSocket-Key2'])) {
			// Draft 76
			return new Handshake76();
		}
		// Must be draft 75
		
		return new Handshake75();
	}
	
}
?>