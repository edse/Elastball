<?php

/**
 * Socket filter form base class.
 *
 * @package    elastball
 * @subpackage filter
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 29570 2010-05-21 14:49:47Z Kris.Wallsmith $
 */
abstract class BaseSocketFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'pid'    => new sfWidgetFormFilterInput(),
      'host'   => new sfWidgetFormFilterInput(),
      'port'   => new sfWidgetFormFilterInput(),
      'status' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'pid'    => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'host'   => new sfValidatorPass(array('required' => false)),
      'port'   => new sfValidatorPass(array('required' => false)),
      'status' => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('socket_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Socket';
  }

  public function getFields()
  {
    return array(
      'id'     => 'Number',
      'pid'    => 'Number',
      'host'   => 'Text',
      'port'   => 'Text',
      'status' => 'Text',
    );
  }
}
