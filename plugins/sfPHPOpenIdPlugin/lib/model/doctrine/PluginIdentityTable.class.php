<?php

/**
 * PluginIdentityTable
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 */
class PluginIdentityTable extends Doctrine_Table
{

  public static function getdomainfromidentify($url){

    $nowww = ereg_replace('www\.','',$url);
    $domain = parse_url($nowww);
    if(!empty($domain["host"])) {
      return $domain["host"];
    } else {
      return $domain["path"];
    }

  }

  public function findOneByNameAndIdentifier($name, $identifier)
  {
    $q = $this->createQuery('t')
              ->where('t.name = ?', IdentityTable::getdomainfromidentify($identifier))
              ->addWhere('t.identifier = ?', $identifier)
              ->limit(1);

    return $q->fetchOne();
  }

}