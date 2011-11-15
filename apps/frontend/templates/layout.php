<?php use_helper('I18N', 'Date') ?>
<!DOCTYPE html> 
<html> 
<head> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <?php include_http_metas() ?>
  <?php include_metas() ?>
  <link rel="shortcut icon" href="/favicon.ico" />
  <title>ElastBall: Futebol de botão online - Times, Jogos, Campeonatos, Notícias e Iteratividade em tempo real</title> 
  <link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
  <link rel="stylesheet" href="/css/webapp.css" /> 
  <script src="/js/jquery-1.6.2.min.js"></script> 
  <script src="/js/webapp.js"></script> 
  <script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>
</head> 
<body> 
   <?php if ($sf_user->isAuthenticated()): ?> 
      <?php echo __('user_id')?>: <?php echo $sf_user->getAttribute('user_id', '', 'sfGuardSecurityUser') ?> - 
      <?php echo link_to(__('logout'), '@sf_guard_signout') ?>
      <br/>
      <?php if(sfContext::getInstance()->getUser()->getAttribute('current_project')): ?>
      <?php echo __('current project_id')?>: <?php echo sfContext::getInstance()->getUser()->getAttribute('current_project') ?>
        <br/>
      <?php endif ?>
    <?php endif ?>
    
    <?php if ($sf_user->hasFlash('notice')): ?>
      <div class="notification info"><?php echo __($sf_user->getFlash('notice'), array(), 'messages') ?></div>
    <?php endif; ?>
    
    <?php if ($sf_user->hasFlash('error')): ?>
      <div class="notification error"><?php echo __($sf_user->getFlash('error'), array(), 'messages') ?></div>
    <?php endif; ?>
    
    <?php echo $sf_content ?>
    
    <br /><br />
    <?php include_component('language', 'language') ?>
    
  </body>
</html>