function Game(canvas) {
  this.canvas = canvas;
  this.interval = null;
  this.img = new Image();
  //this.img.src = './img/spfc.jpg';
  this.img.src = './img/rainbow.png';
  this.img.addEventListener('load', this.init(), false);
}

Game.prototype.init = function(){
  console.log(this.img.width+','+this.img.height)
  this.img_width = this.img.width;
  this.img_height = this.img.height;
  this.num_lines = document.getElementById('scale').value;
  this.num_pieces = document.getElementById('scale').value * document.getElementById('scale').value;
  this.piece_width = this.img_width / this.num_lines;
  this.piece_height = this.img_height / this.num_lines;
  this.pieces = new Array();
  this.holders = new Array();
  this.placed_pieces = new Array();
  this.moving = true;
  this.selected = null;
  this.over = null;
  this.is_over = false;
  this.context = this.canvas.getContext("2d");
  this.mouse = new Mouse(this);
  this.placeHolders();
  this.placePieces();
}

Game.prototype.placePieces = function(){
  for(i=0; i<this.num_pieces; i++){
    x = Math.floor(Math.random()*this.canvas.width-this.piece_width)+this.piece_width;
    y = Math.floor(Math.random()*this.canvas.height-this.piece_height)+this.piece_height;
    temp = new Piece(
      i+1,
      this,
      this.piece_width,
      this.piece_height,
      x,
      y,
      new Point2D(this.x,this.y),
      new Point2D(this.holders[i].x,this.holders[i].y),
      this.holders[i],
      true,
      false
    );
    this.pieces.push(temp);
    console.log('pieces array length>>'+this.pieces.length);
  }
}

Game.prototype.placeHolders = function(){
  var pieces = 1;
  var offsetx = this.canvas.width/2-this.img_width/2;
  var offsety = this.canvas.height/2-this.img_height/2;
  for(var i = 0; i < this.num_lines; ++i) {
    for(var j = 0; j < this.num_lines; ++j) {
      temp = new Holder(
        pieces,
        this,
        j*this.piece_width+offsetx+this.piece_width/2,
        i*this.piece_height+offsety+this.piece_height/2,
        i,
        j,
        false
      );
      this.holders.push(temp);
      console.log('holders array length>>'+this.holders.length+' '+temp.x+','+temp.y);
      pieces++;
    }
  }
}

////////////////////////////////////////

Game.prototype.draw = function() {
}

Game.prototype.render = function() {
  
  this.draw_bg();
  
  //HOLDERS
  for(var i = 0; i < this.holders.length; i++){
    holder = this.holders[i];
    holder.draw();
  }

  //PIECES
  var not_placed = new Array();
  var over = false;
  for(var i = 0; i < this.pieces.length; i++){
    piece = this.pieces[i];
    if(!over && piece.mouse_is_over())
      over = true;
    if(!piece.placed)
      not_placed.push(piece);
    else if(piece != this.selected)
      piece.draw();
      
    if(!this.selected){
      if((!this.over)||(this.over.id < piece.id)||(piece.mouse_is_over())){
        if(piece.mouse_is_over() && !piece.placed){
          this.over = piece;
        }
      }
    }
      
  }
  for(var i = 0; i < not_placed.length; i++){
    not_placed[i].draw();
  }
  if(this.selected)
    this.selected.draw();

  if(!over)
    this.over = null;
  
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
  
  //Game Over
  if(this.is_over)
    clearInterval(this.interval);
  if(this.num_pieces == this.placed_pieces.length){
    this.is_over = true;
  }

  //DEBUG  
  if(this.debug){
    document.getElementById('mx').value = this.mouse.x;
    document.getElementById('my').value = this.mouse.y;
  
    document.getElementById('hx').value = this.holders[0].x;
    document.getElementById('hy').value = this.holders[0].y;
    document.getElementById('hx2').value = this.holders[1].x;
    document.getElementById('hy2').value = this.holders[1].y;
  
    document.getElementById('moving').value = this.mouse.moving;
    if(this.over)
      document.getElementById('over').value = this.over.id;
    else
      document.getElementById('over').value = "";
    if(this.selected)
      document.getElementById('selected').value = this.selected.id;
    else
      document.getElementById('selected').value = "";
  
    document.getElementById('p').value = this.num_pieces;
    document.getElementById('l').value = this.num_lines;
    document.getElementById('pw').value = this.piece_width;
    document.getElementById('ph').value = this.piece_height;
  
    document.getElementById('pp').value = this.placed_pieces.length;
  }

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

Game.prototype.draw_bg = function() {
  this.context.save();
  //bg
  this.context.fillStyle = '#FEFEFE';
  this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
  //box
  this.context.strokeStyle = '#000000';
  this.context.lineWidth = 1;
  this.context.strokeRect(1,1,this.canvas.width-2,this.canvas.height-2);
  
  //puzzle image
  var offsetx = this.canvas.width/2-this.img_width/2;
  var offsety = this.canvas.height/2-this.img_height/2;
  this.context.globalAlpha = 0.2
  this.context.drawImage(this.img, offsetx, offsety);
  
  this.context.restore();
}
