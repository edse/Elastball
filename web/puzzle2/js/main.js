/*****
 *
 *   Game.js
 *
 *****/

window.onload = function () {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  //context.scale(0.5, 0.5);
  var game = new Game(canvas);
  game.debug = false;
  var inteval = null;
  
  var maxElapsedTime = 0;
  var start_time = 0;
  var time = getTimer();

  function getTimer () {
    return (new Date().getTime() - start_time); //milliseconds
  }
    
  function drawFrame() {
    game.interval = window.requestAnimationFrame(drawFrame, canvas);
    //game.draw();
    if(game.img.width > 0)
      game.render();

    var elapsed = getTimer() - time;
    time = getTimer();
      
    //elapsed = Math.min(20, Math.max(-20, elapsed));
    if(elapsed > maxElapsedTime)
      maxElapsedTime = elapsed;
      
    context.fillText(">>> "+elapsed, 50, 50);
    context.fillText("maxElapsedTime>>> "+maxElapsedTime, 50, 60);
    context.fillText(game.remaining_time, 50, 80);
  }
  
  window.m = {game: game};
  window.m.interv = function () {
    interval = setTimeout("window.m.game.mouse.moving = false; document.getElementById('moving').value = false; window.m.intervClear();", 500);
  }
  window.m.intervClear = function () {
    clearInterval(interval)
  }
  window.m.stopGame = function () {
    window.cancelAnimationFrame(window.m.game.interval);
  }
  window.m.startGame = function () {
    drawFrame();
  }
  window.m.stopSFX = function () {
    window.m.game.drip.volume = 0.0;
    window.m.game.twang.volume = 0.0;
  }
  window.m.startSFX = function () {
    window.m.game.drip.volume = 1.0;
    window.m.game.twang.volume = 1.0;
  }
  window.m.stopBGM = function () {
    window.m.game.bgm.volume = 0.0;
  }
  window.m.startBGM = function () {
    window.m.game.bgm.volume = 1.0;
  }
  
  window.m.startGame();

  document.getElementById('scale').onchange = function() {
    game.num_lines = this.value;
    game.num_pieces = this.value*this.value;
    game.piece_width = game.img_width / game.num_lines;
    game.piece_height = game.img_height / game.num_lines;
    game.init();
  };

  document.getElementById('bgm_btn').onclick = function() {
    if(this.value == "BGM off"){
      window.m.stopBGM();
      this.value = "BGM on";
    }else if(this.value == "BGM on"){
      window.m.startBGM();
      this.value = "BGM off";
    }
  };
  document.getElementById('sfx_btn').onclick = function() {
    if(this.value == "SFX off"){
      window.m.stopSFX();
      this.value = "SFX on";
    }else if(this.value == "SFX on"){
      window.m.startSFX();
      this.value = "SFX off";
    }
  };
  
  //game.interval = window.setInterval(drawFrame, 150);
  
  //clock interval
  game.clock_interval = window.setInterval( function() {
    //alert(game.remaining_time);
    game.remaining_time--;
  }, 1000);

  /*
  document.getElementById('chimes').addEventListener('ended', function(){
    document.getElementById('bgm').play();
  }, false);
  */

}
