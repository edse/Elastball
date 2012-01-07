  <div data-role="header" data-theme="b" data-position="inline">
    <a href="<?php echo url_for("@setup")?>" data-icon="gear" class="ui-btn-right" data-ajax="false" style="right: 85px;"><?php echo __('Setup')?></a>
    <a href="<?php echo url_for("@game_menu")?>" data-role="button" data-inline="true" data-rel="dialog" data-transition="slidedown" data-icon="star" class="ui-btn-right"><?php echo __('Play')?></a>    
    <a href="<?php echo url_for("@default?module=user&action=".$user->getNickname())?>" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home" data-ajax="false">Home</a>
    
  <div id="container">
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
          <div class="badge leftSide"><img src="/uploads/assets/teams/sao_paulo_65x65.png" alt="bolton"/></div>
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
          <div class="badge rightSide"><img src="/uploads/assets/teams/sao_paulo_65x65.png" alt="newcastle"/></div>
        </div>
        <!-- end .match -->
      </form>
      <!-- end #predictions -->
    </div>
    <!-- end #board -->
  </div>
  <!-- end #container -->

  </div><!-- /header -->
