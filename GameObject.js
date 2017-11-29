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
  this.hitboxes = [];

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

  this.addHitbox = function(r){
    this.hitboxes.push(r);
  };

  this.getHitboxes = function(){
    return this.hitboxes;
  }

  this.clearHitboxes = function(){
    this.hitboxes = [];
  }

  this.collides = function(obj2){
    // For every rectangle in this object, check if any of them collide with the rectangles of
    // obj2
    if(this.hitboxes && this.hitboxes.length && obj2.getHitboxes() && obj2.getHitboxes().length){
      for(index = 0; index < this.hitboxes.length; index++){
        for(index2 = 0; index2 < obj2.getHitboxes().length; index2++){
          if(this.hitboxes[index].collides(obj2.getHitboxes()[index2])){
            return true;
          }
        }
      }
    }
    return false;
  };

  this.update = function(){

  };

  this.draw = function(){

  };
}
