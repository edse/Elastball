    <style type="text/css">
      html , body {
        font: normal 0.9em arial , helvetica;
      }
      
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

    <div style="position: absolute; top: 0; left:0; z-index: 2;">  
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


    <div style="position: absolute; top: 0; left:0; z-index: 1;">
  
      <script src="/res/js/jquery.min.js"></script>
      <script src="/res/js/Point2D.js"></script>
      <script src="/res/js/Engine.js"></script>
      <script src="/res/js/Intersections.js"></script>
      <canvas id="canvasOne" width="1050" height="1300" style="background-color: white;"></canvas>
      <div style="width: 210px; position: fixed; left: 1060px; top:8px; height: 450px; overflow-x: hidden; overflow-y: auto;">
        <fieldset>
          <label>p1.x: <input type="text" id="p1x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>p1.y: <input type="text" id="p1y" value="" /></label>
        </fieldset>
        <fieldset>
          <label>b1.x: <input type="text" id="b1x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>b1.y: <input type="text" id="b1y" value="" /></label>
        </fieldset>
        <fieldset>
          <label>b2.x: <input type="text" id="b2x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>b2.y: <input type="text" id="b2y" value="" /></label>
        </fieldset>
        
        <fieldset>
          <label>c1.x: <input type="text" id="c1x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>c1.y: <input type="text" id="c1y" value="" /></label>
        </fieldset>
        <fieldset>
          <label>c2.x: <input type="text" id="c2x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>c2.y: <input type="text" id="c2y" value="" /></label>
        </fieldset>
        <fieldset>
          <label>d1.x: <input type="text" id="d1x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>d1.y: <input type="text" id="d1y" value="" /></label>
        </fieldset>
        <fieldset>
          <label>d2.x: <input type="text" id="d2x" value="" /></label>
        </fieldset>
        <fieldset>
          <label>d2.y: <input type="text" id="d2y" value="" /></label>
        </fieldset>
        <fieldset>
          <label>ball mass: <input type="text" id="mass" value="" /></label>
        </fieldset>
        <fieldset>
          <label>test: <input type="text" id="test" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Cursor: <input type="text" id="mouse" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Running? <input type="text" id="running" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Turn: <input type="text" id="turn" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Current player: <input type="text" id="current_player" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Current player first collision: <input type="text" id="first_collision" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Ball last collision: <input type="text" id="last_collision" value="" /></label>
        </fieldset>
        <fieldset>
          <label>Game ID: <input type="text" id="game_id" value="" /></label>
        </fieldset>
  
      </div>
      
      <?php /*
      <div style="display: none" />
      <img src="/res/img/model.png" id="model" alt="test" />
      <img src="/res/img/SPO/1/02.png" id="a1" alt="test" />
      <img src="/res/img/SPO/1/03.png" id="a2" alt="test" />
      <img src="/res/img/SPO/1/04.png" id="a3" alt="test" />
      <img src="/res/img/SPO/1/05.png" id="a4" alt="test" />
      <img src="/res/img/SPO/1/06.png" id="a5" alt="test" />
      <img src="/res/img/SPO/1/07.png" id="a6" alt="test" />
      <img src="/res/img/SPO/1/08.png" id="a7" alt="test" />
      <img src="/res/img/SPO/1/09.png" id="a8" alt="test" />
      <img src="/res/img/SPO/1/10.png" id="a9" alt="test" />
      <img src="/res/img/SPO/1/11.png" id="a10" alt="test" />
      <img src="/res/img/SPO/2/02.png" id="b1" alt="test" />
      <img src="/res/img/SPO/2/03.png" id="b2" alt="test" />
      <img src="/res/img/SPO/2/04.png" id="b3" alt="test" />
      <img src="/res/img/SPO/2/05.png" id="b4" alt="test" />
      <img src="/res/img/SPO/2/06.png" id="b5" alt="test" />
      <img src="/res/img/SPO/2/07.png" id="b6" alt="test" />
      <img src="/res/img/SPO/2/08.png" id="b7" alt="test" />
      <img src="/res/img/SPO/2/09.png" id="b8" alt="test" />
      <img src="/res/img/SPO/2/10.png" id="b9" alt="test" />
      <img src="/res/img/SPO/2/11.png" id="b10" alt="test" />
      </div>
      */ ?>

    </div>
