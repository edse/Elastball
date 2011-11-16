<?php

/**
 * Socket form base class.
 *
 * @method Socket getObject() Returns the current form's model object
 *
 * @package    elastball
 * @subpackage form
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 29553 2010-05-20 14:33:00Z Kris.Wallsmith $
 */
abstract class BaseSocketForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id'     => new sfWidgetFormInputHidden(),
      'host'   => new sfWidgetFormInputText(),
      'port'   => new sfWidgetFormInputText(),
      'status' => new sfWidgetFormInputText(),
    ));

    $this->setValidators(array(
      'id'     => new sfValidatorChoice(array('choices' => array($this->getObject()->get('id')), 'empty_value' => $this->getObject()->get('id'), 'required' => false)),
      'host'   => new sfValidatorString(array('max_length' => 255, 'required' => false)),
      'port'   => new sfValidatorString(array('max_length' => 10, 'required' => false)),
      'status' => new sfValidatorString(array('max_length' => 255, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('socket[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Socket';
  }

}
