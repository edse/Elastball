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
function Field(game, width, height) {
  if(game)
    this.game = game;
  if(width)
    this.width = width;
  else
    this.width = 800;
  if(height)
    this.height = height;
  else
    this.height = 1200;

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

