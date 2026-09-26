// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

let r = 45; // random variable works for rotation and size for all functions
let colorshow = true; // boolean variable (true = color shows, false = black and white)

function setup() {
  createCanvas(100, 100);  // canvas size
  // background(12,0,230); // blue background color
  rectMode(CENTER); // sets the origin to the middle
  colorMode(HSB, 360, 100, 100) // HSB stands for hue (0-360 in values), saturation (0-100 in numeric values), and brightness (0-100 in number values)
}

function draw() {
  colorMode(HSB, 360, 100, 100) // HSB stands for hue (0-360 in values), saturation (0-100 in numeric values), and brightness (0-100 in number values)
 

  fill(0, 0, 55); // text color 
  // text("p5.Polar Template used by Joanna. Drag mouse to change color, click any key to interchange rainbow and monochrome colors on the polar and grid ellipses, and click mouse just to randomly change the visual.", 110, 10, 130, 80); // Position text inside the 100px canvas width

  // Insert your drawing here

  // polar ellipse
  push(); // aka save; saves the current state of my drawing setting
  setCenter(width/2, height/2); // changes the focus/anchor point of my canvas to the center of the screen

  if (colorshow) {
    let polarcolor = (r*5) % 360;  // % is the remainder operator; it divides the first number by the second and returns the leftover remainder
    stroke(polarcolor,180,100);
  }
  else {
    stroke(0,0,0); // stroke sets the color used to draw lines, points, and the borders around shapes
    
  }
  noFill();
  rotate(r);
  polarEllipses(10, 10, 100, 25); // https://editor.p5js.org/melodyloveless/sketches/4rOr7DfJa
  pop(); // aka restore; resets everything back to exactly how it was when i last called push()

  let startx=10; //starting x position
  let starty=10; //starting x position
  let size = 5; // shape diameter
  let space=size +5; //spacing between shapes; 20x spacing
  
  // grid of shapes/altered ellipses
  for (let x=0; x<9; x++) { // Outside for loop moves across X axis
    for (let y=0; y< 9; y++) { // inside for loop moves across y axis
    
    
    // inspiration from https://editor.p5js.org/melodyloveless/sketches/BQ3GjclWD
    push();
    translate(startx + (space*x), starty + (space * y));
    // translate(size *y,size *x);
    rotate(x*y*r);
    stroke(r);

    if (!colorshow) { // the ! operator means NOT; it flips a boolean value to its exact opposite
      let hueValue = (x*20+y*3+r*12) % 360;
      fill(hueValue, 100, 100, r); // rainbow colors
    }
    else {
      // fill(0,0,100);
      fill(0, 120, 0, 125);
    }
    // fill(0, 120, 0, 125);

    // ellipse(startx + (space*x), starty + (space*y), size, r);
    ellipse(0, 0, size, r, 32);

    // let increasingSize = size + x + (y *2);
    pop();

    }
  }
}
    // ellipse(starty + (space*y), height/2, size);
  // noLoop();

function keyPressed(){ // press any key to toggle color on/off
  colorshow = !colorshow;
}

function mousePressed() {
  r=random(10,80); // https://docs.google.com/document/d/1pIEKKYwrDEGjKNYOve-6yeayMT8ZaW38qoUthIR4SfI/edit?tab=t.0
}

function mouseDragged() {
  r = map(mouseX, mouseY, width, 5, 40); // map() function translates a number from its current range into a completely new range
  noStroke();
  fill(200,200); //adding color to the drag
  ellipse(mouseX, mouseY, 20); // https://docs.google.com/document/d/1pIEKKYwrDEGjKNYOve-6yeayMT8ZaW38qoUthIR4SfI/edit?tab=t.0
}

// // nested for loop in p5.js
// function drawing2() {
//   const startx = 100;
//   const starty = 100;
//     const size = 50; //size 
//     const space = 80; //space in between shapes
//     for (x=0; x<5; x++) {
//       for (j=0; j<2; j++) {
//         ellipse(startX + (x*space), startY + (j*space), size);
//         console.log(j);
//       }
//     }






// function drawing1() {
//   const startx = 0;
//   const endx = 100;
//   const repeat = 20; // distance between points or grid lines
//   const space = 70; //space in between shapes
  
//   // for loop - a piece of code that repeats until a condition is met
//   for (let x = startx, x<= endx=; x += repeat) {

//   }
    
    
    
    
     // let startx = 0; //starting point
    // let size = 30; //size
    // let space = size+10; //space in between shapes
    
    
    
    
//     i=0; i<5; i++) {
//     console.log(i);    
//     fill("gold");
//     ellipse(100 + i, height/2, startingX);
//     ellipse(100 + (i*3), height/2, 100);
//     fill("green");
//     console.log(startingX+(i*50));

//     ellipse(100 + (i*s), height/2, 50);
//   }
// }





//   for (let x)
//     push();
//     translate(600*0.25,600*0.75);
//     square(0, 0, 50);
//     pop();
// }

