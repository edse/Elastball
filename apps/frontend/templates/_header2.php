  <div data-role="header" data-theme="b" data-position="inline">
    <h1><?php echo $user->getNickname()?></h1>
    <a href="<?php echo url_for("@setup")?>" data-icon="gear" class="ui-btn-right" data-ajax="false" style="right: 85px;"><?php echo __('Setup')?></a>
    <a href="<?php echo url_for("@game_menu")?>" data-role="button" data-inline="true" data-rel="dialog" data-transition="slidedown" data-icon="star" class="ui-btn-right"><?php echo __('Play')?></a>    
    <a href="<?php echo url_for("@default?module=user&action=".$user->getNickname())?>" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home" data-ajax="false">Home</a>
  </div><!-- /header -->
