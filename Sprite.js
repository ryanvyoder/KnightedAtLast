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

  /*
    setStart()
    Sets the startSprites boolean to true.
    This is set to true if this sprite is the first sprite frame for the current set
   */
  this.setStart = function(){
    this.startSprites = true;
  };

  /*
    setNext()
    Sets the pointer to the next sprite frame (a Sprite object)
   */
  this.setNext = function(nextSprite){
    this.next = nextSprite;
  };

  /*
    setPrev()
    Sets the pointer to the previous sprite frame (a Sprite object)
   */
  this.setPrev = function(prevSprite){
    this.prev = prevSprite;
  };

  /*
    createSet()
    If the sprite's frames are all on the spritesheet starting with the current one, placed left to right and top to bottom,
    this function automatically sets up the sprite frame linked list given the starting indexes and the number of frames.
   */
  this.createSet = function(numFrames, startx, starty){
    this.x = startx;
    this.y = starty;
    currSpr = this;
    currx = startx;
    curry = starty;
    for(i = 0; i < numFrames-1; i++){
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

  /*
    getNext()
    Returns the next sprite frame (the one that follows the current one)
   */
  this.getNext = function(){
    return this.next;
  };

  /*
    getPrev()
    Returns the previous sprite frame (the one that preceeds the current one)
   */
  this.getPrev = function(){
    return this.prev;
  };

  /*
    draw()
    draws the sprite onto the canvas
   */
  this.draw = function(locx, locy, scale){
    context.drawImage(this.image, this.x, this.y, this.width, this.height, locx, locy, this.width*scale, this.height *scale);
  }
}
