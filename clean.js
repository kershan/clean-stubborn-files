const fs = require("fs");
const path = require("path");

const arguments = process.argv.slice(2);

let specifiedPath = ".";

if (arguments.length !== 0) {
    specifiedPath = arguments[0];
}

let directory = fs.readdirSync(specifiedPath);

directory.forEach(element => {
    let directoryPath = path.join(specifiedPath, element);
    if (fs.statSync(directoryPath).isDirectory()) {
        let innerDirectory = fs.readdirSync(directoryPath);

        innerDirectory.forEach(element => {
            let folderPath = path.join(directoryPath, element);
            
            if (element === "bin") {
                console.log(folderPath + " removed");
                removeFolder(folderPath);
            }

            if (element === "obj") {
                console.log(folderPath + " removed");
                removeFolder(folderPath);
            }
        });
    }
});

function removeFolder(params) {
    if (fs.existsSync(params)) {
        fs.readdirSync(params).forEach(element => {
            let currentPath = path.join(params, element);
            if (fs.statSync(currentPath).isDirectory()) {
                removeFolder(currentPath);
            } else {
                fs.unlinkSync(currentPath)
            }
        });
        fs.rmdirSync(params)
    }
}