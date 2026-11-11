// lantern fly 

// my audio file: https://freesound.org/people/Nox_Sound/sounds/553075/

//my global variables
let sketch; //my drawing of the lantern
let lanternbuzz; //buzzing sound
let bugsting; //sting noise
let amp; //how loud the noise is (measures it)
let fft; //measuring frequency of the pitch

let readytostart = false; 
let starting = false; //clicking to start audio
let stungtime = -80; //the sting noise happens 
const lightx = 350; //where im trying to put the light in my drawing
const lighty = 350;
const load = 

async function setup() {
    // some links i like for async: https://www.w3schools.com/js/js_async.asp 
    createCanvas(750,750);
    noCursor(); //gets rid of cursor because im having a fly replace it 
    sketch= await load(loadImage, "media/lantern.png"); //for load image and sound: https://p5js.org/reference/p5/async_await/
    lanternbuzz= await load(loadSound, "media/buzzinglightsound.wav");
    bugsting= await load(loadSound, "media/bugzap.wav");

    amp = new print.Amplitude(); amp.setInput(lanternbuzz);
    fft = new p5.FFT(); fft.setInput(lanternbuzz);
    readytostart = true; //this comes before my draw function
}
