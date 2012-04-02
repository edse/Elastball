function Game(canvas) {

  this.is_moving = false;
  this.balls = new Array();
  this.runningBalls = new Array();

  this.scale = 1;
  this.zoom = 1;

  this.maxSpeed = 30;
  this.minSpeed = 0.01;
  this.friction = 0.06;
  this.running = true;

  this.selected_ball = null;
  this.currentPlayer = null;
  this.context = canvas.getContext("2d");
  //this.mouse = utils.captureMouse(canvas,this);
  var me = this;
  this.mouse = new Mouse(me);

  tempBall = {
    id:1,
    x:250,
    y:250,
    radius:25,
    speed:0,
    angle:0,
    velocityx:10,
    velocityy:10,
    mass:25*8,
    nextx:250,
    nexty:250,
    anglespeed:0,
    rangle:0,
    speed:0,
    startPoint: new Point2D(this.x,this.y),
    moveble:true,
    isBall:true 
  }

  this.balls.push(tempBall);
  console.log('balls length>>'+this.balls.length);

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
    
    //over = utils.isMouseOverBall(this.mouse, ball);
    //over = false;
    over = this.mouse.isOverBall(ball);

    ball.x = ball.nextx;
    ball.y = ball.nexty;
    this.context.save(); 
    this.context.fillStyle = "rgba(255, 255, 255, 1)";

    if(ball.isBall){
      //ball
      var s = Math.sqrt(ball.velocityx * ball.velocityx + ball.velocityy * ball.velocityy);
      this.context.beginPath();
      this.context.translate(ball.x, ball.y);
      this.context.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
      this.context.stroke();
      this.context.fill();
      this.context.shadowColor="rgba(0, 0, 0, 0.5)";
      this.context.shadowOffsetX = 1*s;
      this.context.shadowOffsetY = 1*s;
      this.context.shadowBlur = 3;
      this.context.fill();
    }
    
    this.context.restore();
    this.context.closePath();

    if((this.selected_ball == null)&&(over)){
      this.selected_ball = ball;
      this.currentPlayer = i;
    }

  }
  
  //pointer
  if((this.mouse.down_x != 0 && this.mouse.down_y != 0)&&(this.selected_ball != null)){
    if(this.selected_ball.id != "move" && this.selected_ball.id != "rotate"){
      var dx = this.mouse.x - this.selected_ball.x;
      var dy = this.mouse.y - this.selected_ball.y;
      var _x = this.selected_ball.x-dx;
      var _y = this.selected_ball.y-dy;
      var dx2 = this.selected_ball.x - _x;
      var dy2 = this.selected_ball.y - _y;
  
      this.context.beginPath();
      this.context.lineWidth = 12;
      this.context.strokeStyle = "rgba(255, 0, 0, 0.5)";
      this.context.moveTo(this.mouse.x, this.mouse.y);
      this.context.lineTo(this.selected_ball.x, this.selected_ball.y);
      this.context.stroke();
      this.context.lineWidth = 6;
      this.context.strokeStyle = "rgba(255, 0, 0, 0.3)";
      this.context.lineTo(_x, _y);
      this.context.stroke();
      this.context.lineWidth = 3;
      this.context.strokeStyle = "rgba(255, 0, 0, 0.1)";
      this.context.lineTo(_x-dx2, _y-dy2);
      this.context.stroke();
    }
  }

  this.context.restore();
}

Game.prototype.update = function() {

  var running = false;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    //friction
    ball.velocityx = ball.velocityx - (ball.velocityx * this.friction);
    ball.velocityy = ball.velocityy - (ball.velocityy * this.friction);
    ball.nextx = (ball.x += ball.velocityx);
    ball.nexty = (ball.y += ball.velocityy);
    if((Math.abs(ball.velocityx) > this.minSpeed)||(Math.abs(ball.velocityy) > this.minSpeed))
      running = true;
    //max speed
    if(ball.velocityx > this.maxSpeed)
      ball.velocityx = this.maxSpeed;
    if(ball.velocityy > this.maxSpeed)
      ball.velocityy = this.maxSpeed;
  }
 
  this.running = running;

}

