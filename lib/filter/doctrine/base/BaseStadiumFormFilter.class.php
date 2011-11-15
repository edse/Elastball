<?php

/**
 * Stadium filter form base class.
 *
 * @package    elastball
 * @subpackage filter
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 29570 2010-05-21 14:49:47Z Kris.Wallsmith $
 */
abstract class BaseStadiumFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'official_name' => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'name'          => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'nickname'      => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'capacity'      => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'address'       => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'inauguration'  => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'location'      => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'geo_location'  => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'created_at'    => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => false)),
      'updated_at'    => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => false)),
      'slug'          => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'official_name' => new sfValidatorPass(array('required' => false)),
      'name'          => new sfValidatorPass(array('required' => false)),
      'nickname'      => new sfValidatorPass(array('required' => false)),
      'capacity'      => new sfValidatorPass(array('required' => false)),
      'address'       => new sfValidatorPass(array('required' => false)),
      'inauguration'  => new sfValidatorPass(array('required' => false)),
      'location'      => new sfValidatorPass(array('required' => false)),
      'geo_location'  => new sfValidatorPass(array('required' => false)),
      'created_at'    => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 00:00:00')), 'to_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 23:59:59')))),
      'updated_at'    => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 00:00:00')), 'to_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 23:59:59')))),
      'slug'          => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('stadium_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Stadium';
  }

  public function getFields()
  {
    return array(
      'id'            => 'Number',
      'official_name' => 'Text',
      'name'          => 'Text',
      'nickname'      => 'Text',
      'capacity'      => 'Text',
      'address'       => 'Text',
      'inauguration'  => 'Text',
      'location'      => 'Text',
      'geo_location'  => 'Text',
      'created_at'    => 'Date',
      'updated_at'    => 'Date',
      'slug'          => 'Text',
    );
  }
}
