/*****
 *
 *   Mouse.js
 *
 *****/

/*****
 *
 *   constructor
 *
 *****/
function Mouse(game) {
  this.game = game;
  this.x = 0;
  this.y = 0;
  this.down_x = 0;
  this.down_y = 0;
  this.up_x = 0;
  this.up_y = 0;
  this.down = false;
  this.up = false;
  var me = this;
    
  window.addEventListener('mousemove', function(e){ me.mousemove(e) }, false);
  window.addEventListener('mousedown', function(e){ me.mousedown(e) }, false);
  window.addEventListener('mouseup', function(e){ me.mouseup(e) }, false);
  window.addEventListener("keyup", function(e){ me.keyup(e) }, false);
  
  /*
  var o = this.game.canvas;
  o.addEventListener('mousemove', function(e){ me.mousemove(e) }, false);
  o.addEventListener('mousedown', function(e){ me.mousedown(e) }, false);
  o.addEventListener('mouseup', function(e){ me.mouseup(e) }, false);
  o.addEventListener("keyup", function(e){ me.keyup(e) }, false);
  */

  //window.ontouchstart = function(e){ me.touchstart(e); }
  ////window.ontouchstop = function(e){ alert('asdf') }
  //window.ontouchend = function(e){ me.touchend(e); }
  //window.ontouchmove = function(e){ me.touchmove(e); }
  
  //window:addEventListener("touchmove", touchHandler);
  window.addEventListener("touchmove", function(e){ me.touchmove(e); }, false);
  window.addEventListener("touchstart", function(e){ me.touchstart(e); }, false);
  window.addEventListener("touchend", function(e){ me.touchend(e); }, false);

  alert('24');

  //window.addEventListener('ontouchstart', function(e){ me.touchstart(e) }, true);
  //window.addEventListener('ontouchstop', function(e){ me.touchstop(e) }, true);
  //window.addEventListener('ontouchmove', function(e){ me.touchmove(e) }, true);

  //this.game.canvas.addEventListener('ontouchstart', function(e){ me.touchstart(e) }, true);
  //this.game.canvas.addEventListener('ontouchstop', function(e){ me.touchstop(e) }, true);
  //this.game.canvas.addEventListener('ontouchmove', function(e){ me.touchmove(e) }, true);

  
}

/*****
 *
 *   isOverBall
 *    -
 *
 *****/
Mouse.prototype.isOverBall = function(ball) {
  var r = false;
  if((this.x > 0 && this.y > 0)&&(ball.x > 0 && ball.y > 0)){
    if(((this.x >= (ball.x - ball.radius)) && (this.x <= (ball.x + ball.radius)))&&
    ((this.y >= (ball.y - ball.radius)) && (this.y <= (ball.y + ball.radius)))){
      r = true;
    }
  }
  return r;
}

/*****
 *
 *   isOverRect
 *    -
 *
 *****/
Mouse.prototype.isOverRect = function(p1, p2, p3, p4) {
  var poly = new Array();
  poly[0]=p1;
  poly[1]=p2;
  poly[2]=p3;
  poly[3]=p4;
  pt = new Point2D(this.x, this.y);
  for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
      && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
      && (c = !c);
  return c;
}

/*****
 *
 *   getX
 *
 *****/
Mouse.prototype.getX = function() {
  return this.x;
}

/*****
 *
 *   getY
 *
 *****/
Mouse.prototype.getY = function() {
  return this.y;
}

/*****
 *
 *   getDownX
 *
 *****/
Mouse.prototype.getDownX = function() {
  return this.down_x;
}

/*****
 *
 *   getDownY
 *
 *****/
Mouse.prototype.getDownY = function() {
  return this.down_y;
}

/*****
 *
 *   getUpX
 *
 *****/
Mouse.prototype.getUpX = function() {
  return this.up_x;
}

/*****
 *
 *   getUpY
 *
 *****/
Mouse.prototype.getUpY = function() {
  return this.up_y;
}

/*****
 *
 *   getDown
 *
 *****/
Mouse.prototype.getDown = function() {
  return this.down;
}

/*****
 *
 *   getUp
 *
 *****/
Mouse.prototype.getUp = function() {
  return this.up;
}


/*****
 *
 *   mousemove
 *
 *****/
Mouse.prototype.mousemove = function(event) {
  mx = (event.pageX)/this.game.scale;
  my = (event.pageY)/this.game.scale;
  xx = this.game.get_x()*this.game.scale;
  yy = this.game.get_y()*this.game.scale;
  this.x = (mx) + Math.abs(xx);
  this.y = (my) + Math.abs(yy);

  //test
  this.x = Math.abs(event.pageX) + this.game.get_x();
  this.y = Math.abs(event.pageY) + this.game.get_y();

  document.getElementById('scale').value = this.game.scale;
  
  document.getElementById('mvx').value = this.x;
  document.getElementById('mvy').value = this.y;

  document.getElementById('mx').value = event.pageX;
  document.getElementById('my').value = event.pageY;

  document.getElementById('bx').value = this.game.balls[0].x;
  document.getElementById('by').value = this.game.balls[0].y;

  //this.x /= this.game.scale;
  //this.y /= this.game.scale;
  //console.log('> '+this.game.canvas.offsetTop+' : '+this.x+', '+this.y);
}

/*****
 *
 *   mousedown
 *
 *****/
Mouse.prototype.mousedown = function(event) {
  if(!this.game.is_moving)
    document.body.style.cursor = 'auto';
  this.down_x =  (event.pageX) + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  this.down_y = (event.pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;;
  this.down = true;
  this.up = false;
  this.up_x = 0;
  this.up_y = 0;
}

/*****
 *
 *   mouseup
 *
 *****/
Mouse.prototype.mouseup = function(event) {
  document.body.style.cursor = 'auto';
  this.up_x =  (event.pageX) + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  this.up_y = (event.pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;
  this.up = true;
  this.down = false;
  this.down_x = 0;
  this.down_y = 0;
  if(this.game.selected_ball != null){
    //new move
    this.game.currentPlayerFirstHit = false;
    this.game.currentPlayerLastHit = false;
    if(this.game.selected_ball.id != "move" && this.game.selected_ball.id != "rotate"){
      var vx = (this.game.selected_ball.x - this.up_x) * 0.1;
      var vy = (this.game.selected_ball.y - this.up_y) * 0.1;
      
      this.game.selected_ball.startPoint = new Point2D(this.game.selected_ball.x, this.game.selected_ball.y);
      this.game.selected_ball.velocityx = vx;
      this.game.selected_ball.velocityy = vy;
      this.game.storeMove(this.game.selected_ball.id,vx,vy); 
      if(this.game.selected_ball.velocityx > this.game.maxSpeed)
        this.game.selected_ball.velocityx = this.game.maxSpeed;
      if(this.game.selected_ball.velocityy > this.game.maxSpeed)
        this.game.selected_ball.velocityy = this.game.maxSpeed;

      this.game.running = true;
      this.game.currentPlayer = this.game.selected_ball.id;

      //this.game.runningBalls.push(this.game.selected_ball);

    }
    else if(this.game.selected_ball.id == "rotate"){
      //alert(keepers[0].angle)
      //$('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+"k"+selected_ball.k+"<->"+keepers[selected_ball.k].angle);
      //send();
    }
    else if(this.game.selected_ball.id == "move"){
      //alert(keepers[0].angle)
      //$('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+"k"+selected_ball.k+"<->"+keepers[selected_ball.k].x+"<->"+keepers[selected_ball.k].y);
      //send();
    }
  }
  else if(this.game.is_moving)
    this.game.is_moving = false;
  this.game.selected_ball = null;
}



/*****
 *
 *   keyup
 *
 *****/
Mouse.prototype.keyup = function(e) {
  if(e.keyCode == 27){
    document.body.style.cursor = 'auto';
    this.up_x =  (event.pageX) + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
    this.up_y = (event.pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;;
    this.up = true;
    this.down = false;
    this.down_x = 0;
    this.down_y = 0;
    this.game.selected_ball = null;
  }
}

/*****
 *
 *   touchstart
 *
 *****/
Mouse.prototype.touchstart = function(e) {
  e.preventDefault();
  pageX = e.targetTouches[0].pageX;
  pageY = e.targetTouches[0].pageY;
  
  this.down_x =  (pageX) + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  this.down_y = (pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;;
  this.down = true;
  this.up = false;
  this.up_x = 0;
  this.up_y = 0;
}

/*****
 *
 *   touchstop
 *
 *****/
Mouse.prototype.touchend = function(e) {
  //e.preventDefault();
  //alert('touchend');
  //console.log('touchend: '+e.targetTouches[0].pageX);
  //pageX = e.targetTouches[0].pageX;
  //pageY = e.targetTouches[0].pageY;
  //this.up_x =  (pageX) + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  //this.up_y = (pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;;
  this.up_x =  this.x;
  this.up_y = this.y;
  this.up = true;
  this.down = false;
  this.down_x = 0;
  this.down_y = 0;
  if(this.game.selected_ball != null){
    //new move
    this.game.currentPlayerFirstHit = false;
    this.game.currentPlayerLastHit = false;
    if(this.game.selected_ball.id != "move" && this.game.selected_ball.id != "rotate"){
      var vx = (this.game.selected_ball.x - this.up_x) * 0.1;
      var vy = (this.game.selected_ball.y - this.up_y) * 0.1;
      
      this.game.selected_ball.startPoint = new Point2D(this.game.selected_ball.x, this.game.selected_ball.y);
      this.game.selected_ball.velocityx = vx;
      this.game.selected_ball.velocityy = vy;
      this.game.storeMove(this.game.selected_ball.id,vx,vy); 
      if(this.game.selected_ball.velocityx > this.game.maxSpeed)
        this.game.selected_ball.velocityx = this.game.maxSpeed;
      if(this.game.selected_ball.velocityy > this.game.maxSpeed)
        this.game.selected_ball.velocityy = this.game.maxSpeed;

      this.game.running = true;
      this.game.currentPlayer = this.game.selected_ball.id;
      
      //this.game.runningBalls.push(this.game.selected_ball);

    }
    else if(this.game.selected_ball.id == "rotate"){
      //alert(keepers[0].angle)
      //$('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+"k"+selected_ball.k+"<->"+keepers[selected_ball.k].angle);
      //send();
    }
    else if(this.game.selected_ball.id == "move"){
      //alert(keepers[0].angle)
      //$('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+"k"+selected_ball.k+"<->"+keepers[selected_ball.k].x+"<->"+keepers[selected_ball.k].y);
      //send();
    }
  }
  else if(this.game.is_moving)
    this.game.is_moving = false;
  this.game.selected_ball = null;
}

/*****
 *
 *   touchmove
 *
 *****/
Mouse.prototype.touchmove = function(e) {
  //e.preventDefault();
  //console.log(e.targetTouches[0].pageX);
  pageX = e.targetTouches[0].pageX;
  pageY = e.targetTouches[0].pageY;
  this.x = pageX + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  this.y = pageY + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;
  
  this.x = pageX + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  this.y = pageY + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;

}
