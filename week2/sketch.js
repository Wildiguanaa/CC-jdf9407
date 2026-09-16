/// My first drawing



function setup() {
  createCanvas(600, 600);
  
}

function draw() {
  background(5, 32, 70);
  let s1 = 130; // white
  let s2 = 200; // yellow
  // below is an array (list of values)
  // square brackets can be a container for a list
  let s3 = [240, 100];
  console.log(s3);



  // i am making a sunset
  
  // purple square; sunset background 
  rectMode(CENTER);
  fill("purple");
  rect(140, 29, s3[0], s3[1]);

  // cloud 1
  fill(0,200,200);
  ellipse(s1, 120, s1);
  ellipse(125, 120, s2);
  ellipse(125, 80, 35);
  ellipse(80, 80, 35);
  ellipse(90, 85, 35);
  ellipse(95, 80, 35);
  ellipse(130, 100, 35, 40);
  ellipse(130, 100, 35);
  // circle
  fill("yellow");
  ellipse(300, 300, 35);
  fill("blue");
  // just through experimentation I learned that I can round the square's corners through adding another comma with a new numeric value
  square(250, 100, 30, 5);
  fill("orange");
  triangle(100, 120, 140, 160, 200, 180);
  //triangle(200, 120, 140, 160, 200, 180);

  fill("pink");
  textSize(24);
  textAlign(CENTER);
  
  let t = "hello world";
  text(t, width/2, height/2);

}
