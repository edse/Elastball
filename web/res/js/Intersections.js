/*****
*
*   intersectCircleLine
*
*****/
intersectCircleLine = function(c, r, a1, a2) {
    var result;
    var a  = (a2.x - a1.x) * (a2.x - a1.x) +
             (a2.y - a1.y) * (a2.y - a1.y);
    var b  = 2 * ( (a2.x - a1.x) * (a1.x - c.x) +
                   (a2.y - a1.y) * (a1.y - c.y)   );
    var cc = c.x*c.x + c.y*c.y + a1.x*a1.x + a1.y*a1.y -
             2 * (c.x * a1.x + c.y * a1.y) - r*r;
    var deter = b*b - 4*a*cc;

    if ( deter < 0 ) {
        //result = new Intersection("Outside");
        return false;
    } else if ( deter == 0 ) {
        //result = new Intersection("Tangent");
        return false;
        // NOTE: should calculate this point
    } else {
        var e  = Math.sqrt(deter);
        var u1 = ( -b + e ) / ( 2*a );
        var u2 = ( -b - e ) / ( 2*a );

        if ( (u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1) ) {
            if ( (u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1) ) {
                //result = new Intersection("Outside");
                return false;
            } else {
                //result = new Intersection("Inside");
                return false;
            }
        } else {

            if ( 0 <= u1 && u1 <= 1)
              result = a1.lerp(a2, u1);

            if ( 0 <= u2 && u2 <= 1)
              result = a1.lerp(a2, u2);
        }
    }
    
    return result;
};


/*****
 *
 *   intersectLineLine
 *
 *****/
intersectLineLine = function(a1, a2, b1, b2) {
  var result;

  var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
  var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
  var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

  if(u_b != 0) {
    var ua = ua_t / u_b;
    var ub = ub_t / u_b;

    if(0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
      result = new Point2D(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y));
    } else {
      return false;
      result = new Intersection("No Intersection");
    }
  } else {
    if(ua_t == 0 || ub_t == 0) {
      return false;
      result = new Intersection("Coincident");
    } else {
      return false;
      result = new Intersection("Parallel");
    }
  }

  return result;
};
