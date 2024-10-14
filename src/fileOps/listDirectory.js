import fs from 'fs';
import path from 'path';

export function listDirectory(currentDirectory) {
    try {
        const files = fs.readdirSync(currentDirectory);
        if (files.length === 0) {
            console.log("Directory is empty.");
        } else {
            console.log("Contents of the directory:");
            console.log("Index\tName\tType"); 
            
            files.forEach((file, index) => {
                const filePath = path.join(currentDirectory, file);
                const isDirectory = fs.lstatSync(filePath).isDirectory() ? 'Directory' : 'File';
                console.log(`${index}\t${file}\t${isDirectory}`); 
            });
        }
    } catch (error) {
        console.error("Error reading directory:", error.message);
    }
}
