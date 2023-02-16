const character = '🤑';
const timesToRepeat = 10;

let answer = '';

for (let i = 0; i < timesToRepeat; i++) {
  answer = answer + character;
}

// console.log("".padStart(timesToRepeat, character)); - super cleaver

console.log(answer);