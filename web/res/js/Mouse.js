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
  window.addEventListener('mousemove', function(e){ me.mousemove(e) }, true);
  window.addEventListener('mousedown', function(e){ me.mousedown(e) }, true);
  window.addEventListener('mouseup', function(e){ me.mouseup(e) }, true);
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
  this.x = event.pageX + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  this.y = event.pageY + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;
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
  this.up_y = (event.pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;;
  this.up = true;
  this.down = false;
  this.down_x = 0;
  this.down_y = 0;
  if(this.game.selected_ball != null){
    this.game.currentPlayerFirstHit = null;
    this.game.currentPlayerLastHit = null;
    if(this.game.selected_ball.id != "move" && this.game.selected_ball.id != "rotate"){
      var vx = (this.game.selected_ball.x - this.up_x) * 0.1;
      var vy = (this.game.selected_ball.y - this.up_y) * 0.1;
      this.game.selected_ball.startPoint = new Point2D(this.game.selected_ball.x, this.game.selected_ball.y);
      this.game.selected_ball.velocityx = (this.game.selected_ball.x - this.up_x) * 0.1;
      this.game.selected_ball.velocityy = (this.game.selected_ball.y - this.up_y) * 0.1;
      if(this.game.selected_ball.velocityx > this.game.maxSpeed)
        this.game.selected_ball.velocityx = this.game.maxSpeed;
      if(this.game.selected_ball.velocityy > this.game.maxSpeed)
        this.game.selected_ball.velocityy = this.game.maxSpeed;
      //$('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+selected_ball.id+"<->"+selected_ball.velocityx+"<->"+selected_ball.velocityy);
      //send();
      this.game.running = true;
      //$('#running').val("true");
      this.game.currentPlayer = this.game.selected_ball.id;
      //$('#current_player').val(currentPlayer);
      //$('#last_collision').val('');
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
