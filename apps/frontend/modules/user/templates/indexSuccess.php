<?php use_helper('I18N', 'Date') ?>

<link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
<link rel="stylesheet" href="/css/webapp.css" /> 
<script src="/js/webapp.js"></script> 
<script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>

<div data-role="page" id="jqm-home" class="type-home">

  <?php if($sf_user->isAuthenticated()): ?>
  <?php include_partial('global/header2', array('user' => $user)) ?>
  <?php else: ?>
  <?php include_partial('global/header', array('title' => $user_details->getNickname())) ?>
  <?php endif; ?>

  <div data-role="content">
     
    <div class="content-secondary">
      <?php if($sf_user->isAuthenticated()): ?>
      <?php include_partial('global/left2') ?>
      <?php else: ?>
      <?php include_partial('global/left') ?>
      <?php endif; ?>
    </div><!--/content-secondary--> 
    
    <div class="content-primary">

      <nav> 
        <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"> 
          <li data-role="list-divider"><?php echo __('User info...')?></li> 
          <li>Ranking: #1</li>
          <li>Nickname: <?php echo $user->getNickname()?></li>
          <li style="height:65px;">Team: <?php echo $user->Team->getName()?> <span style="float: right"><img src="/uploads/assets/teams/<?php echo $user->Team->getLogo()?>" /></span></li>
          <li>Added: <?php echo $user->getCreatedAt()?></li>
        </ul>
      </nav> 

      <nav> 
        <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"> 
          <li data-role="list-divider"><?php echo __('Statistics...')?></li> 
          <li><?php echo __('Games')?>: 79</li>
          <li><?php echo __('Win')?>: 70</li>
          <li><?php echo __('Draw')?>: 8</li>
          <li><?php echo __('Loose')?>: 1</li>
        </ul>
      </nav> 
      
      <nav> 
        <ol data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"> 
          <li data-role="list-divider"><?php echo __('Last 10 games...')?></li> 
          <li><a href="<?php echo url_for('@default?module=user&action=edse') ?>" data-ajax="false">EDSE 4 x 0 Franchesco 26/12/2011 22:15</a></li>
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