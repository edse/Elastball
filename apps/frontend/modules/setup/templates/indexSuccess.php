<link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
<link rel="stylesheet" href="/css/webapp.css" /> 
<script src="/js/webapp.js"></script> 
<script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>
<script src="/js/jquery-validation/jquery.validate.min.js"></script>

  <script type="text/javascript">
  $(document).ready(function(){
    // validate signup form on keyup and submit
    var validator = $("#signup").validate({
      rules:{
        nickname:{
          required: true,
          minlength: 2
        },
        firstname:{
          required: true,
          minlength: 2
        },
        lastname:{
          required: true,
          minlength: 2
        },
        email:{
          required: true,
          email: true,
        },
        team:{
          required: true
        }
      }
    });
  });
  </script>
  <style>
  .portrait label.error, .landscape label.error {
      color: red;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.4;
      margin-top: 0.5em;
      width: 100%;
      float: none;
  }
  
  .landscape label.error { 
      display: inline-block; 
      margin-left: 22%; 
  }
  
  .portrait label.error { 
      margin-left: 0; 
      display: block; 
  }
  
  em { 
      color: red; 
      font-weight: bold; 
      padding-right: .25em; 
  }
  </style>
  <div data-role="page" id="jqm-home" class="type-home">

  <?php if($sf_user->isAuthenticated()): ?>
  <?php include_partial('global/header2', array('user' => $user)) ?>
  <?php else: ?>
  <?php include_partial('global/header', array('title' => $user_details->getNickname())) ?>
  <?php endif; ?>

  <div data-role="content">
      
    <div class="content-primary">

      <form method="post" action="<?php echo url_for('@setup') ?>" name="setup" id="setup" data-ajax="false" style="margin-bottom: 25px;">
        <ul data-role="listview" data-inset="true">
          <li data-role="fieldcontain"> 
            <label for="nickname"><em>*</em> <?php echo __('Nickname')?>:</label>
            <input type="text" name="nickname" id="nickname" value="<?php echo $user->getNickname()?>" style="width: 25%;" />
          </li>
          <li data-role="fieldcontain"> 
            <label for="firstname"><em>*</em> <?php echo __('First Name')?>:</label>
            <input type="text" name="firstname" id="firstname" value="<?php echo $user->getFirstName()?>" />
          </li>
          <li data-role="fieldcontain"> 
            <label for="lastname"><em>*</em> <?php echo __('Last Name')?>:</label>
            <input type="text" name="lastname" id="lastname" value="<?php echo $user->getLastName()?>" />
          </li>
          <li data-role="fieldcontain"> 
            <label for="email"><em>*</em> <?php echo __('Email')?>:</label>
            <input type="text" name="email" id="email" value="<?php echo $user->getEmailAddress()?>" class="required email" />
          </li>
          <!--
          <li data-role="fieldcontain"> 
            <label for="phone"><em>*</em> Phone:</label>
            <input type="text" name="phone" id="phone" value="" />
          </li>
          -->
          <?php
          $teams = Doctrine_Query::create()
            ->select('t.*')
            ->from('Team t')
            ->where('t.is_active = ?', 1)
            ->orderBy('t.name') 
            ->execute(); 
          ?>
          <li data-role="fieldcontain">
            <label for="select-choice-a" class="select"><?php echo __('Your team')?>:</label>
            <select name="team_id" id="team_id" data-native-menu="false">
              <option><?php echo __('Choose other team')?></option>
              <?php foreach($teams as $t): ?>
              <option value="<?php echo $t->getId() ?>"<?php if($t->getId() == $user->Team->getId()) echo " selected=\"selected\"";?>><?php echo $t->getName() ?></option>
              <?php endforeach; ?>
            </select>
          </li>

          <li data-role="fieldcontain"> 
            <label for="slider2"><?php echo __('Notifications')?>:</label>
            <select name="slider2" id="slider2" data-role="slider">
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </li>
          <li class="ui-body ui-body-b"> 
            <fieldset class="ui-grid-a" style="padding: 15px;"> 
              <div class="ui-block-b"><button type="submit" data-theme="a"><?php echo __('Submit')?></button></div> 
            </fieldset> 
          </li> 
        </ul> 

      </form>
      
    </div>
    
    <div class="content-secondary">
      <?php include_partial('global/left2') ?>
    </div><!--/content-secondary--> 

  </div><!-- /ui-body wrapper -->
 
  <?php include_partial('global/footer') ?>

</div> 

</body> 
</html>