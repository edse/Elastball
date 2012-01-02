<link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
<link rel="stylesheet" href="/css/webapp.css" /> 
<script src="/js/webapp.js"></script> 
<script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>
<script src="/js/jquery-validation/jquery.validate.min.js"></script>

<div data-role="page">
  <div data-role="content" data-theme="a">
    <h3>Select you game mode</h3>
    <a href="<?php echo url_for("@chat")?>" data-role="button" data-rel="dialog" data-transition="slidedown" data-theme="b" data-ajax="false">Multiplayer</a>       
    <a href="<?php echo url_for("@game")?>" data-role="button" data-rel="dialog" data-transition="slidedown" data-theme="b" data-ajax="false">Single Player</a>     
    <a href="index.html" data-role="button" data-rel="back" data-theme="a">Cancel</a>    
  </div>
</div>

</body> 
</html>
