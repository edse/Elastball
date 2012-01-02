      <div id="jqm-homeheader">
        <h1 id="jqm-logo" style="margin-top: 15px;"><a href="<?php echo url_for('@homepage') ?>" data-ajax="false"><img src="/res/img/logo.png" alt="ElastBall" title="ElastBall" /></a></h1> 
        <p><?php echo __('Online sectorball game', array(), 'messages') ?> - <?php echo __('Teams, Games, Tournaments, News, and Iteractivity') ?></p> 
        <!-- <p id="jqm-version">Beta Release</p> --> 
      </div> 

      <p class="intro"><strong>ElastBall</strong> <?php echo __('allows you to chalenge other players online with 700+ soccer teams') ?>.</p>

      <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" id="_login" style="margin-bottom: 40px;"> 
        <li data-role="list-divider"><?php echo __('Signin with...') ?></li>
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=google&type=openid') ?>" rel="external"><img src="/images/google.png" alt="Google" class="ui-li-icon">Google</a></li> 
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=twitter&type=oauth') ?>" rel="external"><img src="/images/twitter.png" alt="Twitter" class="ui-li-icon">Twitter</a></li> 
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=facebook&type=oauth') ?>" rel="external"><img src="/images/facebook.png" alt="Facebook" class="ui-li-icon">Facebook</a></li>
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=yahoo&type=openid') ?>" rel="external"><img src="/images/yahoo.png" alt="Yahoo!" class="ui-li-icon">Yahoo!</a></li> 
      </ul>
      
      <a href="http://www.w3.org/html/logo/" style="margin-left: 45px;">
        <img src="http://www.w3.org/html/logo/badge/html5-badge-h-connectivity-css3-device-graphics-multimedia-performance-semantics-storage.png" width="357" height="64" alt="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Device Access, Graphics, 3D &amp; Effects, Multimedia, Performance &amp; Integration, Semantics, and Offline &amp; Storage" title="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Device Access, Graphics, 3D &amp; Effects, Multimedia, Performance &amp; Integration, Semantics, and Offline &amp; Storage">
      </a>
      
      <p style="text-align: center; font-size: small;"><?php echo __('HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Device Access, Graphics, 3D &amp; Effects, Multimedia, Performance &amp; Integration, Semantics, and Offline &amp; Storage')?></p> 
