import fs from 'fs';
import path from 'path';

export function renameFile(oldPath, newPath, currentDirectory) {
    const oldFilePath = path.join(currentDirectory, oldPath);
    const newFilePath = path.join(currentDirectory, newPath);
    fs.renameSync(oldFilePath, newFilePath);
    console.log(`File renamed to ${newPath}`);
}
