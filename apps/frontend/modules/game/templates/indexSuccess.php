<div data-role="page" id="jqm-home">

  <?php //include_partial('global/header3', array('user' => $user)) ?>

  <div id="container" style="left: 50%; margin-left: -472px;">
    <div id="board">
      <form id="predictions" method="get" action="#">
        <!-- start .match -->
        <div class="match">
          <div class="timers">
            <div id="t1" style="padding: 3px;"></div>
            <div id="t2" style="padding: 3px;"></div>
            <div id="turn" style="padding: 3px;"></div>
          </div>
          <!-- <div class="vs" onclick="$('.info').toggle();"></div> -->
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
          <div class="badge leftSide"><img src="/uploads/assets/teams/sao_paulo_65x65.png" alt="bolton" style="height: 32px;" /></div>
          <div class="bar">
            <div class="left">
              <div id="home" class="text">Bolton</div>
              <div id="home_score" class="score">0</div>
            </div>            
            <div class="right">
              <div id="away_score" class="score">0</div>
              <div id="away" class="text">Newcastle</div>
            </div>            
          </div>
          <div class="badge rightSide"><img src="/uploads/assets/teams/sao_paulo_65x65.png" alt="newcastle" style="height: 32px;" /></div>
        </div>
        <!-- end .match -->
      </form>
      <!-- end #predictions -->
    </div>
    <!-- end #board -->
  </div>
  <!-- end #container -->


  <div data-role="content" style="padding-bottom: 5px; padding-top: 55px; text-align: center;">
  
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

  <!-- <canvas id="canvasOne" width="1050" height="600" style="background-color: black; position: absolute; top: 200px; left:110px; border: 1px solid black;"></canvas> -->
  <canvas id="canvasOne" width="300" height="300" style="background-color: black; border: 1px solid black;"></canvas>
  
  <script src="/res/js/Point2D.js"></script>
  <script src="/res/js/Intersections.js"></script>
  <script src="/res/js/Ball.js"></script>
  <script src="/res/js/Field.js"></script>
  <script src="/res/js/Game.js?<?php echo time() ?>"></script>
  <script src="/res/js/Keeper.js"></script>
  <script src="/res/js/Mouse.js?<?php echo time() ?>"></script>
  <script src="/res/js/Player.js"></script>
  <script src="/res/js/Team.js"></script>
  <script src="/res/js/Timer.js"></script>

  <script>
    var game;
    var socket=false;

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
    }

    // Utilities
    function log(msg) {
      var a = $("#log").html();
      $("#log").html(a + "<br>" + msg);
    }
  </script>

</div>
</div>

</body>
</html>

