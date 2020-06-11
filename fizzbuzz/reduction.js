#!/usr/bin/env node

const conditions = [
  { divisible: 3, word: 'Fizz' },
  { divisible: 5, word: 'Buzz' }
  // {divisible: 7, word: 'Quux'}, // I know you'll want this...
];

const makeWordifier = ({ divisible, word }) => (acc, i) =>
  i % divisible === 0 ? `${acc}${word}` : acc;

const fallback = (acc, i) => (acc === '' ? String(i) : acc);

const fizzBuzz = num =>
 conditions 
    .map(x => makeWordifier(x))
    .concat(fallback)
    .reduce((acc, f) => f(acc, num), '');

const print = x => console.log(x);
const plus = x => y => x + y;

[...Array(100).keys()]
  .map(plus(1))
  .map(fizzBuzz)
  .map(print);
