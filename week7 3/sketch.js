
let pMapper;

let pg, quadMap;
// let pMapper;
let calibrating = false;

let eyeballsize = 100; 
let meltx = 0; 
let melty = 0.4; 
let pupilsizechangeleft = 20; 
let pupilsizechangeright = 20;

function setup(){

  let canvas = createCanvas(600, 600, WEBGL);   
  canvas.parent('week5-sketch');   
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

    quadMap = pMapper.createQuadMap(400, 400);

}

function draw(){
    background(0);   
    drawAnimation();               // paints onto pg   

    // pg.ellipse(mouseX, mouseY, 80)

    quadMap.displayTexture(pg);
    // image(pg, 0,0)

}


function drawAnimation() {   
  pg.background(0, 0, 0);   
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