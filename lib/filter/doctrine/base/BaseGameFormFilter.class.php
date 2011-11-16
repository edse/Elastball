<?php

/**
 * Game filter form base class.
 *
 * @package    elastball
 * @subpackage filter
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 29570 2010-05-21 14:49:47Z Kris.Wallsmith $
 */
abstract class BaseGameFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'date_start'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate())),
      'date_end'     => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate())),
      'home_user_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('HomeUser'), 'add_empty' => true)),
      'home_team_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('HomeTeam'), 'add_empty' => true)),
      'home_score'   => new sfWidgetFormFilterInput(),
      'away_user_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('AwayUser'), 'add_empty' => true)),
      'away_team_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('AwayTeam'), 'add_empty' => true)),
      'away_score'   => new sfWidgetFormFilterInput(),
      'stadium_id'   => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('Stadium'), 'add_empty' => true)),
      'access_code'  => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'url'          => new sfWidgetFormFilterInput(array('with_empty' => false)),
      'status'       => new sfWidgetFormFilterInput(),
      'created_at'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => false)),
      'updated_at'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => false)),
    ));

    $this->setValidators(array(
      'date_start'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 00:00:00')), 'to_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 23:59:59')))),
      'date_end'     => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 00:00:00')), 'to_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 23:59:59')))),
      'home_user_id' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('HomeUser'), 'column' => 'id')),
      'home_team_id' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('HomeTeam'), 'column' => 'id')),
      'home_score'   => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'away_user_id' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('AwayUser'), 'column' => 'id')),
      'away_team_id' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('AwayTeam'), 'column' => 'id')),
      'away_score'   => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'stadium_id'   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('Stadium'), 'column' => 'id')),
      'access_code'  => new sfValidatorPass(array('required' => false)),
      'url'          => new sfValidatorPass(array('required' => false)),
      'status'       => new sfValidatorPass(array('required' => false)),
      'created_at'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 00:00:00')), 'to_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 23:59:59')))),
      'updated_at'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 00:00:00')), 'to_date' => new sfValidatorDateTime(array('required' => false, 'datetime_output' => 'Y-m-d 23:59:59')))),
    ));

    $this->widgetSchema->setNameFormat('game_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Game';
  }

  public function getFields()
  {
    return array(
      'id'           => 'Number',
      'date_start'   => 'Date',
      'date_end'     => 'Date',
      'home_user_id' => 'ForeignKey',
      'home_team_id' => 'ForeignKey',
      'home_score'   => 'Number',
      'away_user_id' => 'ForeignKey',
      'away_team_id' => 'ForeignKey',
      'away_score'   => 'Number',
      'stadium_id'   => 'ForeignKey',
      'access_code'  => 'Text',
      'url'          => 'Text',
      'status'       => 'Text',
      'created_at'   => 'Date',
      'updated_at'   => 'Date',
    );
  }
}
