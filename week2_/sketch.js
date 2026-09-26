let step = 0; //variable to track the current frame/step

function setup() {
  createCanvas(600, 600); // width = 600, height = 600
  
}

function draw() {
  background("red");

  if (step===0) {
  // frame 1

    // square 1
    //lower left quadrant of my canvas
    push();
    translate(600*0.25,600*0.75);
    square(-25, -25, 50);
    pop();

  // triangle 1
  // upper right quadrant
    push();
    translate(600*0.25,600*0.25);
    triangle(-25, 25, 0, -25, 25, 25);
    pop();

    // circle 1
    // center right quadrant
    push();
    translate(600*0.75,600*0.5);
    circle(0, 0, 30);
    pop();
  }

  else if (step===1){
  background("orange"); // background for frame 2
  // frame 2

    // square 2
    // move down
    push();
    translate(600*0.25,600*0.96);
    square(-25, -25, 50);
    pop();

  // triangle 2
  // rotate
    push();
    translate(600*0.25,600*0.25);
    rotate(60);
    triangle(-25, 25, 0, -25, 25, 25);
    pop();

    // circle 2
    // make a lil bit bigger
    push();
    translate(600*0.75,600*0.5);
    circle(0, 0, 60);
    pop();
  }

  else if (step===2){
  background("yellow");
  // frame 3

    // square 3
    // move forward/center
    push();
    translate(600*0.25,600*0.96);
    rotate(100);
    square(-25, -25, 50);
    pop();

  // triangle 3
  // rotate
    push();
    translate(600*0.5,600*0.25);
    rotate(60);
    triangle(-25, 25, 0, -25, 25, 25);
    pop();

    // circle 3
    // make bigger
    push();
    translate(600*0.75,600*0.5);
    circle(0, 0, 90);
    pop();
  }
  

  else if (step===3){
  background("green");
  // frame 4

    // square 4
    // make smaller
    push();
    translate(600*0.25,600*0.96);
    rotate(100);
    scale(0.5);
    square(-25, -25, 50);
    pop();

  // triangle 4
  // make bigger and center top
    push();
    translate(600*0.5,600*0.25);
    rotate(60);
    scale(3);
    triangle(-25, 25, 0, -25, 25, 25);
    pop();

    // circle 4
    // move up
    push();
    translate(600*0.75,600*0);
    circle(0, 0, 90);
    pop();
  }


  else if (step===4){
  background("midnightblue");
  // frame 5

    // square 5
    // rotate and make center
    push();
    translate(600*0.5,600*0.5);
    square(-25, -25, 50);
    pop();

  // triangle 5
  // make smaller and revert rotation to original, keep in center
    push();
    translate(600*0.5,600*0.25);
    scale(.5);
    triangle(-25, 25, 0, -25, 25, 25);
    pop();

    // circle 5
    // make smaller and place in center bottom
    push();
    translate(600*0.5,600*0.75);
    circle(0, 0, 30);
    pop();
  }
}

// just one mousepressed function
function mousePressed() {
step = step+1; // next step on each click
  if (step>4) { // After step 4 which is the 5th frame, reset page back to step 0

    step=0; // Loop back to frame 1 after 5 clicks
}
}