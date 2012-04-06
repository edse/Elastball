/*****
 *
 *   Piece.js
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
  this.moving = false;
}


Piece.prototype.draw = function() {
    this.game.context.fillStyle = "rgba(255, 255, 255, 0.5)";
    over = this.game.mouse.isOverPiece(this);
        
    if(!this.game.selected){
      if(over){
        this.game.over = piece;
        this.game.context.fillStyle = "rgba(255, 0, 0, 0.5)";
      }
    }else if(piece == this.game.selected){
      this.game.context.fillStyle = "rgba(0, 0, 255, 0.5)";
    }
    
    //target distance
    var dx = this.x - this.target.x;
    var dy = this.y - this.target.y;
    var distance = (dx * dx + dy * dy);
    if(distance <= 80){
      this.game.context.fillStyle = "rgba(0, 255, 0, 0.5)";
      this.placed = true;
    }else{
      this.placed = false;
    }

    //piece.draw();
    this.game.context.beginPath();
    
    this.game.context.drawImage(this.game.img, this.holder.column*this.game.piece_width, this.holder.line*this.game.piece_height, this.game.piece_width, this.game.piece_height, 
      this.x-this.game.piece_width/2, this.y-this.game.piece_height/2, this.game.piece_width, this.game.piece_height);
    
    //this.context.translate(this.x, this.y);
    this.game.context.strokeRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
    this.game.context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
    this.game.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.game.context.fillText(this.id, this.x-3, this.y+3);
    //this.context.fill();
    this.game.context.closePath();
}
