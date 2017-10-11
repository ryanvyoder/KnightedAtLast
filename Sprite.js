/*
  Sprite Class
  Contains a loaded image file for a sprite, a frame rate for the sprite set,
  and a pointer to the next and previous sprite as well as a value that identifies
  this as the startsprite for the set
 */
function Sprite(file, x, y, width, height){
  this.image = new Image();
  this.image.src = file;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.startSprite = false;
  this.next = null;
  this.prev = null;

  this.setStart = function(){

  };

  this.setNext = function(nextSprite){
    this.next = nextSprite;
  };

  this.setPrev = function(prevSprite){
    this.prev = prevSprite;
  };

  this.createSet = function(numFrames, startx, starty){
    this.x = startx;
    this.y = starty;
    currSpr = this;
    currx = startx;
    curry = starty;
    for(i = 0; i < numFrames; i++){
      if(this.image.width <= currx+this.width){
        currx = 0;
        curry += this.height;
      }
      else{
        currx += this.width;
      }
      currSpr.next = new Sprite(this.image.src, currx, curry, this.width, this.height);
      currSpr.next.prev = currSpr;
      currSpr = currSpr.next;
    }
    currSpr.next = this;
    this.prev = currSpr;
    return 1;
  };

  this.getNext = function(){
    return this.next;
  };

  this.getPrev = function(){
    return this.prev;
  };

  this.draw = function(locx, locy, scale){
    context.drawImage(this.image, this.x, this.y, this.width, this.height, locx, locy, this.width*scale, this.height *scale);
  }
}
