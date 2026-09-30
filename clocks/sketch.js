function setup() {
  createCanvas(460,450);
}

function draw() {
  background(255,0,0);
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