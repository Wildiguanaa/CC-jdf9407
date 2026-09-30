// p5.plotSvg + p5.Polar Template

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 
// if using randomness, 
// as I am!,
// experiment w/ myRandomSeed to see different versions (or iterations) 
// of your sketch
let myRandomSeed = 3201; 
let regenerateButton, exportSvgButton; 

let colorshow = true; // boolean variable (true = color shows, false = black and white)


function setup() {
  // canvas size
  createCanvas(220, 220);
  UI();
  noFill();
  // Set the SVG group by stroke color to `true`, so that strokes 
  // of the same color are grouped together in the SVG file. 
  setSvgGroupByStrokeColor(true); 
  colorMode(HSB, 360, 100, 100) // HSB stands for hue (0-360 in values), saturation (0-100 in numeric values), and brightness (0-100 in number values)
}
}

function draw(){
  colorMode(HSB, 360, 100, 100) // HSB stands for hue (0-360 in values), saturation (0-100 in numeric values), and brightness (0-100 in number values)

  push();
  setCenter(width/2, height/2);
  rotate(myRandomSeed);
  polarEllipses(10, 10, 100, 25); // https://editor.p5js.org/melodyloveless/sketches/4rOr7DfJa
  polarLine(5, 90, 2);
  polarHeptagon(11,2,3);
  pop();


  clear();
  randomSeed(myRandomSeed); 
  background(255); 
  
  if (bDoExportSvg == true){
    beginRecordSvg(this, "myOutput_" + month() + day() + year() + "_" + myRandomSeed + ".svg");
  }

  // define your drawing below
  myDrawing(); 

  if (bDoExportSvg){
    endRecordSvg(); 
    bDoExportSvg = false;
  }
}

function myDrawing() {
  strokeWeight(1); 
  let s = random(50,200);
  // Note: if your ellipse() doesn't show up when you're trying to export as an .svg,
  // try using circle() instead
  circle(width/2,height/2, s);
  setCenter(width/2, height/2);
  polarTriangles(random(20,30), random(50,70), 100);
} 
// Tip: When plotting, strokeWeight() doesn't affect your drawing. 
// To change the thickness of your drawing, change your pen/marker/etc
// - or experiment with code (use a for loop to create an 'outline')

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

// Make a new random seed when the "Regenerate" button is pressed
function regenerate(){
  myRandomSeed = round(millis()); 
}

// Set the SVG to be exported when the "Export SVG" button is pressed
function initiateSvgExport(){
  bDoExportSvg = true; 
}

function UI() {
  regenerateButton = createButton('Regenerate');
  regenerateButton.position(0, height);
  regenerateButton.mousePressed(regenerate); // run regenerate() when pressed
  
  exportSvgButton = createButton('Export SVG');
  exportSvgButton.position(120, height);
  exportSvgButton.mousePressed(initiateSvgExport); // run initiateSvgExport() when pressed
}



function keyPressed(){ // press any key to toggle color on/off
  colorshow = !colorshow;
}

function mousePressed() {
  myRandomSeed=random(10,80); // https://docs.google.com/document/d/1pIEKKYwrDEGjKNYOve-6yeayMT8ZaW38qoUthIR4SfI/edit?tab=t.0
}

function mouseDragged() {
  myRandomSeed = map(mouseX, mouseY, width, 5, 40);
  noStroke();
  fill(200,200); //adding color to the drag
  ellipse(mouseX, mouseY, 20); // https://docs.google.com/document/d/1pIEKKYwrDEGjKNYOve-6yeayMT8ZaW38qoUthIR4SfI/edit?tab=t.0
}

/*
This template uses the following sketch as a starting point: 
https://editor.p5js.org/golan/sketches/LRTXmDg2q

Additional references/info:
https://github.com/golanlevin/p5.plotSvg
https://github.com/liz-peng/p5.Polar
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#beginrecordsvg
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#endrecordsvg

*/