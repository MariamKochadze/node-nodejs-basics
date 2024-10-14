import fs from 'fs';
import path from 'path';

export function readFile(filePath, currentDirectory) {
    const absolutePath = path.join(currentDirectory, filePath);

    
    if (!fs.existsSync(absolutePath)) {
        console.error(`Error: The file "${filePath}" does not exist in the directory "${currentDirectory}".`);
        return;
    }

    const readStream = fs.createReadStream(absolutePath, 'utf-8');

    
    readStream.on('error', (error) => {
        console.error(`Error reading the file: ${error.message}`);
    });

    
    readStream.pipe(process.stdout);
}
