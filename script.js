const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests are fun and improve your accuracy.",
  "Practice makes perfect when learning to code.",
  "Speed and precision are key to success.",
];

let currentQuote = "";
let timer;
let time = 0;
let started = false;

function startTimer() {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      time++;
      $("#timer").text(`${time}s`);
      calculateWPM();
    }, 1000);
  }
}

function setNewQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  $("#quote").text(currentQuote);
  $("#input").val("");
  $("#timer").text("0s");
  $("#wpm").text("0");
  $("#accuracy").text("0%");
  time = 0;
  started = false;
  clearInterval(timer);
}

function calculateWPM() {
  const input = $("#input").val().trim();
  const wordsTyped = input.split(/\s+/).length;
  const wpm = time > 0 ? Math.round((wordsTyped / time) * 60) : 0;
  $("#wpm").text(wpm);
}

function calculateAccuracy() {
  const input = $("#input").val();
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentQuote[i]) correct++;
  }
  const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0;
  $("#accuracy").text(`${accuracy}%`);
}

$(document).ready(function () {
  setNewQuote();

  $("#input").on("input", function () {
    startTimer();
    calculateAccuracy();

    if ($("#input").val().trim() === currentQuote) {
      clearInterval(timer);
    }
  });

  $("#restart").click(function () {
    setNewQuote();
  });
});
