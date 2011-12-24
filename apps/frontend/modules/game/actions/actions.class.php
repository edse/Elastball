<?php

/**
 * game actions.
 *
 * @package    elastball
 * @subpackage game
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class gameActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
    //$this->forward('default', 'module');
  }

  public function executePlay(sfWebRequest $request)
  {
    echo ">>>>".$request->getParameter('u');
    $this->uid = $request->getParameter('u');
    $this->user = $this->getUser()->getGuardUser();
    $this->socket = Doctrine_Query::create()
      ->select('s.*')
      ->from('Socket s')
      ->where('s.status = ?', "open")
      ->orderBy('s.id desc')
      ->limit(1)
      ->fetchOne();
    //$this->forward('default', 'module');
  }
}
