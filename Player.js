/*
  Player Class
  Maybe make a sprite class? Have it hold the value for the next sprite to use. When animation segment changes, change current sprite and
  have it always cycle through the frames. Perhaps have the sprite classes also hold a frame rate value?
 */
function Player(x, y, width, height){
  /* NOTES:
     This needs to be changed. Jumping should work more like so:
     There is a constant force of gravity that will pull down on objects. When up is pressed, IF the player is currently touching
     a platform (which includes the ground), then the player moves up for x frames while jump is held down, and eventually slows and falls until
     he hits the next platform below him!
   */
  var jumpLock = 1;
  var jumpFrames = 0;
  var jumpTime = 25;
  var jumpSpeed = 4;
  this.scale = 1/4; // Scale factor for sprites
  GameObject.call(this, x, y, width*this.scale, height*this.scale);
  this.dx = 0;  // x velocity
  this.dy = 0;  // y velocity
  this.numFrame = 0; // Used to slow down frame rate for animations
  this.playerSource = "knightSheet.png";
  this.tempHitboxes = [];

  /* startSprites:
  Format: 0 = idle animation
          1 = turn left animation / run left
          2 = turn right animation / run right
          3 = jump animation
  */
  this.startSprites = [];
  this.frameCounter = 0;  // Used for tracking frames in idle animation
  this.jumpCount = 0; // Used for tracking frames in jump animation
  this.turnCount = 0; // Used for tracking frames in turn animations
  this.spaceCount = 0;

  // Creating idle animation links
  this.startSprites[0] = new Sprite(this.playerSource, 0, 0, width, height);
  this.startSprites[0].createSet(3, 0, 0);
  // Creating left turn animation links
  this.startSprites[1] = new Sprite(this.playerSource, width, height, width, height);
  this.startSprites[1].createSet(2, width, height);
  // Creating right turn animation links
  this.startSprites[2] = new Sprite(this.playerSource, (width*3), 0, width, height);
  this.startSprites[2].createSet(2, (width*3), 0);

  this.currentSprite = this.startSprites[0]; // Start with the idle animation

  this.changeSpriteSheet = function(file){
    this.playerSource = file;
  };

  this.getScale = function(){
    return this.scale;
  };

  this.makeHitboxes = function(){
    this.clearHitboxes();
    //hitbox = new Rectangle(this.x, this.y, this.width, this.height);

    if(leftPressed || rightPressed){
      this.addHitbox(new Rectangle(this.x + 15, this.y, this.width - 20, 40));
      this.addHitbox(new Rectangle(this.x+ 15, this.y + 40, this.width - 20, 45));
      this.addHitbox(new Rectangle(this.x + 15, this.y + 85, this.width - 20, 15));
    }
    else{
      this.addHitbox(new Rectangle(this.x + 15, this.y, this.width - 20, 40));
      this.addHitbox(new Rectangle(this.x+ 5, this.y + 40, this.width - 5, 45));
      this.addHitbox(new Rectangle(this.x + 15, this.y + 85, this.width - 20, 15));
    }
    /*tmpcnt = 0;
    while(tmpcnt < this.tempHitboxes.length){
      this.addHitbox(this.tempHitboxes[tmpcnt]);
      tmpcnt++;
    }*/
  }

  /*
    standOn()
    Returns a value indicating whether the player is standing on the object or not.
   */
  this.standOn = function(obj2){
    //console.log("Player Lowest: " + this.getLowestHitbox().getLowSide() + "\nPlatform Highest: " + obj2.getLowestHitbox().getHighSide() + "\nCollideHoriz.: " + this.getLowestHitbox().collidesHorizontally(obj2.getLowestHitbox()));
    return (((this.getLowestHitbox().getLowSide() <= obj2.getLowestHitbox().getHighSide()) && (this.getLowestHitbox().getLowSide() >= obj2.getLowestHitbox().getHighSide() - jumpSpeed)) && (this.getLowestHitbox().collidesHorizontally(obj2.getLowestHitbox())));
  };

  this.standOnPlatforms = function(plats){
    var cnt = 0;
    var onOne = 0;
    while(cnt < plats.length){
      if(this.standOn(plats[cnt])){
        if(hitboxView == 1){
          plats[cnt].setColor("green");
        }
        onOne = plats[cnt];

      }
      else{
        if(hitboxView == 1){
          plats[cnt].setToDefaultColor();
        }
      }
      cnt+=1;
    }
    return onOne;
  };

  /*
  @Override
   */
  this.update = function(){
    this.numFrame++;
    if(leftPressed){
      // Commence turnLeft animation
      if(this.numFrame % 7 == 0){
        this.dx = -1;
        this.frameCounter = 2;
        this.turnCount -= 1;
        if(this.turnCount == -1){
          this.currentSprite = this.startSprites[1];
        }
        else if(this.turnCount == -2){
          this.currentSprite = this.currentSprite.getNext();
          this.dx = -2;
        }
        else if(this.turnCount < -2){
          this.turnCount +=1;
          this.dx = -2;
        }
      }

    }
    else if(rightPressed){
      // Commence turnRight animation
      if(this.numFrame % 7 == 0){
        this.frameCounter = 2;
        this.dx = 1;
        this.turnCount += 1;
        if(this.turnCount == 1){
          this.currentSprite = this.startSprites[2];
        }
        else if(this.turnCount == 2){
          this.currentSprite = this.currentSprite.getNext();
          this.dx = 2;
        }
        else if(this.turnCount > 2){
          this.turnCount -=1;
          this.dx = 2;
        }
      }
    }
    else{
      this.dx = 0;
      this.turnCount = 0;
    }

    // Interacting (this stage just attacking) NOT IMPLEMENTED
    /*
    if(spacePressed){
      newBox = null;
      if(this.spaceCount == 0){
        this.spaceCount = 1;
      }
      if(this.spaceCount == 1){
        newBox = new Rectangle(this.x+ 15, this.y + 40, this.width - 5, 45);
        newBox.changeHitboxColor("rgba(0, 255, 0, .2)");
        this.tempHitboxes.push(newBox);
        this.spaceCount++;
      }
      else if(this.spaceCount < 50){
        this.spaceCount++;
      }
      else if(this.spaceCount == 50){
        tmpcnt = 0;
        while(true){
          if(this.tempHitboxes[tmpcnt] == newBox){
            break;
          }
        }
        this.tempHitboxes.splice(tmpcnt, 1);
        this.spaceCount = 0;
      }

    }
    */

    if(!upPressed){
      jumpLock = 1;
    }
    // JUMPING
    // NEW IMPLEMENTATION
    else if(upPressed){ // The player is trying to jump
      // If the player is touching a platform (begin jump)
      if(this.standOnPlatforms(platforms) != 0){
        jumpFrames = 1; // Increment this counter so it starts counting our ascent
        jumpLock = 0;
        this.dy = -jumpSpeed;
      }
      else if(jumpLock == 0){
        // If it is still being held down after the initial jump
        for(tempCount = 0; tempCount < platforms.length; tempCount++){
          // This had to be done by grabbing specific hitboxes from each item because adding another two loops
          // to check all hitboxes in each object caused the game to no reach the end of the rendering cycle
          for(hitboxCt = 0; hitboxCt < this.getHitboxes().length; hitboxCt++){
            if(this.getHitboxes()[hitboxCt].collides(platforms[tempCount].getHighestHitbox())){
              jumpLock = 1;
              jumpFrames = -1; // will be incremented to 0 in the following conditionals
              break;
            }
          }
        }
        // still move up normal speed
        if(jumpFrames < ((jumpTime* 1) / 2)){
          this.dy = -jumpSpeed;
          jumpFrames++;
        }
        // Still move up half speed
        else if(jumpFrames < jumpTime){
          this.dy = -jumpSpeed/2;
          jumpFrames++;
        }
        // Initiate descent:
        else{
          jumpLock = 1;
          jumpFrames = 0;
        }
        // If the player is trying to jump while they are descending (invalid)
      }
    }

    // Descend frames
    if(jumpLock == 1){
      if(this.standOnPlatforms(platforms) == 0){
        this.dy = jumpSpeed;
      }
      else{
        var platty = this.standOnPlatforms(platforms);
        this.y = platty.getY() - this.height; // This ensures the player lands ON the platform and not a few pixels above it
        this.dy = 0;
        if(platty.getDx() != 0){
          this.x+=2*platty.getDx();
        }
      }
    }

    // UPDATE X AND Y COORDS ON CANVAS
    this.x = this.x + 2*this.dx;
    this.y = this.y + 2*this.dy;

    this.makeHitboxes();

    // Animate the player when idle
    if(this.numFrame % 5 == 0){ //This is mainly so the animation returns quickly after a turn
      if(this.turnCount == 0){
        // Idle animation
        if(this.frameCounter == 2){
          this.currentSprite = this.startSprites[0];
          this.frameCounter = 0;
        }
        else{
          if(this.numFrame % 50 == 0){ // This conditional allows the idle animation to go at a slower rate
            this.currentSprite = this.currentSprite.getNext();
            this.frameCounter = 0;
          }
        }
      }

      else if(this.turnCount > 0){
        if(rightPressed == false){
          // Return to idle animation from walk right animation
          this.turnCount -=1;
          this.currentSprite = this.currentSprite.getPrev();
        }
      }
      else if(this.turnCount < 0){
        if(leftPressed == false){
          // Return to idle animation from walk left animation
          this.turnCount +=1;
          this.currentSprite = this.currentSprite.getPrev();
        }
      }

    }

  };


  /*
  @Override
   */
  this.draw = function(){
    // Get image for player
    var playerImage = new Image();
    playerImage.src = this.playerSource;

    // Draw player onto the canvas
    this.currentSprite.draw(this.x, this.y, this.width, this.height);

    if(hitboxView == 1){
      context.beginPath();
      ct = 0;
      while(ct < this.hitboxes.length){
        context.fillStyle = this.hitboxes[ct].getHitboxColor();
        //context.rect(this.x, this.y, this.width, this.height);
        this.hitboxes[ct].mkContextRect();
        context.fill();
        ct++;
      }
    }
  };
}
Player.prototype = Object.create(GameObject.prototype);
