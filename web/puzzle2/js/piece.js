/*****
 *
 *   holder.js
 *
 *****/

/*****
 *
 *   constructor
 *
 *****/
function Piece(id, game, width, height, x, y, startPoint, target, holder, moveble, placed) {
  if(arguments.length > 0) {
    this.id = id;
    this.game = game;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.target = target;
    this.startPoint = startPoint;
    this.holder = holder;
    this.moveble = moveble;
    this.placed = placed;
  }
  else{
    this.id = 0;
    this.game = null;
    this.width = 10;
    this.height = 10;
    this.x = 0;
    this.y = 0;
    this.target = null;
    this.startPoint = null;
    this.holder = null;
    this.moveble = null;
    this.placed = null;
  }
  this.tolerance = 80;
  this.moving = false;
  this.placed = false;
}


Piece.prototype.draw = function() {
  this.game.context.save();
  
  if(!this.game.is_over)
    this.game.context.globalAlpha = 0.25
  else
    this.game.context.globalAlpha = 1

  this.game.context.fillStyle = "rgba(255, 255, 255, 0.5)";
  //over = this.game.mouse.isOverPiece(this);

  /*  
  if(!this.game.selected){
    if((!this.game.over)||(this.game.over.id < this.id)||(this.mouse_is_over())){
      if(this.mouse_is_over()){
        this.game.over = this;
      }
    }
  }
  */

  if(this == this.game.selected){
    this.game.context.fillStyle = "rgba(0, 0, 255, 0.1)";
  }
  else if(this.game.over == this)
    this.game.context.fillStyle = "rgba(255, 0, 0, 0.1)";

  //target distance
  if(this.near())
    this.game.context.fillStyle = "rgba(0, 255, 0, 0.1)";

  //piece.draw();
  this.game.context.beginPath();
  
  this.game.context.drawImage(this.game.img, this.holder.column*this.game.piece_width, this.holder.line*this.game.piece_height, this.game.piece_width, this.game.piece_height, 
    this.x-this.game.piece_width/2, this.y-this.game.piece_height/2, this.game.piece_width, this.game.piece_height);

  if(!this.game.is_over){
    this.game.context.strokeRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
    this.game.context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
    this.game.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.game.context.fillText(this.id, this.x-3, this.y+3);
  }
  
  this.game.context.closePath();
  this.game.context.restore();
  
  if(this.game.debug)
    console.log('pieace: '+this.id+' drew');
}

Piece.prototype.near = function() {
  //target distance
  var r = false
  var dx = this.x - this.target.x;
  var dy = this.y - this.target.y;
  var distance = (dx * dx + dy * dy);
  if(distance <= this.tolerance){
    r = true;
  }
  if(this.game.debug){
    console.log(this.id+': '+distance)
  }
  return r;
}

Piece.prototype.mouse_is_over = function() {
  return this.game.mouse.isOverPiece(this);
}