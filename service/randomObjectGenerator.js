const fs = require('fs');

function randomString(characters) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomAlphabets() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return randomString(characters);
}

function randomAlphaNumeric() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const spacesBefore = Math.floor(Math.random() * 11);
    const spacesAfter = (10 - spacesBefore) > 0 ? Math.floor(Math.random() * (10 - spacesBefore)) : 0;
    let result = randomString(characters);
    result = ' '.repeat(spacesBefore) + result + ' '.repeat(spacesAfter);
    return result;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRealNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function getBytes(string){
    return Buffer.byteLength(string, 'ascii');
 }

function generateRandomObjects(outputSize, outputFile) {
    console.log('Generating random objects size ...', `${outputSize}`);
    //const randomObjects = [];
    let startTime = new Date().getTime();
    let stringResult = '';
    
    //let stringResult = [];
    //let i = 0;
    while(getBytes(stringResult) < outputSize) {
    //for (let i = 0; i < input; i++) {
        let randomSeed = randomInteger(1, 4);
        stringResult.length > 0 ? stringResult = stringResult + "," : stringResult;
        //console.log('randomSeed:', `${randomSeed}`);
        switch (randomSeed) {
            case 1:
                stringResult = stringResult + randomInteger(-10000, 10000);
                //stringResult[i] = randomInteger(1, 10000);
                break;
            case 2:
                stringResult = stringResult + randomRealNumber(-10000.0, 10000.0);
                //stringResult[i] = randomRealNumber(1.0, 10000.0);
                break;
            case 3:
                stringResult = stringResult + randomAlphabets();
                //stringResult[i] =  randomAlphabets();
                break;
            default:
                stringResult = stringResult + randomAlphaNumeric();
                //stringResult[i] =  randomAlphaNumeric();
        }
    }
    let endTime = new Date().getTime();
    console.log('Time taken to generate random objects:', `${endTime - startTime}`);
    //let result = stringResult.join(",");

    fs.writeFile(outputFile, stringResult, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('File has been written');
        }
    });
    return stringResult;
}

module.exports.generateRandomObjects = generateRandomObjects;

