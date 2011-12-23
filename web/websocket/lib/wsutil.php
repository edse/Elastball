<?php
//require_once(dirname(__FILE__).'/../../../config/ProjectConfiguration.class.php');
//$configuration = ProjectConfiguration::getApplicationConfiguration('gamecreator', 'prod', false);
//sfContext::createInstance($configuration)->dispatch();

$sf_upload_dir = dirname(__FILE__).'/../../../web/uploads';

require_once 'wsuser.class.php';
/**
 * Creates and returns the socket on which the server will listen
 * $address is the address at which the server is listening
 * $port is the port at which the server is listening
 * $log is the log file reference.
 */
function GetSocket($address, $port, $log){
  
  $master=socket_create(AF_INET, SOCK_STREAM, SOL_TCP)     or die("socket_create() failed");
  socket_set_option($master, SOL_SOCKET, SO_REUSEADDR, 1)  or die("socket_option() failed");
  socket_bind($master, $address, $port)                    or die("socket_bind() failed");
  socket_listen($master,20)                                or die("socket_listen() failed");
  date_default_timezone_set('America/Los_Angeles');
  logToFile("Server Started : ".date('Y-m-d H:i:s')."\n");
  logToFile("Master socket  : ".$master."\n");
  logToFile("Listening on   : ".$address." port ".$port."\n\n");
  return $master;
}

/**
 * Simple log function which appends a message to a log file
 * $log is the file path for the log file
 * $msg is the message to be added to the log file
 */
function logToFile($msg) {
  global $log;
  
  file_put_contents($log, $msg, FILE_APPEND);
}

function WsConnect($socket, $socket_id){
  //die("\n\n>>>".$socket_id);
  global $sockets, $users;
  $user = new WsUser();
  $user->setSocket($socket);
  $user->socket_id = $socket_id;
  array_push($users,$user);
  array_push($sockets,$socket);
}

function WsDisconnect($socket){
  global $sockets, $users;
  logToFile("Disconnecting ".$socket." \n\n");
  $found=null;
  $n=count($users);
  for($i=0;$i<$n;$i++){
    if($users[$i]->socket()==$socket){ $found=$i; break; }
  }
  $swap = $users[$found];
  if(!is_null($found)){ array_splice($users,$found,1); }
  $index = array_search($socket,$sockets);
  socket_close($socket);
  if($index>=0){ array_splice($sockets,$index,1); }
  
  bye($swap);
}

function WsGetUserBySocket($socket){
  global $users;
  $found=null;
  foreach($users as $user){
    if($user->socket()==$socket){ $found=$user; break; }
  }
  return $found;
}

function WsParseHeaders( $header )
{
    $retVal = array();
    $fields = explode("\r\n", preg_replace('/\x0D\x0A[\x09\x20]+/', ' ', $header));
    foreach( $fields as $field ) {
        if( preg_match('/([^:]+): (.+)/m', $field, $match) ) {
            $match[1] = preg_replace('/(?<=^|[\x09\x20\x2D])./e', 'strtoupper("\0")', strtolower(trim($match[1])));
            if( isset($retVal[$match[1]]) ) {
                $retVal[$match[1]] = array($retVal[$match[1]], $match[2]);
            } else {
                $retVal[$match[1]] = trim($match[2]);
            }
        }
    }
    return $retVal;
}

function WsParseHeaders2($headers=false){
    if($headers === false){
        return false;
        }
  $statusDone = false;
    $headers = str_replace("\r","",$headers);
    $headers = explode("\n",$headers);
    foreach($headers as $value){
        $header = explode(": ",$value);
    if(count($header) == 1) {
        // if($header[0] && !$header[1]){
          if(!$statusDone) {
              $headerdata['status'] = $header[0];
        $statusDone = true;
      } else {
        $headerdata['body'] = $header[0];
        //return $headerdata;
      }
        }
        elseif($header[0] && $header[1]){
            $headerdata[$header[0]] = $header[1];
            }
        }
    return $headerdata;
}

function getAppID($resource) {
  $fields = explode("?", $resource);
  if(count($fields) === 2)
    return $fields[1];
  return '_ECHO_';
  
}

function shutdown(){
  global $socket_id, $sockets, $sf_upload_dir;
  foreach($sockets as $s){
    socket_shutdown($s);
    socket_close($s);
  }
  
  //dir
  $dir = $sf_upload_dir.'/process/'.$socket_id;
  $dirs = $sf_upload_dir.'/../../config';
  $run = 
<<<EOT
#!/usr/bin/php
<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('$dirs/ProjectConfiguration.class.php');
\$configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
\$context = sfContext::createInstance(\$configuration);

# Close Socket
\$d = Doctrine_Core::getTable('Socket')->find($socket_id);
\$d->setStatus('close');
\$d->save();

# Delete Online Users
\$ds = Doctrine_Core::getTable('Online')->findBySocketId($socket_id);
foreach(\$ds as \$d){
  \$d->delete();
}
EOT;
  //Create shutdown.sh
  if(!is_dir($dir))
    mkdir($dir, 0777);
  chdir($dir);
  //Write
  $fp = fopen("shutdown.sh", 'w+');
  fwrite($fp, $run);
  fclose($fp);
  chmod("shutdown.sh",0777);
  $pid = shell_exec("./shutdown.sh > /dev/null 2> /dev/null & echo \$!");

  die('shutdown-'.$socket_id);
}
function hello($user, $socket_id){
  global $sf_upload_dir;
  
  //dir
  $dir = $sf_upload_dir.'/process/'.$socket_id;
  $dirs = $sf_upload_dir.'/../../config';
  $run = 
<<<EOT
#!/usr/bin/php
<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('$dirs/ProjectConfiguration.class.php');
\$configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
\$context = sfContext::createInstance(\$configuration);

# Insert Online User
\$d = new Online();
\$d->setSocketId({$socket_id});
\$d->setUserId('{$user->user_id}');
\$d->setSocketUserId('{$user->socket_user_id}');
\$d->setStatus('chat');
\$d->save();
EOT;

  //Create hello.sh
  if(!is_dir($dir))
    mkdir($dir, 0777);
  chdir($dir);
  //Write
  $fp = fopen("hello-{$user->user_id}.sh", 'w+');
  fwrite($fp, $run);
  fclose($fp);
  chmod("hello-{$user->user_id}.sh",0777);
  exec("./hello-{$user->user_id}.sh > /dev/null");
}

function bye($user){
  global $sf_upload_dir;
  //dir
  $dir = $sf_upload_dir.'/process/'.$user->socket_id;
  $dirs = $sf_upload_dir.'/../../config';
  $run = 
<<<EOT
#!/usr/bin/php
<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('$dirs/ProjectConfiguration.class.php');
\$configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
\$context = sfContext::createInstance(\$configuration);

# Delete Online User
\$d = Doctrine_Core::getTable('Online')->findOneByUserIdAndSocketUserId({$user->user_id},'{$user->socket_user_id}');
\$d->delete();
EOT;

  //Create hello.sh
  if(!is_dir($dir))
    mkdir($dir, 0777);
  chdir($dir);
  //Write
  $fp = fopen("bye-{$user->user_id}.sh", 'w+');
  fwrite($fp, $run);
  fclose($fp);
  chmod("bye-{$user->user_id}.sh",0777);
  exec("./bye-{$user->user_id}.sh > /dev/null");
}

function whoisonline($user, $users, $result){
  $msg = null;
  foreach($users as $u){
    if($u != $user){
      echo "\n➤".$u->id();
      $msg .= $u->id().", ";
    }
  }
  if($msg == null)
    $msg = "Nobody besides you";
  $result["frame"] = $msg;
  $result["size"] = strlen($msg);
  $p = $user->protocol();
  $p->setSocket($user->socket());
  //parent::send($client,chr(0).$msg.chr(255));
  $p->send($result);
}

//notify all users
function notifyUsers($result, $msg, $appID){
  global $users;
  foreach($users as $u){
    if($appID==$u->appId()){
      $result["frame"] = $msg;
      $result["size"] = strlen($result["frame"]);
      $p = $u->protocol();
      $p->setSocket($u->socket());
      $p->send($result);
    }
  }
}

function challenge($result, $user_id, $user, $msg){
  global $users;
  foreach($users as $u){
    if($u->user_id == $user_id){
      $result["frame"] = $msg;
      $result["size"] = strlen($result["frame"]);
      $p = $u->protocol();
      $p->setSocket($u->socket());
      $p->send($result);
    }
  }
}

function challengeReject($result, $user_id, $name, $user, $msg){
  echo "\n>>>>>>>>>$user_id\n";
  global $users;
  foreach($users as $u){
    if($u->id() == $user_id){
      $result["frame"] = $msg;
      $result["size"] = strlen($result["frame"]);
      $p = $u->protocol();
      $p->setSocket($u->socket());
      $p->send($result);
    }
  }
}

function createGame($result, $usr1, $usr2, $user, $msg, $uid){
  global $users;
  $result["frame"] = $msg.addGame($uid, $user->user_id, $socket_id);
  $result["size"] = strlen($result["frame"]);
  foreach($users as $u){
    if(($u->id() == $usr1)||($u->id() == $user->socket_user_id)){
      $p = $u->protocol();
      $p->setSocket($u->socket());
      $p->send($result);
    }
  }
}

function addGame($usr1, $usr2, $socket_id){
  global $sf_upload_dir;
  //dir
  $dir = $sf_upload_dir.'/process/'.$socket_id;
  $dirs = $sf_upload_dir.'/../../config';
  $url = uniqid();
  $run = 
<<<EOT
#!/usr/bin/php
<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('$dirs/ProjectConfiguration.class.php');
\$configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
\$context = sfContext::createInstance(\$configuration);

# Create Game
\$u1 = Doctrine_Core::getTable('sfGuardUser')->find($usr1);
\$u2 = Doctrine_Core::getTable('sfGuardUser')->find($usr2);
\$d = new Game();

\$d->setSocketId($socket_id);
\$d->setTitle(\$u1->getName()." x ".\$u2->getName());
\$d->setHomeUserId($usr1);
\$d->setAwayUserId($usr2);
\$d->setUrl("$url");
\$d->save();
EOT;

  //Create game.sh
  if(!is_dir($dir))
    mkdir($dir, 0777);
  chdir($dir);
  //Write
  $fp = fopen("game-$usr1.sh", 'w+');
  fwrite($fp, $run);
  fclose($fp);
  chmod("game-$usr1.sh",0777);
  exec("./game-$usr1.sh > /dev/null");

  return $url;
}