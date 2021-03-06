<?php

/**
 * BaseAssetContent
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $asset_id
 * @property string $headline
 * @property blob $content
 * @property string $source
 * @property string $author
 * @property Asset $Asset
 * 
 * @method integer      getAssetId()  Returns the current record's "asset_id" value
 * @method string       getHeadline() Returns the current record's "headline" value
 * @method blob         getContent()  Returns the current record's "content" value
 * @method string       getSource()   Returns the current record's "source" value
 * @method string       getAuthor()   Returns the current record's "author" value
 * @method Asset        getAsset()    Returns the current record's "Asset" value
 * @method AssetContent setAssetId()  Sets the current record's "asset_id" value
 * @method AssetContent setHeadline() Sets the current record's "headline" value
 * @method AssetContent setContent()  Sets the current record's "content" value
 * @method AssetContent setSource()   Sets the current record's "source" value
 * @method AssetContent setAuthor()   Sets the current record's "author" value
 * @method AssetContent setAsset()    Sets the current record's "Asset" value
 * 
 * @package    elastball
 * @subpackage model
 * @author     Your name here
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseAssetContent extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('asset_content');
        $this->hasColumn('asset_id', 'integer', null, array(
             'type' => 'integer',
             'notnull' => true,
             ));
        $this->hasColumn('headline', 'string', 255, array(
             'type' => 'string',
             'length' => 255,
             ));
        $this->hasColumn('content', 'blob', null, array(
             'type' => 'blob',
             ));
        $this->hasColumn('source', 'string', 255, array(
             'type' => 'string',
             'length' => 255,
             ));
        $this->hasColumn('author', 'string', 255, array(
             'type' => 'string',
             'length' => 255,
             ));

        $this->option('collate', 'utf8_unicode_ci');
        $this->option('charset', 'utf8');
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasOne('Asset', array(
             'local' => 'asset_id',
             'foreign' => 'id',
             'onDelete' => 'CASCADE'));
    }
}