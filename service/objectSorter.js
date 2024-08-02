const fs = require('fs');
const path = require('path');
const moment = require("moment");
const watch = require('node-watch');

console.log("--------- Starting Object Sorter Service ---------");

function sortWriteFileContent(fileContents, fileOut) {
    let data = fileContents.split(',');
    let dataOut = '';
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].trim();
        if(/^-?\d+$/.test(data[i])){
            //console.log('Type: Integer, Value: ', data[i]);
            dataOut = dataOut + 'Type: Integer, Value: '+ data[i] + '\n';
        } else if (/^-?\d+\.\d+?/.test(data[i])) {
            //console.log('Type: Real Number, Value: ', data[i]);
            dataOut = dataOut + 'Type: Real Number, Value: '+ data[i] + '\n';
        } else if(/^[a-zA-Z\s]+$/.test(data[i])) {
            //console.log('Type: Alphabets, Value: ', data[i]);
            dataOut = dataOut + 'Type: Alphabets, Value: '+ data[i] + '\n';
        }else if (/^[a-zA-Z0-9\s]+$/.test(data[i])) {
            //console.log('Type: Alphanumeric, Value: ', data[i]);
            dataOut = dataOut + 'Type: Alphanumeric, Value: '+ data[i] + '\n';
        }else {
            //console.log('ERROR Invalid Type:', data[i]);
            dataOut = dataOut + 'ERROR Invalid Type: '+ data[i] + '\n';
        }
    }

    fileOutNew = fileOut.substring(0,fileOut.lastIndexOf(".")) +'_sorted_'+ moment().format("YYYYMMDD_HHmmss") + fileOut.substring(fileOut.lastIndexOf("."));  
    fs.writeFile(fileOutNew, dataOut, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('File has been written'+ fileOutNew);
        }
    });
    return data
 }

function runService(fileInDir, fileOut) {
    let fileOutDir = path.dirname(fileOut);
    //let fileInDir = path.dirname(fileIn);
    console.log("Watching for file changes in " + fileInDir);

    /*fs.watch(fileInDir, function (event, filename) {
        console.log('event is: ' + event);
        if (event==='change' || event==='rename') { 
            console.log('filename provided: ' + filename);
            if (filename) {
                let filePath = path.join(fileInDir, filename);
                let fileContents = fs.readFileSync(filePath).toString();
                //console.log('File content:', fileContents);
                sortWriteFileContent(fileContents, fileOutDir+'/'+filename);
            }
        } 
    }); */
    watch(fileInDir, { recursive: true }, function(event, filename) {
        //console.log('%s changed.', filename);
        console.log('event is: ' + event);
        if (event==='update') { 
            fileoutName = filename.substring(filename.lastIndexOf("/"));// +'_sorted_'+ moment().format("YYYYMMDD_HHmmss") + filename.substring(filename.lastIndexOf("."));
            console.log('filename provided: ' + filename);
            console.log('fileoutName provided: ' + fileoutName);
            if (filename) {
                //let filePath = path.join(fileInDir, filename);
                let fileContents = fs.readFileSync(filename).toString();
                //console.log('File content:', filename);
                sortWriteFileContent(fileContents, fileOutDir+fileoutName);
            }
        } 
    });
}



module.exports.runService = runService