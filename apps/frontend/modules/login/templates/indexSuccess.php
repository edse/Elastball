<?php use_helper('I18N', 'Date') ?>

<link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
<link rel="stylesheet" href="/css/webapp.css" /> 
<script src="/js/webapp.js"></script> 
<script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>

<div data-role="page" id="jqm-home" class="type-home">

  <?php if($sf_user->isAuthenticated()): ?>
  <?php include_partial('global/header2', array('user' => $sf_user->getGuardUser())) ?>
  <?php endif; ?>

  <div data-role="content">
     
    <div class="content-secondary">
      <div id="jqm-homeheader">
        <h1 id="jqm-logo" style="margin-top: 15px;"><img src="/res/img/logo.png" alt="ElastBall" title="ElastBall" /></h1> 
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

    </div><!--/content-primary--> 
    
    <div class="content-primary">
      
      <div id="video" style="padding-bottom: 20px; text-align: center;">
        <iframe width="560" height="315" src="http://www.youtube.com/embed/WNkVHYfTReM?rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>
      </div>
       
      <nav> 
        <ol data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"> 
          <li data-role="list-divider"><?php echo __('Top ten ranking...')?></li> 
          <li><a href="<?php echo url_for('@default?module=user&action=asdf') ?>" data-ajax="false">EDSE</a></li>
          <li><a href="index.html">The Godfather</a></li>
          <li>Brasileiro</li>
          <li>Espanhol</li>
          <li>Francês</li>
          <li>Inglês</li>
          <li>Italiano</li>
          <li>Japonês</li>
          <li>Português</li>
          <li>Russo</li>
        </ol>
      </nav>
      <!-- 
      <nav> 
        <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"> 
          <li data-role="list-divider"><?php echo __('Play with the best teams around the world...')?></li> 
          <li>Campeonato Turco</li>
          <li>Campeonato Alemão</li>
          <li>Campeonato Argentino</li>
          <li>Campeonato Brasileiro Series A, B, C e D</li>
          <li>Campeonato Espanhol</li>
          <li>Campeonato Francês</li>
          <li>Campeonato Inglês</li>
          <li>Campeonato Italiano</li>
          <li>Campeonato Japonês</li>
          <li>Campeonato Português</li>
          <li>Campeonato Russo</li>
        </ul>
      </nav> 
      -->
    </div>

  </div> 
  
  <?php /*
  <div data-role="footer" class="nav-glyphish-example"> 
    <div data-role="navbar" data-grid="d" data-theme="e" class="nav-glyphish-example"> 
      <ul> 
        <li><a href="#" id="chat" data-icon="custom" data-theme="b">Chat</a></li> 
        <li><a href="#" id="email" data-icon="custom" data-theme="b">Email</a></li> 
        <li><a href="#" id="skull" data-icon="custom" data-theme="b">Danger</a></li> 
        <li><a href="#" id="beer" data-icon="custom" data-theme="b">Beer</a></li> 
        <li><a href="#" id="coffee" data-icon="custom" data-theme="b">Coffee</a></li> 
      </ul> 
    </div> 
  </div>
  */ ?>

  <?php include_partial('global/footer') ?>

</div> 
</body> 
</html> 