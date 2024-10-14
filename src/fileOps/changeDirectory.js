import fs from 'fs';
import path from 'path'; 

export function changeDirectory(targetDirectory, currentDirectory) {
    const newDirectory = path.resolve(currentDirectory, targetDirectory);
    
    if (fs.existsSync(newDirectory) && fs.lstatSync(newDirectory).isDirectory()) {
        return newDirectory; 
    } else {
        console.log(`The directory "${targetDirectory}" does not exist.`);
        return currentDirectory; 
    }
}
