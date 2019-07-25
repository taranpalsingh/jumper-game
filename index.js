let time = 1000;

let W = 800;
let H = 800;

let gravity = 2;
let isClicked = true;
let body = $("#body");
let isObstacleCreated = false;
let obstacle, obstacleCount = 0;
let floorDots = [], inAir;
let obstacleVelocity = 10, floorHeight = 30, score = 0;
window.requestAnimationFrame = function(){   // To tell the browser about the animation.
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(f){
    setTimeout(f, 1000/60);
  }
}();

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = W;
canvas.height = H;


window.onkeydown = checkKey;

function checkKey(e){
  e = e || window.event;

  if(e.keyCode == '38' && inAir == false){
    isClicked = true;
    console.log("up");
  }
}

let ball = new Ball();

// let obstacles = [];
function newObstacle(){
  console.log("obstacle count", obstacleCount);
  isObstacleCreated = true;
  obstacleCount +=1;
  obstacle = new Obstacle();
}

function newFloor(){
  // isObstacleCreated = true;
  floorDots.push(new Floor());
}

$(document).ready( function() {
  // left = 37
  // up = 38
  // right = 39
  // down = 40
  $("score").innerHTML = score;

  setInterval(newObstacle, 2000);
  setInterval(newFloor, 2000);
});


$(document).ready( function renderFrame() {

  requestAnimationFrame(renderFrame);
  ctx.clearRect(0, 0, W, H);

  ctx.beginPath();
  ctx.moveTo( 0, H - floorHeight);
  ctx.lineTo( W, H - floorHeight);
  ctx.stroke();

  newFloor();


// && ball.vy == 0
  if(isClicked){
    inAir = true;
    ball.vy = -30;
    isClicked = false;
  }

  ball.vy += gravity;
  ball.y += ball.vy;

  if(ball.y + ball.radius > H - floorHeight){
    ball.y = H - ball.radius - floorHeight;
    inAir = false;
  }
  ball.draw(ctx);

  for(let i=0; i<floorDots.length; i++){
    floorDots[i].x -= floorDots[i].vx;
    floorDots[i].vx = obstacleVelocity + obstacleCount;
    floorDots[i].draw(ctx);
  }


  if(isObstacleCreated){

    obstacle.vx = obstacleVelocity + obstacleCount;

    obstacle.x -= obstacle.vx;
    obstacle.draw(ctx);
    let dist = Math.sqrt(Math.pow(ball.x - obstacle.x, 2) + Math.pow(ball.y - obstacle.y,2));  // Distance between the 2 centers
    if(  dist < 2*ball.radius  ){
      alert("Game Over");
    }
    if(((ball.x - ball.radius) > (obstacle.x + obstacle.radius)) && (obstacleCount > score)){
      score = obstacleCount;
      console.log("obstacleCount: ",obstacleCount);
      console.log("score: ",score);
      $("#score").html(score);
    }
  }
}());


function Ball(mousex, mousey) {

  this.color = "black";
  this.radius = 50;
  this.x = 200;
  this.y = 600 - floorHeight;
  this.vy = 0;
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI*2,
      false
    );

    ctx.closePath();
    ctx.fill();
  }
}

function Obstacle() {

  this.color = "red";
  this.radius = 50;
  this.x = W - this.radius;
  this.y = H - this.radius - floorHeight;
  this.vx = obstacleVelocity;
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI*2,
      false
    );

    ctx.closePath();
    ctx.fill();
  }
}

function Floor() {

  this.color = "green";
  this.radius = 1;
  this.x = W;
  this.y = H - (Math.random() * (floorHeight-2) +1);  // W - 10
  this.vx = obstacleVelocity;
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI*2,
      false
    );

    ctx.closePath();
    ctx.fill();
  }
}
