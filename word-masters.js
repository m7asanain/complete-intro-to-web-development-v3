const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = '';
  let currentRow = 0;
  let isLoding = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  let done = false;
  setLoading(false);
  isLoding = false;

  console.log(word);

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      // add letter to the end
      currentGuess += letter;
    } else {
      // replace the last letter
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText = letter;
  }

  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      // do nothing
      return;
    }
    
    // TODO validate the word

    isLoding = true;
    setLoading(true);

    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess })
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const { validWord } = resObj; // same above line

    isLoding = false;
    setLoading(false);

    if (!validWord) {
      markInValidWord();
      return; // if its not found -> the hightligh going to be on the next line
    }

    // TODO do all the marking as "corrent", "close", "wrong"

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
    console.log(map);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      // mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing, we already did it
      } else if (wordParts.includes(guessParts[i]) && guessParts[i] > 0) {
        // make as close
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    currentRow++;
    
    if (currentGuess === word) { // win condition
      alert("You win!");
      document.querySelector(".brand").classList.add("winner");
      done = true;
      return;
    } else if (currentRow == ROUNDS) { // lose contition
      alert(`you lose, the word was ${word}`);
      done = true;
    }

    currentGuess = '';
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = "";
  }

  function markInValidWord() {
    // alert("not a valid word"); // totally valid

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

      setTimeout(function() {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
      }, 10);
    }
  }
  
  document.addEventListener('keydown', function hundleKeyPress(event) {
    if (done || isLoding) {
      // do nothing
      return;
    }

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoding) {
  loadingDiv.classList.toggle('show', isLoding);
}

function makeMap (array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    // if its exist reture..
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();