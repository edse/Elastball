<?php use_helper('I18N', 'Date') ?>
<!DOCTYPE html> 
<html> 
<head> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <?php include_http_metas() ?>
  <?php include_metas() ?>
  <?php include_title() ?>
  <link rel="shortcut icon" href="/favicon.ico" />
  <?php include_stylesheets() ?>
  <?php include_javascripts() ?>
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