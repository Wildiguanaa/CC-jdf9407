// intro to interactivity
// incorporating transformations
// incorporate randomness

// when i press my mouse, something will happen

// first: let's generate a random number everytime i press my mouse

let r; // for storing my random number
let r2; // for random rotation

function setup() {
  createCanvas(400, 400);
  
  r = random(100, 255); // (minimum number, maximum number) so the randomness will be between those barriers
  r2 = random(360);
  console.log(r);
}

function draw() {
  background(r, 0, 0);
  push();
  translate(width/2, height/2, r) // shifts origin or where things are drawn
  rectMode(CENTER);
  rotate(r2); // number between 0 and 360
  rect(0, 0, r);
  pop();
  ellipse(300, 300, 150, r);
  // r = random(100, 255); if this is placed here we will get a strobing effect
}

function mousePressed() {
r = random(100, 255);
r2 = random(360);

}