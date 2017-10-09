/*
  Player Class
 */
function Player(x, y){
  GameObject.call(this, x, y);
  this.dx = 0;
  this.dy = 0;
  this.numFrame = 0;
  this.playerSource = "knights.png";
  this.playerFrame =false;
  this.jumpCount = 0;

  this.update = function(){
    this.numFrame++;
    if(leftPressed){
      this.playerSource = "knights_2.png"
      this.dx = -1;
    }
    else if(rightPressed){
      this.dx = 1;
      this.playerSource = "knights.png";
    }
    else{
      this.dx = 0;
    }

    if(upPressed){
      if(this.jumpCount == 0){
        this.jumpCount = 1;
      }
    }

    if(this.jumpCount > 0){
      if(this.jumpCount == 31){
        this.jumpCount = 0;
        this.dy = 0;
      }
      else if(this.jumpCount <= 15){
        this.dy = -1;
        this.jumpCount++;
      }
      else{
        this.dy = 1;
        this.jumpCount++;
      }
    }

    // Get image for player
    var playerImage = new Image();
    playerImage.src = this.playerSource;
    this.x = this.x + 5*this.dx;
    this.y = this.y + 5*this.dy;

    // Animate the player
    if(this.numFrame % 50 == 0){
      this.playerFrame = !this.playerFrame;
    }

    // Draw player onto the canvas
    if(this.playerFrame){
      context.drawImage(playerImage, playerImage.width/2 + 10, 0, playerImage.width, playerImage.height, this.x, this.y, playerImage.width, playerImage.height);
    }
    else{
      context.drawImage(playerImage, 0, 0, playerImage.width/2 - 10, playerImage.height, this.x, this.y, playerImage.width/2 - 10, playerImage.height);
    }

  };
}
Player.prototype = Object.create(GameObject.prototype);
