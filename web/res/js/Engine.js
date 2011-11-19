/*****
 *
 *   Engine.js
 *
 *****/

function Engine() {
  
  //mouse
  $('#canvasOne').mousemove(function(event) {
    mouse_x =  (event.pageX)*zoom;
    mouse_y = (event.pageY)*zoom;
    $('#mouse').val(mouse_x+', '+mouse_y);
  });
  $('#canvasOne').mousedown(function(event) {
    mouse_down_x =  (event.pageX);
    mouse_down_y = (event.pageY);
    mouse_down = true;
    mouse_up = false;
    mouse_up_x = 0;
    mouse_up_y = 0;
  });
  $('#canvasOne').mouseup(function(event) {
    mouse_up_x = (event.pageX);
    mouse_up_y = (event.pageY);
    mouse_up = true;
    mouse_down = false;
    mouse_down_x = 0;
    mouse_down_y = 0;
    if(selected_ball != null){
      if(selected_ball.id != "move" && selected_ball.id != "rotate"){
        selected_ball.startPoint = new Point2D(selected_ball.x, selected_ball.y);
        selected_ball.velocityx = (selected_ball.x - mouse_up_x) * 0.1;
        selected_ball.velocityy = (selected_ball.y - mouse_up_y) * 0.1;
        if(selected_ball.velocityx > maxSpeed)
          selected_ball.velocityx = maxSpeed;
        if(selected_ball.velocityy > maxSpeed)
          selected_ball.velocityy = maxSpeed;
        
        $('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+selected_ball.id+"<->"+selected_ball.velocityx+"<->"+selected_ball.velocityy);
        send();
        
        running = true;
        $('#running').val("true");
        currentPlayer = selected_ball.id;
        $('#current_player').val(currentPlayer);
        $('#last_collision').val('');
      }
      else if(selected_ball.id == "rotate"){
        //alert(keepers[0].angle)
        $('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+"k"+selected_ball.k+"<->"+keepers[selected_ball.k].angle);
        send();
      }
      else if(selected_ball.id == "move"){
        //alert(keepers[0].angle)
        $('#msg').val("gamemove<->"+$('#game_id').val()+"<->"+"k"+selected_ball.k+"<->"+keepers[selected_ball.k].x+"<->"+keepers[selected_ball.k].y);
        send();
      }
    }
    selected_ball = null;
  });

  function drawField(){
    //field
    context.strokeStyle = '#FFF';
    context.fillStyle = "#FFF";
    context.lineWidth = 3;
    var x0 = (theCanvas.width-field.width)/2;
    var y0 = (theCanvas.height-field.height)/2;
    var halfW = field.width/2;
    var halfH = field.height/2;
    //grass
    context.save();
    context.fillStyle = "rgba(82,132,61, 1)";
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    context.fillStyle = "rgba(49,107,56, 1)";
    var h = field.height/15;
    for(var i=0; i<field.height/h; i++){
      if(i%2!=1) context.fillRect(x0, y0+(i*h), field.width, h);
    }
    context.restore();
    //touch line
    context.strokeRect(x0, y0, field.width, field.height);
    //midfield line
    context.moveTo(x0, y0+halfH);
    context.lineTo(x0+field.width, y0+halfH);
    context.stroke();
    //midfield ball mark
    context.beginPath();
    context.arc(x0+halfW, y0+halfH, field.radiusBall, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
    //midfield
    context.beginPath();
    context.arc(x0+halfW, y0+halfH, field.radiusMidfield, 0, Math.PI*2, true);
    context.closePath();
    context.stroke();
    
    //goals
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    //goal1
    context.fillRect(x0+halfW-(field.goalWidth/2), y0, field.goalWidth, -field.goalHeight);
    //goal2
    context.fillRect(x0+halfW-(field.goalWidth/2), y0+field.height, field.goalWidth, field.goalHeight);
    context.restore();

    //area1
    context.strokeRect(((field.width-field.areaWidth)/2)+x0, y0, field.areaWidth, field.areaHeight);
    context.strokeRect(((field.width-field.goalAreaWidth)/2)+x0, y0, field.goalAreaWidth, field.goalAreaHeight);
    context.beginPath();
    context.arc(x0+halfW, y0+field.penalty, field.radiusMidfield, 0.64, Math.PI-0.64, false);
    context.stroke();
    //penalty mark
    context.beginPath();
    context.arc(x0+halfW, y0+field.penalty, field.radiusBall, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
    //area2
    context.strokeRect(((field.width-field.areaWidth)/2)+x0, (y0+field.height)-field.areaHeight, field.areaWidth, field.areaHeight);
    context.strokeRect(((field.width-field.goalAreaWidth)/2)+x0, (y0+field.height)-field.goalAreaHeight, field.goalAreaWidth, field.goalAreaHeight);
    context.beginPath();
    context.arc(x0+halfW, (y0+field.height)-field.penalty, field.radiusMidfield, -0.64, Math.PI+0.64, true);
    context.stroke();
    //penalty mark
    context.beginPath();
    context.arc(x0+halfW, (y0+field.height)-field.penalty, field.radiusBall, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
    //corners
    context.beginPath();
    context.arc(x0, y0, field.radiusCorner, 0, Math.PI/2, false);
    context.stroke();
    context.beginPath();
    context.arc(x0+field.width, y0, field.radiusCorner, Math.PI/2, Math.PI, false);
    context.stroke();
    context.beginPath();
    context.arc(x0, y0+field.height, field.radiusCorner, 0, -Math.PI/2, true);
    context.stroke();
    context.beginPath();
    context.arc(x0+field.width, y0+field.height, field.radiusCorner, -Math.PI/2, -Math.PI, true);
    context.stroke();
  }
  
  function drawScreen(){
    //bg
    context.fillStyle = '#EEEEEE';
    context.fillRect(0,0,theCanvas.width,theCanvas.height);
    //box
    context.strokeStyle = '#000000';
    context.strokeRect(1,1,theCanvas.width-2,theCanvas.height-2);
    if($('#running').val()=="true"){
      update();
      //testLateral();
      collide();
      testWalls();
      testKeepers();
    }
    drawField();
    render();
  }

  function update(){
    var r = false;
    balls[1].speed = Math.sqrt(balls[1].velocityx * balls[1].velocityx + balls[1].velocityy * balls[1].velocityy);
    $('#test').val(balls[1].speed);
    $('#mass').val(balls[0].mass);
    for(var i = 0; i < balls.length; i++){
      ball = balls[i];
      //friction
      ball.velocityx = ball.velocityx - (ball.velocityx * friction);
      ball.velocityy = ball.velocityy - (ball.velocityy * friction);
      ball.nextx = (ball.x += ball.velocityx);
      ball.nexty = (ball.y += ball.velocityy);
      if((Math.abs(ball.velocityx) > 0.01)||(Math.abs(ball.velocityy) > 0.01))
        r = true;
      if(ball.velocityx > maxSpeed)
        ball.velocityx = maxSpeed;
      if(ball.velocityy > maxSpeed)
        ball.velocityy = maxSpeed;
    }
    running = r;
    if(r)
      $('#running').val("true");
    else
      $('#running').val("false");
  }
  
  function testLateral(){
    var ball = balls[0];
    var x0 = (theCanvas.width-field.width)/2;
    var y0 = (theCanvas.height-field.height)/2;

    if(ball.nextx+(ball.radius*zoom) > x0+field.width){
      //alert('1');
    }else if(ball.nextx-(ball.radius*zoom) < x0){
      //alert('2');
    }else if(ball.nexty+(ball.radius*zoom) > y0+field.height){
      //alert('3');
    }else if(ball.nexty-(ball.radius*zoom) < y0){
      //alert('4');
    }
  }
  
  function testWalls(){
    var ball;
    var testBall;
    var w = theCanvas.width;
    var h = theCanvas.height;
    var hasCollided = false;
    for(var i = 0; i < balls.length; i++){
      ball = balls[i];
      if(ball.nextx+(ball.radius*zoom) > w){
        ball.velocityx = ball.velocityx*-1;
        ball.nextx = w-(ball.radius*zoom);
        hasCollided = true;
        //ball.anglespeed = Math.atan(ball.velocityy/ball.velocityx);
      }else if(ball.nextx-(ball.radius*zoom) < 0){
        ball.velocityx = ball.velocityx*-1;
        ball.nextx = (ball.radius*zoom); 
        hasCollided = true;
        //ball.anglespeed = Math.atan(ball.velocityy/ball.velocityx);
      }else if(ball.nexty+(ball.radius*zoom) > h){
        ball.velocityy = ball.velocityy*-1;
        ball.nexty = h-(ball.radius*zoom); 
        hasCollided = true;
        //ball.anglespeed = Math.atan(ball.velocityy/ball.velocityx);
      }else if(ball.nexty-(ball.radius*zoom) < 0){
        ball.velocityy = ball.velocityy*-1;
        ball.nexty = (ball.radius*zoom); 
        hasCollided = true;
        //ball.anglespeed = Math.atan(ball.velocityy/ball.velocityx);
      }
      
      if(hasCollided)
        ball.startPoint = new Point2D(ball.nextx, ball.nexty);
        
      //Test goal1
      /*
      var x0 = (theCanvas.width-field.width)/2;
      var y0 = (theCanvas.height-field.height)/2;
      var halfW = field.width/2;
      var halfH = field.height/2;
      
      var left_x = x0+halfW-(field.goalWidth/2);
      var left_y = y0;
      */
    }
  }

  function testKeepers(){
    var ball;
    var testBall;
    var w = theCanvas.width;
    var h = theCanvas.height;
    for(var i = 0; i < balls.length; i++){            
      ball = balls[i];
                  
      for(var j = 0; j < keepers.length; j++){
        keeper = keepers[j];

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

        /*
        */
       
        //p1 = new Point2D(keeper.x-(keeper.width/2)-ball.radius, (keeper.y-(keeper.height/2))-ball.radius);
        //p2 = new Point2D(keeper.x+(keeper.width/2)+ball.radius, (keeper.y-(keeper.height/2))-ball.radius);
        //p3 = new Point2D(keeper.x+(keeper.width/2)+ball.radius, (keeper.y+(keeper.height/2))+ball.radius);
        //p4 = new Point2D(keeper.x-(keeper.width/2)-ball.radius, (keeper.y+(keeper.height/2))+ball.radius);

        if(!pointIsOverRect(new Point2D(ball.nextx, ball.nexty), p1, p2, p3, p4)){
                          
          b1 = new Point2D(ball.startPoint.x, ball.startPoint.y);
          b2 = new Point2D(ball.x, ball.y);
          
          c1 = new Point2D(ball.startPoint.x-ball.radius, ball.startPoint.y-ball.radius);
          c2 = new Point2D(ball.nextx-ball.radius, ball.nexty-ball.radius);

          d1 = new Point2D(ball.startPoint.x, ball.startPoint.y);
          d2 = new Point2D(ball.nextx+ball.radius, ball.nexty+ball.radius);
          
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
            };
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
              $('#p1x').val(c1.x);
              $('#p1y').val(c1.y);
              c = c1;
              tempBall.velocityx = 0;
              tempBall.velocityy = 0;
              tempBall.nextx = tempBall.x;
              tempBall.nexty = tempBall.y;
              collideBalls(tempBall, ball);
            }else if(!near){
              $('#p1x').val(c.x);
              $('#p1y').val(c.y);
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
  
  function render(){
    var ball;
    var over;
    var overKeeper;
    var t;
    for(var i = 0; i < balls.length; i++){
      ball = balls[i];
      over = mouseIsOver(ball);
      //if(over && (!mouse_down))
      //  context.fillStyle = "rgba(218, 37, 29, 0.5)";
      if((ball == selected_ball)||(ball.isBall))
        context.fillStyle = "rgba(255, 255, 255, 1)";
      ball.x = ball.nextx;
      ball.y = ball.nexty;
      context.save();
      if(!ball.isBall){
        if(ball.team == 1)
          t = "a";
        else if(ball.team == 2)
          t = "b";
        if(i>=(numBalls)/2)
          t = t+((i)-(numBalls-1)/2);
        else
          t = t+(i);
        //console.log(">"+t);
        context.beginPath();
        context.translate(ball.x, ball.y);
        context.rotate(ball.rangle);
        imgP = document.getElementById(t);
        m = document.getElementById("model");

        context.shadowColor="black";
        context.drawImage(imgP, -(ball.radius*zoom), -(ball.radius*zoom), (ball.radius*zoom)*2, (ball.radius*zoom)*2);
        context.drawImage(m, -(ball.radius*zoom), -(ball.radius*zoom), (ball.radius*zoom)*2, (ball.radius*zoom)*2);
        if(over && (!mouse_down)){
          if(ball.team == 1)
            context.fillStyle = "rgba(218, 37, 29, 0.1)";
          else if(ball.team == 2)
            context.fillStyle = "rgba(74, 133, 255, 0.1)";

          context.arc(0, 0, (ball.radius*zoom), 0, Math.PI * 2, true);
          context.fill();
        }
      }else{
        
        var s = Math.sqrt(ball.velocityx * ball.velocityx + ball.velocityy * ball.velocityy);
        context.beginPath();
        context.translate(ball.x, ball.y);
        context.shadowColor="black";
        context.shadowOffsetX = 1*s;
        context.shadowOffsetY = 1*s;
        context.shadowBlur = 5;
        context.arc(0, 0, (ball.radius*zoom), 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
      }

      //context.stroke();
      //context.fill();
      context.restore();
      context.closePath();
      //context.restore();
      //select ball
      if((selected_ball == null)&&(over)&&(mouse_down)&&(!ball.isBall)){
        selected_ball = ball;
        currentPlayer = i;
      }
    }
    
    //pointer
    if((mouse_down_x != 0 && mouse_down_y != 0)&&(selected_ball != null)){
      if(selected_ball.id != "move" && selected_ball.id != "rotate"){
        var dx = mouse_x - selected_ball.x;
        var dy = mouse_y - selected_ball.y;
        var _x = selected_ball.x-dx;
        var _y = selected_ball.y-dy;
        var dx2 = selected_ball.x - _x;
        var dy2 = selected_ball.y - _y;

        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "rgba(255, 0, 0, 0.5)";
        context.moveTo(mouse_x,mouse_y);
        context.lineTo(selected_ball.x, selected_ball.y);
        context.stroke();
        context.lineWidth = 2;
        context.strokeStyle = "rgba(255, 0, 0, 0.3)";
        context.lineTo(_x, _y);
        context.stroke();
        context.lineWidth = 1;
        context.strokeStyle = "rgba(255, 0, 0, 0.1)";
        context.lineTo(_x-dx2, _y-dy2);
        context.stroke();
      }
    }
    
    
    for(var i = 0; i < keepers.length; i++){
      keeper = keepers[i];

      //keeper 1
      //for??????????
      //keeper = keepers[0];
      context.fillStyle = "rgba(255, 0, 0, 1)";
      context.strokeStyle = 'rgba(255,255,255,1)';
      //context.fill();
      
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

      rep1 = new Point2D(
        keeper.x-((keeper.width+balls[1].radius*2)/2)*Math.cos(keeper.angle)+((keeper.height+balls[1].radius*2)/2)*Math.sin(keeper.angle),
        keeper.y-((keeper.height+balls[1].radius*2)/2)*Math.cos(keeper.angle)-((keeper.width+balls[1].radius*2)/2)*Math.sin(keeper.angle)
      );
      rep2 = new Point2D(
        keeper.x+((keeper.width+balls[1].radius*2)/2)*Math.cos(keeper.angle)+((keeper.height+balls[1].radius*2)/2)*Math.sin(keeper.angle),
        keeper.y-((keeper.height+balls[1].radius*2)/2)*Math.cos(keeper.angle)+((keeper.width+balls[1].radius*2)/2)*Math.sin(keeper.angle)
      );
      rep3 = new Point2D(
        keeper.x+((keeper.width+balls[1].radius*2)/2)*Math.cos(keeper.angle)-((keeper.height+balls[1].radius*2)/2)*Math.sin(keeper.angle),
        keeper.y+((keeper.height+balls[1].radius*2)/2)*Math.cos(keeper.angle)+((keeper.width+balls[1].radius*2)/2)*Math.sin(keeper.angle)
      );
      rep4 = new Point2D(
        keeper.x-((keeper.width+balls[1].radius*2)/2)*Math.cos(keeper.angle)-((keeper.height+balls[1].radius*2)/2)*Math.sin(keeper.angle),
        keeper.y+((keeper.height+balls[1].radius*2)/2)*Math.cos(keeper.angle)-((keeper.width+balls[1].radius*2)/2)*Math.sin(keeper.angle)
      );

      overKeeper = mouseIsOverRect(rp1,rp2,rp3,rp4);
      
      tempBall = {
        id:"move",
        x:keeper.x,
        y:keeper.y,
        nextx:keeper.x,
        nexty:keeper.y,
        radius:21,
        k:i
      };
      overMoveKeeper = mouseIsOver(tempBall);
      if((selected_ball == null)&&(overMoveKeeper)&&(mouse_down)){
        selected_ball = tempBall;
      }

      tempBall = {
        id:"rotate",
        x:rp2.x,
        y:rp2.y,
        nextx:rp2.x,
        nexty:rp2.y,
        radius:21,
        k:i
      };
      overRotateKeeper = mouseIsOver(tempBall);
      if((selected_ball == null)&&(overRotateKeeper)&&(mouse_down)){
        selected_ball = tempBall;
      }

      if(selected_ball != null){
        if((selected_ball.id == "move")&&(mouse_down)&&(selected_ball.k == i)){
          //move
          if(mouse_down_x != 0 && mouse_down_y != 0){
            keeper.x = mouse_x;
            keeper.y = mouse_y;
          }
        }

        if((selected_ball.id == "rotate")&&(mouse_down)&&(selected_ball.k == i)){
          //rotate
          if(mouse_down_x != 0 && mouse_down_y != 0){
            var dx = mouse_x - keeper.x + 21;
            var dy = mouse_y - keeper.y + 21;
            keeper.angle = Math.atan2(dy, dx);
          }
        }
      }

      if(overKeeper || overMoveKeeper || overRotateKeeper){
        context.save();
        context.beginPath();
        if(overMoveKeeper)
          context.strokeStyle = "rgba(255, 255, 0, 1)";
        else
          context.strokeStyle = "rgba(255, 0, 0, 0.5)";
        context.arc(keeper.x, keeper.y, 21, 0, Math.PI * 2, true);
        context.stroke();
        context.closePath();
        context.beginPath();
        if(overRotateKeeper)
          context.strokeStyle = "rgba(255, 255, 0, 1)";
        else
          context.strokeStyle = "rgba(255, 0, 0, 0.5)";
        context.arc(rp2.x, rp2.y, 21, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        context.restore();
      }

      context.beginPath();        
      context.moveTo(rp1.x, rp1.y);
      context.lineTo(rp2.x, rp2.y);
      context.lineTo(rp3.x, rp3.y);
      context.lineTo(rp4.x, rp4.y);
      context.lineTo(rp1.x, rp1.y);
      context.closePath();
      context.stroke();
      context.restore();

      context.strokeStyle = 'rgba(155,155,250,0.5)';
      context.beginPath();
      context.arc(rp1.x, rp1.y, (balls[1].radius), 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.arc(rp2.x, rp2.y, (balls[1].radius), 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.arc(rp3.x, rp3.y, (balls[1].radius), 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.arc(rp4.x, rp4.y, (balls[1].radius), 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      
      context.moveTo(rep1.x, rep1.y);
      context.lineTo(rep2.x, rep2.y);
      context.lineTo(rep3.x, rep3.y);
      context.lineTo(rep4.x, rep4.y);
      context.lineTo(rep1.x, rep1.y);
      context.stroke();
      
    }

    //b1-b2
    context.beginPath();
    context.strokeStyle = 'rgba(255,10,10,0.5)';
    context.moveTo($('#b1x').val(), $('#b1y').val());
    context.lineTo($('#b2x').val(), $('#b2y').val());
    context.stroke();
    context.closePath();

    //p1
    context.save();
    context.beginPath();
    context.translate($('#p1x').val(), $('#p1y').val());
    context.arc(0, 0, 1, 0, Math.PI * 2, true);
    context.stroke();
    context.fill();
    context.closePath();
    context.restore();
    
    //normal
    if($('#p1x').val() != ""){
      px = parseFloat($('#p1x').val());
      py = parseFloat($('#p1y').val());
      nx = px - balls[1].radius;
      ny = py - balls[1].radius;
      length = Math.sqrt(nx * nx + ny * ny);
      nx /= length;
      ny /= length;
      projection = balls[1].velocityx * nx + balls[1].velocityy * ny;
      ppx = balls[1].velocityx - 2 * projection * nx;
      ppy = balls[1].velocityy - 2 * projection * ny;
                
      context.save();
      context.beginPath();
      context.strokeStyle = 'rgba(255,220,20,1)';
      context.moveTo(px, py);
      context.lineTo(px*ppx, py*ppy);
      context.stroke();
      context.closePath();
      context.restore();
      $('#p1x').val(""  );
    }

  }
  
  function collide(){
    var ball;
    var testBall;
    var first_hit;
    var last_hit;
    var turn;
    for(var i = 0; i < balls.length; i++){
      ball = balls[i];
      for(var j = i+1; j < balls.length; j++){
        testBall = balls[j];
        if(hitTestCircle(ball,testBall)){
          if(ball.id==0){
            last_hit = testBall.id;
            turn = testBall.team;
          }
          //Fault
          if(currentPlayer == i || currentPlayer == j){
            if(!first_hit)
              first_hit = testBall.id;
            //if(!testBall.isBall && !ball.isBall)
              //alert('fault?');
          }
          collideBalls(ball, testBall);
        }
      }
    }
    $('#turn').val(turn);
    $('#first_collision').val(first_hit);
    $('#last_collision').val(last_hit);
  }
  
  function mouseIsOver(ball){
    var retval = false;
    if((mouse_x > 0 && mouse_y > 0)&&(ball.x > 0 && ball.y > 0)){
      $('#mouse').val(mouse_x+', '+mouse_y);
      if(((mouse_x >= (ball.x - ball.radius)) && (mouse_x <= (ball.x + ball.radius)))&&
      ((mouse_y >= (ball.y - ball.radius)) && (mouse_y <= (ball.y + ball.radius)))){
        retval = true;
      }
    }
    return retval;
  }
  
  function mouseIsOverRect(p1, p2, p3, p4){
    var poly = new Array();
    poly[0]=p1;
    poly[1]=p2;
    poly[2]=p3;
    poly[3]=p4;
    pt = new Point2D(mouse_x, mouse_y);
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
  }
  
  function pointIsOverRect(pt, p1, p2, p3, p4){
    var poly = new Array();
    poly[0]=p1;
    poly[1]=p2;
    poly[2]=p3;
    poly[3]=p4;
    pt = new Point2D(mouse_x, mouse_y);
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
  }

  function hitTestCircle(ball1, ball2){
    var retval = false;
    var dx = ball1.nextx - ball2.nextx;
    var dy = ball1.nexty - ball2.nexty;
    var distance = (dx * dx + dy * dy);
    if(distance <= ((ball1.radius*zoom) + (ball2.radius*zoom)) * ((ball1.radius*zoom) + (ball2.radius*zoom))){
      retval = true;
    }
    return retval;
  }
  
  function collideBalls(ball1, ball2){
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

  }


  var numBalls = 21;
  var maxSize = 25;
  var minSize = 25;
  var maxSpeed = maxSize+5;
  var balls = new Array();
  var tempBall;
  var tempX;
  var tempY;
  var tempSpeed;
  var tempAngle;
  var tempRadius;
  var tempRadians;
  var tempVelocityx;
  var tempVelocityy;
  var friction = 0.06;
  var mouse_x = 0;
  var mouse_y = 0;
  var mouse_down_x = 0;
  var mouse_down_y = 0;
  var mouse_up_x = 0;
  var mouse_up_y = 0;
  var selected_ball = null;
  var mouse_down = false;
  var mouse_up = false;
  
  var test = "";
  
  var currentPlayer = null;
  var team1 = new Array();
  var team2 = new Array();
  
  var keepers = new Array();

  var teamHome = {
    slug:"SPO",
    formation: Array(
      Array(300,250),
      Array(450,250),
      Array(600,250),
      Array(750,250),
      Array(200,600),
      Array(350,600),
      Array(850,600),
      Array(700,600),
      Array(450,500),
      Array(600,500)
    )
  }
  var teamAway = {
    slug:"SPO",
    formation: Array(
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
    )
  }

  var field = {
    width:800,
    height:1200,
    radiusBall:10,
    radiusCorner:20,
    radiusMidfield:100,
    penalty:120,
    areaHeight:180,
    areaWidth:440,
    goalAreaHeight:60,
    goalAreaWidth:200,
    goalHeight:40,
    goalWidth:140,
  };

  var zoom = 1;

  theCanvas = document.getElementById("canvasOne");
  context = theCanvas.getContext("2d");
  context.scale(zoom,zoom);
  
  var angle1 = 0;
  var angle2 = 0;
  
  for(var i = 0; i < numBalls; i++){
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
      startPoint: new Point2D(0,0)
    };
    if(balls.length <= 0){
      var x0 = parseFloat((theCanvas.width-field.width)/2);
      var y0 = parseFloat((theCanvas.height-field.height)/2);
      var halfW = parseFloat(field.width/2);
      var halfH = parseFloat(field.height/2);
      tempBall.id = i;
      tempBall.isBall=true;
      tempBall.radius=5;
      tempBall.x=parseFloat(x0+halfW);
      tempBall.y=parseFloat(y0+halfH);
      tempBall.nextx=parseFloat(x0+halfW);
      tempBall.nexty=parseFloat(y0+halfH);
      tempBall.mass=10;
    }else{
      if(i <= (numBalls-1)/2){
        var j = i-1;
        console.log('j>>'+j);
        tempBall.team = 1;
        tempBall.x = teamHome.formation[j][0];
        tempBall.y = teamHome.formation[j][1];
        tempBall.nextx = teamHome.formation[j][0];
        tempBall.nexty = teamHome.formation[j][1];
        team1.push(tempBall);
      }
      else{
        var j = (i-(numBalls-1)/2)-1;
        console.log('j>>'+j);
        tempBall.team = 2;
        tempBall.x = teamAway.formation[j][0];
        tempBall.y = teamAway.formation[j][1];
        tempBall.nextx = teamAway.formation[j][0];
        tempBall.nexty = teamAway.formation[j][1];
        team2.push(tempBall);
      }
      tempBall.anglespeed = 0;
      tempBall.rangle = 0;
      tempBall.velocityx = 0;
      tempBall.velocityy = 0;
      tempBall.speed = 0;
    }
    balls.push(tempBall);
    console.log('>>'+balls.length);
  }

  //goal keepers
  keeper1 = {
    id:1,
    x:((theCanvas.width-field.width)/2)+field.width/2,
    y:((theCanvas.height-field.height)/2)+60,
    width:120,
    height:45,
    angle:0,
    mass:1000
  };
  keepers.push(keeper1);
  keeper2 = {
    id:2,
    x:((theCanvas.width-field.width)/2)+field.width/2,
    y:((theCanvas.height-field.height)/2)+field.height-60,
    width:120,
    height:45,
    angle:0,
    mass:1000
  };
  keepers.push(keeper2);

  
  function canStartHere(ball){
    var retval = true;
    for(var i = 0; i < balls.length; i++){
      if(hitTestCircle(ball, balls[i])){
        retval = false;
        console.log('CANT!');
      }
    }
    return retval;
  }
  
  function playerMove(index, vx, vy){
    b = balls[index];
    b.startPoint = new Point2D(b.x, b.y);
    b.velocityx = vx;
    b.velocityy = vy;
    running = true;
    $('#running').val("true");
  }

////////////////////////////////////////
/*
      var socket;
      var host = "ws://localhost:12363";
      try {
        // Firefox accept only MozWebSocket
        socket = ("MozWebSocket" in window ? new MozWebSocket (host) : new WebSocket(host));
        log ('Connecting - status ' + socket.readyState);
        
        socket.onopen = function (msg) {
          log ("Welcome - status " + this.readyState);
          
        }

        socket.onmessage = function (msg) {
          log ("Received: " + msg.data);
          arr = msg.data.split("<->");
          if(msg.data[0] == "k"){
            arr[0] = arr[0].substring(1,arr[0].lenght);
            if(arr[2]>0){
              keepers[arr[0]].x = parseFloat(arr[1]);
              keepers[arr[0]].y = parseFloat(arr[2]);
              //alert('move: '+keepers[arr[0]].x+","+keepers[arr[0]].y);
            }else{
              //alert('rotate: '+arr[1]);
              keepers[arr[0]].angle = parseFloat(arr[1]);
            }
          }else if(arr[2]!=""){
            alert('move: '+arr[1]+","+arr[2]);
            balls[arr[0]].startPoint = new Point2D(balls[arr[0]].x, balls[arr[0]].y);
            balls[arr[0]].velocityx = arr[1];
            balls[arr[0]].velocityy = arr[2];
            running = true;
            $('#running').val("true");
            currentPlayer = balls[arr[0]].id;
            $('#current_player').val(currentPlayer);
            $('#last_collision').val('');
          }
        }

        socket.onclose = function (msg) {
          log ("Disconnected - status " + this.readyState); 
        }

        socket.onerror = function (msg) {
          log ("Disconnected - status " + this.readyState + " - " + msg); 
        }
      }
      catch (ex) {
        log (ex);
      }

      function send () {
        var txt, msg;
        txt = document.getElementById("msg");
        msg = txt.value;
        if (!msg) {
          alert ("Message can not be empty");
          return;
        }
        txt.value = "";
        try {
          socket.send (msg);
          log ('Sent: ' + msg);
        }
        catch (ex) {
          log (ex);
        }
      }
      
      function quit () {
        log ("Goodbye!");
        socket.close ();
        socket = null;
      }
      
      function log (msg) {
        document.getElementById("log").innerHTML += "<br>" + msg;
      }

*/
////////////////////////////////////////
  
  //drawScreen();
  setInterval(drawScreen, 33);

}
