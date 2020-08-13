#! /usr/bin/env node

import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';
import os from 'os';
import path from 'path';

const seqLength = 10000;
const conditions = [
	[3, 'Fizz'],
	[5, 'Buzz'],
	// [7, 'Quux'], // I know you'll want this...
];

if (isMainThread) {
	const input = [...Array(seqLength).keys()];
	let output = new Array(seqLength);

	const feedOrKill = worker => {
		const next = input.pop();
		if (next !== undefined) worker.postMessage(next + 1);
		else worker.terminate();
	};

	Promise.all(
		os.cpus().map(
			(_, i) =>
				new Promise((resolve, reject) => {
					const worker = new Worker(`./${path.basename(import.meta.url)}`, {
						workerData: i,
					});

					worker.on('message', ([num, word]) => {
						feedOrKill(worker);
						output[num - 1] = word;
					});

					worker.on('online', () => {
						feedOrKill(worker);
						console.log(`Worker ${i} online`);
					});

					worker.on('error', err => console.error(err));

					worker.on('exit', err => {
						console.log(`Worker ${i} done`);
						if (err === 1 || err === 0) resolve();
						else reject(err);
					});
				})
		)
	)
		.then(() => console.log(output.join(' ')))
		.catch(err => console.error(`oof ${err}`));
} else {
	const fizzBuzz = x =>
		conditions.reduce(
			(acc, [divisible, word]) =>
				x % divisible === 0 ? (acc ?? '') + word : acc,
			undefined
		) ?? x.toString();

	parentPort.on('message', num => {
		console.log(`Worker ${workerData} processing ${num}`);
		parentPort.postMessage([num, fizzBuzz(num)]);
	});
}
