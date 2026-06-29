const key = document.getElementById("key");
const symbolDisplay = document.getElementById("symbol");
const decodedDisplay = document.getElementById("decoded");

let state = 0;
let sequence = "";
let texto = "";
let timeout = null;


// Morse dictionary #credit : REDDIT
const morseMap = {
  ".-":"A","-...":"B","-.-.":"C","-..":"D",".":"E",
  "..-.":"F","--.":"G","....":"H","..":"I",".---":"J",
  "-.-":"K",".-..":"L","--":"M","-.":"N","---":"O",
  ".--.":"P","--.-":"Q",".-.":"R","...":"S","-":"T",
  "..-":"U","...-":"V",".--":"W","-..-":"X","-.--":"Y",
  "--..":"Z",
  "-----":"0",".----":"1","..---":"2","...--":"3",
  "....-":"4",".....":"5","-....":"6","--...":"7",
  "---..":"8","----.":"9"
};

// Detect touching
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const startEvent = isTouchDevice? "touchstart" : "mousedown";
const endEvent = isTouchDevice? "touchend" : "mouseup";

// Start listening
key.addEventListener(startEvent, (e) => {
  e.preventDefault();
  state = Date.now();
  key.style.background = "red";

  clearTimeout(timeout);
  console.log("down", state);
});

//figuring out dot vs dash
key.addEventListener(endEvent, (e) => {
  e.preventDefault();
  const pressDuration = Date.now() - state; //duration
  console.log(pressDuration);

  key.style.background = "whitesmoke";


  
  if (pressDuration < 300) {
    sequence += "."; // short = dot
  } else {
    sequence += "-"; // long = dash
  }
  symbolDisplay.textContent = sequence;
  console.log(sequence)


  
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    decodeMorse(sequence);
    sequence = "";
    symbolDisplay.textContent = "";
  }, 1000); // 1000ms = 1 sec
});

// Decode Morse
function decodeMorse(symbols) {
  if (!symbols) return; 
  const letter = morseMap[symbols] || "?";
  texto += letter;
  decodedDisplay.textContent = texto;
  symbolDisplay.textContent = "";
}