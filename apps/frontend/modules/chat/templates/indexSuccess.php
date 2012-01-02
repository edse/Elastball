<link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
<link rel="stylesheet" href="/css/webapp.css" /> 
<script src="/js/webapp.js"></script> 
<script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>
<style type="text/css">
  #log {
    width: 440px;
    height: 200px;
    border: 1px solid #7F9DB9;
    overflow: auto;
  }
  #players {
    width: 180px;
    height: 200px;
    border: 1px solid #7F9DB9;
    overflow: auto;
  }
  #msg {
    width: 330px;
  }
</style>
<script type="text/javascript">
  var socket;
  var engine;
  function init() {
    var host = "ws://<?php echo($socket->getHost()) ?>:<?php echo($socket->getPort()) ?>";
    try {
      // Firefox accept only MozWebSocket
      socket = ("MozWebSocket" in window ? new MozWebSocket (host) : new WebSocket(host));
      log('<?php echo __('Socket - status')?> ' + socket.readyState);          
      
      socket.onopen = function (msg) {
        log("<?php echo __('Welcome - status')?> " + this.readyState); 
        socket.send('✓hello➾<?php echo $user->getId() ?>');
      }
      
      socket.onmessage = function(msg) {
        var command = "";
        var parameter1 = "";
        var parameter2 = "";
        var parameter3 = "";
        var str = new String(msg.data);
        var parts = str.split('⟽');
        if(parts.length > 1){
          console.log(">>>"+parts[1]);
          
          var args = new String(parts[1]);
          var args_parts = args.split('⟻');
          if(args_parts.length > 1){
            command = args_parts[0];
            parameter1 = args_parts[1];
            parameter2 = args_parts[2];
            parameter3 = args_parts[3];
          }else{
            command = parts[1];
          }
          
          console.log("cmd>>>"+command);
          console.log("parm1>>>"+parameter1);
          console.log("parm2>>>"+parameter2);
          console.log("parm3>>>"+parameter3);

          if(command=="reload-users"){
            reloadUsers();
          }
          else if(command=="challenge-request"){
            if(confirm('<?php echo __('The user')?>: '+parameter2+'/'+parameter1+' <?php echo __('is challenging you. Do you want to play against him?')?>')){
              socket.send('✓create-game➾'+parameter1+'➾<?php echo $user->getId() ?>➾'+parameter3);
            }else{
              socket.send('✓challenge-rejected➾'+parameter1+'➾<?php echo $user->getName() ?>');
              alert('nao');
            }
          }
          else if(command=="challenge-rejected"){
            alert('<?php echo __('The user')?>: '+parameter1+' <?php echo __('rejected your challenge.')?>');
          }
          else if(command=="go-to-game"){
            goToGame(parameter1);
            //alert('starting game'+parameter1+'...');
          }
          else if(command=="startgame"){
            $('#game_id').val(parts[1]);
            engine = new Engine();
          }
          else if(command=="gamemove"){
            engine.playerMove(parts[2],parts[3],parts[4]);
          }
        }
        log("<?php echo __('Received')?>: " + msg.data);
      }

      socket.onclose = function (msg) {
        log("<?php echo __('Disconnected - status')?> " + this.readyState); 
      }
    }
    catch(ex) {
      log(ex);
    }
    //$("msg").focus ();
  }

  function goToGame(u){
    self.location.href='/game/'+u
  }
  
  function reloadUsers(){
    var request = $.ajax({
      dataType: 'html',
      success: function(data) {
        $('#players').html(data);
        $("#players li").click(function() {
          if(confirm('<?php echo __('Challenge this user?')?>')){
            socket.send('✓challenge➾'+$(this).attr('id')+'➾<?php echo $user->getName() ?>');
          }
        });
      },
      url: '/ajax/reloadUsers',
      data: 'socket_id=<?php echo($socket->getId()) ?>&user_id=<?php echo $user->getId() ?>'
    });
  }
  
  function send () {
    var txt, msg;
    msg = $("#msg").val();
    if(!msg) {
      alert("<?php echo __('Message can not be empty')?>");
      return;
    }
    $("#msg").val("");
    //$("#msg").focus();
    try {
      socket.send(msg);
      log('<?php echo __('Sent')?>: ' + msg);
    }
    catch(ex) {
      log(ex);
    }
  }
  
  function quit() {
    log("<?php echo __('Goodbye')?>!");
    socket.send('✓bye➾<?php echo $user->getId() ?>');
    socket.close();
    socket = null;
  }

  // Utilities
  function log(msg) {
    var a = $("#log").html();
    $("#log").html(a + "<br>" + msg);
  }

  function onkey(event) {
    if(event.keyCode == 13) {
      send();
    }
  }

  function whoisonline(){
    $('#msg').val("admin<->whoisonline");
    $('#msg').focus();
    //send();
  }

  function shutdown(){
    $('#msg').val("admin<->shutdown");
    $('#msg').focus();
    //send();
  }

  function kick(){
    $('#msg').val("admin<->kick");
    $('#msg').focus();
    //send();
  }

  $(document).ready(function() {
    init();
  });
</script>

<div data-role="page" id="jqm-home" class="type-home">

  <?php if($sf_user->isAuthenticated()): ?>
  <?php include_partial('global/header2', array('user' => $user)) ?>
  <?php else: ?>
  <?php include_partial('global/header', array('title' => $user_details->getNickname())) ?>
  <?php endif; ?>

  <div data-role="content">
      
    <div class="content-primary">
      <div>  
        <h3><?php echo __('Elastball: Online sectorball game - Chat room')?></h3>
        <div style="float: left;">
          <div id="log"></div>
          <input id="msg" type="textbox" onkeypress="onkey(event);" />
          <button onclick="send();"><?php echo __('Send')?></button>
          <button onclick="whoisonline();"><?php echo __('Who is online')?>?</button>
          <button onclick="kick();"><?php echo __('Kick user')?>!</button>
          <button onclick="shutdown();"><?php echo __('Shutdown')?>!</button>
          <button onclick="quit();"><?php echo __('Quit')?></button>
        </div>
        <div style="float: left; margin-left: 10px;">
          <ul id="players"style="margin-top: 0;"></ul>
        </div>
  
        <div style="margin-top: 15px;clear: both;padding-top: 15px;">
          <audio autoplay loop controls>
            <source src="/audios/waldir-calmon-na-cadencia-do-samba.mp3" />
            <source src="/audios/waldir-calmon-na-cadencia-do-samba.ogg" />
          </audio>
        </div>
  
      </div>
    </div><!--/content-primary--> 

    <div class="content-secondary">
      <?php if($sf_user->isAuthenticated()): ?>
      <?php include_partial('global/left2') ?>
      <?php else: ?>
      <?php include_partial('global/left') ?>
      <?php endif; ?>
    </div><!--/content-secondary--> 

  </div>

  <?php include_partial('global/footer') ?>

</div> 
</body> 
</html> 
</body> 
</html>