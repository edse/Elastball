<?php

/**
 * setup actions.
 *
 * @package    elastball
 * @subpackage setup
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class setupActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
    $this->forward404Unless($this->user = $this->getUser()->getGuardUser());
    
    if($request->getParameter('nickname') && $request->getParameter('firstname') && $request->getParameter('lastname') && $request->getParameter('email') && $request->getParameter('team_id')){
      $this->user->setNickname($request->getParameter('nickname'));
      $this->user->setFirstName($request->getParameter('firstname'));
      $this->user->setLastName($request->getParameter('lastname'));
      $this->user->setEmailAddress($request->getParameter('email'));
      $this->user->setTeamId($request->getParameter('team_id'));
      $this->user->save();
      $this->getUser()->setFlash('notice', 'Your settings was save successfully.');
      $this->redirect('user/'.$this->user->getNickname());
    }
    //$this->forward('default', 'module');
  }
}
