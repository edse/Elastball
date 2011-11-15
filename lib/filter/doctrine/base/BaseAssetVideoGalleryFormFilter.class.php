<?php

/**
 * AssetVideoGallery filter form base class.
 *
 * @package    elastball
 * @subpackage filter
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 29570 2010-05-21 14:49:47Z Kris.Wallsmith $
 */
abstract class BaseAssetVideoGalleryFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'asset_id'   => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('Asset'), 'add_empty' => true)),
      'youtube_id' => new sfWidgetFormFilterInput(),
      'headline'   => new sfWidgetFormFilterInput(),
      'source'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'asset_id'   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => $this->getRelatedModelName('Asset'), 'column' => 'id')),
      'youtube_id' => new sfValidatorPass(array('required' => false)),
      'headline'   => new sfValidatorPass(array('required' => false)),
      'source'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('asset_video_gallery_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'AssetVideoGallery';
  }

  public function getFields()
  {
    return array(
      'id'         => 'Number',
      'asset_id'   => 'ForeignKey',
      'youtube_id' => 'Text',
      'headline'   => 'Text',
      'source'     => 'Text',
    );
  }
}
