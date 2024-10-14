import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function calculateHash(filePath, currentDirectory) {
    const absolutePath = path.join(currentDirectory, filePath);
    const hash = crypto.createHash('sha256');
    const readStream = fs.createReadStream(absolutePath);
    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });
    readStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
}
