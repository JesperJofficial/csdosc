let nootpitch;
let nootamp;
let nootlengte;

let counter = 0;
let playState = false;

function setup() {
  //plaats hier de code die maar één keer hoeft te worden uitgevoerd
  createCanvas(800, 600);
  background(0);
  nootpitch = fillArray(8, "pitch"); // [] met 8 pitches
  nootamp = fillArray(8, "amp");
  nootlengte = fillArray(8, "dur");
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(72); 
  text(counter + "", width / 2, height / 2);
  textSize(16);
  text(`nootpitch: [${nootpitch.join(", ")}]`, width / 2, height / 2 + 36);
  text(`nootamp: [${nootamp.join(", ")}]`, width / 2, height / 2 + 36 * 2);
  text(
    `nootlengte: [${nootlengte.join(", ")}]`,
    width / 2,
    height / 2 + 36 * 3
  );
  //plaats hier de code die continue herhaald moet worden.
  if (playState && frameCount % 30 === 0) {
    // counter++;
    // if (counter === nootpitch.length) {
    //   counter = 0;
    // }
    counter = (counter + 1) % nootpitch.length;
    makeNote(nootpitch[counter], nootamp[counter], nootlengte[counter]);
  }
}
//32 is spacebar voor start/stop
function keyPressed(event) {
  if (keyCode === 32) {
    playState = !playState;
  }
  // 82 is R van rechts
  //unshift voegt een element toe aan het begin vd lijst
  //pop verwijdert het laatste element van de lijst
  if (keyCode === 82) {
    nootpitch = rotateRight(nootpitch);
    nootamp = rotateRight(nootamp);
    nootlengte = rotateRight(nootlengte);
  }
  // 76 is L van links
  //
  //
  if (keyCode === 76) {
    nootpitch = rotateLeft(nootpitch);
    nootamp = rotateLeft(nootamp);
    nootlengte = rotateLeft(nootlengte);
  }

  // 78 is "n", verandert nootpitch;
  if (keyCode === 78) {
    nootpitch.reverse();
  }
  // 68 is "d", verandert lengtes;
  if (keyCode === 68) {
    nootlengte = shuffle(nootlengte);
  }
  // 65 is "a", verandert amplitudes;
  if (keyCode === 65) {
    nootamp.reverse();
  }
}

function rotateRight(arr) {
  const newArr = [...arr];
  newArr.unshift(newArr.pop());
  return newArr;
}

function rotateLeft(arr) {
  const newArr = [...arr];
  newArr.push(newArr.shift());
  return newArr;
}

function fillArray(amount, type) {
  const arr = [];
  console.log(type);

  let options;
  switch (type) {
    case "pitch":
      options = { min: 48, max: 84, decimals: 0 };
      break;
    case "dur":
      options = { min: 40, max: 200, decimals: 0 };
      break;
    case "amp":
      options = {decimals: 2 };
      break;
  }

  for (let i = 0; i < amount; i++) {
    // if (type === "pitch") {
    //   arr.push(floor(random(48, 84)));
    // } else if (type === "amp") {
    //   arr.push(round(random(), 2));
    // } else if (type === "dur") {
    //   arr.push(floor(random(40, 200)));
    // }
    arr.push(round(random(options.min, options.max), options.decimals));
  }
  return arr;
}
