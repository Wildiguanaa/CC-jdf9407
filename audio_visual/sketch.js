// lantern fly 

// my audio file: https://freesound.org/people/Nox_Sound/sounds/553075/

//my global variables
let sketch; //my drawing of the lantern
let lanternbuzz; //buzzing sound
let bugsting; //sting noise
let amp; //how loud the noise is (measures it)
let fft; //measuring frequency of the pitch

let readytostart = false; //files are loaded
let starting = false; //clicking to start audio
let stungtime = -80; //the sting noise happens 
const lightx = 350; //where im trying to put the light in my drawing
const lighty = 350;


async function setup() {
    // some links i like for async: https://www.w3schools.com/js/js_async.asp 
    createCanvas(750,750);
    noCursor(); //gets rid of cursor because im having a fly replace it 
    

    sketch= await load(loadImage, "media/lantern.png"); //for load image and sound: https://p5js.org/reference/p5/async_await/
    lanternbuzz= await load(loadSound, "media/buzzinglightsound.wav");
    bugsting= await load(loadSound, "media/bugzap.wav");

    //https://p5js.org/reference/p5.sound/p5.Amplitude/
    amp = new p5.Amplitude(); 
    lanternbuzz.connect(amp);
    // amp.setInput(lanternbuzz);

    //https://p5js.org/reference/p5.sound/p5.FFT/
    fft = new p5.FFT(); 
    // fft.setInput(lanternbuzz);
    lanternbuzz.connect(fft);

    readytostart = true; //this comes before my draw function

}

function draw() {

    if(readytostart) return;
    image(sketch,0,0,width,height);

    let stung = millis() - stungtime <1455;

    let nearness = map(dist(mouseX,mouseY, lightx, lighty), 500, 0,0, 1, true);
    if (starting) lanternbuzz.setVolume(stung ? 0: nearness);
    
}
