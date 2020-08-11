#!/usr/bin/env node

const conditions = [
  [ 3, 'Fizz' ],
  [ 5, 'Buzz' ]
  // [ 7, 'Quux' ], // I know you'll want this...
];

const fizzBuzz = x =>
  conditions.reduce(
    (acc, [divisible, word]) =>
      x % divisible === 0
      ? (acc ?? '') + word
      : acc,
    undefined,
  ) ?? x.toString();

const print = x => console.log(x);
const plus = x => y => x + y;

[...Array(100).keys()]
  .map(plus(1))
  .map(fizzBuzz)
  .forEach(print);
