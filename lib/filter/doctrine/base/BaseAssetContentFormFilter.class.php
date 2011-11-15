<?php

/**
 * AssetContent filter form base class.
 *
 * @package    elastball
 * @subpackage filter
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 29570 2010-05-21 14:49:47Z Kris.Wallsmith $
 */
abstract class BaseAssetContentFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'asset_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('Asset'), 'add_empty' => true)),
      'headline' => new sfWidgetFormFilterInput(),
      'content'  => new sfWidgetFormFilterInput(),
      'source'   => new sfWidgetFormFilterInput(),
      'author'   => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'asset_id' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('Asset'), 'column' => 'id')),
      'headline' => new sfValidatorPass(array('required' => false)),
      'content'  => new sfValidatorPass(array('required' => false)),
      'source'   => new sfValidatorPass(array('required' => false)),
      'author'   => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('asset_content_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'AssetContent';
  }

  public function getFields()
  {
    return array(
      'id'       => 'Number',
      'asset_id' => 'ForeignKey',
      'headline' => 'Text',
      'content'  => 'Text',
      'source'   => 'Text',
      'author'   => 'Text',
    );
  }
}
