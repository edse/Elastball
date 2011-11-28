/*****
 *
 *   Team.js
 *
 *****/

/*****
 *
 *   constructor
 *
 *****/
function Team(slug, formation, player, color) {
  if(slug != "")
    this.slug = slug;
  else
    this.slug = "SPO";
  if(formation != "")
    this.formation = formation;
  else
    this.formation = Array(
      Array(300,250),
      Array(450,250),
      Array(600,250),
      Array(750,250),
      Array(200,600),
      Array(350,600),
      Array(850,600),
      Array(700,600),
      Array(490,625),
      Array(570,615),
      Array(570,615),
      Array(570,615),
      Array(570,615),
      Array(570,615),
      Array(570,615),
      Array(570,615),
      Array(570,615)
    );
  if(player)
    this.player = player;
  else
    this.player = null;
  if(color)
    this.color = color;
  else
    this.color = "rgba(218, 37, 29, 0.5)";

}

/*****
 *
 *   draw
 *
 ****
Point2D.prototype.draw = function() {
  return true;
};

*/
