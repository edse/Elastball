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
    //$this->forward('default', 'module');
  }
}
