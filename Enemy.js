/*
  Enemy Class
  Generic enemy script for testing

  Implementing a hopping method to move
 */
function Enemy(x, y, width, height, moveMethod){
  GameObject.call(this, x, y, width, height);
  this.dx = 0;
  this.dy = 0;
  this.enemy = 1;
  this.function = moveMethod;
  this.hopCount = 0;
  this.timeWaited = 0;
  this.alive = 1;

  this.isAlive = function(){
    return this.alive;
  }

  this.kill = function(){
    this.alive = 0;
    this.hitboxes = [];
  }

  this.update = function(){

    if(this.function == "slide"){
      if(player.getX() < this.x){
        this.dx = -1;
      }
      else if(player.getX() == this.x){
        this.dx = 0;
      }
      else{
        this.dx = 1;
      }
    }
    else if(this.function == "hop"){
      cycleMax = 30;
      waitTime = 30;


      //JUMPING
      if(this.hopCount != cycleMax){ // They want to jump, increment hopCount to begin the jumping loop
        jumpSpeed = 3;
        if(this.hopCount == 0){
          this.hopCount = 1;
        }
      }

      if(this.hopCount > 0){
        if(this.hopCount >= cycleMax + 1){ //If we've reached the end of the jump, exit the loop by resetting the hopCount to 0
          this.dy = 0;
          if(this.timeWaited < waitTime){
            this.timeWaited ++;
          }
          else{
            this.timeWaited = 0;
            this.hopCount = 0;
          }
        }
        else if(this.hopCount <= cycleMax/2){ // If we're on the way up the jump
          if(this.hopCount < cycleMax/2){
            this.dy = -jumpSpeed;
            this.hopCount++;
          }
          else{
            //this.hopCount = cycleMax/2 + (cycleMax/4) - 1;
            this.dy = -jumpSpeed;
            this.hopCount++;
          }
        }
        else{
          // Second half of the jump; start descending
          this.dy = jumpSpeed;
          this.hopCount++;
        }
      }

      // Moving towards the player
      if(this.timeWaited == 0){
        if(player.getX() < this.x){
          this.dx = -1;
        }
        else if(player.getX() == this.x){
          this.dx = 0;
        }
        else{
          this.dx = 1;
        }
      }
      else{
        this.dx = 0;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
    this.makeHitboxes();
  }

  this.makeHitboxes = function(){
    this.clearHitboxes();
    //hitbox = new Rectangle(this.x, this.y, this.width, this.height);
    this.addHitbox(new Rectangle(this.x, this.y, this.width, this.height));
  }

  this.draw = function(){
    context.beginPath();
    context.fillStyle = "red";
    context.rect(this.x, this.y, width, height);
    context.fill();
  }
}
