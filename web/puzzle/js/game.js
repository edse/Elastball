function Game(canvas) {

  this.is_moving = false;
  this.balls = new Array();
  this.over_ball = null;
  this.selected_ball = null;
  this.context = canvas.getContext("2d");
  this.mouse = new Mouse(this);

  this.canvas = canvas;

  this.num_balls = 4;

  //throw balls
  for(i=1; i<=this.num_balls; i++){
    tempBall = {
      id:i,
      x:Math.floor(Math.random()*this.canvas.width-25)+25,
      y:Math.floor(Math.random()*this.canvas.height-25)+25,
      radius:25,
      moveble:true
    }
    this.balls.push(tempBall);
    console.log('balls array length>>'+this.balls.length);
  }

}

Game.prototype.draw = function() {
  //bg
  this.context.fillStyle = '#EEEEEE';
  this.context.fillRect(0,0,canvas.width/this.scale,canvas.height/this.scale);
  //box
  this.context.strokeStyle = '#000000';
  this.context.strokeRect(1,1,canvas.width-2,canvas.height-2);
  //grass
  this.context.save();
  this.context.fillStyle = "rgba(82,132,61, 1)";
  this.context.fillRect(0, 0, canvas.width, canvas.height);
  this.context.fillStyle = "rgba(49,107,56, 1)";
  var x0 = 0;
  var y0 = 0;
  var h = canvas.height/15;
  for(var i=0; i*h<canvas.height; i++){
    if(i%2!=1) this.context.fillRect(x0, y0+(i*h), canvas.width, h);
  }
  this.context.restore();
  this.context.save();
  //console.log('draw: '+this.scale);
}

Game.prototype.render = function() {
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    over = this.mouse.isOverBall(ball);

    this.context.save();

    this.context.font = "10pt Arial";

    if(over){
      this.over_ball = ball;
      this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
      document.getElementById('over').value = ball.id;
    }
    else
      this.context.fillStyle = "rgba(255, 255, 255, 0.5)";

    //ball
    this.context.beginPath();
    this.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    this.context.stroke();
    this.context.fill();
    this.context.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.context.fillText(ball.id, ball.x-3, ball.y+3);
    this.context.closePath();

    this.context.restore();

  }
  
  //move
  //if((this.mouse.down_x != 0 && this.mouse.down_y != 0)&&(this.selected_ball != null)){
  if(this.selected_ball != null){
    if(this.selected_ball.moveble){
      this.selected_ball.x = this.mouse.x;
      this.selected_ball.y = this.mouse.y;
    }
  }
  //}
  
  this.context.restore();
}

Game.prototype.update = function() {

  var running = true;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
  }
 
  this.running = running;

}

