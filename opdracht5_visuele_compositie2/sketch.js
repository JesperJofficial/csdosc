const g = 0.5;

let rectWidth = 225;
let rectHeight = 130;

let gravityVector;

let counter = 0;
let playState = false;

function setup() {
  gravityVector = createVector(0, g);
  // canvas moet net zo groot zijn als de browser window
  createCanvas(windowWidth, windowHeight);
  background(0);

  Note.generateNotes(32, 36, 4);
}

function draw() {
  background(0);

  //plaats hier de code die continue herhaald moet worden.

  if (playState && frameCount % 10 === 0) {
    counter = (counter + 1) % Note.notes.length;
    Note.play(Note.notes[counter]);
  }

  Note.activeNotes.forEach((note) => {
    note.draw();
  });

  fill(255);

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

function keyPressed(event) {
  if (keyCode === 32) {
    playState = !playState;
  }
}

class Note {
  pitch; // done
  duration; // done
  amplitude; // done
  location; // done
  velocity; // done
  color; // done
  opacity; // done
  launchAngle; // done
  initialSize; // done
  radius; // done
  lifespan; // done
  static notes = [];
  static activeNotes = [];

  static key = [0, 2, 4, 5, 7, 9, 11]; // major
  constructor(pitch, duration, amplitude) {
    this.pitch = pitch;
    this.duration = duration;
    this.amplitude = amplitude;

    this.resetTransform();

    const prevColorMode = _colorMode;
    colorMode(HSL);
    this.color = color(
      Note.calculateHue(pitch),
      50,
      Note.calculateLightness(amplitude),
      this.opacity
    );
    colorMode(prevColorMode);

    this.launchAngle = Note.calculateLaunchAngle(pitch);
    this.initialSize = Note.calculateInitialSize(amplitude);

    this.lifespan = duration;

    this.location = createVector(width / 2, height / 2);
    this.velocity = p5.Vector.fromAngle(
      radians(this.launchAngle + 180),
      amplitude * 6 + 15
    );
  }

  draw() {
    const prevEllipseMode = _renderer._ellipseMode;
    // const prevFill = currFillColor ?? 255;

    ellipseMode(RADIUS);

    noStroke();

    fill(this.color);
    ellipse(this.location.x, this.location.y, this.radius);
    ellipseMode(prevEllipseMode);
    // fill(prevFill);

    this.translate();
  }

  translate() {
    this.location.add(this.velocity);
    this.velocity.add(gravityVector);

    // TODO shrink balls based on duration
    this.radius -= this.radius / ((this.duration / frameRate()) * 4);
    this.opacity -= this.opacity / (this.duration / frameRate());

    const prevColorMode = _colorMode;
    colorMode(HSL);
    this.color.setAlpha(this.opacity);
    colorMode(prevColorMode);
    // TODO bounce on walls
  }

  play() {
    this.resetTransform();
    makeNote(this.pitch, this.duration, this.amplitude);
  }

  resetTransform() {
    this.radius = this.initialSize;
    this.velocity = p5.Vector.fromAngle(
      radians(this.launchAngle + 180),
      this.amplitude * 6 + 15
    );
    this.location = createVector(width / 2, height / 2);
    this.opacity = 1;
  }

  static play(note) {
    note.resetTransform();
    note.play();
    Note.activeNotes.push(note);
    setTimeout(() => {
      Note.activeNotes.splice(Note.activeNotes.indexOf(note), 1);
    }, note.duration);
  }

  static calculateHue(pitch) {
    return (pitch % 36) * 10;
  }

  static calculateLightness(amplitude /* 0 - 1 */) {
    return amplitude * 100;
  }

  static calculateLaunchAngle(pitch) {
    return map(pitch, 0, 128, 0, 180);
  }

  static calculateInitialSize(amplitude) {
    return map(amplitude, 0, 1, 48, 56);
  }

  static generateNotes(amount = 8, offset = 48, octaves = 3) {
    const generatedNotes = [];
    const pitchFilter = [];

    // for loop die herhaalt voor het aantal octaves
    for (let i = 0; i < octaves; i++) {
      // forEach die voor elk element in `key` de naamloze functie aanroept die we meegeven (function (pitch) {})
      this.key.forEach(function (pitch) {
        // voor elke `pitch` in `key` voegt hij een waarde toe aan `pitchFilter`,
        // afhankelijk van het huidige "octaaf" voegt hij er een meervoud van 12 aan toe.
        pitchFilter.push(pitch + 12 * i);
      });
    }

    for (let i = 0; i < amount; i++) {
      // alle benodigde waarden voor een noot genereren
      let pitch = random(pitchFilter) + offset;
      let duration = random(1000, 2000);
      let amplitude = random(0.2, 1);
      // een nieuwe instantie van Note maken en in de generatedNotes array stoppen.
      generatedNotes.push(new Note(pitch, duration, amplitude));
    }
    this.notes = generatedNotes;
  }
}
