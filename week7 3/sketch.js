
let pg, quadMap, pMapper;
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
  pg.background(34, 0, 0);

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