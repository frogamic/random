#!/usr/bin/env node
const fizzbuzz = i =>
  ({
    ['true,true']: 'FizzBuzz',
    ['true,false']: 'Fizz',
    ['false,true']: 'Buzz',
    ['false,false']: i
  }[[!(i % 3), !(i % 5)]]);

[...Array(100).keys()]
  .map(x => x + 1)
  .map(fizzbuzz)
  .map(x => console.log(x));
