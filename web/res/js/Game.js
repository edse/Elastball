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

  this.canvas = canvas;
  this.context = null;

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
  
  this.init();
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
  this.teamHome = new Team();
  this.teamHome.formation = Array(
    Array(300,1050),
    Array(450,1050),
    Array(600,1050),
    Array(750,1050),
    Array(200,700),
    Array(350,700),
    Array(850,700),
    Array(700,700),
    Array(450,800),
    Array(600,800)
  );
  this.teamAway = new Team();
  this.teamAway.formation = Array(
    Array(300,1050),
    Array(450,1050),
    Array(600,1050),
    Array(750,1050),
    Array(200,700),
    Array(350,700),
    Array(850,700),
    Array(700,700),
    Array(450,800),
    Array(600,800)
  );

  this.mouse = new Mouse();
  
  for(var i = 0; i < this.numBalls; i++){
    //tempRadius = Math.floor(Math.random()*maxSize)+minSize;
    tempRadius = 25;
    tempBall = {
      id:i,
      radius:tempRadius,
      mass:tempRadius*8
    }
    if(this.balls.length <= 0){
      tempBall.id = 0;
      tempBall.isBall=true;
      tempBall.radius=5;
      tempBall.x=this.canvas.width/2;
      tempBall.y=this.canvas.height/2;
      tempBall.nextx=tempBall.x;
      tempBall.nexty=tempBall.y;
      tempBall.startPoint = new Point2D(tempBall.x,tempBall.y);
      tempBall.mass=10;
    }else{
      if(i <= (this.numBalls-1)/2){
        var j = i-1;
        console.log('j>>'+j);
        tempBall.team = 1;
        tempBall.x = this.teamHome.formation[j][0];
        tempBall.y = this.teamHome.formation[j][1];
        tempBall.nextx = this.teamHome.formation[j][0];
        tempBall.nexty = this.teamHome.formation[j][1];
        tempBall.startPoint = new Point2D(tempBall.x,tempBall.y);
        this.team1.push(tempBall);
      }
      else{
        var j = (i-(this.numBalls-1)/2)-1;
        console.log('j>>'+j);
        tempBall.team = 2;
        tempBall.x = this.teamAway.formation[j][0];
        tempBall.y = this.teamAway.formation[j][1];
        tempBall.nextx = this.teamAway.formation[j][0];
        tempBall.nexty = this.teamAway.formation[j][1];
        tempBall.startPoint = new Point2D(tempBall.x,tempBall.y);
        this.team2.push(tempBall);
      }
      tempBall.anglespeed = 0;
      tempBall.rangle = 0;
      tempBall.velocityx = 0;
      tempBall.velocityy = 0;
      tempBall.speed = 0;
    }
    this.balls.push(tempBall);
    console.log('balls length>>'+this.balls.length);
  }

  //goal keepers
  keeper1 = {
    id:1,
    x:((this.canvas.width-this.field.width)/2)+this.field.width/2,
    y:((this.canvas.height-this.field.height)/2)+60,
    width:90,
    height:30,
    angle:0,
    mass:1000,
    team: 1
  }
  
  this.keepers.push(keeper1);
  keeper2 = {
    id:2,
    x:((this.canvas.width-this.field.width)/2)+this.field.width/2,
    y:((this.canvas.height-this.field.height)/2)+this.field.height-60,
    width:90,
    height:30,
    angle:0,
    mass:1000,
    team: 2
  }
  
  this.keepers.push(keeper2);
  
  this.draw();
  //setInterval(drawScreen, 33);

}

/*****
 *
 *   draw
 *    - draws everything
 *
 *****/
Game.prototype.draw = function() {
  alert('draw');
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
      this.context.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
      this.context.fill();
      this.context.shadowColor="rgba(0, 0, 0, 0.5)";
      this.context.shadowOffsetX = 1;
      this.context.shadowOffsetY = 3;
      this.context.shadowBlur = 2;
      this.context.fill();
      if(over && (!this.mouse.down)){
        context.fillStyle = "rgba(250, 250, 250, 0.3)";
        context.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
        context.fill();
      }
    }else{
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
    overRotateKeeper = this.mouse.isOverBall(tempBall);
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


/*****
 *
 *   drawField
 *    - drawField
 *
 *****/
Game.prototype.drawField = function() {
  //field
  this.context.strokeStyle = '#FFF';
  this.context.fillStyle = "#FFF";
  this.context.lineWidth = 3;
  var x0 = (this.canvas.width-this.field.width)/2;
  var y0 = (this.canvas.height-this.field.height)/2;
  var halfW = this.field.width/2;
  var halfH = this.field.height/2;
  //grass
  this.context.save();
  this.context.fillStyle = "rgba(82,132,61, 1)";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.fillStyle = "rgba(49,107,56, 1)";
  var h = this.field.height/15;
  for(var i=0; i<this.field.height/h; i++){
    if(i%2!=1) this.context.fillRect(x0, y0+(i*h), this.field.width, h);
  }
  this.context.restore();
  //touch line
  this.context.strokeRect(x0, y0, this.field.width, this.field.height);
  //midfield line
  this.context.moveTo(x0, y0+halfH);
  this.context.lineTo(x0+this.field.width, y0+halfH);
  this.context.stroke();
  //midfield ball mark
  this.context.beginPath();
  this.context.arc(x0+halfW, y0+halfH, this.field.radiusBall, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
  //midfield
  this.context.beginPath();
  this.context.arc(x0+halfW, y0+halfH, this.field.radiusMidfield, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.stroke();
  
  //goals
  this.context.save();
  this.context.fillStyle = "rgba(255, 255, 255, 0.8)";
  //goal1
  this.context.fillRect(x0+halfW-(this.field.goalWidth/2), y0, this.field.goalWidth, -this.field.goalHeight);
  //goal2
  this.context.fillRect(x0+halfW-(this.field.goalWidth/2), y0+this.field.height, this.field.goalWidth, this.field.goalHeight);
  this.context.restore();

  //area1
  this.context.strokeRect(((this.field.width-this.field.areaWidth)/2)+x0, y0, this.field.areaWidth, this.field.areaHeight);
  this.context.strokeRect(((this.field.width-this.field.goalAreaWidth)/2)+x0, y0, this.field.goalAreaWidth, this.field.goalAreaHeight);
  this.context.beginPath();
  this.context.arc(x0+halfW, y0+this.field.penalty, this.field.radiusMidfield, 0.64, Math.PI-0.64, false);
  this.context.stroke();
  //penalty mark
  this.context.beginPath();
  this.context.arc(x0+halfW, y0+this.field.penalty, this.field.radiusBall, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
  //area2
  this.context.strokeRect(((this.field.width-this.field.areaWidth)/2)+x0, (y0+this.field.height)-this.field.areaHeight, this.field.areaWidth, this.field.areaHeight);
  this.context.strokeRect(((this.field.width-this.field.goalAreaWidth)/2)+x0, (y0+this.field.height)-this.field.goalAreaHeight, this.field.goalAreaWidth, this.field.goalAreaHeight);
  this.context.beginPath();
  this.context.arc(x0+halfW, (y0+this.field.height)-this.field.penalty, this.field.radiusMidfield, -0.64, Math.PI+0.64, true);
  this.context.stroke();
  //penalty mark
  this.context.beginPath();
  this.context.arc(x0+halfW, (y0+this.field.height)-this.field.penalty, this.field.radiusBall, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
  //corners
  this.context.beginPath();
  this.context.arc(x0, y0, this.field.radiusCorner, 0, Math.PI/2, false);
  this.context.stroke();
  this.context.beginPath();
  this.context.arc(x0+this.field.width, y0, this.field.radiusCorner, Math.PI/2, Math.PI, false);
  this.context.stroke();
  this.context.beginPath();
  this.context.arc(x0, y0+this.field.height, this.field.radiusCorner, 0, -Math.PI/2, true);
  this.context.stroke();
  this.context.beginPath();
  this.context.arc(x0+this.field.width, y0+this.field.height, this.field.radiusCorner, -Math.PI/2, -Math.PI, true);
  this.context.stroke();
}