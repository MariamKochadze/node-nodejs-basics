import fs from 'fs';
import path from 'path';

export function addFile(fileName, currentDirectory) {
    const filePath = path.join(currentDirectory, fileName);
    fs.writeFileSync(filePath, '', 'utf-8');
    console.log(`File ${fileName} created.`);
}
