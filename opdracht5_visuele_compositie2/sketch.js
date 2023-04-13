let rectWidth = 225;
let rectHeight = 130;

function setup() {
  // canvas moet net zo groot zijn als de browser window
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0);
  //plaats hier de code die continue herhaald moet worden.

  drawCenterBox();
}

// maak canvas weer zo groot als de window als de window van grootte verandert
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawCenterBox() {
  rectMode(CENTER);
  rect(width / 2, height / 2, rectWidth, rectHeight);

  // rechter flap
  quad(
    width / 2 + rectWidth / 2, // linksonder
    height / 2 - rectHeight / 2,

    width / 2 + rectWidth / 2 + 20, // rechtsonder
    height / 2 - rectHeight / 2 + 2,

    width / 2 + rectWidth / 2 + 30, // rechtsboven
    height / 2 - rectHeight / 2 - rectWidth / 2 + 2,

    width / 2 + rectWidth / 2 + 10, // linksboven
    height / 2 - rectHeight / 2 - rectWidth / 2
  );

  // linker flap
  quad(
    width / 2 - rectWidth / 2, // rechtsonder
    height / 2 - rectHeight / 2,

    width / 2 - rectWidth / 2 - 20, // linksonder
    height / 2 - rectHeight / 2 + 2,

    width / 2 - rectWidth / 2 - 30, // linksboven
    height / 2 - rectHeight / 2 - rectWidth / 2 + 2,

    width / 2 - rectWidth / 2 - 10, // rechtsboven
    height / 2 - rectHeight / 2 - rectWidth / 2
  );

  // linker scharnier
  circle(width / 2 - rectWidth / 2 - 5, height / 2 - rectHeight / 2 + 7, 10);

  // rechter scharnier
  circle(width / 2 + rectWidth / 2 + 5, height / 2 - rectHeight / 2 + 7, 10);
}
