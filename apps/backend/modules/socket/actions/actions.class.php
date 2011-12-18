<?php

require_once dirname(__FILE__).'/../lib/socketGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/socketGeneratorHelper.class.php';

/**
 * socket actions.
 *
 * @package    elastball
 * @subpackage socket
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class socketActions extends autoSocketActions
{

  public function executeListDashboard(sfWebRequest $request)
  {
    $this->forward404Unless($this->socket = $this->getRoute()->getObject());
    //$this->redirect('@default?module=socket&action=index');
  }

  public function executeListOpen(sfWebRequest $request)
  {
    $this->forward404Unless($socket = $this->getRoute()->getObject());

    //dir
    $dir = sfConfig::get('sf_upload_dir').'/process/'.$socket->getId();
    $sdir = str_replace(" ", "\ ", sfConfig::get('sf_upload_dir').'/../websocket');

    try{
      
        $run = 
<<<EOT
#!/bin/sh
/usr/bin/php -q $sdir/WSdaemon.php --address={$socket->getHost()} --port={$socket->getPort()}
EOT;
      
      //$command = "$sdir/WSdaemon.php --address=".$socket->getHost()." --port=".$socket->getPort();
      //$run = "php $command > /dev/null 2>&1 & echo \$!";
      //$pid = shell_exec("nohup $run > /dev/null 2> /dev/null & echo \$!");

      //Create run.sh
      if(!is_dir($dir))
        mkdir($dir, 0777);
      chdir($dir);
      //Write
      $fp = fopen('run.sh', 'w+');
      fwrite($fp, $run);
      fclose($fp);
      chmod('run.sh',0777);
      
      //$pid = shell_exec("./run.sh > /dev/null 2> /dev/null & echo \$!");
      echo exec("./run.sh > /dev/null &");
      die();
      //die('>>>>'.$pid);

      if($pid==""){
        $this->getUser()->setFlash('error', 'The socket has not been open due to some errors!', false);
        $this->redirect('@default?module=socket&action=index');
      }
      
      $socket->setPid($pid);
      $socket->setStatus("open");
      $socket->save();
      $this->getUser()->setFlash('notice', 'Socket is open!');
      $this->redirect('@default?module=socket&action=index');
      
    }catch(Exception $e){
      print $e->getMessage();
      die();
    }

  }

  public function executeListClose(sfWebRequest $request)
  {
    $this->forward404Unless($socket = $this->getRoute()->getObject());
    $socket->setStatus("close");
    $socket->save();
    $this->redirect('@default?module=socket&action=index');
  }

  /*
  public function PsExecute($command, $timeout = 60, $sleep = 2) { 
    // First, execute the process, get the process ID
    $pid = PsExec($command); 
    if($pid === false) 
      return false; 
    $cur = 0; 
    // Second, loop for $timeout seconds checking if process is running 
    while( $cur < $timeout ) { 
      sleep($sleep); 
      $cur += $sleep; 
      // If process is no longer running, return true; 
      echo "\n ---- $cur ------ \n"; 
      if(!PsExists($pid))
        return true; // Process must have exited, success! 
    }
    // If process is still running after timeout, kill the process and return false 
    PsKill($pid); 
    return false; 
  } 
  */
  
  public function PsExec($commandJob) { 
    $command = $commandJob.' > /dev/null 2>&1 & echo $!'; 
    exec($command ,$op); 
    $pid = (int)$op[0]; 
    if($pid!="")
      return $pid; 
    return false; 
  }
  
  public function PsExists($pid) {
    exec("ps ax | grep $pid 2>&1", $output);
    while( list(,$row) = each($output) ) { 
      $row_array = explode(" ", $row); 
      $check_pid = $row_array[0]; 
      if($pid == $check_pid) { 
        return true; 
      } 
    } 
  return false; 
  } 

  public function PsKill($pid) { 
    exec("kill -9 $pid", $output); 
  } 


}