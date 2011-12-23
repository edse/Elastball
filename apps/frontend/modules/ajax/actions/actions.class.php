<?php

/**
 * ajax actions.
 *
 * @package    elastball
 * @subpackage ajax
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class ajaxActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
    $this->forward('default', 'module');
  }

  public function executeReloadUsers(sfWebRequest $request){
    $this->setLayout(false);
    $return = "";
    //if($request->isXmlHttpRequest()){
      $this->forward404Unless($request->getParameter('socket_id'));
      $this->forward404Unless($request->getParameter('user_id'));
      $socket_id = $request->getParameter('socket_id');
      $user_id = $request->getParameter('user_id');
      $online = Doctrine_Query::create()
        ->select('u.*')
        ->from('sfGuardUser u, Online o')
        ->where('o.socket_id = ?', $socket_id)
        ->andWhere('u.id = o.user_id')
        ->execute();
      foreach($online as $o){
        if($user_id!=$o->getId())
          $return .= "<li id=\"".$o->getId()."\">".$o->getName()."</li>";
      }
    //}
    die($return);
  }

}
