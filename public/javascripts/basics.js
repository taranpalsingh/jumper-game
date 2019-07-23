var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;

// Velocity x
var vx = 0;
// Velocity y
var vy = (Math.random() * -10) - 5;
console.log(vy);

function Ball() {
    this.radius = 50;
    // this.x = canvas.width / 2;
    this.x = Math.random() * canvas.width;
    console.log("x: ",this.x);
    this.y = canvas.height - this.radius;

    this.draw = function(ctx) {
        ctx.fillStyle = 'green';
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.closePath();
        ctx.fill();
    }
}

var ball = new Ball();


// while(true){
//   var ball;
//   setTimeout(
//     ball = new Ball(),
//     2000);
// }

// for(let i=0; i<10; i++){
//   var ball;
//   setTimeout( () =>
//       {
//         ball = new Ball();
//         console.log("new");
//       },
//     1000);
// }

(function renderFrame() {
    requestAnimationFrame(renderFrame);
    ctx.clearRect(0, 0, W, H);

    ball.x += vx;
    ball.y += vy;

    ball.draw(ctx);
    if (
            ball.x + ball.radius > canvas.width ||
            ball.x - ball.radius < 0 ||
            ball.y + ball.radius > canvas.height ||
            ball.y - ball.radius  < 0
        ) {
          console.log("Out of bounds");
        // Re-positioning on the base
        ball.x = canvas.width / 2;
        ball.y = canvas.height - ball.radius;

        // If we do not re-set the velocities
        // then the ball will stick to bottom
        // var ball = new Ball();



        vx = 0;
        vy = (Math.random() * -15) - 5;
    }
}());
