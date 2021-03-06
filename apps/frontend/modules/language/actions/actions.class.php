<?php

/**
 * language actions.
 *
 * @package    sfOpenIdOAuth
 * @subpackage language
 * @author     mayeco
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class languageActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
 
  public function executeLanguage(sfWebRequest $request)
  {
    $this->form = new sfFormLanguage(
      $this->getUser(),
      array('languages' => array('en', 'pt_BR'))
    );
    // URI
    $this->uri = $request->getUri();
    // URL
    $this->url = @current(explode('?',$this->uri));
    
  }
 
  public function executeChangeLanguage(sfWebRequest $request)
  {
    $form = new sfFormLanguage(
      $this->getUser(),
      array('languages' => array('en', 'pt_BR'))
    );
    $form->process($request);
    $referer = $this->getUser()->getReferer($request->getReferer());

    if($request->getParameter('return_url')){
      header("Location: ".$request->getParameter('return_url'));
      die();
    }
    else
      return $this->redirect("" != $referer ? $referer : 'homepage');
  }

  /*
  public function executeIndex(sfWebRequest $request)
  {
    $this->forward('default', 'module');
  }
  */

}
