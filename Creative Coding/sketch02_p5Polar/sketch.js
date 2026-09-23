// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(2,40,0);
  push();
  // text("p5.Polar Template", 100, height/2);
  // Insert your drawing here
  setCenter(width/2, height/2);
  polarLine(100,233,10);
  // polarHexagon( 13, 13, [13] );
  // polarHexagon( 130, 103, [103] );

  for (i=0; i<4; i++) {
    strokeWeight(6);
    stroke(55+(i*70));
    polarLine(130*i, 90, 0);
    polarLine(130*i, 9, 2);
  }
  function draw() { 
    setCenter(width/2, height/2);
    background(220);
    polarEllipses(10, 0, 0, 100, function(...args) {
        fill(args[0]*40, args[0]*40, args[0]*40, 160);
        args[1] = args[0]*6;
        args[2] = args[0]*6;
        args[3] = args[0]*6;
        return args;     
    });
}
pop();
  // polarEllipses( 2, 7, 9, 1, [3] );
  // polarPolygons( 4, 7, 3, 2, [4] );
}

