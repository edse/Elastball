/*****
 *
 *   Field.js
 *
 *****/

/*****
 *
 *   constructor
 *
 *****/
function Field(width, height) {
  if(arguments.length > 0) {
    this.width = width;
    this.height = height;
  }
  else{
    this.width = 800;
    this.height = 1200;
  }
  this.radiusBall = 10;
  this.radiusCorner = 20;
  this.radiusMidfield = 100;
  this.penalty = 120;
  this.areaHeight = 180;
  this.areaWidth = 440;
  this.goalAreaHeight = 60;
  this.goalAreaWidth = 200;
  this.goalHeight = 40;
  this.goalWidth = 140;
}

/*****
 *
 *   draw
 *
 *****/
Field.prototype.draw = function() {
  return true;
};

