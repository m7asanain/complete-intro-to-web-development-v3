let buffer = '0';
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  // keep track the number on the screen
  if (buffer == 0) {
    buffer = number;
  } else {
    buffer += number;
  }
}

// a placeholder function or class that doesn't do anything yet

function handleSymbol(symbol) {
  console.log('symbol');
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

// to update the number on the screen
function rerender() {
  screen.innerText = buffer;
}

init();