<?php

/**
 * BaseSocket
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property string $host
 * @property string $port
 * @property string $status
 * 
 * @method string getHost()   Returns the current record's "host" value
 * @method string getPort()   Returns the current record's "port" value
 * @method string getStatus() Returns the current record's "status" value
 * @method Socket setHost()   Sets the current record's "host" value
 * @method Socket setPort()   Sets the current record's "port" value
 * @method Socket setStatus() Sets the current record's "status" value
 * 
 * @package    elastball
 * @subpackage model
 * @author     Your name here
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseSocket extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('socket');
        $this->hasColumn('host', 'string', 255, array(
             'type' => 'string',
             'length' => 255,
             ));
        $this->hasColumn('port', 'string', 10, array(
             'type' => 'string',
             'length' => 10,
             ));
        $this->hasColumn('status', 'string', 255, array(
             'type' => 'string',
             'length' => 255,
             ));

        $this->option('collate', 'utf8_unicode_ci');
        $this->option('charset', 'utf8');
    }

    public function setUp()
    {
        parent::setUp();
        
    }
}