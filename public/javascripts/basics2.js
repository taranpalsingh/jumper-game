var time = 1000;

var W = window.innerWidth;
var H = window.innerHeight;

var randomVal = Math.random();

var vx = (randomVal * (15-6) +6);  // To ensure a value between 6 and 15.
if( randomVal % 2 > 0.5)  // remainder is in the range [0,1]
  vx *= -1;
console.log(vx);


var vx = 5;




var vy = 0;

var gravity = 0.9;
// var traction = 0.005;
var bounce_factor = 1;

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

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;
var ball = new Ball();

var mousex = 0;
var mousey = 0;

addEventListener("mousemove", function(){
  mousex = event.clientX;
  mousey = event.clientY;
})

$(document).ready( function renderFrame() {

    requestAnimationFrame(renderFrame);
    ctx.clearRect(0, 0, W, H);

    // console.log(vy);
    vy += gravity;
    // vx = (vx < 0 ? vx+traction : vx-traction);
    ball.x += vx;
    ball.y += vy;

    if (ball.x + ball.radius > W ){
      ball.x = W - ball.radius;
      vx *= -bounce_factor;
    }
    else if(ball.x - ball.radius < 0){
      ball.x = ball.radius;
      vx *= -bounce_factor;
    }
    if(ball.y + ball.radius > H){
      ball.y = H - ball.radius;
      vy *= -bounce_factor;
    }
    else if(ball.y - ball.radius < 0){
      vy *= -bounce_factor;
    }

    // setTimeout( function(){
    if((mousex >= (ball.x - ball.radius)) &&
      (mousex <= (ball.x + ball.radius)) &&
      (mousey >= (ball.y - ball.radius)) &&
      (mousey <= (ball.y + ball.radius)))
    {
      ball.radius = 100;
    }
    else {
      ball.radius = 50;
    }

    ball.draw(ctx);
}());

function Ball() {
  this.radius = 50;
  this.x = Math.random()*canvas.width + this.radius;
  // this.y = canvas.height - this.radius;
  this.y = Math.random()*(canvas.height/4) + this.radius;
  console.log("max height / 4: ", canvas.height/4);
  console.log("y: ",this.y);
  console.log("x : ", this.x);
  this.draw = function(ctx) {
    ctx.fillStyle = 'black';
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
