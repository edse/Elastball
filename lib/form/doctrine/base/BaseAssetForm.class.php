<?php

/**
 * Asset form base class.
 *
 * @method Asset getObject() Returns the current form's model object
 *
 * @package    elastball
 * @subpackage form
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 29553 2010-05-20 14:33:00Z Kris.Wallsmith $
 */
abstract class BaseAssetForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id'            => new sfWidgetFormInputHidden(),
      'asset_type_id' => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('AssetType'), 'add_empty' => false)),
      'user_id'       => new sfWidgetFormDoctrineChoice(array('model' => $this->getRelatedModelName('sfGuardUser'), 'add_empty' => false)),
      'title'         => new sfWidgetFormInputText(),
      'description'   => new sfWidgetFormInputText(),
      'is_active'     => new sfWidgetFormInputCheckbox(),
      'views'         => new sfWidgetFormInputText(),
      'ugc'           => new sfWidgetFormInputCheckbox(),
      'date_start'    => new sfWidgetFormDateTime(),
      'date_end'      => new sfWidgetFormDateTime(),
      'created_at'    => new sfWidgetFormDateTime(),
      'updated_at'    => new sfWidgetFormDateTime(),
      'slug'          => new sfWidgetFormInputText(),
    ));

    $this->setValidators(array(
      'id'            => new sfValidatorChoice(array('choices' => array($this->getObject()->get('id')), 'empty_value' => $this->getObject()->get('id'), 'required' => false)),
      'asset_type_id' => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('AssetType'))),
      'user_id'       => new sfValidatorDoctrineChoice(array('model' => $this->getRelatedModelName('sfGuardUser'))),
      'title'         => new sfValidatorString(array('max_length' => 255)),
      'description'   => new sfValidatorString(array('max_length' => 255, 'required' => false)),
      'is_active'     => new sfValidatorBoolean(array('required' => false)),
      'views'         => new sfValidatorInteger(array('required' => false)),
      'ugc'           => new sfValidatorBoolean(array('required' => false)),
      'date_start'    => new sfValidatorDateTime(array('required' => false)),
      'date_end'      => new sfValidatorDateTime(array('required' => false)),
      'created_at'    => new sfValidatorDateTime(),
      'updated_at'    => new sfValidatorDateTime(),
      'slug'          => new sfValidatorString(array('max_length' => 255, 'required' => false)),
    ));

    $this->validatorSchema->setPostValidator(
      new sfValidatorDoctrineUnique(array('model' => 'Asset', 'column' => array('slug')))
    );

    $this->widgetSchema->setNameFormat('asset[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    $this->setupInheritance();

    parent::setup();
  }

  public function getModelName()
  {
    return 'Asset';
  }

}
