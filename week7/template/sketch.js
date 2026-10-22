let pMapper;
let quad0, quad1; // two
// Declare variables for shape radii
// Octotber 4th, 2026 Clock sketch, For this sketch, I used the p5.js library to create a clock with animated hands and a dynamic background. The clock hands are represented by ellipses that rotate based on the current time, and the background color transitions through a gradient over time. The code also includes a shader for color blending and randomization for additional visual effects.
// let secondsRadius;
// let minutesRadius;
// let hoursRadius;
// let clockDiameter;
// let xScale = 0.015;
// let yScale = 0.02;

// let gapSlider;
// let gap;
// let offsetSlider;
// let offset;

// let circleX, circleY, circleColor;

// let lastSecond = -1;
// let secondStart = 0;

// let words = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "11",
//   "12",
//   "13",
//   "14",
//   "15",
//   "16",
//   "17",
//   "18",
//   "19",
//   "20",
//   "21",
//   "22",
//   "23",
//   "24",
//   "25",
//   "26",
//   "27",
//   "28",
//   "29",
//   "30",
//   "31",
// ];
// let wordCount = 50;
// let hue;
// let position;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create mapper object
  pMapper = createProjectionMapper(this);

  quad0 = pMapper.createQuadMap(710, 700); // width height
  quad1 = pMapper.createQuadMap(100, 200);
  quad2 = pMapper.createQuadMap(100, 200);
  quad3 = pMapper.createQuadMap(100, 200);

  setPositionAndColor();
  dotGrid();

  AhmadSetup();
  JourneySetup();
  JoannaSetup();
  ZezoSetup();

  // loads calibration in the "maps" directory
  //pMapper.load("maps/map.json");
}

function draw() {
  background(0);

  //quad0.display("red");
  //quad1.display("magenta");
  // quad0.displaySketch(AhmadTexture);
  //quad1.displaySketch(JourneyTexture);
  //quad1.displaySketch(Journey);
// quad2.displaySketch(Joanna);
// quad3.displaySketch(Zezo);
}