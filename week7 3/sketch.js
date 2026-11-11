
let pMapper;

let pg, quadMap;
let quad0, quad1;
// let pMapper;
let calibrating = false;

let eyeballsize = 100; 
let meltx = 0; 
let melty = 0.4; 
let pupilsizechangeleft = 20; 
let pupilsizechangeright = 20;
let lastSecond = -1;         
let secondStart = 0; 

function setup(){

  createCanvas(windowWidth, windowHeight, WEBGL);   
 
  angleMode(DEGREES);            // for cos/sin in meltedeyeball    
  // 
  pg = createGraphics(400, 400);   
  pg.angleMode(DEGREES);         // for pg.rotate   
  // pg.background(34, 0, 0);

    // createCanvas(600,600,WEBGL)
    // background(100)
    // pg =createGraphics(400, 400)
    // pg.background(0)
    pMapper = createProjectionMapper(this);

    //quad0 = pMapper.createQuadMap(400, 400);
    //quad1 = pMapper.createQuadMap(600, 600);

}



function draw(){
    background(0);   
    drawAnimation();               // paints onto pg   

    // pg.ellipse(mouseX, mouseY, 80)

    //quadMap.displayTexture(pg);
    quad0.displayTexture(drawAnimation);
    //quad1.displaySketch(clockSketch1);
    // image(pg, 0,0)

}


// zezo
function clockSketch1(pg) {

  pg.background(10, 10, 30);

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

  pg.translate(width / 2, height / 2);
  DrawRing(pg, 70, 90, 14, hourB, hourF, r, g, b);
  DrawRing(pg, 180, 100, 40, minB, minF, r, g, b);
  drawSecs(pg, s, r, g, b);
  
}

function DrawRing(pg, radius ,len, thick, lit, filla, r, g, b ) {

  for (let i = 0; i < 12; i++) {
    pg.push();
    pg.rotate(i * 30 - 90);

    pg.stroke(200, 210, 255, 100);
    pg.strokeWeight(1);
    pg.fill(255, 255, 255, 20);
    pg.rect(radius, - thick / 2, len, thick);

    if (i == lit) {
      pg.stroke();
      pg.fill(r, g, b, 210);
        pg.rect(radius, - thick / 2, len * filla,thick);
    }

  pg.pop();

  }
}

function drawSecs(pg, s, r, g, b) {
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

  pg.noFill();                              
  pg.stroke(200, 210, 255, 40);
  pg.circle(0, 0, 100);

  pg.noStroke();                            
  pg.fill(r, g, b, 40);                     
  pg.circle(x, y, 26);
  pg.fill(255, 255, 255);                   
  pg.circle(x, y, 5);
}


// to add pg or not to add (pg)...that is a question
function drawAnimation() {   
  console.log("joanna")
 pg.background("red")
  //pg.background(0, 0, 0);   
  pg.noStroke();   
  pg.fill(255);   
  // pg.text("Week 6 Sketch", pg.width / 20, pg.height / 12);    // eyeball swells by the hour   
  eyeballsize = map(hour(), 0, 23, 100, 180);    // where the melt goes (mouse used directly, like your mapper template)   
  
  let reachx = 0;   
  let reachy = 0.4;   
  if (mouseIsPressed && !calibrating) {     
    reachx = (mouseX - pg.width / 2) / (pg.width / 2);     
    reachy = (mouseY - pg.height / 2) / (pg.height / 2);   
  }   
  
  meltx = lerp(meltx, reachx, 0.05);   
  
  melty = lerp(melty, reachy, 0.05);    // shadows   
  pg.noStroke();   
  pg.fill(0, 0, 0, 80);   
  pg.ellipse(pg.width / 4 + 6, pg.height / 2 + 6, eyeballsize);   
  pg.ellipse(pg.width / 2 + 6, pg.height / 2 + 6, eyeballsize);    // LEFT eye   
  meltedeyeball(pg.width / 4);   
  drawVeins(pg.width / 4, 22);   
  randomSeed(minute());   
  pupilsizechangeleft = lerp(pupilsizechangeleft, random(10, 35), 0.05);   
  drawIris(pg.width / 4, map(second(), 0, 60, 0, 360), pupilsizechangeleft);    // RIGHT eye   
  meltedeyeball(pg.width / 2);   
  drawVeins(pg.width / 2, 24);   
  randomSeed(minute());   
  pupilsizechangeright = lerp(pupilsizechangeright, random(10, 35), 0.05);   
  drawIris(pg.width / 2, map(second(), 0, 60, 0, 360), pupilsizechangeright); 
}  

function drawVeins(x, count) {   
  pg.push();   
  pg.translate(x, pg.height / 2);   
  pg.stroke(100, 20, 20, 50);   
  pg.strokeWeight(2);   
  pg.noFill();   
  let step = 360 / count;   
  for (let i = 0; i < count; i++) {     
    pg.line(20, 0, eyeballsize / 2, 0);  // replaces polarLine     
    pg.ellipse(26, 0, 6, 10);            // replaces polarEllipse     
    pg.rotate(step);   
  }   
    pg.pop(); 
}  
    
function drawIris(x, angle, pupilSize) {   
  pg.push();  
  pg.translate(x + meltx * 15, pg.height / 2 + melty * 15);   
  pg.rotate(angle);   
  pg.noStroke();   
  pg.fill("green");   
  pg.ellipse(15, 0, 70);   
  pg.fill("black");   
  pg.ellipse(15, 0, pupilSize);   
  pg.pop(); 
}  
  
function meltedeyeball(x) {   
  pg.fill(200);   
  pg.noStroke();   
  pg.beginShape();   
  for (let i = 0; i < 360; i += 5) {     
    let r = eyeballsize / 2;     
    let xpoint = cos(i) * r;     
    let ypoint = sin(i) * r;      
    let direction = cos(i) * meltx + sin(i) * melty;     
    let pulled = max(0, direction);      
    xpoint += meltx * pulled * 75;     
    ypoint += melty * pulled * 75;     
    ypoint += noise(i * 0.1, frameCount * 0.2) * 10 * pulled;      
    pg.vertex(x + xpoint, pg.height / 2 + ypoint);   
  }   
    pg.endShape(CLOSE); 
}  

function keyPressed() {   
  switch (key) {     case "c":       
    pMapper.toggleCalibration();       
    calibrating = !calibrating;       
    break;     
    case "f":       
    let fs = fullscreen();       
    fullscreen(!fs);       
    break;     
    case "l":       
    pMapper.load("maps/map.json");       
    break;     
    case "s":       
    pMapper.save("map.json");      
    break;   
  } 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// function keyPressed() {
//   switch (key) {
//     case "c":
//       pMapper.toggleCalibration();
//       break;
//     case "f":
//       let fs = fullscreen();
//       fullscreen(!fs);
//       break;
//     case "l":
//       pMapper.load("maps/map.json");
//       break;

//     case "s":
//       pMapper.save("map.json");
//       break;
//   }
// }





