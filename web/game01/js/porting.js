/*****
 *
 *   draw
 *    - draws everything
 *
 *****/
draw = function(context, canvas, mouse, running) {
  //bg
  context.fillStyle = '#EEEEEE';
  context.fillRect(0,0,canvas.width,canvas.height);

  //box
  context.strokeStyle = '#000000';
  context.strokeRect(1,1,canvas.width-2,canvas.height-2);

  //game running
  if(running){
    update();
    collide();
    //testKeepers();
    //testNet();
    //testLateral();
    //testWalls();
  }
  
  drawField(context);
  render();

  context.fillText("x:"+mouse.x+" y:"+mouse.y, 248, 43);
}



/*****
 *
 *   drawField
 *    - drawField
 *
 *****/
drawField = function(context) {

  context.save(); 
  context.translate(_x, _y);
  
  //field
  context.strokeStyle = '#FFF';
  context.fillStyle = "#FFF";
  context.lineWidth = 3;
  var x0 = (width-field.width)/2;
  var y0 = (height-field.height)/2;
  var halfW = field.width/2;
  var halfH = field.height/2;
  //grass
  context.save();
  context.fillStyle = "rgba(82,132,61, 1)";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "rgba(49,107,56, 1)";
  var h = field.height/15;
  for(var i=0; i<field.height/h; i++){
    if(i%2!=1) context.fillRect(x0, y0+(i*h), field.width, h);
  }
  context.restore();
  context.save();
  //touch line
  context.strokeRect(x0, y0, field.width, field.height);
  
  //midfield
  context.beginPath();
  context.arc(x0+halfW, y0+halfH, field.radiusMidfield, 0, Math.PI*2, true);
  context.closePath();
  context.stroke();
  
  //midfield line
  context.beginPath();
  context.moveTo(x0, y0+halfH);
  context.lineTo(x0+field.width, y0+halfH);
  context.closePath();
  context.stroke();
  
  //midfield ball mark
  context.beginPath();
  //context.fillArc(x0+halfW, y0+halfH, field.radiusBall, 0, Math.PI*2, true);
  context.closePath();
  //context.fill();
  
  //midfield ball mark
  /*
  context.beginPath();
  context.arc(x0+halfW, y0+halfH, field.radiusBall, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
  */
 
  //midfield
  /*
  context.beginPath();
  context.arc(x0+halfW, y0+halfH, field.radiusMidfield, 0, Math.PI*2, true);
  context.closePath();
  context.stroke();
  */

  context.restore();  
  
  //goals
  var gx = x0+halfW-(field.goalWidth/2);
  var gy = y0;
  context.save();
  context.lineWidth = 8;
  context.fillStyle = "rgba(105, 105, 105, 0.8)";
  //goal1
  context.moveTo(gx, gy);
  //context.lineTo(x0+halfW-(field.goalWidth/2) + field.goalWidth, y0 + field.goalHeight);
  context.lineTo(gx, y0-field.goalHeight);
  context.lineTo(gx + field.goalWidth, y0 - field.goalHeight);
  context.lineTo(gx + field.goalWidth, y0);
  //context.lineTo(gx, gy);
  context.stroke();

  //goal2
  context.moveTo(gx, y0+field.height);  
  //context.fillRect(x0+halfW-(field.goalWidth/2), y0+field.height, field.goalWidth, field.goalHeight);
  context.lineTo(gx, y0+field.height+field.goalHeight);
  context.lineTo(gx + field.goalWidth, y0+field.height+field.goalHeight);
  context.lineTo(gx + field.goalWidth, y0+field.height);
  context.stroke();
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
  
  //goal1
  context.save();
  context.lineWidth = 1;
  context.strokeStyle = "rgba(250, 0, 0, 1)";
  var ball = balls[0];
  var p1 = new Point2D(balls[1].x+ball.radius,balls[1].y-ball.radius);
  var p2 = new Point2D(balls[1].x+ball.radius,balls[1].y+ball.radius-field.goalHeight);
  var p3 = new Point2D(balls[2].x-ball.radius,balls[2].y-ball.radius);
  var p4 = new Point2D(balls[2].x-ball.radius,balls[2].y+ball.radius-field.goalHeight);
  
  context.moveTo(p1.x, p1.y);  
  context.lineTo(p2.x, p2.y);
  context.lineTo(p4.x, p4.y);
  context.lineTo(p3.x, p3.y);
  context.lineTo(p1.x, p1.y);
  context.stroke();

  //goal2
  var p1 = new Point2D(balls[3].x+ball.radius,balls[3].y+ball.radius);
  var p2 = new Point2D(balls[3].x+ball.radius,balls[3].y-ball.radius+field.goalHeight);
  var p3 = new Point2D(balls[4].x-ball.radius,balls[4].y+ball.radius);
  var p4 = new Point2D(balls[4].x-ball.radius,balls[4].y-ball.radius+field.goalHeight);

  context.moveTo(p1.x, p1.y);  
  context.lineTo(p2.x, p2.y);
  context.lineTo(p4.x, p4.y);
  context.lineTo(p3.x, p3.y);
  context.lineTo(p1.x, p1.y);

  context.stroke();

  context.restore();

  context.restore();
  
}
