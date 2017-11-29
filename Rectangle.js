function Rectangle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

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
