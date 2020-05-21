#!/usr/bin/env node

const wordList = [
  [3, 'Fizz'],
  [5, 'Buzz'],
  // [7, 'Quux'], // I know you'll want this...
];

const print = x => console.log(x);
const plus = x => y => x + y;

const makeWordifier = (divisible, word) => (acc, i) =>
  i % divisible === 0 ? `${acc}${word}` : acc;

const fallback = (acc, i) => (acc === '' ? String(i) : acc);

const wordReducer = x => {
  return wordList
    .map(x => makeWordifier(...x))
    .concat(fallback)
    .reduce((acc, f) => f(acc, x), '');
};

[...Array(105).keys()]
  .map(plus(1))
  .map(wordReducer)
  .map(print);
