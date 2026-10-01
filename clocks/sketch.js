const s = 100;
let x = 0;
let xSpeed = 10 // determine speed and direction
//i question about variables at the top; can we redefine / assign through a diff vars let or const than orig if it is block scoped like const and let are 
function setup() {
  createCanvas(460,450);
  frameRate(120);
}

function draw() {
  background(255,0,0);
  
}

function bouncingbackandforth() {
  background(255,0,0);
  //how to redefine a variable over time
  // use -> use this changing value in animate
  x = x + xSpeed;
  if (x > width) {
    xSpeed = xSpeed * -1;
  }
  if ((x>width) || (x<0)){
    x=0; //reset to zero
  }
  console.log(x);
  ellipse(x,height/2,s);
}

function thirdexample() {
  //how to redefine a variable over time
  // use -> use this changing value in animate
  x+=10;
  if (x>width) {

  }
  console.log(x);
  ellipse(x,height/2,s);
}


function secondExample() {
  //second = shows the current seconf as a value
  let s = 120; //sizes
  let sp = second();
  let x = map(sp, 0, 59, 0, width, true);
  console.log(x);
  ellipse(x,height/2,s);
}

function millisExample() {
  //1 second = 1000 milliseconds
  let s = 120; //sizes
  let x = millis()/4 // Returns the number of milliseconds (thousandths of a second) since starting the sketch
  let fc = FrameCount; 
  console.log(x);
  ellipse(x,height/2,s);
}

function FrameCountExample() {

  //framecount
  let s = 120; //size
  let x = (frameCount%500) + (s/2);
  console.log(x);
  ellipse(x,height/2,s);
}

