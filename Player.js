/*
  Player Class
  Maybe make a sprite class? Have it hold the value for the next sprite to use. When animation segment changes, change current sprite and
  have it always cycle through the frames. Perhaps have the sprite classes also hold a frame rate value?
 */
function Player(x, y, width, height){
  GameObject.call(this, x, y, width, height);
  this.scale = 1/4;
  this.dx = 0;
  this.dy = 0;
  this.numFrame = 0;
  this.playerSource = "knightSheet.png";
  /* startSprites:
  Format: 0 = idle animation
          1 = turn left animation / run left
          2 = turn right animation / run right
          3 = jump animation
  */
  this.startSprites = [];

  // Creating idle animation links
  this.startSprites[0] = new Sprite(this.playerSource, 0, 0, this.width, this.height);
  this.startSprites[0].createSet(3, 0, 0);
  // Creating left turn animation links
  this.startSprites[1] = new Sprite(this.playerSource, this.width, this.height, this.width, this.height);
  this.startSprites[1].createSet(2, this.width, this.height);
  // Creating right turn animation links
  this.startSprites[2] = new Sprite(this.playerSource, (this.width*3), 0, this.width, this.height);
  this.startSprites[2].createSet(2, (this.width*3), 0);

  this.currentSprite = this.startSprites[0];

  this.frameCounter = 0;
  this.jumpCount = 0;
  //this.spriteSheetx = 0;
  //this.spriteSheety = 0;
  this.turnCount = 0;

  this.changeSpriteSheet = function(file){
    this.playerSource = file;
  };

  /*
  @Override
   */
  this.update = function(){
    this.numFrame++;
    if(leftPressed){
      //this.dx = -1;
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
      //this.dx = 1;
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

    //JUMPING
    if(upPressed){
      jumpHeight = 40;
      jumpSpeed = 3;
      if(this.jumpCount == 0){
        this.jumpCount = 1;
      }
    }

    if(this.jumpCount > 0){
      if(this.jumpCount == jumpHeight + 1){
        this.jumpCount = 0;
        this.dy = 0;
      }
      else if(this.jumpCount <= jumpHeight/2){
        this.dy = -jumpSpeed;
        this.jumpCount++;
      }
      else{
        this.dy = jumpSpeed;
        this.jumpCount++;
      }
    }

    // UPDATE X AND Y COORDS ON CANVAS
    this.x = this.x + 2*this.dx;
    this.y = this.y + 2*this.dy;

    // Animate the player
    if(this.numFrame % 50 == 0){

      if(this.turnCount == 0){
        // Idle animation
        if(this.frameCounter == 2){
          this.currentSprite = this.startSprites[0];
          this.frameCounter = 0;
        }
        else{
          this.currentSprite = this.currentSprite.getNext();
          this.frameCounter++;
        }
      }

      else if(this.turnCount > 0){
        if(rightPressed == false){
          // Return to idle animation from walk right animation
          this.turnCount -=1;
        }
      }
      else if(this.turnCount < 0){
        if(leftPressed == false){
          // Return to idle animation from walk left animation
          this.turnCount +=1;
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
    this.currentSprite.draw(this.x, this.y, this.scale);
  }
}
Player.prototype = Object.create(GameObject.prototype);
