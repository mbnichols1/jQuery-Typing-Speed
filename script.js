const quotes = [
  "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
"Octopuses have three hearts and blue blood.",
"Bananas are berries, but strawberries aren’t.",
"A group of flamingos is called a ‘flamboyance’.",
"The Eiffel Tower can be 15 cm taller during the summer due to heat expansion.",
"Wombat poop is cube-shaped.",
"There are more stars in the universe than grains of sand on Earth.",
"Sharks have been around longer than trees.",
"Cows have best friends and get stressed when separated.",
"Sloths can hold their breath longer than dolphins.",
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
