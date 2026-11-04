
let pg, pg2, quadMap
let pMapper;

function setup(){
    createCanvas(600,600,WEBGL)
    background(100)
    pg =createGraphics(400, 400)
    pg.background(0)
    pMapper = createProjectionMapper(this);

    quadMap = pMapper.createQuadMap(400, 400);

}

function draw(){

    pg.ellipse(mouseX, mouseY, 80)

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