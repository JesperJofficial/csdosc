let ball1X;
let ball1Y;
let ball1XSpeed;
let ball1YSpeed;
let ball1_fillColor;

let ball2X;
let ball2Y;
let ball2XSpeed;
let ball2YSpeed;
let ball2Size;

function setup() {
  //plaats hier de code die maar één keer hoeft te worden uitgevoerd
  createCanvas(800, 600);
  background(255);

  // ball 1
  ball1X = 300;
  ball1Y = 200;
  ball1XSpeed = 5;
  ball1YSpeed = 3;
  ball1_fillColor = color(255, 0, 255);

  // ball 2
  ball2X = 150;
  ball2Y = 400;
  ball2XSpeed = 2;
  ball2YSpeed = 4;
  ball2Size = 100;
}

function draw() {
  //plaats hier de code die continue herhaald moet worden.
  background(255);
  noStroke();
  fill(ball1_fillColor);
  circle(ball1X, ball1Y, 50);
  ball1X = ball1X + ball1XSpeed;
  ball1Y = ball1Y + ball1YSpeed;
  if (ball1X >= width - 25 || ball1X < 25) {
    ball1XSpeed = ball1XSpeed * -1;
    makeNote(62, 0.5, 100);
    ball1_fillColor = color(
      floor(random(256)),
      floor(random(256)),
      floor(random(256))
    );
  }

  if (ball1Y >= height - 25 || ball1Y < 25) {
    ball1YSpeed = ball1YSpeed * -1;
    makeNote(65, 0.5, 100);
    ball1_fillColor = color(
      floor(random(256)),
      floor(random(256)),
      floor(random(256))
    );
  }

  fill(255, 255, 0);
  circle(ball2X, ball2Y, ball2Size);
  ball2X = ball2X + ball2XSpeed;
  ball2Y = ball2Y + ball2YSpeed;
  if (ball2X >= width - ball2Size / 2 || ball2X < ball2Size / 2) {
    ball2XSpeed = ball2XSpeed * -1;
    makeNote(53, 0.5, 100);
    ball2Size = random(75, 125);
  }

  if (ball2X < ball2Size / 2) {
    ball2X = ball2Size / 2;
  }
  if (ball2X >= width - ball2Size / 2) {
    ball2X = width - ball2Size / 2;
  }

  if (ball2Y >= height - ball2Size / 2 || ball2Y < ball2Size / 2) {
    ball2YSpeed = ball2YSpeed * -1;
    makeNote(40, 0.5, 130);
    ball2Size = random(75, 125);
  }

  if (ball2Y < ball2Size / 2) {
    ball2Y = ball2Size / 2;
  }
  if (ball2Y >= height - ball2Size / 2) {
    ball2Y = height - ball2Size / 2;
  }
}
