console.log("Hello");

let context;
let x = 100;
let y = 200;
let dx = 5;
let dy = 5;

function init(){
  context = myCanvas.getContext('2d');
  setInterval(draw, 5);
  // setInterval(draw, 50);
}


function draw(){
  context.clearRect(0,0,300,300);
  context.beginPath();
  context.fillStyle = "#000000";
  context.arc(x,y,20,0, Math.PI*2, true);
  context.closePath();
  context.fill();
  if( x<0 || x>300) dx = -dx;
  if( y<0 || y>300) dy = -dy;
  x += dx;
  y += dy;
}
