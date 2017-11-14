/**
 *
 */
function GameObject(x, y, width, height){
  //GameObject initialization
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.enemy = 0;

  this.getX = function(){
    return this.x;
  };

  this.getY = function(){
    return this.y;
  };

  this.getWidth = function(){
    return this.width;
  };

  this.getHeight = function(){
    return this.height;
  };

  this.collides = function(obj2){
    if ((this.x <= (obj2.getX()+obj2.getWidth())) || (this.x + this.width >= obj2.getX())){ //if the left side of this is before the right side of... HOLD ON THIS NEEDS FIXED
      return true;
    }
    return false;
  };

  this.update = function(){

  };

  this.draw = function(){

  };
}
