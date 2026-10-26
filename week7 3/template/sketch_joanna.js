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



  // LEFT eye

  meltedeyeball(width/4); 

  // // eyeball shape 
  // fill(200);
  // ellipse(width/4, height/2, eyeballsize, eyeballsize+stretch);

  // eye veins 
  push(); 
  // angleMode(DEGREES); // degrees (0 to 360)
  translate(width/4, height/2); //origin at eye center
  stroke(100, 20, 20, 50); //transparent red
  strokeWeight(2); // gives line visible thickness
  let veinsL = 22; //number of eye veins
  let anglechangeL = 360 / veinsL; // 360 degrees split into 24 veins (15 degrees each)
  for (let i=0; i<veinsL; i++) {
    polarLine(200, 20, 40, eyeballsize/2); 
    noFill();
    polarEllipse(2, 20, 26, 40); 
    rotate(anglechangeL); // Rotate coordinate grid by 15 degrees for the next vein  
    }
    pop(); // restore
  
  // pupil and iris movement
  push(); 
  // // pupil dilates/increases diameter by the minute 0-59
  // let currentminuteL = (minute()+ drag%60); //adding drag to the minute (60 seconds)
  
  // let currentminuteL = minute();
  randomSeed(minute());
  let pupilsizeL = random(10, 35);
  pupilsizechangeleft = lerp(pupilsizechangeleft, pupilsizeL, 0.05);

  // mapping seconds (0 to 60 seconds) to rotation degrees (0 to 360 degrees)
  let eyeangleL = map(second(), 0, 60, 0, 360);

  // angleMode(DEGREES); // degrees (0 to 360)
  translate(width/4 + meltx*15, height/2+melty*15); // iris sliding towards melting
  rotate(eyeangleL); // rotating the coordinates with time
  noStroke();
  // iris
  fill("green");
  ellipse(15, 0, 70); // (15,0,70)

  // pupil 
  fill("black");
  ellipse(15, 0, pupilsizechangeleft); //(15,0,20)
  pop();
 

  // RIGHT eye

  meltedeyeball(width/2);

  // // eyeball shape
  // fill(200);
  // ellipse(width/2, height/2, eyeballsize, eyeballsize+stretch);

  // eye veins 
  push(); 
  // angleMode(DEGREES); // degrees (0 to 360)
  translate(width/2, height/2); //origin at eye center
  stroke(100, 20, 20, 50); //transparent red
  strokeWeight(2); // gives line visible thickness

  let veinsR = 24; //number of eye veins
  let anglechangeR = 360 / veinsR; // 360 degrees split into 24 veins (15 degrees each)
  
  for (let i=0; i<veinsR; i++) {
    // let angle = (2/veins) *i;
    // let inRadius = 20;
    // let outRadius = eyeballsize/2; // veins will stay the same size as the eyeball

    polarLine(200, 20, 40, eyeballsize/2); 
    noFill();
    polarEllipse(2, 20, 26, 40); 
    rotate(anglechangeR); // Rotate coordinate grid by 15 degrees for the next vein 
    }
    pop(); // restore

  // pupil dilates/increases diameter by the minute 0-59
  // let currentminuteR = minute();
  // randomSeed(currentminuteR);
  // let 
  // 


  // /
  // 

  // pupil and iris movement
  push(); 
  // angleMode(DEGREES); // degrees (0 to 360)
  randomSeed(minute());
  let pupilsizeR = random(10, 35);
  pupilsizechangeright = lerp(pupilsizechangeright, pupilsizeR, 0.05);
 
// mapping seconds (0 to 60 seconds) to rotation degrees (0 to 360 degrees)
  let eyeangleR = map(second(), 0, 60, 0, 360);
 
  translate(width/2 + meltx*15, height/2+melty*15); //origin at eye center
  rotate(eyeangleR); // rotating the coordinates with time
  noStroke();

   // iris
  fill("green");
  ellipse(15, 0, 70); // (15,0,70)

  // pupil 
  fill("black");
  ellipse(15, 0, pupilsizechangeright); //(15,0,20)
  pop();




}
  function meltedeyeball(x) {
    fill(200);
    noStroke();
    beginShape(); // will begin to start drawing a custom shape https://p5js.org/reference/p5/beginShape/
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

    vertex(x + xpoint, height/2 + ypoint); // https://p5js.org/reference/p5/vertex/
    } 
  endShape(CLOSE); // last point connects to first https://p5js.org/reference/p5/endShape/
 }
  // setCenter(width/2, height/2); 
  // noFill();
  // fill("red");
  // noStroke();
  // stroke("red"); 
  // ellipse(mouseX, mouseY, 20);
// polarHeptagon(95, 32, 12); 
  // polarEllipses(8, 12, 12, 50); // 8 ellipses (12x12 px) spaced 50 px from center
  // polarEllipses(number, width, height, distance)
  // polarLine(95, 32, 2);
  // circle(width/2,height/2, s);
  // setCenter(width/2, height/2);
  // polarTriangles(random(20,30), random(50,70), 100);
  // 
  // why is it that when i try and add polar lines/ellipses etc that my drawing goes blank leaving only a grey circle and the text behind? 




  // andrew's instructions to troubleshoot error

  // issue: When I try and sync my commits on vs code 
  // I get this error that tells me it cant do it 
  // And so I tried pulling and then commit/syncing again 
  // and it doesn’t work

  // error message "Can't push refs to remote. Try running
  // "Pull" first to integrate your changes. 
  // Open Git Log
  // Show Command Output"


  // andrew's directions

  // run "git reset --soft HEAD~1"
  // That will delete your most reset local commit but 
  // maintain the changes you've made to the files

  // after you run that command, do "git stash" to save 
  // your current changes. Then do "git pull" to get 
  // upstream changes. Then do "git stash pop" to retrieve 
  // your changes 
  // then do the commit + sync again
  // sync is just "git push" by the way 

  // Click open git log 
  // remote: error: File MicrosoftEdge-154.0.4258.62.dmg is 391.32 MB; this exceeds GitHub's file size limit
  // find and delete it - deleted
  // dmg files never go into github repositories 
  // They are what's known as a build artifact, the result of a compilation or build process   // map 0-59 seconds are set to 0-1 so the eyes can melt over each minute
  // let melteach = map(second(), 0, 59, 0, 1);
  
  // // lerp move only 5 percent in the designated direction every frame smoothly
  // melt = lerp(melt, melteach, 0.05);

  // // easing making it start slower and then speed up at the end
  // let ease = melt*melt;
  // let stretch = ease*40; // eyeball stretches up to 40 units (is it px?) taller

    // // // let angle = (2/veinsL) *i;
    // let inRadius = 20;
    // let outRadius = eyeballsize; // veinsL will stay the same size as the eyeball

// // eye lids?? or an attempt at them

// push();
// fill(120,100,120); //just wanted to match background color
// noStroke();


// // top eye lid
// arc(width/4, height/2.15, eyeballsize, eyeballsize, 180, 360) //https://beta.p5js.org/reference/p5/arc/
// stroke(1);
// arc(width/2, height/2, eyeballsize+1, eyeballsize+11, 185, 355) //https://beta.p5js.org/reference/p5/arc/
// // arc(x, y, w, h, start, stop, [mode], [detail])

// }

//   // attempt at making the pupil and iris move organically with a mouse drag
//   function mouseDragged() { //https://p5js.org/reference/p5/mouseDragged/ 
//     drag +=5; // increases time when dragging

//   }
  