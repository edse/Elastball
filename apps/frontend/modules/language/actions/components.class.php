<?php

class languageComponents extends sfComponents
{
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
}