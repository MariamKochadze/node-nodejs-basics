import fs from 'fs';
import path from 'path';

export function deleteFile(filePath, currentDirectory) {
    const absolutePath = path.join(currentDirectory, filePath);
    fs.unlinkSync(absolutePath);
    console.log(`File ${filePath} deleted.`);
}
