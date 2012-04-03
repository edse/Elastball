/*****
 *
 *   Game.js
 *
 *****/

window.onload = function () {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var game = new Game(canvas);
  var inteval = null;
  
  var maxElapsedTime = 0;
  var start_time = 0;
  var time = getTimer();

  function getTimer () {
    return (new Date().getTime() - start_time); //milliseconds
  }
    
  function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    //game.draw();
    game.render();

    var elapsed = getTimer() - time;
    time = getTimer();
      
    //elapsed = Math.min(20, Math.max(-20, elapsed));
    if(elapsed > maxElapsedTime)
      maxElapsedTime = elapsed;
      
    context.fillText(">>> "+elapsed, 50, 50);
    context.fillText("maxElapsedTime>>> "+maxElapsedTime, 50, 60);
  }
  drawFrame();

  window.m = {game: game};
  window.m.interv = function () {
    interval = setTimeout("window.m.game.mouse.moving = false; document.getElementById('moving').value = false; window.m.intervClear();", 500);
  }
  window.m.intervClear = function () {
    clearInterval(interval)
  }

}
