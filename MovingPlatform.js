
function MovingPlatform(x, y, width, height){
  Platform.call(this, x, y, width, height);
  this.dx = 1;



  this.update = function(){
    this.makeHitboxes();

    if((this.x+this.width >= canvas.width) || this.x <= 0){
      this.dx *= -1;
    }

    this.x += 2*this.dx;
  };
}
