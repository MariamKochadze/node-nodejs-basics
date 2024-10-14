import fs from 'fs';
import path from 'path';

export function goUp(currentDirectory) {
    
    if (currentDirectory === path.parse(currentDirectory).root) {
        console.log("You are already at the root directory.");
        return currentDirectory; 
    }

    const parentDirectory = path.resolve(currentDirectory, '..');
    
    if (fs.existsSync(parentDirectory)) {
        return parentDirectory; 
    } else {
        console.log("Failed to access the parent directory.");
        return currentDirectory; 
    }
}
