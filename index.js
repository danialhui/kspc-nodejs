#! /usr/bin/env node

const randomObjectGenerator = require('./service/randomObjectGenerator')
const objectSorter = require('./service/objectSorter')


if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}

console.log('process.argv.length:', `${process.argv.length}`);

let customValue1 = process.argv[0];
let customValue2 = process.argv[1];
let customValue3 = process.argv[2];
let customValue4 = process.argv[3];

if (customValue3 === 'generate-random-object') {
    if(customValue4===undefined){
        console.error('Expected output file path!');
        process.exit(1);
    }
    randomObjects = randomObjectGenerator.generateRandomObjects(10000000, customValue4); // 10MB output size
} else if (customValue3 === 'run-object-sorter') {
    objectSorter.runService("data/in/", "data/out/output.txt");
} else{
    console.error('Valid command: generate-random-object or run-object-sorter');
    process.exit(1);
}