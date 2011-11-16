<?php

/**
 * chat actions.
 *
 * @package    elastball
 * @subpackage chat
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class chatActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
    $this->user = $this->getUser()->getGuardUser();
    $this->socket = Doctrine_Query::create()
      ->select('s.*')
      ->from('Socket s')
      ->where('s.status = ?', "open")
      ->orderBy('s.id desc')
      ->limit(1)
      ->fetchOne();
  }
  
  public function executePlayers(sfWebRequest $request)
  {
    $players = Doctrine_Query::create()
      ->select('o.*')
      ->from('Online o')
      ->where('o.user_id > 0')
      ->orderBy('o.id desc')
      ->groupBy('o.user_id')
      ->execute();
    foreach($players as $p){
      $pp = Doctrine::getTable('sfGuardUser')->findOneById($p->getUserId());
      if($this->getUser()->getGuardUser()->getId() != $pp->getId())
        echo "<li id='".$p->getSocketUserId()."'>".$pp->getNickName()."</li>";
    }
    echo '<script type="text/javascript">
        $("#players li").click(function() {
          if(confirm("Deseja desafiar esse jogador?")){
            $("#msg").val("want2play<->"+this.id);
            send();
          }
        });
      </script>';
    die();
  }
  
}
