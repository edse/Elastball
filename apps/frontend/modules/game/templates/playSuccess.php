<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://gmpg.org/xfn/11">
  <title>The Scoreboard</title>
  <link rel="stylesheet" href="/css/structure.css" type="text/css" media="screen" />
  <link rel="stylesheet" href="/css/style.css" type="text/css" media="screen" id="stylesheet" />
  <link href="/images/favicon.ico" rel="shortcut icon" /> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="author" content="Emerson Estrella" />
  <meta name="description" content="the scoreboard" />
  <meta name="keywords" content="" />
</head>
<body>
  <div id="container">
    <div id="board">
      <form id="predictions" method="get" action="#">
        <!-- start .match -->
        <div class="match">
          <div class="vs">Vs</div>
          <div class="info" style="display: none">
            <div class="tip"></div>
            <table id="stats">
              <tbody>
                <tr id="poss">
                  <td style="width:33%"><p>7</p></td>
                  <td style="width:34%"><p>Possession</p></td>
                  <td style="width:33%"><p>2</p></td>
                </tr>
                <tr id="shot">
                  <td style="width:33%"><p>2</p></td>
                  <td style="width:34%"><p>Shots</p></td>
                  <td style="width:33%"><p>0</p></td>
                </tr>
                <tr id="fault">
                  <td style="width:33%"><p>5</p></td>
                  <td style="width:34%"><p>Faults</p></td>
                  <td style="width:33%"><p>2</p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end .info -->
          <div class="badge leftSide"><img src="resources/images/teams/bolton.png" alt="bolton"/></div>
          <div class="bar">
            <p class="left"><label for="bolton">Bolton</label><input type="text" value="" id="bolton" name="bolton" class="score" /></p>            
            <p class="right"><input type="text" value="" id="newcastle" name="newcastle" class="score" /><label for="newcastle">Newcastle</label></p>           
          </div>
          <div class="badge rightSide"><img src="resources/images/teams/newcastle.png" alt="newcastle"/></div>
        </div>
        <!-- end .match -->
      </form>
      <!-- end #predictions -->
    </div>
    <!-- end #board -->
  </div>
  <!-- end #container -->
  
  <!-- start #resources -->
  <div id="resources" style="display: none">
    <!-- <audio autoplay loop controls> -->
    <audio id="bg">
      <source src="/res/audio/bg.mp3" />
      <source src="/res/audio/bg.ogg" />
    </audio>
    <audio id="crowd">
      <source src="/res/audio/crowd.mp3" />
      <source src="/res/audio/crowd.ogg" />
    </audio>
    <audio id="whistle1">
      <source src="/res/audio/whistle1.mp3" />
      <source src="/res/audio/whistle1.ogg" />
    </audio>
    <audio id="whistle2">
      <source src="/res/audio/whistle2.mp3" />
      <source src="/res/audio/whistle2.ogg" />
    </audio>
    <audio id="whistle3">
      <source src="/res/audio/whistle3.mp3" />
      <source src="/res/audio/whistle3.ogg" />
    </audio>
    <audio id="whistle4">
      <source src="/res/audio/whistle4.mp3" />
      <source src="/res/audio/whistle4.ogg" />
    </audio>
    <audio id="whistle5">
      <source src="/res/audio/whistle5.ogg" />
      <source src="/res/audio/whistle5.mp3" />
    </audio>
    <audio id="whistle6">
      <source src="/res/audio/whistle6.mp3" />
      <source src="/res/audio/whistle6.ogg" />
    </audio>
    <audio id="hit1">
      <source src="/res/audio/hit1.mp3" />
      <source src="/res/audio/hit1.ogg" />
    </audio>
    <audio id="hit2">
      <source src="/res/audio/hit2.mp3" />
      <source src="/res/audio/hit2.ogg" />
    </audio>
    <audio id="hit3">
      <source src="/res/audio/hit3.mp3" />
      <source src="/res/audio/hit3.ogg" />
    </audio>
    <audio id="hit5">
      <source src="/res/audio/hit5.mp3" />
      <source src="/res/audio/hit5.ogg" />
    </audio>
    <audio id="hit6">
      <source src="/res/audio/hit6.mp3" />
      <source src="/res/audio/hit6.ogg" />
    </audio>
    <audio id="hit7">
      <source src="/res/audio/hit7.mp3" />
      <source src="/res/audio/hit7.ogg" />
    </audio>
    <audio id="bar">
      <source src="/res/audio/hitbar.mp3" />
      <source src="/res/audio/hitbar.ogg" />
    </audio>
  </div>
  <!-- end #resources -->
  <div id="referee" class="fadein" style="display:none;">
    <img src="/res/img/referee/amarelo.jpg" id="ref_yellow" style="display:none;" />
    <img src="/res/img/referee/vermelho.jpg" id="ref_red" style="display:none;" />
    <img src="/res/img/referee/falta1.jpg" id="ref_fault1" style="display:none;" />
    <img src="/res/img/referee/falta2.jpg" id="ref_fault2" style="display:none;" />
    <img src="/res/img/referee/lateral1.jpg" id="ref_trowin1" style="display:none;" />
    <img src="/res/img/referee/lateral2.jpg" id="ref_trowin2" style="display:none;" />
    <img src="/res/img/referee/escanteio.jpg" id="ref_corner" style="display:none;" />
    <img src="/res/img/referee/falta2.jpg" id="refimg" />
  </div>
  <div id="t1" style="display: block; position: absolute; left: 500px;"></div>
  <div id="t2" style="display: block; position: absolute;"></div>
  <div id="turn" style="display: block; position: absolute; left: 800px;"></div>
  <canvas id="canvasOne" width="1050" height="600" style="background-color: black; position: absolute; top: 200px; left:110px; border: 1px solid black;"></canvas>
  
  <script src="/res/js/Point2D.js"></script>
  <script src="/res/js/Intersections.js"></script>
  <script src="/res/js/Ball.js"></script>
  <script src="/res/js/Field.js"></script>
  <script src="/res/js/Game.js?<?php echo time() ?>"></script>
  <script src="/res/js/Keeper.js"></script>
  <script src="/res/js/Mouse.js"></script>
  <script src="/res/js/Player.js"></script>
  <script src="/res/js/Team.js"></script>
  <script src="/res/js/Timer.js"></script>

  <script>
    var game;
    var socket;

    window.addEventListener('load', startGame, true);
    function startGame(){
      game = new Game(document.getElementById('canvasOne'));
      bg = document.getElementById('crowd');
      bg.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      bg.volume = 0.4;
      bg.play();

      var host = "ws://<?php echo($socket->getHost()) ?>:<?php echo($socket->getPort()) ?>/<?php echo($uid) ?>";
      try {
        // Firefox accept only MozWebSocket
        socket = ("MozWebSocket" in window ? new MozWebSocket (host, "<?php echo($uid) ?>") : new WebSocket(host, "<?php echo($uid) ?>"));
        log('<?php echo __('Socket - status')?> ' + socket.readyState);
        socket.onopen = function (msg) {
          log("<?php echo __('Welcome - status')?> " + this.readyState); 
          socket.send('✓hello➾<?php echo $user->getId() ?>➾playing');
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
            if(command=="gamemove"){
              game.makeMove(parameter1,parameter2,parameter3);
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

    /*
    $(document).ready(function() {
      startGame()
    });
    */
  </script>
    
    <div style="position: absolute; top: 0; left:0; z-index: 2;">  
      <div style="float: left;">
        <div id="log"></div>
        <input id="msg" type="textbox" onkeypress="onkey(event);" />
        <button onclick="send();"><?php echo __('Send')?></button>
      </div>

    </div>

</body>
</html>

