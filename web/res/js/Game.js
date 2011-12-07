/*****
 *
 *   Game.js
 *
 *****/

var mouse;

/*****
 *
 *   constructor
 *
 *****/
function Game(canvas) {
  
  this.hit1 = document.getElementById('hit1');
  this.hit7 = document.getElementById('hit7');
  this.hit3 = document.getElementById('hit3');
  this.bar = document.getElementById('bar');
  this.whistle2 = document.getElementById('whistle2'); //start game
  this.whistle3 = document.getElementById('whistle3'); //fault
  this.whistle4 = document.getElementById('whistle4'); //end game
  this.whistle5 = document.getElementById('whistle5'); //out of bounds
  
  this.zoom = 1;
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.context.scale(this.zoom, this.zoom);
  this.context.fillStyle = '#EEEEEE';
  this.width = 1050;
  this.height = 1400;
  this._x = 0;
  this._y = 0;
  
  this.angle1 = 0;
  this.angle2 = 0;
  
  this.numBalls = 25;
  this.maxSize = 25;
  this.minSize = 25;

  this.maxSpeed = this.maxSize+5;
  this.minSpeed = 0.01;
  this.friction = 0.06;
  this.running = false;
  
  this.turn = 1;
  this.selected_ball = null;
  this.currentPlayer = null;
  this.currentPlayerLastHit = false;
  this.currentPlayerFirstHit = false;
  this.ballLastHit = false;
  this.ballFirstHit = false;
  this.movements = new Array();
  this.team1Score = 0;
  this.team2Score = 0;
  this.time = "00:00";
  this.currentPlayerTimeRemaining = "01:00";
  
  this.gameTimer = new Timer('t1',90,0);
  this.turnTimer = new Timer('t2',1,0);
  
  this.gameTimer.start();
  this.turnTimer.start();

  this.balls = new Array();
  this.keepers = new Array();
  this.team1 = new Array();
  this.team2 = new Array();

  this.is_moving = false;

  this.trowin = {
    detected:false,
    positioned:false,
    executed:false,
    team:null,
    position:new Point2D(0,0)
  }
  this.corner = {
    detected:false,
    positioned:false,
    executed:false,
    team:null,
    position:new Point2D(0,0)
  }
  this.fault = {
    detected:false,
    positioned:false,
    executed:false,
    team:null,
    position:new Point2D(0,0)
  }
  this.penalty = {
    detected:false,
    positioned:false,
    executed:false,
    team:null,
    position:new Point2D(0,0)
  }

  var me = this;
  this.field = new Field(me);

  this.teamHome = new Team(1,"","","","rgba(218, 37, 29, 0.7)");
  this.teamHome.formation = Array(
    Array(300,250),
    Array(450,250),
    Array(600,250),
    Array(750,250),
    Array(200,600),
    Array(350,600),
    Array(850,600),
    Array(700,600),
    Array(490,625),
    Array(570,615)
  );
  this.teamAway = new Team(2,"","","","rgba(74, 133, 255, 0.7)");
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

  this.topFieldTeam = this.teamHome.id;
  this.bottomFieldTeam = this.teamAway.id;

  for(var i = 0; i < this.numBalls; i++){
    //tempRadius = Math.floor(Math.random()*maxSize)+minSize;
    tempRadius = 25;
    tempBall = {
      id:i,
      x:0,
      y:0,
      radius:tempRadius,
      speed:0,
      angle:0,
      velocityx:0,
      velocityy:0,
      mass:tempRadius*8,
      nextx:0,
      nexty:0,
      anglespeed:0,
      rangle:0,
      speed:0,
      startPoint: new Point2D(0,0),
      moveble:true
    }
    if(this.balls.length <= 0){
      tempBall.isBall=true;
      tempBall.radius=5;
      tempBall.x=this.width/2;
      tempBall.y=this.height/2;
      tempBall.nextx=tempBall.x;
      tempBall.nexty=tempBall.y;
      tempBall.startPoint = new Point2D(tempBall.x,tempBall.y);
      tempBall.mass=10;
    }else{
      if(i <= 4){
        //bars
        var x0 = (this.width-this.field.width)/2;
        var y0 = (this.height-this.field.height)/2;
        var halfW = this.field.width/2;
        var halfH = this.field.height/2;
        var gx = x0+halfW-(this.field.goalWidth/2);
        if(i == 1){
          tempBall.x = gx;
          tempBall.y = y0;
          tempBall.nextx = gx;
          tempBall.nexty = y0;
          tempBall.startPoint = new Point2D(gx,y0);
        }else if(i == 2){
          tempBall.x = gx+this.field.goalWidth;
          tempBall.y = y0;
          tempBall.nextx = gx+this.field.goalWidth;
          tempBall.nexty = y0;
          tempBall.startPoint = new Point2D(gx+this.field.goalWidth,y0);
        }else if(i == 3){
          tempBall.x = gx;
          tempBall.y = y0+this.field.height;
          tempBall.nextx = gx;
          tempBall.nexty = y0+this.field.height;
          tempBall.startPoint = new Point2D(gx,y0+this.field.height);
        }else if(i == 4){
          tempBall.x = gx+this.field.goalWidth;
          tempBall.y = y0+this.field.height;
          tempBall.nextx = gx+this.field.goalWidth;
          tempBall.nexty = y0+this.field.height;
          tempBall.startPoint = new Point2D(gx+this.field.goalWidth,y0+this.field.height);
        }
        
        this.context.fillRect(x0+halfW-(this.field.goalWidth/2), y0+this.field.height, this.field.goalWidth, this.field.goalHeight);


        tempBall.isBall = false;
        tempBall.radius = 4;
        tempBall.moveble = false;
        tempBall.mass=1000;
      }
      else if(i <= ((this.numBalls-5)/2)+4){
        var j = i-5;
        console.log('team1>>'+j);
        tempBall.team = this.teamHome;
        tempBall.x = this.teamHome.formation[j][0];
        tempBall.y = this.teamHome.formation[j][1];
        tempBall.nextx = this.teamHome.formation[j][0];
        tempBall.nexty = this.teamHome.formation[j][1];
        tempBall.startPoint = new Point2D(tempBall.x,tempBall.y);
        this.team1.push(tempBall);
      }
      else{
        var j = (i-(this.numBalls-5)/2)-5;
        console.log('team2>>'+j);
        tempBall.team = this.teamAway;
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

  this._x = 0;
  this._y = -this.height/2 + this.canvas.height/2;

  //goal keepers
  keeper1 = {
    id:1,
    x: (this.canvas.width/2)-45,
    y:90,
    width:90,
    height:30,
    angle:0,
    mass:1000,
    team: 1
  }
  
  this.keepers.push(keeper1);
  keeper2 = {
    id:2,
    x: (this.canvas.width/2)-45,
    y: this.canvas.width - 90,
    width:90,
    height:30,
    angle:0,
    mass:1000,
    team: 2
  }
  
  this.keepers.push(keeper2);
  
  var me = this;
  this.mouse = new Mouse(me);
  
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(/* function */ callback, /* DOMElement */ element){
      //window.setTimeout(callback, 1000 / 60);
      window.setTimeout(callback, 1000 / 30);
    };
  })();
  // instead of setInterval(render, 16) ....
  (function animloop(){
    requestAnimFrame(animloop, this.canvas);
    me.draw();
  })();
  // place the rAF *before* the render() to assure as close to 
  // 60fps with the setTimeout fallback.

  /*
  this.interval = setInterval(function() {
    me.draw();
  }, 33);
  */
  
  //document.getElementById('referee').className = 'fadein';
  $('#referee').fadeIn();
  //setTimeout("document.getElementById('referee').className = 'fadeout'",5000);
  setTimeout("$('#referee').fadeOut()",3000);
  
  this.whistle2.pause();
  this.whistle2.currentTime = 0;
  this.whistle2.play();

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
    this.collide();
    this.testKeepers();
    this.testNet();
    this.testLateral();
    this.testWalls();
  }
  
  this.drawField();
  this.render();
  
  //$('#turn').fadeOut();
  $('#turn').html(this.turn);
  //$('#turn').fadeIn();

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

  //console.log('>>>>>>>>>'+this._y);
  if(!this.is_moving){
    this._x = 0;  
    this._y = this._y + ( (this.canvas.height/2) + Math.abs(this._y) - this.balls[0].y );
    if(this._y > 0)
      this._y = 0;
    else if(Math.abs(this._y) + this.canvas.height > this.height)
       this._y = -this.height + this.canvas.height;
  }
 
  this.running = running;

  //console.log("moves: "+this.movements.length);
  
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
  
  this.context.save(); 
  this.context.translate(this._x, this._y);
  //console.log(this._x+', '+this._y)
  //console.log(this.mouse.y+', '+this.mouse.getY())
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    over = this.mouse.isOverBall(ball);
    if(this.running) over = false;
    ball.x = ball.nextx;
    ball.y = ball.nexty;
    this.context.save(); 
    this.context.fillStyle = "rgba(255, 255, 255, 1)";
    if(ball.team){
      if(ball.team.id!=this.turn) over = false;
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
        document.body.style.cursor = 'hand';
        this.context.fillStyle = "rgba(250, 250, 250, 0.3)";
        //this.context.fillStyle = ball.team.color;
        this.context.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
        this.context.fill();
      }
    }else{
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
      else{
        //bars
        this.context.beginPath();
        this.context.translate(ball.x, ball.y);
        this.context.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
      }
    }
    this.context.restore();
    this.context.closePath();

    if((this.selected_ball == null)&&(over)&&(this.mouse.down)/*&&(ball.team)*/&&(!this.is_moving)){
      this.selected_ball = ball;
      this.currentPlayer = i;
      document.body.style.cursor = 'hand';
    }
  }

  //pointer
  if((this.mouse.down_x != 0 && this.mouse.down_y != 0)&&(this.selected_ball != null)){
    document.body.style.cursor = 'none';
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
      this.context.moveTo(this.mouse.x,this.mouse.y);
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

    // MOVE IT FROM HERE!
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
      if((this.selected_ball.id == "move")&&(this.mouse.down)&&(this.selected_ball.k == i)){
        //move
        if(this.mouse.down_x != 0 && this.mouse.down_y != 0){
          keeper.x = this.mouse.x;
          keeper.y = this.mouse.y;
        }
      }
      if((this.selected_ball.id == "rotate")&&(this.mouse.down)&&(this.selected_ball.k == i)){
        //rotate
        if(this.mouse.down_x != 0 && this.mouse.down_y != 0){
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
    
    if((this.selected_ball == null)&&(this.mouse.down)&&(this.mouse.down_y != this.mouse.y)&&(!this.running)){
      this._y = this._y - ((this.mouse.down_y - this.mouse.y) * 0.1);
      this.is_moving = true;
      
      if(this._y > 0)
        this._y = 0;
      else if(Math.abs(this._y) + this.canvas.height > this.height)
         this._y = -this.height + this.canvas.height;
      
    }
    
  }

  this.context.restore();

}



/*****
 *
 *   drawField
 *    - drawField
 *
 *****/
Game.prototype.drawField = function() {

  this.context.save(); 
  this.context.translate(this._x, this._y);
  
  //field
  this.context.strokeStyle = '#FFF';
  this.context.fillStyle = "#FFF";
  this.context.lineWidth = 3;
  var x0 = (this.width-this.field.width)/2;
  var y0 = (this.height-this.field.height)/2;
  var halfW = this.field.width/2;
  var halfH = this.field.height/2;
  //grass
  this.context.save();
  this.context.fillStyle = "rgba(82,132,61, 1)";
  this.context.fillRect(0, 0, this.width, this.height);
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
  var gx = x0+halfW-(this.field.goalWidth/2);
  var gy = y0;
  this.context.save();
  this.context.lineWidth = 8;
  this.context.fillStyle = "rgba(105, 105, 105, 0.8)";
  //goal1
  this.context.moveTo(gx, gy);
  //this.context.lineTo(x0+halfW-(this.field.goalWidth/2) + this.field.goalWidth, y0 + this.field.goalHeight);
  this.context.lineTo(gx, y0-this.field.goalHeight);
  this.context.lineTo(gx + this.field.goalWidth, y0 - this.field.goalHeight);
  this.context.lineTo(gx + this.field.goalWidth, y0);
  //this.context.lineTo(gx, gy);
  this.context.stroke();

  //goal2
  this.context.moveTo(gx, y0+this.field.height);  
  //this.context.fillRect(x0+halfW-(this.field.goalWidth/2), y0+this.field.height, this.field.goalWidth, this.field.goalHeight);
  this.context.lineTo(gx, y0+this.field.height+this.field.goalHeight);
  this.context.lineTo(gx + this.field.goalWidth, y0+this.field.height+this.field.goalHeight);
  this.context.lineTo(gx + this.field.goalWidth, y0+this.field.height);
  this.context.stroke();
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
  
  //goal1
  this.context.save();
  this.context.lineWidth = 1;
  this.context.strokeStyle = "rgba(250, 0, 0, 1)";
  var ball = this.balls[0];
  var p1 = new Point2D(this.balls[1].x+ball.radius,this.balls[1].y-ball.radius);
  var p2 = new Point2D(this.balls[1].x+ball.radius,this.balls[1].y+ball.radius-this.field.goalHeight);
  var p3 = new Point2D(this.balls[2].x-ball.radius,this.balls[2].y-ball.radius);
  var p4 = new Point2D(this.balls[2].x-ball.radius,this.balls[2].y+ball.radius-this.field.goalHeight);
  
  this.context.moveTo(p1.x, p1.y);  
  this.context.lineTo(p2.x, p2.y);
  this.context.lineTo(p4.x, p4.y);
  this.context.lineTo(p3.x, p3.y);
  this.context.lineTo(p1.x, p1.y);
  this.context.stroke();

  //goal2
  var p1 = new Point2D(this.balls[3].x+ball.radius,this.balls[3].y+ball.radius);
  var p2 = new Point2D(this.balls[3].x+ball.radius,this.balls[3].y-ball.radius+this.field.goalHeight);
  var p3 = new Point2D(this.balls[4].x-ball.radius,this.balls[4].y+ball.radius);
  var p4 = new Point2D(this.balls[4].x-ball.radius,this.balls[4].y-ball.radius+this.field.goalHeight);

  this.context.moveTo(p1.x, p1.y);  
  this.context.lineTo(p2.x, p2.y);
  this.context.lineTo(p4.x, p4.y);
  this.context.lineTo(p3.x, p3.y);
  this.context.lineTo(p1.x, p1.y);

  this.context.stroke();

  this.context.restore();

  
  
  
  this.context.restore();
  
}


/*****
 *
 *   testLateral
 *    - game boundaries
 *
 *****/
Game.prototype.testLateral = function() {
  var ball = this.balls[0];
  var x0 = (this.width-this.field.width)/2;
  var y0 = (this.height-this.field.height)/2;
  var out = 0;
  if(ball.nextx-ball.radius > x0+this.field.width){
    out = 1;
  }else if(ball.nextx+ball.radius < x0){
    out = 2;
  }else if(ball.nexty-ball.radius > y0+this.field.height){
    out = 3;
  }else if(ball.nexty+ball.radius < y0){
    out = 4;
  }
  if(out>0){
    $('#referee img').hide();

    if(this.turn == 1)
      this.turn = 2;
    else
      this.turn = 1;

    if(out == 1){
      ball.x = x0+this.field.width-1;

      if(this.turn == 1)
        $('#ref_trowin1').show();
      else
        $('#ref_trowin2').show();
    }
    else if(out == 2){
      ball.x = x0+1;

      if(this.turn == 1)
        $('#ref_trowin1').show();
      else
        $('#ref_trowin2').show();
    }
    else if(out == 3){
      //BOTTOM
      ball.y = y0+this.field.height-1;
      if(this.bottomFieldTeam == this.turn){
        //tiro de meta
        if(ball.x < this.balls[3].x)
          ball.x = this.balls[3].x;
        else
          ball.x = this.balls[4].x;
        ball.y = y0+this.field.height-this.field.goalAreaHeight;

        if(this.turn == 1)
          $('#ref_trowin1').show();
        else
          $('#ref_trowin2').show();
      }else{
        //escanteio
        if(ball.x < this.balls[3].x)
           ball.x = x0;
        else
          ball.x = x0+this.field.width

        $('#ref_corner').show();
      }
    }
    else if(out == 4){
      //TOP
      ball.y = y0+1;
      if(this.topFieldTeam == this.turn){
        //tiro de meta
        if(ball.x < this.balls[3].x)
          ball.x = this.balls[3].x;
        else
          ball.x = this.balls[4].x;
        ball.y = y0+this.field.goalAreaHeight;
        
        if(this.turn == 1)
          $('#ref_trowin1').show();
        else
          $('#ref_trowin2').show();
      }else{
        //escanteio
        if(ball.x < this.balls[3].x)
           ball.x = x0;
        else
          ball.x = x0+this.field.width
          
        $('#ref_corner').show();
      }
    }
    
    $('#referee').fadeIn();
    //this.whistle5.pause();
    //this.whistle5.currentTime = 0;
    this.whistle5.play();
    setTimeout("$('#referee').fadeOut()",3000);
    
    ball.nextx = ball.x;
    ball.nexty = ball.y;
    ball.velocityx = 0;
    ball.velocityy = 0;

  }
  
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
    /*
    else if(ball.nexty+ball.radius > h){
      ball.velocityy = ball.velocityy*-1;
      ball.nexty = h-ball.radius; 
      hasCollided = true;
    }else if(ball.nexty-ball.radius < 0){
      ball.velocityy = ball.velocityy*-1;
      ball.nexty = ball.radius; 
      hasCollided = true;
    }
    */
    if(hasCollided)
      ball.startPoint = new Point2D(ball.nextx, ball.nexty);
  }
}


/*****
 *
 *   collide
 *    - collision check  (ball vs. ball)
 *
 *****/
Game.prototype.collide = function() {
  var ball;
  var testBall;
  //var first_hit;
  //var last_hit;
  //var turn;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    for(var j = i+1; j < this.balls.length; j++){
      testBall = this.balls[j];
      if(this.hitTestCircle(ball,testBall)){
        if(ball.id==0){
          if(!this.ballFirstHit)
            this.ballFirstHit = testBall.id;
          this.ballLastHit = testBall.id;
          if(testBall.team){
            this.turn = testBall.team.id;
            console.log('team: '+testBall.team.id);
          }
          if(testBall.id==1||testBall.id==2||testBall.id==3||testBall.id==4){
            this.bar.pause();
            this.bar.currentTime = 0;
            this.bar.play();
          }else{
            this.hit1.pause();
            this.hit1.currentTime = 0;
            this.hit1.play();
          }
        }
        else if((ball.id==1||ball.id==2||ball.id==3||ball.id==4)||(testBall.id==1||testBall.id==2||testBall.id==3||testBall.id==4)){
          this.bar.pause();
          this.bar.currentTime = 0;
          this.bar.play();
        }
        else{
          this.hit3.pause();
          this.hit3.currentTime = 0;
          this.hit3.play();
        }

        if((this.currentPlayer == i || this.currentPlayer == j)){
          if(this.currentPlayer == j){
            this.currentPlayerLastHit = ball.id;
            if(this.currentPlayerFirstHit === false)
              this.currentPlayerFirstHit = ball.id;

            //Fault
            if((this.currentPlayerFirstHit != 0)&&(this.balls[this.currentPlayerLastHit].team != this.balls[this.currentPlayer].team)&&(!ball.isBall)&&(this.currentPlayerLastHit > 4)){
              this.whistle3.pause();
              this.whistle3.currentTime = 0;
              this.whistle3.play();
            }

          }
          else{
            this.currentPlayerLastHit = testBall.id;
            if(this.currentPlayerFirstHit === false)
              this.currentPlayerFirstHit = testBall.id;

            //Fault
            if((this.currentPlayerFirstHit != 0)&&(this.balls[this.currentPlayerLastHit].team != this.balls[this.currentPlayer].team)&&(!testBall.isBall)&&(this.currentPlayerLastHit > 4)){
              this.whistle3.pause();
              this.whistle3.currentTime = 0;
              this.whistle3.play();
            }

          }
          
        }

        this.collideBalls(ball, testBall);
      }
    }
  }
  //this.turn = turn;
  //this.first_collision = first_hit;
  //this.last_collision = last_hit;
}


/*****
 *
 *   collideBalls
 *    - physical collision between two balls
 *
 *****/
Game.prototype.collideBalls = function(ball1, ball2) {
  var dx = ball1.nextx - ball2.nextx;
  var dy = ball1.nexty - ball2.nexty;
  var collisionAngle = Math.atan2(dy, dx);
  var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx + ball1.velocityy * ball1.velocityy);
  var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx + ball2.velocityy * ball2.velocityy);
  var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
  var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);
  
  var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
  var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
  var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
  var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
  
  var finalVelocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
  var finalVelocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);
  
  var finalVelocityy_1 = velocityy_1;
  var finalVelocityy_2 = velocityy_2;
  
  if(ball1.moveble){
    ball1.velocityx = Math.cos(collisionAngle) * finalVelocityx_1 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityy_1;
    ball1.velocityy = Math.sin(collisionAngle) * finalVelocityx_1 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityy_1;
    ball1.nextx = (ball1.nextx += ball1.velocityx);
    ball1.nexty = (ball1.nexty += ball1.velocityy);
    ball1.startPoint = new Point2D(ball1.nextx, ball1.nexty);
  }
  if(ball2.moveble){
    ball2.velocityx = Math.cos(collisionAngle) * finalVelocityx_2 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityy_2;
    ball2.velocityy = Math.sin(collisionAngle) * finalVelocityx_2 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityy_2;
    ball2.nextx = (ball2.nextx += ball2.velocityx);
    ball2.nexty = (ball2.nexty += ball2.velocityy);
    ball2.startPoint = new Point2D(ball2.nextx, ball2.nexty);
  }
  
}

/*****
 *
 *   hitTestCircle
 *    - test collision between two circles
 *
 *****/
Game.prototype.hitTestCircle = function(ball1, ball2) {
  var retval = false;
  var dx = ball1.nextx - ball2.nextx;
  var dy = ball1.nexty - ball2.nexty;
  var distance = (dx * dx + dy * dy);
  if(distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)){
    retval = true;
  }
  return retval;
}

/*****
 *
 *   pointIsOverRect
 *    - test collision between point and rect
 *
 *****/
Game.prototype.pointIsOverRect = function(pt, p1, p2, p3, p4) {
    var poly = new Array();
    poly[0]=p1;
    poly[1]=p2;
    poly[2]=p3;
    poly[3]=p4;
    pt = new Point2D(this.mouse.x, this.mouse.y);
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
  }


/*****
 *
 *   testKeepers
 *
 *****/
Game.prototype.testKeepers = function() {
  var ball;
  var testBall;
  var w = this.canvas.width;
  var h = this.canvas.height;
  for(var i = 0; i < this.balls.length; i++){            
    ball = this.balls[i];
                
    for(var j = 0; j < this.keepers.length; j++){
      keeper = this.keepers[j];

      p1 = new Point2D(
        keeper.x-(keeper.width+ball.radius/2)*Math.cos(keeper.angle)+(keeper.height+ball.radius/2)*Math.sin(keeper.angle),
        keeper.y-(keeper.height+ball.radius/2)*Math.cos(keeper.angle)-(keeper.width+ball.radius/2)*Math.sin(keeper.angle)
      );
      p2 = new Point2D(
        keeper.x+(keeper.width+ball.radius/2)*Math.cos(keeper.angle)+(keeper.height+ball.radius/2)*Math.sin(keeper.angle),
        keeper.y-(keeper.height+ball.radius/2)*Math.cos(keeper.angle)+(keeper.width+ball.radius/2)*Math.sin(keeper.angle)
      );
      p3 = new Point2D(
        keeper.x+(keeper.width+ball.radius/2)*Math.cos(keeper.angle)-(keeper.height+ball.radius/2)*Math.sin(keeper.angle),
        keeper.y+(keeper.height+ball.radius/2)*Math.cos(keeper.angle)+(keeper.width+ball.radius/2)*Math.sin(keeper.angle)
      );
      p4 = new Point2D(
        keeper.x-(keeper.width+ball.radius/2)*Math.cos(keeper.angle)-(keeper.height+ball.radius/2)*Math.sin(keeper.angle),
        keeper.y+(keeper.height+ball.radius/2)*Math.cos(keeper.angle)-(keeper.width+ball.radius/2)*Math.sin(keeper.angle)
      );

      p1n = new Point2D(
        keeper.x-(keeper.width/2)*Math.cos(keeper.angle)+(keeper.height/2)*Math.sin(keeper.angle),
        keeper.y-(keeper.height/2)*Math.cos(keeper.angle)-(keeper.width/2)*Math.sin(keeper.angle)
      );
      p2n = new Point2D(
        keeper.x+(keeper.width/2)*Math.cos(keeper.angle)+(keeper.height/2)*Math.sin(keeper.angle),
        keeper.y-(keeper.height/2)*Math.cos(keeper.angle)+(keeper.width/2)*Math.sin(keeper.angle)
      );
      p3n = new Point2D(
        keeper.x+(keeper.width/2)*Math.cos(keeper.angle)-(keeper.height/2)*Math.sin(keeper.angle),
        keeper.y+(keeper.height/2)*Math.cos(keeper.angle)+(keeper.width/2)*Math.sin(keeper.angle)
      );
      p4n = new Point2D(
        keeper.x-(keeper.width/2)*Math.cos(keeper.angle)-(keeper.height/2)*Math.sin(keeper.angle),
        keeper.y+(keeper.height/2)*Math.cos(keeper.angle)-(keeper.width/2)*Math.sin(keeper.angle)
      );

      p1 = new Point2D(
        p1n.x-ball.radius,
        p1n.y-ball.radius
      );
      p2 = new Point2D(
        p2n.x+ball.radius,
        p2n.y-ball.radius
      );
      p3 = new Point2D(
        p3n.x+ball.radius,
        p3n.y+ball.radius
      );
      p4 = new Point2D(
        p4n.x-ball.radius,
        p4n.y+ball.radius
      );

      var coef = p2.y-p1.y/p2.x-p1.x;

      if(!this.pointIsOverRect(new Point2D(ball.nextx, ball.nexty), p1, p2, p3, p4)){
                        
        b1 = new Point2D(ball.startPoint.x, ball.startPoint.y);
        b2 = new Point2D(ball.nextx, ball.nexty);
        
        c1 = new Point2D(ball.startPoint.x-ball.radius, ball.startPoint.y-ball.radius);
        c2 = new Point2D(ball.nextx-ball.radius, ball.nexty-ball.radius);

        d1 = new Point2D(ball.startPoint.x, ball.startPoint.y);
        d2 = new Point2D(ball.nextx+ball.radius, ball.nexty+ball.radius);
        
        /*
        if(i==1){
          $('#b1x').val(b1.x);
          $('#b1y').val(b1.y);
          $('#b2x').val(b2.x);
          $('#b2y').val(b2.y);
          $('#c1x').val(c1.x);
          $('#c1y').val(c1.y);
          $('#c2x').val(c2.x);
          $('#c2y').val(c2.y);
          $('#d1x').val(d1.x);
          $('#d1y').val(d1.y);
          $('#d2x').val(d2.x);
          $('#d2y').val(d2.y);
        }
        */
        
        //top p1 to p2
        var segment = new Array(p1,p2);
        var face = 1;
        c = intersectLineLine(b1,b2,p1,p2);
        if(!c){
          //bottom p3 to p4
          segment = new Array(p3,p4);
          face = 3;
          c = intersectLineLine(b1,b2,p3,p4);              
        }
        if(!c){
          //left p4 to p1
          segment = new Array(p4,p1);
          face = 4;
          c = intersectLineLine(b1,b2,p4,p1);
        }
        if(!c){
          //right p2 to p3
          segment = new Array(p2,p3);
          face = 2;
          c = intersectLineLine(b1,b2,p2,p3);              
        }

        if(c){
          var tempBall = {
            x:0,
            y:0,
            radius:ball.radius,
            speed:0,
            velocityx:0,
            velocityy:0,
            mass:999999,
            nextx:0,
            nexty:0,
            speed:0
          }
          
          var c1 = false;
          var near = false;
          if(c.x < p1n.x && c.y < p1n.y){ //top-left corner
            near = true;
            c1 = intersectCircleLine(p1n, ball.radius, b1, b2);
            if(c1){
              tempBall.x = p1n.x;
              tempBall.y = p1n.y;
              tempBall.nextx = c1.x;
              tempBall.nexty = c1.y;
            }
          }
          else if(c.x > p2n.x && c.y < p2n.y){ //top-right corner
            near = true;
            c1 = intersectCircleLine(p2n, ball.radius, b1, b2);
            if(c1){
              tempBall.x = p2n.x;
              tempBall.y = p2n.y;
              tempBall.nextx = c1.x;
              tempBall.nexty = c1.y;
            }
          }
          else if(c.x > p3n.x && c.y > p3n.y){ //bottom-right corner
            near = true;
            c1 = intersectCircleLine(p3n, ball.radius, b1, b2);
            if(c1){
              tempBall.x = p3n.x;
              tempBall.y = p3n.y;
              tempBall.nextx = c1.x;
              tempBall.nexty = c1.y;
            }
          }
          else if(c.x < p4n.x && c.y > p4n.y){ //bottom-left corner
            near = true;
            c1 = intersectCircleLine(p4n, ball.radius, b1, b2);
            if(c1){
              tempBall.x = p4n.x;
              tempBall.y = p4n.y;
              tempBall.nextx = c1.x;
              tempBall.nexty = c1.y;
            }
          }
          
          // response for corner collision
          if(c1){
            //$('#p1x').val(c1.x);
            //$('#p1y').val(c1.y);
            c = c1;
            tempBall.velocityx = 0;
            tempBall.velocityy = 0;
            tempBall.nextx = tempBall.x;
            tempBall.nexty = tempBall.y;
            this.collideBalls(tempBall, ball);
          }else if(!near){
            //$('#p1x').val(c.x);
            //$('#p1y').val(c.y);
            
            // response for face collision
            tempBall.mass = 999999999999;
            tempBall.radius = 0;
            tempBall.x = c.x;
            tempBall.y = c.y;
            tempBall.velocityx = 0;
            tempBall.velocityy = 0;
            if(face == 1)
              tempBall.y = c.y-ball.radius;
            else if(face == 3){
              tempBall.y = c.x*coef;
              tempBall.x = c.x;
            }
            else if(face == 2)
              tempBall.x = c.x-ball.radius;
            else if(face == 4)
              tempBall.x = c.x+ball.radius;
            tempBall.nextx = tempBall.x;
            tempBall.nexty = tempBall.y;

            //collideBalls(tempBall,ball);
            var ball1 = ball;
            var ball2 = tempBall;
            var dx = ball1.x - ball2.nextx;
            var dy = ball1.y - ball2.nexty;
            var collisionAngle = Math.atan2(dy, dx);
            var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx + ball1.velocityy * ball1.velocityy);
            var speed2 = 0;
            var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
            var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);
            
            var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
            var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
            var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
            var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
            
            var finalVelocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
            var finalVelocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);
            
            var finalVelocityy_1 = velocityy_1;
            var finalVelocityy_2 = velocityy_2;
            
            ball1.velocityx = Math.cos(collisionAngle) * finalVelocityx_1 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityy_1;
            ball1.velocityy = Math.sin(collisionAngle) * finalVelocityx_1 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityy_1;
            ball2.velocityx = Math.cos(collisionAngle) * finalVelocityx_2 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityy_2;
            ball2.velocityy = Math.sin(collisionAngle) * finalVelocityx_2 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityy_2;
            
            ball1.nextx = (ball1.nextx += ball1.velocityx);
            ball1.nexty = (ball1.nexty += ball1.velocityy);
            ball2.nextx = (ball2.nextx += ball2.velocityx);
            ball2.nexty = (ball2.nexty += ball2.velocityy);
            
            ball1.startPoint = new Point2D(ball1.nextx, ball1.nexty);
            ball2.startPoint = new Point2D(ball2.nextx, ball2.nexty);

            console.log("face>>>>>"+face);
          }
        }
      }
    }
  }

}

/*****
 *
 *   testNet
 *
 *****/
Game.prototype.testNet = function() {
  var ball;
  var testBall;
  var w = this.canvas.width;
  var h = this.canvas.height;
  var hasCollided = false;
  var b1 = this.balls[1];
  var b2 = this.balls[2];
  var b3 = this.balls[3];
  var b4 = this.balls[4];
  var bounce = 0.15;
  var score = false;
  for(var i = 0; i < this.balls.length; i++){
    ball = this.balls[i];
    ball1 = new Point2D(ball.startPoint.x, ball.startPoint.y);
    ball2 = new Point2D(ball.nextx, ball.nexty);

    // SCORE
    if(i==0 && !score){
      //goal1
      var p1 = new Point2D(this.balls[1].x+ball.radius,this.balls[1].y-ball.radius);
      var p2 = new Point2D(this.balls[2].x-ball.radius,this.balls[2].y-ball.radius);
      g1 = intersectLineLine(ball1, ball2, p1, p2);
      if(g1){
        alert('goal1');
        score = true;
      }
      //goal2
      var p1 = new Point2D(this.balls[3].x+ball.radius,this.balls[3].y+ball.radius);
      var p2 = new Point2D(this.balls[4].x-ball.radius,this.balls[4].y+ball.radius);
      g2 = intersectLineLine(ball1, ball2, p1, p2);
      if(g2){
        alert('goal2');
        score = true;
      }
    }

    c1 = intersectLineLine(new Point2D(b1.x,b1.y), new Point2D(b1.x,b1.y-this.field.goalHeight), ball1, ball2);
    if(c1){
      ball.velocityx = ball.velocityx*-bounce;
      if(ball.velocityx > 0)
        ball.nextx = b1.x+ball.radius;
      else
        ball.nextx = b1.x-ball.radius;
      hasCollided = true;
    }
    c2 = intersectLineLine(new Point2D(b2.x,b2.y), new Point2D(b2.x,b2.y-this.field.goalHeight), ball1, ball2);
    if(c2){
      ball.velocityx = ball.velocityx*-bounce;
      if(ball.velocityx > 0)
        ball.nextx = b2.x+ball.radius;
      else
        ball.nextx = b2.x-ball.radius;
      hasCollided = true;
    }
    c3 = intersectLineLine(new Point2D(b1.x,b1.y-this.field.goalHeight), new Point2D(b2.x,b2.y-this.field.goalHeight), ball1, ball2);
    if(c3){
      ball.velocityy = ball.velocityy*-bounce;
      if(ball.velocityy > 0)
        ball.nexty = b1.y-this.field.goalHeight + ball.radius;
      else
        ball.nexty = b1.y-this.field.goalHeight - ball.radius;
      hasCollided = true;
    }

    c4 = intersectLineLine(new Point2D(b3.x,b3.y), new Point2D(b3.x,b3.y+this.field.goalHeight), ball1, ball2);
    if(c4){
      ball.velocityx = ball.velocityx*-bounce;
      if(ball.velocityx > 0)
        ball.nextx = b3.x+ball.radius;
      else
        ball.nextx = b3.x-ball.radius;
      hasCollided = true;
    }
    c5 = intersectLineLine(new Point2D(b4.x,b4.y), new Point2D(b4.x,b4.y+this.field.goalHeight), ball1, ball2);
    if(c5){
      ball.velocityx = ball.velocityx*-bounce;
      if(ball.velocityx > 0)
        ball.nextx = b4.x+ball.radius;
      else
        ball.nextx = b4.x-ball.radius;
      hasCollided = true;
    }
    c6 = intersectLineLine(new Point2D(b3.x,b3.y+this.field.goalHeight), new Point2D(b4.x,b4.y+this.field.goalHeight), ball1, ball2);
    if(c6){
      ball.velocityy = ball.velocityy*-bounce;
      if(ball.velocityy > 0)
        ball.nexty = b3.y+this.field.goalHeight + ball.radius;
      else
        ball.nexty = b3.y+this.field.goalHeight - ball.radius;
      hasCollided = true;
    }

    if(hasCollided)
      ball.startPoint = new Point2D(ball.nextx, ball.nexty);
  }
}

/*****
 *
 *   get_x
 *
 *****/
Game.prototype.get_x = function() {
  return this._x;
}


/*****
 *
 *   get_y
 *
 *****/
Game.prototype.get_y = function() {
  return this._y;
}


/*****
 *
 *   storeMove
 *
 *****/
Game.prototype.storeMove = function(id,vx,vy) {
  var move = {
    positions:this.getPositions(),
    ball_id:id,
    vx:vx,
    vy:vy
  }
  this.movements.push(move)
}


/*****
 *
 *   makeMove
 *
 *****/
Game.prototype.makeMove = function(id,vx,vy) {
  this.selected_ball = this.balls[id];
  this.selected_ball.startPoint = new Point2D(this.selected_ball.x, this.selected_ball.y);
  this.selected_ball.velocityx = vx;
  this.selected_ball.velocityy = vy;
  if(this.selected_ball.velocityx > this.maxSpeed)
    this.selected_ball.velocityx = this.maxSpeed;
  if(this.selected_ball.velocityy > this.maxSpeed)
    this.selected_ball.velocityy = this.maxSpeed;
  this.running = true;
  this.currentPlayer = this.selected_ball.id;
}


/*****
 *
 *   goBackToMove
 *
 *****/
Game.prototype.goBackToMove = function(i) {  
  this.setPositions(this.movements[i].positions);
  this.makeMove(this.movements[i].ball_id,this.movements[i].vx,this.movements[i].vy);
}


/*****
 *
 *   setPositions
 *
 *****/
Game.prototype.setPositions = function(p) {
  for(var i = 0; i < this.balls.length; i++){
    b = this.balls[i];
    b.x = p[i].x;
    b.y = p[i].y;
  }
}


/*****
 *
 *   getPositions
 *
 *****/
Game.prototype.getPositions = function() {
  var r = new Array();
  for(var i = 0; i < this.balls.length; i++){
    r.push(new Point2D(this.balls[i].x,this.balls[i].y));
  }
  return r;
}


/*****
 *
 *   getCurrentState
 *
 *****/
Game.prototype.getCurrentState = function() {
  return stats = {
    game_id:i,
    time:"34:40",
    turn:55,
    team:1,
    positions:this.getPositions()
  }
}



/*****
 *
 *   setCurrentState
 *
 *****/
Game.prototype.setCurrentState = function(s) {
  this.time = s.time;
  this.turn = s.turn;
  this.team = s.team;
  for(var i = 0; i < s.positions.length; i++){
    var b = this.balls[i];
    var s = s.positions[i];
    b.x = s.x;
    b.y = s.y;
  }
}