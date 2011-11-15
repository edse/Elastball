
<?php if ($sf_user->hasFlash('notice')): ?>
  <div class="notification info"><span class='strong'><?php echo __("WARNING", array(), 'messages')?></span><?php echo __($sf_user->getFlash('notice'), array(), 'messages') ?></div>
<?php endif; ?>

<?php if ($sf_user->hasFlash('error')): ?>
  <div class="notification error"><span class='strong'><?php echo __("ERROR", array(), 'messages')?><?php echo __($sf_user->getFlash('error'), array(), 'messages') ?></div>
<?php endif; ?>