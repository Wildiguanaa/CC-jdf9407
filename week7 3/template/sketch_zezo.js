
let lastSecond = -1;         
let secondStart = 0; 

function setup() {
  let canvas = createCanvas(600, 600);
  angleMode(DEGREES);
  canvas.parent('week5-sketch'); // do not delete - links to your index.html pages (description)
}

function draw() {

  background(10, 10, 30);

  let h = hour();
  let m = minute();
  let s = second();

  let hourB = h % 12;
  let hourF = (m * 60 + s) / 3600;

  let minB = int(m / 5);
  let minF = ((m % 5) * 60 + s) / 300;

  let r = 70;
  let g = 130;
  let b = 255;

  if (h >= 12) {
    r = 255;
    g = 70;
    b = 70;
  }

  translate(width / 2, height / 2);
  DrawRing(70, 90, 14, hourB, hourF, r, g, b);
  DrawRing(180, 100, 40, minB, minF, r, g, b);
  drawSecs(s, r, g, b);
  
}

function DrawRing(radius ,len, thick, lit, filla, r, g, b ) {

  for (let i = 0; i < 12; i++) {
    push();
    rotate(i * 30 - 90);

    stroke(200, 210, 255, 100);
    strokeWeight(1);
    fill(255, 255, 255, 20);
    rect(radius, - thick / 2, len, thick);

    if (i == lit) {
      noStroke();
      fill(r, g, b, 210);
      rect(radius, - thick / 2, len * filla,thick);
    }

  pop();

  }
}

function drawSecs(s, r, g, b) {
  if (s != lastSecond) {                 
    lastSecond = s;                      
    secondStart = frameCount;            
  }
  let frac = (frameCount - secondStart) / 60; 
  if (frac > 1) {                        
    frac = 1;
  }

  let a = (s + frac) * 6 - 90;           
  let x = cos(a) * 50;                   
  let y = sin(a) * 50;

  noFill();                              
  stroke(200, 210, 255, 40);
  circle(0, 0, 100);

  noStroke();                            
  fill(r, g, b, 40);                     
  circle(x, y, 26);
  fill(255, 255, 255);                   
  circle(x, y, 5);
}