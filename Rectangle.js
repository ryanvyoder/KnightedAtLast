function Rectangle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.hitboxColor = "rgba(0, 0, 255, .2)";

  this.collides = function(rectangle){
    if(!rectangle){
      return false;
    }
    // This right side past other's left side
    if(this.x + this.width >= rectangle.getX() && this.x + this.width <= rectangle.getX() + rectangle.getWidth()){
      // This bottom right corner is inside the other rectangle
      if(this.y + this.height >= rectangle.getY() && this.y + this.height <= rectangle.getY() + rectangle.getHeight()){
        return true;
      }
      // This upper right corner is inside the other rectangle
      if(this.y <= rectangle.getY() + rectangle.getHeight() && this.y >= rectangle.getY()){
        return true;
      }
    }
    // This left side past other's right side
    if(this.x <= rectangle.getX() + rectangle.getWidth() && this.x >= rectangle.getX()){
      // This upper left corner is inside the other rectangle
      if(this.y <= rectangle.getY() + rectangle.getHeight() && this.y >= rectangle.getY()){
        return true;
      }
      // This lower left corner is inside the other rectangle
      if(this.y + this.height >= rectangle.getY() && this.y + this.height <= rectangle.getY() + rectangle.getHeight()){
        return true
      }
    }
    return false;
  };

  this.collidesHorizontally = function(rectangle){
    // This right side past other's left side
    if(this.x + this.width >= rectangle.getX() && this.x + this.width <= rectangle.getX() + rectangle.getWidth()){
      return true;
    }
    // This left side past other's right side
    if(this.x <= rectangle.getX() + rectangle.getWidth() && this.x >= rectangle.getX()){
      return true;
    }
    return false;
  };

  this.changeHitboxColor = function(newColor){
    this.hitboxColor = newColor;
  };

  this.getHitboxColor = function(){
    return this.hitboxColor;
  };

  this.getLowSide = function(){
    return this.y + this.height;
  };

  this.getHighSide = function(){
    return this.y;
  }

  this.mkContextRect = function(){
    context.rect(this.x, this.y, this.width, this.height);
  };

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
}
