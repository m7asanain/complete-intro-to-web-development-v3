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
  switch (symbol) {
    case 'C':
      buffer = 0;
      break;
    case '=':
      console.log('equals');
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '+':
    case '-':
    case '÷':
    case '×':
      console.log('math symbols');
      break;
  }
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