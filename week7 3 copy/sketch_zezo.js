
let lastSecond = -1;         
let secondStart = 0; 

function setup() {
  console.log("test")
  createCanvas(600, 600);
  angleMode(DEGREES);

      createCanvas(windowWidth, windowHeight, WEBGL);

    // create mapper object
    pMapper = createProjectionMapper(this);
    quad0 = pMapper.createQuadMap(600,600); // width height

    // loads calibration in the "maps" directory
    //pMapper.load("maps/map.json");
}
function draw() {
background("black")
    //quad0.display("red");
    //quad1.display("magenta");
  quad0.displaySketch(clockSketch);

}

function clockSketch(pg) {

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

function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
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