/*****
 *
 *   Timer.js
 *
 *****/

function Timer(id,m,s) {
  this.id = id;
  this.mins = m;
  this.secs = s;
  this.interval = null;

  this.update = function() {
    console.log('>>>>>'+this.id);
    console.log('>>>>>'+this.mins);
    console.log('>>>>>'+this.secs);
    
    if (this.secs === 0) {
      if (this.mins > 0) {
        this.mins -= 1;
        this.secs = 59;
      }
    } else {
      this.secs -= 1;
    }
    document.getElementById(this.id).innerHTML = this.toStr();
  }

  this.toStr = function() {
    var pad = function(num) { return (num < 10 ? "0" : "") + num; };
    return pad(this.mins) + ":" + pad(this.secs);
  }

  this.setSecs = function(s) {
    this.secs = s;
  }

  this.setMins = function(m) {
    this.mins = m;
  }

  this.start = function() {
    if(this.interval)
      clearInterval(this.interval);

    var me = this;
    this.interval = setInterval(function() {
      me.update();
    }, 660);
  }
  
}
