let pMapper;
let quad0, quad1; // two

let texture1 

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // create mapper object
    pMapper = createProjectionMapper(this);

    quad1 = pMapper.createQuadMap(200,200); // width height
    // quad1 = pMapper.createQuadMap(100,200); 

    texture1 = createGraphics(200, 200)

    let centerColors = [];
    // loads calibration in the "maps" directory
    //pMapper.load("maps/map.json");
}

function draw() {
    background(0);

    texture1.background(100,0,0)

    image(texture1, 0,100)



    // quad0.display("red");
    // quad1.display("magenta");
    // quad0.displaySketch(Journey);
    // quad1.displaySketch(Journey);
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




// Template for texture/animation

// function yourNameSetup(pg) {
//     // optional - put this function in setup() as needed
// }

// // function Journey(pg) {
//     // put your animation here
//     function Journey(pg) {
//     // optional - put this function in setup() as needed
    

    
//     centerColors = [
//         color(255, 204, 0),   // Warm yellow
//         color(255, 100, 0),   // Sunburnt orange
//         color(255, 105, 180), // Pink
//         color(138, 43, 226)   // Purple
//     ];


//     }


//     function JourneySetup() {
//     pg.background(255,209,220);

//     let colorIndex = minute() % centerColors.length;
//     pg.fill(centerColors[colorIndex]);
//     pg.ellipse(250, 250, 100, 100);
//     //  //attach rectangle to circle like a stem of a flower; I experimented until the placement was correct utilizing what we learned about the axis. I had an idea for petals that would have covered the stem overlapping the circle.
//     pg.fill(144, 238, 144);
//     pg.rect(225, 290, 50, 200);
    
// }
// }








/* Template for texture/animation

function yourNameSetup(pg) {
    // optional - put this function in setup() as needed
}

function yourNameTexture(pg) {
    // put your animation here
}

*/

