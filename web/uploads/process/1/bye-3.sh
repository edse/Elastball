#!/usr/bin/php
<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('/Users/emersonestrella/Documents/Aptana Studio 3 Workspace/elastball/web/websocket/lib/../../../web/uploads/../../config/ProjectConfiguration.class.php');
$configuration = ProjectConfiguration::getApplicationConfiguration('backend', 'prod', true);
$context = sfContext::createInstance($configuration);

# Delete Online User
$d = Doctrine_Core::getTable('Online')->findOneByUserIdAndSocketUserId(3,'4ef40740d462f');
$d->delete();