#!/usr/bin/php
<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('/Users/emersonestrella/Documents/Aptana Studio 3 Workspace/elastball/web/websocket/lib/../../../web/uploads/../../config/ProjectConfiguration.class.php');
$configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
$context = sfContext::createInstance($configuration);

# Create Game
$u1 = Doctrine_Core::getTable('sfGuardUser')->find(1);
$u2 = Doctrine_Core::getTable('sfGuardUser')->find(3);
$d = new Game();

$d->setSocketId();
$d->setTitle($u1->getName()." x ".$u2->getName());
$d->setHomeUserId(1);
$d->setAwayUserId(3);
$d->setUrl("4ef4073e4b940");
$d->save();