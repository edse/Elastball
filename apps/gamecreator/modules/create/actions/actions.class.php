<?php

/**
 * create actions.
 *
 * @package    elastball
 * @subpackage create
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class createActions extends sfActions
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
  
  public function executeCreate(sfWebRequest $request){
    $this->setLayout(false);
    die('asdf');
  }
  
}
