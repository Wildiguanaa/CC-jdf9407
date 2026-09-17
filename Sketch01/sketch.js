// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

// Review and Extend
// Intro to iterating

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0,0,255);

  // drawing01();
  // drawing02();
  // drawing03();
  drawing04();
  noLoop();

}

// not my first for loop; i studied and taught python in undergrad! that was my first
function drawing01() {
  // code goes here

  // draw a row of circles
  // ellipse(50,height/2,50); // x position varies by 50 each time
  // ellipse(100,height/2,50);
  // ellipse(150,height/2,50);
  // ellipse(200,height/2,50);
  // ellipse(250,height/2,50);
  // ellipse(300,height/2,50);
  // ellipse(350,height/2,50);
  // ellipse(400,height/2,50);
  // ellipse(450,height/2,50);
  // text("joanna", 100, height/2);
  // Insert your drawing here
  const startingX = 100;
  const s = 80; //size 
  const space = 70; //space in between shapes
  
  // for loop - a piece of code that repeats until a condition is met
  for (i=0; i<5; i++) {
    console.log(i);    
    fill("gold");
    ellipse(100 + i, height/2, startingX);
    ellipse(100 + (i*3), height/2, 100);
    fill("green");
    console.log(startingX+(i*50));

    ellipse(100 + (i*s), height/2, 50);
  }
}

// first nested for loop in p5.js
function drawing02() {
  const startingX = 100;
  const startingY = 100;
    const s = 50; //size 
    const space = 80; //space in between shapes
    for (i=0; i<5; i++) {
      for (j=0; j<2; j++) {
        ellipse(startingX + (i*space), startingY + (j*space), s);
        console.log(j);
      }
    }
}

// using conditionals to change color
function drawing03() {
  const startingX = 100;
  const startingY = 100;
    const s = 50; //size 
    const space = 80; //space in between shapes
    for (i=0; i<5; i++) {
      for (j=0; j<2; j++) {
        // if (i < 3 && j<2) {
        //   fill(255, 255, 0); //yellow        
        // } else {
        //     fill(255, 255, 255); //white
        //   }

        // % modulo (comparion operator)
        // modulo outputs the remainder of an equation/ the difference between two numbers

        console.log(1%2);

        const condition1= (i%2 == 0 && j%2 == 0); 
        const condition2= (i%2 == 1 && j%2 == 1);
        if (condition1 || condition2) {        // or  is || 
          fill(255,255,0); //yellow
        } else {
          fill(255); //white
        }


        ellipse(startingX + (i*space), startingY + (j*space), s);
        fill(0,0,255);
        text(i+""+j, startingX + (i*space));

        // console.log(j);
      }
    }
}


//
function drawing04() {
  noFill();
  // stroke(250); //off white
  strokeWeight(5);
  const startingX = 100;
  const startingY = 100;
    const s = 50; //size 
    const space = 80; //space in between shapes
    for (i=0; i<5; i++) {
      for (j=0; j<5; j++) {
        // ellipse(startingX + (i*space), startingY + (j*space), s+(i*20));
        // ellipse(startingX + (i*space), startingY + (j*space), s/(i+1));
        stroke(0,(j*1)*40,35,(j*1)*40); //transparency is the last one
        ellipse(startingX + (i*space), startingY + (j*space), s+(i*20));        
        console.log(j);
      }
    }
}

