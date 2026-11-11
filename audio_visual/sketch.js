// lantern fly 

// my audio file: https://freesound.org/people/Nox_Sound/sounds/553075/

//my global variables
let sketch; //my drawing of the lantern
let lanternbuzz; //buzzing sound
let bugsting; //sting noise
let amp; //how loud the noise is (measures it)
let fft; //measuring frequency of the pitch

let

async function setup() {
    // some links i like for async: https://www.w3schools.com/js/js_async.asp 
    createCanvas(750,750);
    noCursor(); //gets rid of cursor
    sketch= await load(loadImage, "lantern.png");
    lanternbuzz= await load(loadSound, "");
    bugsting= await load(loadSound, "");

    amp = new print.Amplitude(); amp.setInput(lanternbuzz);
    fft = new p5.FFT(); fft.setInput(lanternbuzz);
    readytostart = true; //this comes before my draw function
}
