/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */

// A robust polyfill for animation frame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

////////////////////////////////////

window.onload = function () {
  window.onload2();
}
  
window.onload2 = function () {

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
    context.fillText(game.auto_snap, 50, 100);
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
  document.getElementById('snap_btn').onclick = function() {
    if(this.value == "AUTO-SNAP off"){
      window.m.game.auto_snap = false;
      this.value = "AUTO-SNAP on";
    }else if(this.value == "AUTO-SNAP on"){
      window.m.game.auto_snap = true;
      this.value = "AUTO-SNAP off";
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
