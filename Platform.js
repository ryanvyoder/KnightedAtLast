
function Platform(x, y, width, height){
  GameObject.call(this, x, y, width, height);
  this.dx = 0;
  this.dy = 0;
  this.defaultColor = "orange";
  this.useColor = this.defaultColor;
  this.ident = identity;
  identity++;

  this.makeHitboxes = function(){
    this.clearHitboxes();
    this.addHitbox(new Rectangle(this.x, this.y, this.width, this.height));
  };

  this.setColor = function(color){
    this.useColor = color;
  };

  this.setToDefaultColor = function(){
    this.useColor = this.defaultColor;
  };

  this.getDx = function(){
    return this.dx;
  };

  this.update = function(){
    this.makeHitboxes();
  };

  this.draw = function(){
    context.beginPath();
    if(hitboxView == 0){
      this.setToDefaultColor();
    }
    context.fillStyle = this.useColor;
    context.rect(this.x, this.y, width, height);
    context.fill();
  };

  this.toString = function(){
    console.log(this.ident);
  }
}
Platform.prototype = Object.create(GameObject.prototype);
