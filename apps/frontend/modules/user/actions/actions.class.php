<?php

/**
 * user actions.
 *
 * @package    elastball
 * @subpackage user
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class userActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
    if($request->getParameter('u')){
      $this->forward404Unless($this->user_details = Doctrine_Core::getTable('sfGuardUser')->findOneByNickname($request->getParameter('u')));
    }
    else{
      $this->forward404Unless($this->user_details = $this->getUser()->getGuardUser());
      $this->redirect('@default?module=user&action='.$this->getUser()->getGuardUser()->getNickname());
    }
    $this->user = $this->getUser()->getGuardUser();
  }

 /**
  * Executes setup action
  *
  * @param sfRequest $request A request object
  */
  public function executeSetup(sfWebRequest $request)
  {
    $this->user = $this->getUser()->getGuardUser();
  }
}
