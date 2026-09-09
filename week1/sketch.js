// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "[To] create something beautiful instead of something functional.", source: "Valerie from Medium" },
  { text: "[Using] software, code and computational processes / to be expressive or to create art forms.", source: "She Codes" },
  { text: "making our own interactive digital artworks", source: "Luke Meeken" },
  { text: "a rapidly expanding domain for both artistic expression and computational education.", source: "Andrew M Mcnutt" },
  { text: "a growing artistic field that uses computer software as a medium to develop original creative expression.", source: "Freya Alexander" },
  { text: "to edit, copy, enhance, manipulate, transform, and combine visuals in ways not imaginable using traditional processes", source: "Andrew Richardson" },
  { text: "asking... whether code is a paint brush or a calculator, and frustratingly the answer appears to be both.", source: "Joe Fabisevich" },
  { text: "a world of imagination and problem-solving that’s every bit as inventive as painting on a canvas", source: "Simpson Creative" },
  { text: "the intersection of creativity and technology", source: "Creative Code Art" },
  { text: "merges logic and art by using programming languages to create visual art and interactive installations.", source: "Kaiwalya Jadhav" },

  { text: "a means to manipulate, communicate through, use, and appreciate art through code", source: "Joanna Solomon" },
  { text: "artistically-centered computer science", source: "Joanna Solomon" },
  { text: "visual/descriptive programming and its explorations", source: "Joanna Solomon" },
  { text: "a means of technological communication in a creative practice", source: "Joanna Solomon" },
  { text: "design oriented computation", source: "Joanna Solomon" },
  { text: "a cross-pollination of art and technology", source: "Joanna Solomon" },
  { text: "its own creative medium", source: "Joanna Solomon" },
  { text: "an instructional, rythmic, and integrative means of capturing art", source: "Joanna Solomon" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(400, 400);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(24);
  fill(10, 255, 10);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 20, 250); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}