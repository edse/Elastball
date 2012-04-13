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
  this.moving = false;
  this.interval = null;

  //this.element = window;
  this.element = document.getElementById('canvas');
    
  this.element.addEventListener('mousemove', function(e){ me.mousemove(e) }, false);
  this.element.addEventListener('mousedown', function(e){ me.mousedown(e) }, false);
  this.element.addEventListener('mouseup', function(e){ me.mouseup(e) }, false);
  this.element.addEventListener("keyup", function(e){ me.keyup(e) }, false);
  
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

      if(this.game.debug){
        console.log('over '+this.x+' '+this.y);
      }
    }
  }
  return r;
}

/*****
 *
 *   isOverPiece
 *    -
 *
 *****/
Mouse.prototype.isOverPiece = function(piece) {
  var poly = new Array();
  poly[0]= new Point2D(piece.x-piece.width/2, piece.y-piece.height/2);
  poly[1]= new Point2D(piece.x+piece.width/2, piece.y-piece.height/2);
  poly[2]= new Point2D(piece.x+piece.width/2, piece.y+piece.height/2);
  poly[3]= new Point2D(piece.x-piece.width/2, piece.y+piece.height/2);
  pt = new Point2D(this.x, this.y);
  for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
      && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
      && (c = !c);
  return c;
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
  this.moving = true;
  window.m.interv();
  
  body_scrollLeft = document.body.scrollLeft,
  element_scrollLeft = document.documentElement.scrollLeft,
  body_scrollTop = document.body.scrollTop,
  element_scrollTop = document.documentElement.scrollTop,
  offsetLeft = this.element.offsetLeft,
  offsetTop = this.element.offsetTop;
  
  var xx, yx;
  if (event.pageX || event.pageY) {
    xx = event.pageX;
    yx = event.pageY;
  } else {
    xx = event.clientX + body_scrollLeft + element_scrollLeft;
    yx = event.clientY + body_scrollTop + element_scrollTop;
  }
  
  xx -= offsetLeft;
  yx -= offsetTop;
  
  this.x = xx;
  this.y = yx;
  this.event = event;

  if(this.game.debug){
    console.log('move '+xx);
  }
}

/*****
 *
 *   mousedown
 *
 *****/
Mouse.prototype.mousedown = function(event) {
  var xx, yy;
  if (event.pageX || event.pageY) {
    xx = event.pageX;
    yy = event.pageY;
  } else {
    xx = event.clientX + body_scrollLeft + element_scrollLeft;
    yy = event.clientY + body_scrollTop + element_scrollTop;
  }
  this.down_x =  xx;
  this.down_y = yy;
  this.down = true;
  this.up = false;
  this.up_x = 0;
  this.up_y = 0;
  this.event = event;
  
  //select
  if(this.game.over){
    this.game.selected = this.game.over;
  }

  console.log('down');
}

/*****
 *
 *   mouseup
 *
 *****/
Mouse.prototype.mouseup = function(event) {
  var xx, yy;
  if (event.pageX || event.pageY) {
    xx = event.pageX;
    yy = event.pageY;
  } else {
    xx = event.clientX + body_scrollLeft + element_scrollLeft;
    yy = event.clientY + body_scrollTop + element_scrollTop;
  }
  this.up_x =  xx;
  this.up_y = yy;
  this.up = true;
  this.down = false;
  this.down_x = 0;
  this.down_y = 0;
 
  //place
  if((this.game.selected)&&(this.game.selected.near())){
    this.game.selected.x = this.game.selected.target.x;
    this.game.selected.y = this.game.selected.target.y;
    this.game.selected.placed = true;
    this.game.selected.moveble = false;
    this.game.placed_pieces.push(this.game.selected);
    
    if(this.game.drip.currentTime != 0)
      this.game.drip.currentTime = 0;
    this.game.drip.play();
  }else{
    if(this.game.twang.currentTime != 0)
      this.game.twang.currentTime = 0;
    this.game.twang.play();
  }

  //unselect
  if(this.game.selected){
    this.game.selected = null;
  }

  if(this.game.debug){
    console.log('up');
  }

}



/*****
 *
 *   keyup
 *
 *****/
Mouse.prototype.keyup = function(e) {
  console.log('Key '+e.keyCode+' pressed');
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
  
  var xx, yy;
  if (event.pageX || event.pageY) {
    xx = e.targetTouches[0].pageX;
    yy = e.targetTouches[0].pageY;
  }
  this.down_x =  xx;
  this.down_y = yy;
  this.down = true;
  this.up = false;
  this.up_x = 0;
  this.up_y = 0;
  this.event = event;
  
  //select
  if(this.game.over){
    this.game.selected = this.game.over;
  }

  //if(this.game.debug)
    console.log('touch start');
  
}

/*****
 *
 *   touchstop
 *
 *****/
Mouse.prototype.touchend = function(e) {
  e.preventDefault();
  //alert('touchend');
  
  //pageX = e.targetTouches[0].pageX;
  //pageY = e.targetTouches[0].pageY;
  //this.up_x =  (pageX) + Math.abs(this.game.get_x()) - this.game.canvas.offsetLeft;
  //this.up_y = (pageY) + Math.abs(this.game.get_y()) - this.game.canvas.offsetTop;;
  
  var xx, yy;
  xx = e.targetTouches[0].pageX;
  yy = e.targetTouches[0].pageY;
  this.up_x =  xx;
  this.up_y = yy;
  this.up = true;
  this.down = false;
  this.down_x = 0;
  this.down_y = 0;
 
  //place
  if((this.game.selected)&&(this.game.selected.near())){
    this.game.selected.x = this.game.selected.target.x;
    this.game.selected.y = this.game.selected.target.y;
    this.game.selected.placed = true;
    this.game.selected.moveble = false;
    this.game.placed_pieces.push(this.game.selected);
  }

  //unselect
  if(this.game.selected){
    this.game.selected = null;
  }

  //if(this.game.debug)
    console.log('touchend');
}

/*****
 *
 *   touchmove
 *
 *****/
Mouse.prototype.touchmove = function(e) {
  e.preventDefault();
  this.moving = true;  
  body_scrollLeft = document.body.scrollLeft,
  element_scrollLeft = document.documentElement.scrollLeft,
  body_scrollTop = document.body.scrollTop,
  element_scrollTop = document.documentElement.scrollTop,
  offsetLeft = this.element.offsetLeft,
  offsetTop = this.element.offsetTop;
  
  var xx, yx;
  xx = e.targetTouches[0].pageX;
  yx = e.targetTouches[0].pageY;
  
  xx -= offsetLeft;
  yx -= offsetTop;
  
  this.x = xx;
  this.y = yx;
  this.event = event;

  //if(this.game.debug)
    console.log('move '+xx);

}
