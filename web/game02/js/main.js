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
    if(game.running)
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
  
  //////////////////

  var z1 = document.getElementById('z1');
  z1.addEventListener('click', function(e){
    zoom = 0.5;
    x = game.balls[0].x;
    y = game.balls[0].y;
    ox = game._x;
    oy = game._y;
    cx = (x+ox-(canvas.width/2))*zoom;
    cy = (y+oy-(canvas.height/2))*zoom;
    fx = cx+(canvas.width/2*zoom);
    fy = cy+(canvas.height/2*zoom);
    
    //context.translate(fx,fy);
    context.scale(zoom, zoom);
    
    game.scale *= zoom;
    //document.getElementById('scale').value = game.scale;
  }, false);


  var z2 = document.getElementById('z2');
  z2.addEventListener('click', function(e){
    zoom = 2;
    x = game.balls[0].x;
    y = game.balls[0].y;
    ox = game._x;
    oy = game._y;
    cx = (x+ox-(canvas.width/zoom))*zoom;
    cy = (y+oy-(canvas.height/zoom))*zoom;
    fx = cx-(canvas.width/zoom);
    fy = cy-(canvas.height/zoom);
    
    //context.translate(fx,fy);
    context.scale(zoom, zoom);
    
    game.scale *= zoom;
    //document.getElementById('scale').value = game.scale;
  }, false);

}
