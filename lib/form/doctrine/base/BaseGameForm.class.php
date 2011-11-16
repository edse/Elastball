<?php

/**
 * Game form base class.
 *
 * @method Game getObject() Returns the current form's model object
 *
 * @package    elastball
 * @subpackage form
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 29553 2010-05-20 14:33:00Z Kris.Wallsmith $
 */
abstract class BaseGameForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id'           => new sfWidgetFormInputHidden(),
      'date_start'   => new sfWidgetFormDateTime(),
      'date_end'     => new sfWidgetFormDateTime(),
      'home_user_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('HomeUser'), 'add_empty' => true)),
      'home_team_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('HomeTeam'), 'add_empty' => true)),
      'home_score'   => new sfWidgetFormInputText(),
      'away_user_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('AwayUser'), 'add_empty' => true)),
      'away_team_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('AwayTeam'), 'add_empty' => true)),
      'away_score'   => new sfWidgetFormInputText(),
      'stadium_id'   => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('Stadium'), 'add_empty' => true)),
      'access_code'  => new sfWidgetFormInputText(),
      'url'          => new sfWidgetFormInputText(),
      'status'       => new sfWidgetFormInputText(),
      'created_at'   => new sfWidgetFormDateTime(),
      'updated_at'   => new sfWidgetFormDateTime(),
    ));

    $this->setValidators(array(
      'id'           => new sfValidatorChoice(array('choices' => array($this->getObject()->get('id')), 'empty_value' => $this->getObject()->get('id'), 'required' => false)),
      'date_start'   => new sfValidatorDateTime(array('required' => false)),
      'date_end'     => new sfValidatorDateTime(array('required' => false)),
      'home_user_id' => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('HomeUser'), 'required' => false)),
      'home_team_id' => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('HomeTeam'), 'required' => false)),
      'home_score'   => new sfValidatorInteger(array('required' => false)),
      'away_user_id' => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('AwayUser'), 'required' => false)),
      'away_team_id' => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('AwayTeam'), 'required' => false)),
      'away_score'   => new sfValidatorInteger(array('required' => false)),
      'stadium_id'   => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('Stadium'), 'required' => false)),
      'access_code'  => new sfValidatorString(array('max_length' => 255)),
      'url'          => new sfValidatorString(array('max_length' => 255)),
      'status'       => new sfValidatorString(array('max_length' => 255, 'required' => false)),
      'created_at'   => new sfValidatorDateTime(),
      'updated_at'   => new sfValidatorDateTime(),
    ));

    $this->widgetSchema->setNameFormat('game[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Game';
  }

}
