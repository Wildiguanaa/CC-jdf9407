function setup() {
  let canvas = createCanvas(440, 440);
  rectMode(CENTER);
  canvas.parent('week5-sketch'); // do not delete - links to your index.html pages (description)
}

let drag = 0; //making this global variable so that if i drag a pupil or iris it might break the timing and act organically in response

//attempt at a shadow for eyeballs
noStroke();
fill(0,0,0,80);
ellipse(width/$+6,height/2+6, eyeballsize);


function draw() {
  background(34,0,0);
  // fill(0);
  text("Week 5 Sketch", width/20, height/12);
 



  // eyeball swells/increases diameter by the hour 0-23
  let currenthour = hour();
  let eyeballsize = map(currenthour, 0, 23, 100, 180); // map(value, low1, high1, low2, high2) or i can think about it as map(value, start1, stop1, start2, stop2, [withinBounds])
  
  
  // LEFT eye

  // eyeball shape
  fill(200);
  ellipse(width/4, height/2, eyeballsize);

  // eye veins 
  push(); 
  angleMode(DEGREES); // degrees (0 to 360)
  translate(width/4, height/2); //origin at eye center
  stroke(100, 20, 20, 50); //transparent red
  strokeWeight(2); // gives line visible thickness

  let veinsL = 22; //number of eye veins
  let anglechangeL = 360 / veinsL; // 360 degrees split into 24 veins (15 degrees each)
  
  for (let i=0; i<veinsL; i++) {
    // let angle = (2/veinsL) *i;
    let inRadius = 20;
    let outRadius = eyeballsize; // veinsL will stay the same size as the eyeball

    polarLine(200, inRadius, 40, outRadius); 
    noFill();
    polarEllipse(2, 20, 26, 40); 
    rotate(anglechangeL); // Rotate coordinate grid by 15 degrees for the next vein 
    }
    pop(); // restore
  
  // pupil and iris movement
  push(); 
  // // pupil dilates/increases diameter by the minute 0-59
  let currentminuteL = (minute()+ drag%60); //adding drag to the minute (60 seconds)
  randomSeed(currentminuteL);
  let pupilsizeL = random(10, 35);

  // mapping seconds (0 to 60 seconds) to rotation degrees (0 to 360 degrees)
  let eyeangleL = map(second() + drag, 0, 60, 0, 360);

  angleMode(DEGREES); // degrees (0 to 360)
  translate(width/4, height/2); //origin at eye center
  rotate(eyeangleL); // rotating the coordinates with time

  // iris
  fill("green");
  ellipse(15, 0, 70); // (15,0,70)

  // pupil 
  fill("black");
  ellipse(15, 0, pupilsizeL); //(15,0,20)
  pop();
 

  // RIGHT eye

  // eyeball shape
  fill(200);
  ellipse(width/2, height/2, eyeballsize);

  // eye veins 
  push(); 
  angleMode(DEGREES); // degrees (0 to 360)
  translate(width/2, height/2); //origin at eye center
  stroke(100, 20, 20, 50); //transparent red
  strokeWeight(2); // gives line visible thickness

  let veinsR = 24; //number of eye veins
  let anglechangeR = 360 / veinsR; // 360 degrees split into 24 veins (15 degrees each)
  
  for (let i=0; i<veinsR; i++) {
    // let angle = (2/veins) *i;
    let inRadius = 20;
    let outRadius = eyeballsize/2; // veins will stay the same size as the eyeball

    polarLine(200, inRadius, 40, outRadius); 
    noFill();
    polarEllipse(2, 20, 26, 40); 
    rotate(anglechangeR); // Rotate coordinate grid by 15 degrees for the next vein 
    }
    pop(); // restore

  // pupil dilates/increases diameter by the minute 0-59
  let currentminuteR = minute();
  randomSeed(currentminuteR);
  let pupilsizeR = random(10, 35);

  // mapping seconds (0 to 60 seconds) to rotation degrees (0 to 360 degrees)
  let eyeangleR = map(second(), 0, 60, 0, 360);

  // pupil and iris movement
  push(); 
  angleMode(DEGREES); // degrees (0 to 360)
  translate(width/2, height/2); //origin at eye center
  rotate(eyeangleR); // rotating the coordinates with time

  // iris
  fill("green");
  ellipse(15, 0, 70); // (15,0,70)

  // pupil 
  fill("black");
  ellipse(15, 0, pupilsizeR); //(15,0,20)
  pop();


// eye lids?? or an attempt at them

push();
fill(120,100,120); //just wanted to match background color
noStroke();
angleMode(DEGREES);

// top eye lid
arc(width/4, height/2.15, eyeballsize, eyeballsize, 180, 360) //https://beta.p5js.org/reference/p5/arc/
stroke(1);
arc(width/2, height/2, eyeballsize+1, eyeballsize+11, 185, 355) //https://beta.p5js.org/reference/p5/arc/
// arc(x, y, w, h, start, stop, [mode], [detail])

}

  // attempt at making the pupil and iris move organically with a mouse drag
  function mouseDragged() { //https://p5js.org/reference/p5/mouseDragged/ 
    drag +=5; // increases time when dragging

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
  // They are what's known as a build artifact, the result of a compilation or build process 