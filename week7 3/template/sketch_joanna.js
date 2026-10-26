// no global setup() or draw() -got rid of that
// it needs to be one function that receives "p" (the p5 instance)

// let drag = 0; //making this global variable so that if i drag a pupil or iris it might break the timing and act organically in response
// let melt = 0; // which will be how melted the eyes are with a range of 0-1

// globals are fine as long as they are different per person
let eyeballsize = 100; //making this global so the melt function can see it
let meltx = 0; //melt direction: -1 left, 1 right
let melty = 0.4; //-1 up, 1 down (0.4 = is a small default droop)
let pupilsizechangeleft = 20; //pupil sizes changing slowly
let pupilsizechangeright = 20; 

function eyesSetup(pg) {
// pg is a separate drawing surface; it doesn't copy the main canvas's settings.  
// without this line, pg.rotate() would use radians and the iris would spin not how i want it to
    pg.angleMode(DEGREES); 
}
function eyesDesign(pg) {
    pg.background(34,0,0);
  // eyeball swells/increases diameter by the hour 0-23
    let currenthour = hour();
    eyeballsize = map(currenthour, 0, 23, 100, 180); // map(value, low1, high1, low2, high2) or i can think about it as map(value, start1, stop1, start2, stop2, [withinBounds])
  
  // the melt goes where
  let reachx = 0;
  let reachy = 0.4;
  if (mouseIsPressed) { // this is true while the mouse is held down
    reachx = (mouseX - width/2) / (width/2); // mouse position to -1 to 1
    reachy = (mouseY - height/2) / (height/2);
  }
  
  // lerp move 5 percent toward the end number each frame in smoothly
  meltx = lerp(meltx, reachx, 0.05); // https://p5js.org/reference/p5/lerp/
  melty = lerp(melty, reachy, 0.05);
  
  //attempt at a shadow for eyeballs
  pg.noStroke();
  pg.fill(0,0,0,80);
  // ellipse(width/$+6,height/2+6, eyeballsize);
  pg.ellipse(width/4 + 6, height/2 + 6, eyeballsize); 
  pg.ellipse(width/2 + 6, height/2 + 6, eyeballsize);

}

  // LEFT eye
function lefteye(pg,x,countvein, pupilsize) {

  meltedeyeball(width/4); 

  // // eyeball shape 
  // fill(200);
  // ellipse(width/4, height/2, eyeballsize, eyeballsize+stretch);

  // eye veins 
  pg.push(); 
  // angleMode(DEGREES); // degrees (0 to 360)
  pg.translate(width/4, height/2); //origin at eye center
  pg.stroke(100, 20, 20, 50); //transparent red
  pg.strokeWeight(2); // gives line visible thickness
  let veinsL = 22; //number of eye veins
  let anglechangeL = 360 / veinsL; // 360 degrees split into 24 veins (15 degrees each)
  for (let i=0; i<veinsL; i++) {
    pg.polarLine(200, 20, 40, eyeballsize/2); 
    pg.noFill();
    pg.polarEllipse(2, 20, 26, 40); 
    pg.rotate(anglechangeL); // Rotate coordinate grid by 15 degrees for the next vein  
    }
    pg.pop(); // restore
  
  // pupil and iris movement
  pg.push(); 
  // // pupil dilates/increases diameter by the minute 0-59
  // let currentminuteL = (minute()+ drag%60); //adding drag to the minute (60 seconds)
  
  // let currentminuteL = minute();
  randomSeed(minute());
  let pupilsizeL = random(10, 35);
  pupilsizechangeleft = lerp(pupilsizechangeleft, pupilsizeL, 0.05);

  // mapping seconds (0 to 60 seconds) to rotation degrees (0 to 360 degrees)
  let eyeangleL = map(second(), 0, 60, 0, 360);

  // angleMode(DEGREES); // degrees (0 to 360)
  pg.translate(width/4 + meltx*15, height/2+melty*15); // iris sliding towards melting
  pg.rotate(eyeangleL); // rotating the coordinates with time
  pg.noStroke();
  // iris
  pg.fill("green");
  pg.ellipse(15, 0, 70); // (15,0,70)

  // pupil 
  pg.fill("black");
  pg.ellipse(15, 0, pupilsizechangeleft); //(15,0,20)
  pg.pop();
}

  // RIGHT eye
function rightteye(pg,x,countvein, pupilsize) {
    
  meltedeyeball(width/2);

  // // eyeball shape
  // fill(200);
  // ellipse(width/2, height/2, eyeballsize, eyeballsize+stretch);

  // eye veins 
  pg.push(); 
  // angleMode(DEGREES); // degrees (0 to 360)
  pg.translate(width/2, height/2); //origin at eye center
  pg.stroke(100, 20, 20, 50); //transparent red
  pg.strokeWeight(2); // gives line visible thickness

  let veinsR = 24; //number of eye veins
  let anglechangeR = 360 / veinsR; // 360 degrees split into 24 veins (15 degrees each)
  
  for (let i=0; i<veinsR; i++) {
    // let angle = (2/veins) *i;
    // let inRadius = 20;
    // let outRadius = eyeballsize/2; // veins will stay the same size as the eyeball

    pg.polarLine(200, 20, 40, eyeballsize/2); 
    pg.noFill();
    pg.polarEllipse(2, 20, 26, 40); 
    pg.rotate(anglechangeR); // Rotate coordinate grid by 15 degrees for the next vein 
    }
    pg.pop(); // restore

  // pupil dilates/increases diameter by the minute 0-59
  // let currentminuteR = minute();
  // randomSeed(currentminuteR);
  // let 
  // 


  // /
  // 

  // pupil and iris movement
  pg.push(); 
  // angleMode(DEGREES); // degrees (0 to 360)
  randomSeed(minute());
  let pupilsizeR = random(10, 35);
  pupilsizechangeright = lerp(pupilsizechangeright, pupilsizeR, 0.05);
 
// mapping seconds (0 to 60 seconds) to rotation degrees (0 to 360 degrees)
  let eyeangleR = map(second(), 0, 60, 0, 360);
 
  pg.translate(width/2 + meltx*15, height/2+melty*15); //origin at eye center
  pg.rotate(eyeangleR); // rotating the coordinates with time
  pg.noStroke();

   // iris
  pg.fill("green");
  pg.ellipse(15, 0, 70); // (15,0,70)

  // pupil 
  pg.fill("black");
  pg.ellipse(15, 0, pupilsizechangeright); //(15,0,20)
  pg.pop();




}
  function meltedeyeball(pg, x) {
    pg.fill(200);
    pg.noStroke();
    pg.beginShape(); // will begin to start drawing a custom shape https://p5js.org/reference/p5/beginShape/
    for (let i=0; i<360; i+=5) { // waling in a circle in 5 degree each part
      let r = eyeballsize/2;
      let xpoint = cos(i)*r; // cos and sin give a point on the circle https://p5js.org/reference/p5/cos/ and 
      let ypoint = sin(i)*r;

// checking whether the point faces the direction of the melt pos = hell yea
    let direction = cos(i)*meltx + sin(i)*melty;
    let pulled = max(0,direction); // pls ignore points that do not face that way

    // stretcht he points facing the melts direction
    xpoint += meltx*pulled*75;
    ypoint += melty*pulled*75;

    // using noise to kind of smooth the randomness 
    ypoint += noise(i*0.1, frameCount*0.2)*10*pulled;

    pg.vertex(x + xpoint, height/2 + ypoint); // https://p5js.org/reference/p5/vertex/
    } 
  pg.endShape(CLOSE); // last point connects to first https://p5js.org/reference/p5/endShape/
 }
  