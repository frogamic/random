const MAX = 250;
const defaultConditions = [
  [3, 'Fizz'],
  [5, 'Buzz']
];

const validateBody = ({ body }) =>
  new Promise((resolve, reject) => {
    if (body === null) return resolve(defaultConditions);
    const parsedBody = JSON.parse(body);
    if (
      Array.isArray(parsedBody) &&
      parsedBody.every(
        ([divisible, word]) =>
          typeof divisible === 'number' && typeof word === 'string'
      )
    )
      return resolve(parsedBody);
    return reject();
  });

const validateValue = ({ pathParameters: { value } }) =>
  new Promise((resolve, reject) => {
    const parsedValue = parseInt(value);
    isNaN(parsedValue) ? reject() : resolve(parsedValue);
  });

const fizzBuzz = conditions => x =>
  conditions.reduce(
    (acc, [divisible, word]) =>
      x % divisible === 0 ? (acc || '') + word : acc,
    undefined
  ) || x.toString();

exports.lambdaHandler = async event => ({
  headers: {
    'Content-Type': 'application/json'
  },
  ...(await validateBody(event).then(
    async conditions =>
      await validateValue(event).then(
        value => ({
          statusCode: 200,
          body: JSON.stringify(
            [...Array(value).keys()].map(x => 1 + x).map(fizzBuzz(conditions))
          )
        }),
        () => ({
          statusCode: 413
        })
      ),
    () => ({
      statusCode: 400
    })
  ))
});
