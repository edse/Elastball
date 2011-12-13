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
  <div data-role="page" class="type-index">

    <div data-role="header" data-theme="b">
      <h1>Futebol Clube - <?php echo __('Sign up')?></h1>
      <?php /* <a href="<?php echo url_for("/webapp/index")?>" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a> */ ?>
    </div>

    <div data-role="content">
    
      <p><?php echo __("We are all most there... Fill up the information bellow and get ready to play")?>.</p>
      
      <form method="post" action="<?php echo url_for('@default?module=login&action=register&code=verify') ?>" name="signup" id="signup" data-ajax="false" />
        <ul data-role="listview" data-inset="true">
          <li data-role="fieldcontain"> 
            <label for="nickname"><em>*</em> <?php echo __('Nickname')?>:</label>
            <input type="text" name="nickname" id="nickname" value="" style="width: 25%;" />
          </li>
          <li data-role="fieldcontain"> 
            <label for="firstname"><em>*</em> <?php echo __('First Name')?>:</label>
            <input type="text" name="firstname" id="firstname" value="" />
          </li>
          <li data-role="fieldcontain"> 
            <label for="lastname"><em>*</em> <?php echo __('Last Name')?>:</label>
            <input type="text" name="lastname" id="lastname" value="" />
          </li>
          <li data-role="fieldcontain"> 
            <label for="email"><em>*</em> <?php echo __('Email')?>:</label>
            <input type="text" name="email" id="email" value="" class="required email" />
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
            <label for="select-choice-a" class="select"><?php echo __('Select your team')?>:</label>
            <select name="select-choice-a" id="select-choice-a" data-native-menu="false">
              <option><?php echo __('Select your team')?></option>
              <?php foreach($teams as $t): ?>
              <option value="<?php echo $t->getId() ?>"><?php echo $t->getName() ?></option>
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

  </div><!-- /ui-body wrapper -->
 
  <?php include_partial('global/footer') ?>

</div> 
</body> 
</html>