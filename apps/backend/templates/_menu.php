        <div id="masthead">
            <div id="masthead-utility">
              <a href="<?php echo url_for('@homepage') ?>" title="Futebol Clube" style="border: 0; float: left; padding: 0;">
                <img id="logoA" src="/images/logo.png" alt="Futebol Clube" style="height:35px; margin-bottom: 5px; float: left;">
                <h2 style="margin-left:7px; margin-top: 20px; float: left;">Elastball</h2>
              </a>
                <?php if($sf_user->isAuthenticated()): ?>
                <strong><?php echo $sf_user->getName(); ?> (Elastball)</strong>
                <?php endif; ?>
                <?php if($sf_user->isAuthenticated()): ?>
				        <?php echo link_to('Sair', 'logout/index', array('class'  => 'end')); ?>
				        <?php endif; ?>
            </div>
            
            <div id="bar" class="yt-navbar">
            <?php if($sf_user->isAuthenticated()): ?>
            	<?php
              $c = 'yt-navbar-item';
              $m = $sf_params->get('module');
              if(($sf_user->hasPermission('admin')) || ($sf_user->hasPermission('editor'))) {
                echo link_to('Socket', 'socket/index', array(
                  'class'  => $m=='socket' ? $c.' yt-navbar-item-current' : $c
                ));
                echo link_to('Teams', 'team/index', array(
                  'class'  => $m=='team' ? $c.' yt-navbar-item-current' : $c
                ));
                echo link_to('Stadiums', 'stadium/index', array(
                  'class'  => $m=='stadium' ? $c.' yt-navbar-item-current' : $c
                ));
                echo link_to('Games', 'game/index', array(
                  'class'  => $m=='game' ? $c.' yt-navbar-item-current' : $c
                ));
                echo link_to('Movements', 'movement/index', array(
                  'class'  => $m=='movement' ? $c.' yt-navbar-item-current' : $c
                ));
                echo link_to('Chat', 'chat/index', array(
                  'class'  => $m=='chat' ? $c.' yt-navbar-item-current' : $c
                ));
                echo link_to('Users', 'sfGuardUser/index', array(
                  'class'  => $m=='sfGuardUser' ? $c.' yt-navbar-item-current' : $c
                ));
              }
      				?>
            <?php endif; ?>
            </div>
        </div>
