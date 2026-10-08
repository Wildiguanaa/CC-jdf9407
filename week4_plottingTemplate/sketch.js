// p5.plotSvg + p5.Polar Template

p5.disableFriendlyErrors = true; 
// p5.plotSvg.js
let bDoExportSvg = false; // declaring a boolean flag to track when an export should happen
// if using randomness, 
// as I am!,
// experiment w/ myRandomSeed to see different versions (or iterations) 
// of your sketch
let JoannaRandomSeed = 3201; 
let regenerateButton, exportSvgButton; 
let currenthue = 200;
let colorshow = true; // boolean variable (true = color shows, false = black and white)


function setup() {
  // canvas size
  createCanvas(420, 420);
  UI();
  noFill();
  // Set the SVG group by stroke color to `true`, so that strokes 
  // of the same color are grouped together in the SVG file. 
  setSvgGroupByStrokeColor(true); 
  colorMode(HSB, 360, 100, 100, 100) // HSB stands for hue (0-360 in values), saturation (0-100 in numeric values), and brightness (0-100 in number values)
}


function draw(){
  clear();
  randomSeed(JoannaRandomSeed); 
  background(244); // something i learned: Calling `background()` after drawing shapes immediately erases them before the frame is rendered on screen
  
  
  colorMode(HSB, 360, 100, 20) // HSB stands for hue (0-360 in values), saturation (0-100 in numeric values), and brightness (0-100 in number values)
 
  if (colorshow) {
    if (mouseIsPressed) {
      currenthue = (mouseX*2+mouseY*3) % 360; //update hue while dragging
      fill(currenthue, 100, 100, JoannaRandomSeed); // rainbow colors // keeps the last hue when released
    }
      else {
        noFill()
        // fill(0,0,100);
        //fill(200, 120, 100, 32); //in HSB mode i have to remember that zero brightness equals black
    }
  } 
  else {

    noFill(); // black and white
  }

  stroke(8);


  if (bDoExportSvg == true){
    beginRecordSvg(this, "myOutput_" + month() + day() + year() + "_" + JoannaRandomSeed + ".svg");
  }


  push();
  setCenter(width/2, height/2);
  rotate(JoannaRandomSeed);
  polarEllipses(10, 10, 10, 25); // https://editor.p5js.org/melodyloveless/sketches/4rOr7DfJa
  polarLine(5, 90, 2);
  polarHeptagon(11,2,3);
  // olarHeptagon(110,2,3);
  polarLine(50, 9, 2);


  pop();


  

 
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




function mousePressed() {
  JoannaRandomSeed=random(10,60); // https://docs.google.com/document/d/1pIEKKYwrDEGjKNYOve-6yeayMT8ZaW38qoUthIR4SfI/edit?tab=t.0
}

function mouseDragged() {
  JoannaRandomSeed = map(mouseX, 0, width, 4, 23);
  // fill(200,200); //adding color to the drag
  ellipse(mouseX - width/2, mouseY - height/2, 20); // had to subtract width and height to make the circle and mouse allign https://docs.google.com/document/d/1pIEKKYwrDEGjKNYOve-6yeayMT8ZaW38qoUthIR4SfI/edit?tab=t.0
}

function keyPressed() {
  if (key === "s") { 
    bDoExportSvg = true;
    // === means two values are equal in both value and data type
    // " " this is not an empty string, but a string containing a space. in p5.js/javascript is a text string containing a single space character. In p5.js, and in this function it tests if the user pressed the spacebar key on their keyboard  
    colorshow = !colorshow;
  }
}





// Make a new random seed when the "Regenerate" button is pressed
function regenerate(){
  JoannaRandomSeed = round(millis()); 
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


/* This template uses the following sketch as a starting point: 
https://editor.p5js.org/golan/sketches/LRTXmDg2q

Additional references/info:
https://github.com/golanlevin/p5.plotSvg
https://github.com/liz-peng/p5.Polar
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#beginrecordsvg
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#endrecordsvg */