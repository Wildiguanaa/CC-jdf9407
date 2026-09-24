// Notes from class on wed. sep. 23, 2026

var r; //global variable

function setup() {
    createCanvas(500, 500);
    rectMode(CENTER);
        for (i=0; i<5; i++) {
        for (j=0; j<5; j++) {
        // let r = random(-10,10);
        rX[i] = random(-10,10);
        rY[j] = random(-10,10);
        }
    myDrawing();
    }
}
function draw() {
    background(200,200,200);
    for (i=0; i<5; i++) {
        for (j=0; j<5; j++) {
            //drawing will go here
            let s = 10; //size
            let space = s;
            let startingXposition = 100;
            let startingYposition = 100;

            // console.log(r)
            rect(startingXposition + (i*space) +rX[i],
            startingYposition + (j*space), s);
        }
    }
}

// noLoop();

function mousePressed();

// svg is a coordinate based drawing; defined by coordinates; it means when you stretch out an svg it does not get pixelated because it is not pixel bound, it is coordinate bound