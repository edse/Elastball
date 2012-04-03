/*****
 *
 *   Game.js
 *
 *****/

window.onload = function () {

  var canvas = document.getElementById('canvas');
  //var mouse = utils.captureMouse(canvas);

  var socket = false;
  var context = canvas.getContext('2d');
  var scale = 1;
  var zoom = 0;
    
  var game = new Game(canvas);
  
  context.scale(this.zoom, this.zoom);
  
  var maxElapsedTime = 0;
  var start_time = 0;
  var time = getTimer();

  function getTimer () {
    return (new Date().getTime() - start_time); //milliseconds
  }
    
  function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    //game draw
    //if(game.running)
    game.update();
    game.draw();
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
}
