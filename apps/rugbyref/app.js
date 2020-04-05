var counter = 30;
var counterInterval;
var scoreA = 0;
var scoreB = 0;

function outOfTime() {
  if (counterInterval) return;
  E.showMessage(scoreA + " - " + scoreB, "Final score");
  Bangle.buzz();
  Bangle.beep(200, 4000)
    .then(() => new Promise(resolve => setTimeout(resolve,200)))
    .then(() => Bangle.beep(200, 3000));
  // again, 10 secs later
  setTimeout(outOfTime, 10000);
}

function countDown() {
  counter--;
  // Out of time
  if (counter<=0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    setWatch(startTimer, BTN2);
    outOfTime();
    return;
  }

  g.clear();
  g.drawLine(75, 95, 75, 210); // left post
  g.drawLine(175, 95, 175, 210); // right post
  g.drawLine(75, 153, 175, 153); // crossbar
  
  g.setFontAlign(0,0); // center font
  g.setFont("Vector",60); // vector font, 60px  
  // draw the scores
  g.drawString(scoreA,120,120);
  g.drawString(scoreB,120,180);
  // draw the current counter value
  g.drawString(counter,120,50);
  // optional - this keeps the watch LCD lit up
  g.flip();
}

function incScoreA() {
  scoreA++;
}

function incScoreB() {
  scoreB++;
}


function startTimer() {
  counter = 30;
  scoreA = 0;
  scoreB = 0;
  countDown();
  if (!counterInterval)
    counterInterval = setInterval(countDown, 1000);
}

setWatch(incScoreA, BTN1, { repeat: true });
setWatch(incScoreB, BTN3, { repeat: true });

startTimer();