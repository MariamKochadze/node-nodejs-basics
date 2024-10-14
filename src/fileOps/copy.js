import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

export function copyFile(src, dest, currentDirectory) {
    const srcPath = path.join(currentDirectory, src);
    const destPath = path.join(currentDirectory, dest);
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);
    pipeline(readStream, writeStream, (err) => {
        if (err) console.log('Operation failed');
    });
}
