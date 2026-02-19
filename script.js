const key = document.getElementById("key");
const symbolDisplay = document.getElementById("symbol");
const decodedDisplay = document.getElementById("decoded");

let pressStartTime = 0;
let morseSequence = "";
let decodedText = "";
let timeout = null;

// Morse dictionary
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

// Detect touch device
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const startEvent = isTouchDevice ? "touchstart" : "mousedown";
const endEvent = isTouchDevice ? "touchend" : "mouseup";

// Start press
key.addEventListener(startEvent, (e) => {
  e.preventDefault();
  pressStartTime = Date.now();
  key.style.background = "red";
  clearTimeout(timeout);
});

// End press
key.addEventListener(endEvent, (e) => {
  e.preventDefault();
  const pressDuration = Date.now() - pressStartTime;
  key.style.background = "whitesmoke";

  if (pressDuration < 300) morseSequence += ".";
  else morseSequence += "-";

  symbolDisplay.textContent = morseSequence;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    decodeMorse(morseSequence);
    morseSequence = "";
  }, 1000);
});

// Decode Morse
function decodeMorse(symbols) {
  if (!symbols) return;
  const letter = morseMap[symbols] || "?";
  decodedText += letter;
  decodedDisplay.textContent = decodedText;
  symbolDisplay.textContent = "";
}
