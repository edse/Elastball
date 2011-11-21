/*****
 *
 *   Keeper.js
 *
 *****/

/*****
 *
 *   constructor
 *
 *****/
function Keeper(id, width, height, x, y, team) {
  if(arguments.length > 0) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.team = team;
  }
  else{
    this.id = 0;
    this.width = 90;
    this.height = 30;
    this.x = 0;
    this.y = 0;
    this.team = null;
  }
  this.speed = 0;
  this.angle = 0;
  this.mass = 1000;
}

/*****
 *
 *   draw
 *
 *****/
Keeper.prototype.draw = function() {
  return true;
}

