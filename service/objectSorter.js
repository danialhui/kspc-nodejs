const fs = require('fs');
const path = require('path');
//const moment = require("moment");
const watch = require('node-watch');

console.log("--------- Starting Object Sorter Service ---------");

function sortWriteFileContent(fileContents, filename) {
    let data = fileContents.split(',');
    let dataOut = '';
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].trim();
        if(/^-?\d+$/.test(data[i])){
            dataOut = dataOut + 'Type: Integer, Value: '+ data[i] + '\n';
        } else if (/^-?\d+\.\d+?/.test(data[i])) {
            dataOut = dataOut + 'Type: Real Number, Value: '+ data[i] + '\n';
        } else if(/^[a-zA-Z\s]+$/.test(data[i])) {
            dataOut = dataOut + 'Type: Alphabets, Value: '+ data[i] + '\n';
        }else if (/^[a-zA-Z0-9\s]+$/.test(data[i])) {
            dataOut = dataOut + 'Type: Alphanumeric, Value: '+ data[i] + '\n';
        }else {
            dataOut = dataOut + 'ERROR Invalid Type: '+ data[i] + '\n';
        }
    }

    let fileOut = filename.substring(0,filename.lastIndexOf(".")) +'_sorted' + filename.substring(filename.lastIndexOf("."));  
    fileOut = fileOut.replace('/in/', '/out/');
    fs.writeFile(fileOut, dataOut, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('File has been written: '+ fileOut);
        }
    });
    return data
 }

function runService(fileInDir, fileOut) {
    //let fileOutDir = path.dirname(fileOut);
    //let fileO = path.basename(fileOut);
    console.log("Watching for file changes in " + fileInDir);
   // console.log("fileO : " + fileO);

    watch(fileInDir, { recursive: true }, function(event, filename) {
        console.log('event is: ' + event);
        if (event==='update') { 
            //fileoutName = fileOut.substring(0, fileOut.lastIndexOf('.'))  + '_sorted-' +fileO;
            console.log('filename provided: ' + filename);
            //console.log('fileoutName provided: ' + fileoutName);
            if (filename) {
                let fileContents = fs.readFileSync(filename).toString();
                sortWriteFileContent(fileContents, filename);
            }
        } 
    });
}



module.exports.runService = runService