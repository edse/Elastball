/*****
 *
 *   Game.js
 *
 *****/

/*****
 *
 *   constructor
 *
 *****/
function Game(canvas) {
  this.zoom = 1;
  this.angle1 = 0;
  this.angle2 = 0;
  
  this.numBalls = 21;
  this.maxSize = 25;
  this.minSize = 25;

  this.maxSpeed = this.maxSize+5;
  this.minSpeed = 0.01;
  this.friction = 0.06;
  this.running = false;
  
  this.mouse = null;

  this.selected_ball = null;
  this.currentPlayer = null;
  
  this.balls = new Array();
  this.keepers = new Array();
  this.team1 = new Array();
  this.team2 = new Array();

  this.teamHome = null;
  this.teamAway = null;

  this.field = null;

  this.canvas = canvas;
  this.context = null;
}

/*****
 *
 *   init
 *    -
 *
 *****/
Game.prototype.init = function() {
  this.context = this.canvas.getContext("2d");
  this.context.scale(this.zoom, this.zoom);
  
  this.field = new Field();
  
  this.mouse = new Mouse();
  
  //?????
  
}

/*****
 *
 *   draw
 *    - draws everything
 *
 *****/
Game.prototype.draw = function() {
  //bg
  this.context.fillStyle = '#EEEEEE';
  this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

  //box
  this.context.strokeStyle = '#000000';
  this.context.strokeRect(1,1,this.canvas.width-2,this.canvas.height-2);

  //game running
  if(this.running){
    this.update();
    //testLateral();
    this.collide();
    this.testWalls();
    //this.testKeepers();
  }
  
  this.drawField();
  this.render();
}


/*****
 *
 *   update
 *    - apply physics
 *
 *****/
Game.prototype.update = function() {
  var running = false;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    //friction
    ball.velocityx = ball.velocityx - (ball.velocityx * friction);
    ball.velocityy = ball.velocityy - (ball.velocityy * friction);
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


/*****
 *
 *   testWalls
 *    - game boundaries
 *
 *****/
Game.prototype.testWalls = function() {
  var ball;
  var testBall;
  var w = this.canvas.width;
  var h = this.canvas.height;
  var hasCollided = false;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    if(ball.nextx+ball.radius > w){
      ball.velocityx = ball.velocityx*-1;
      ball.nextx = w-ball.radius;
      hasCollided = true;
    }else if(ball.nextx-ball.radius < 0){
      ball.velocityx = ball.velocityx*-1;
      ball.nextx = ball.radius; 
      hasCollided = true;
    }
    else if(ball.nexty+ball.radius > h){
      ball.velocityy = ball.velocityy*-1;
      ball.nexty = h-ball.radius; 
      hasCollided = true;
    }else if(ball.nexty-ball.radius < 0){
      ball.velocityy = ball.velocityy*-1;
      ball.nexty = ball.radius; 
      hasCollided = true;
    }

    if(hasCollided)
      ball.startPoint = new Point2D(ball.nextx, ball.nexty);
  }
}


/*****
 *
 *   render
 *    - game boundaries
 *
 *****/
Game.prototype.render = function() {
  var ball;
  var over;
  var overKeeper;
  var t;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    over = this.mouse.isOverBall(ball);
    ball.x = ball.nextx;
    ball.y = ball.nexty;
    this.context.save();
    this.context.fillStyle = "rgba(255, 255, 255, 1)";
    if(ball.team){
      //players
      this.context.fillStyle = ball.team.color;
      this.context.beginPath();
      this.context.translate(ball.x, ball.y);
      this.context.shadowColor="black";
      this.context.arc(0, 0, (ball.radius*zoom), 0, Math.PI * 2, true);
      this.context.fill();
      this.context.shadowColor="rgba(0, 0, 0, 0.5)";
      this.context.shadowOffsetX = 1;
      this.context.shadowOffsetY = 3;
      this.context.shadowBlur = 2;
      this.context.fill();
      if(over && (!this.mouse.down)){
        context.fillStyle = "rgba(250, 250, 250, 0.3)";
        context.arc(0, 0, (ball.radius*zoom), 0, Math.PI * 2, true);
        context.fill();
      }
    }else{
      //ball
      var s = Math.sqrt(ball.velocityx * ball.velocityx + ball.velocityy * ball.velocityy);
      this.context.beginPath();
      this.context.translate(ball.x, ball.y);
      this.context.arc(0, 0, (ball.radius*zoom), 0, Math.PI * 2, true);
      this.context.stroke();
      this.context.fill();
      this.context.shadowColor="rgba(0, 0, 0, 0.5)";
      this.context.shadowOffsetX = 1*s;
      this.context.shadowOffsetY = 1*s;
      this.context.shadowBlur = 3;
      this.context.fill();
    }
    context.restore();
    context.closePath();

    if((this.selected_ball == null)&&(over)&&(this.mouse.down)&&(ball.team)){
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
      this.context.lineWidth = 3;
      this.context.strokeStyle = "rgba(255, 0, 0, 0.5)";
      this.context.moveTo(this.mouse.x,this.mouse.y);
      this.context.lineTo(this.selected_ball.x, this.selected_ball.y);
      this.context.stroke();
      this.context.lineWidth = 2;
      this.context.strokeStyle = "rgba(255, 0, 0, 0.3)";
      this.context.lineTo(_x, _y);
      this.context.stroke();
      this.context.lineWidth = 1;
      this.context.strokeStyle = "rgba(255, 0, 0, 0.1)";
      this.context.lineTo(_x-dx2, _y-dy2);
      this.context.stroke();
    }
  }
  
  //keepers
  for(var i = 0; i < this.keepers.length; i++){
    keeper = this.keepers[i];
    this.context.fillStyle = keeper.team.color;
    this.context.strokeStyle = 'rgba(255,255,255,1)';
    
    //Keeper points
    rp1 = new Point2D(
      keeper.x-(keeper.width/2)*Math.cos(keeper.angle)+(keeper.height/2)*Math.sin(keeper.angle),
      keeper.y-(keeper.height/2)*Math.cos(keeper.angle)-(keeper.width/2)*Math.sin(keeper.angle)
    );
    rp2 = new Point2D(
      keeper.x+(keeper.width/2)*Math.cos(keeper.angle)+(keeper.height/2)*Math.sin(keeper.angle),
      keeper.y-(keeper.height/2)*Math.cos(keeper.angle)+(keeper.width/2)*Math.sin(keeper.angle)
    );
    rp3 = new Point2D(
      keeper.x+(keeper.width/2)*Math.cos(keeper.angle)-(keeper.height/2)*Math.sin(keeper.angle),
      keeper.y+(keeper.height/2)*Math.cos(keeper.angle)+(keeper.width/2)*Math.sin(keeper.angle)
    );
    rp4 = new Point2D(
      keeper.x-(keeper.width/2)*Math.cos(keeper.angle)-(keeper.height/2)*Math.sin(keeper.angle),
      keeper.y+(keeper.height/2)*Math.cos(keeper.angle)-(keeper.width/2)*Math.sin(keeper.angle)
    );

    // MOVE FROM HERE!
    overKeeper = this.mouse.isOverRect(rp1,rp2,rp3,rp4);
    tempBall = {
      id:"move",
      x:keeper.x,
      y:keeper.y,
      nextx:keeper.x,
      nexty:keeper.y,
      radius:21,
      k:i
    }
    overMoveKeeper = this.mouse.isOverBall(tempBall);
    if((this.selected_ball == null)&&(overMoveKeeper)&&(this.mouse.down)){
      this.selected_ball = tempBall;
    }
    tempBall = {
      id:"rotate",
      x:rp2.x,
      y:rp2.y,
      nextx:rp2.x,
      nexty:rp2.y,
      radius:21,
      k:i
    }
    overRotateKeeper = this.mouse.IsOverBall(tempBall);
    if((this.selected_ball == null)&&(overRotateKeeper)&&(this.mouse.down)){
      this.selected_ball = tempBall;
    }
    if(this.selected_ball != null){
      if((selected_ball.id == "move")&&(mouse_down)&&(selected_ball.k == i)){
        //move
        if(mouse_down_x != 0 && mouse_down_y != 0){
          keeper.x = this.mouse.x;
          keeper.y = this.mouse.y;
        }
      }
      if((selected_ball.id == "rotate")&&(mouse_down)&&(selected_ball.k == i)){
        //rotate
        if(mouse_down_x != 0 && mouse_down_y != 0){
          var dx = this.mouse.x - keeper.x + 21;
          var dy = this.mouse.y - keeper.y + 21;
          keeper.angle = Math.atan2(dy, dx);
        }
      }
    }

    this.context.save();
    this.context.beginPath();
    this.context.moveTo(rp1.x, rp1.y);
    this.context.lineTo(rp2.x, rp2.y);
    this.context.lineTo(rp3.x, rp3.y);
    this.context.lineTo(rp4.x, rp4.y);
    this.context.lineTo(rp1.x, rp1.y);
    this.context.closePath();
    this.context.fill();
    //this.context.stroke();
    this.context.shadowColor="rgba(0, 0, 0, 1)";
    this.context.shadowOffsetX = 3;
    this.context.shadowOffsetY = 6;
    this.context.shadowBlur = 5;
    this.context.fill();
    this.context.restore();

    if(overKeeper || overMoveKeeper || overRotateKeeper){
      this.context.save();
      this.context.beginPath();
      if(overMoveKeeper)
        this.context.strokeStyle = "rgba(255, 255, 0, 1)";
      else
        this.context.strokeStyle = "rgba(255, 0, 0, 0.5)";
      this.context.arc(keeper.x, keeper.y, 21, 0, Math.PI * 2, true);
      this.context.stroke();
      this.context.closePath();
      this.context.beginPath();
      if(overRotateKeeper)
        this.context.strokeStyle = "rgba(255, 255, 0, 1)";
      else
        this.context.strokeStyle = "rgba(255, 0, 0, 0.5)";
      this.context.arc(rp2.x, rp2.y, 21, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.stroke();
      this.context.restore();
    }
  }
}