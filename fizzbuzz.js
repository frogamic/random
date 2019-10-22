const fizzbuzz = i =>
  console.log(
    {
      ['true,true']: 'FizzBuzz',
      ['true,false']: 'Fizz',
      ['false,true']: 'Buzz',
      ['false,false']: i
    }[[!(i % 3), !(i % 5)]]
  );

[...Array(100).keys()].forEach(fizzbuzz);
