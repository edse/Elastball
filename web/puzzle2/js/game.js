function Game(canvas) {

  this.canvas = canvas;
  this.num_pieces = 4;
  this.pieces = new Array();
  this.holders = new Array();
  this.piece_width = 40;
  this.piece_height = 40;
  this.moving = true;
  this.selected = null;
  this.over = null;
  this.context = this.canvas.getContext("2d");
  this.mouse = new Mouse(this);
  this.placeHolders();
  this.placePieces();
}

Game.prototype.placePieces = function(){
  for(i=1; i<=this.num_pieces; i++){
    x = Math.floor(Math.random()*canvas.width-this.piece_width)+this.piece_width;
    y = Math.floor(Math.random()*canvas.height-this.piece_height)+this.piece_height;
    temp = {
      id:i,
      x:x,
      y:y,
      width:40,
      height:40,
      startPoint: new Point2D(this.x,this.y),
      target: new Point2D(this.holders[i-1].x,this.holders[i-1].y),
      moveble:true,
      placed:false
    }
    this.pieces.push(temp);
    console.log('pieces array length>>'+this.pieces.length);
  }
}

Game.prototype.placeHolders = function(){
  hw = canvas.width/2;
  hh = canvas.height/2;
  p1 = new Point2D(hw-this.piece_width,hh-this.piece_height);
  p2 = new Point2D(hw,hh-this.piece_height);
  p3 = new Point2D(hw,hh);
  p4 = new Point2D(hw-this.piece_width,hh);

  temp = {
    id:101,
    x:p1.x,
    y:p1.y,
    width:40,
    height:40,
    startPoint: new Point2D(this.x,this.y),
    moveble:false
  }
  this.holders.push(temp);
  console.log('holders array length>>'+this.holders.length);

  temp = {
    id:102,
    x:p2.x,
    y:p2.y,
    width:40,
    height:40,
    startPoint: new Point2D(this.x,this.y),
    moveble:false
  }
  this.holders.push(temp);
  console.log('holders array length>>'+this.holders.length);

  temp = {
    id:103,
    x:p3.x,
    y:p3.y,
    width:40,
    height:40,
    startPoint: new Point2D(this.x,this.y),
    moveble:false
  }
  this.holders.push(temp);
  console.log('holders array length>>'+this.holders.length);

  temp = {
    id:104,
    x:p4.x,
    y:p4.y,
    width:40,
    height:40,
    startPoint: new Point2D(this.x,this.y),
    moveble:false
  }
  this.holders.push(temp);
  console.log('holders array length>>'+this.holders.length);
}

////////////////////////////////////////

Game.prototype.draw = function() {
}

Game.prototype.render = function() {
  
  //bg
  this.context.fillStyle = '#FEFEFE';
  this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
  //box
  this.context.strokeStyle = '#000000';
  this.context.lineWidth = 1;
  this.context.strokeRect(1,1,this.canvas.width-2,this.canvas.height-2);

  this.context.save();

  for(var i = 0; i < this.holders.length; i++){
    holder = this.holders[i];
    this.context.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.context.beginPath();
    this.context.strokeRect(holder.x-holder.width/2,holder.y-holder.height/2,holder.width,holder.height);
    this.context.fillRect(holder.x-holder.width/2,holder.y-holder.height/2,holder.width,holder.height);
    this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.context.fillText(holder.id, holder.x-3, holder.y+3);
    this.context.closePath();
  }

  var overNone = true;
  for(var i = 0; i < this.pieces.length; i++){
    piece = this.pieces[i];
    this.context.fillStyle = "rgba(255, 255, 255, 0.5)";
    over = this.mouse.isOverPiece(piece);
    if(!this.selected){
      if(over){
        this.over = piece;
        overNone = false;
        this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
      }
    }else if(piece == this.selected){
      this.context.fillStyle = "rgba(0, 0, 255, 0.5)";
    }
    
    //target distance
    var dx = piece.x - piece.target.x;
    var dy = piece.y - piece.target.y;
    var distance = (dx * dx + dy * dy);
    if(distance <= 80){
      this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
      piece.placed = true;
    }else
      piece.placed = false;

    //piece.draw();
    this.context.beginPath();
    //this.context.translate(this.x, this.y);
    this.context.strokeRect(piece.x-piece.width/2,piece.y-piece.height/2,piece.width,piece.height);
    this.context.fillRect(piece.x-piece.width/2,piece.y-piece.height/2,piece.width,piece.height);
    this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.context.fillText(piece.id, piece.x-3, piece.y+3);
    //this.context.fill();
    this.context.closePath();
  }
  this.context.restore();

  if(overNone){
    this.over = null;
  }
  
  //move
  if((this.selected != null)&&(this.selected.moveble)){
    /*
    var dx = this.mouse.x - this.selected.x;
    var dy = this.mouse.y - this.selected.y;
    this.selected.x = this.mouse.x-dx;
    this.selected.y = this.mouse.y-dy;
    */
    this.selected.x = this.mouse.x;
    this.selected.y = this.mouse.y;
  }

  this.context.restore();
  
  
  document.getElementById('mx').value = this.mouse.x;
  document.getElementById('my').value = this.mouse.y;

  document.getElementById('px').value = this.pieces[1].x;
  document.getElementById('py').value = this.pieces[1].y;

  document.getElementById('moving').value = this.mouse.moving;
  if(this.over)
    document.getElementById('over').value = this.over.id;
  else
    document.getElementById('over').value = "";
  if(this.selected)
    document.getElementById('selected').value = this.selected.id;
  else
    document.getElementById('selected').value = "";

}

Game.prototype.update = function() {
  /*
  var running = false;
  for(var i = 0; i < this.pieces.length; i++){
    piece = this.pieces[i];
    ball.x = this.mouse.x;
    ball.y = this.mouse.y;
  }
  this.running = running;
  */
}

