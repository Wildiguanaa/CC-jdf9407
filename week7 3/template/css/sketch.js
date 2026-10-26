let pMapper;
let quad0; // the quad joanna's eyes will show up on
let eyespg; // my drawing surface? i think where the eyes get shown on

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES); // the cos() and sin() in joanna's code need degrees

    // create mapper object
    pMapper = createProjectionMapper(this);

    quad0 = pMapper.createQuadMap(440,440); // width height
    // quad1 = pMapper.createQuadMap(440,440); 
    eyespg = createGraphics(440,440); 
    eyesSetup(eyespg); //runs my setup onse

    // loads calibration in the "maps" directory
    //pMapper.load("maps/map.json");
}

function draw() {
    background(0);

    quad0.display("red");
    quad1.display("magenta");
    //quad0.displaySketch(yourNameTexture);
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

/* Template for texture/animation

function yourNameSetup(pg) {
    // optional - put this function in setup() as needed
}

function yourNameTexture(pg) {
    // put your animation here
}

*/

