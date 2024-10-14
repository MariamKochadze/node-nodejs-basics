import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

export function moveFile(src, dest, currentDirectory) {
    const srcPath = path.join(currentDirectory, src);
    const destPath = path.join(currentDirectory, dest);
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);
    
    pipeline(readStream, writeStream, (err) => {
        if (err) {
            console.log('Operation failed');
            return;
        }
        fs.unlink(srcPath, (unlinkErr) => {
            if (unlinkErr) {
                console.log('Failed to delete the source file');
            } else {
                console.log(`File ${src} moved to ${dest}`);
            }
        });
    });
}
