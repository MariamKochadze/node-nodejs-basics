import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';

const calculateHash = async () => {
    const hash = createHash('sha256');
    const filePath = resolve('src/hash/files/fileToCalculateHashFor.txt'); 

    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        console.log(`SHA256 hash: ${hash.digest('hex')}`);
    });

    stream.on('error', (err) => {
        console.error(`FS operation failed: ${err.message}`);
    });
};

await calculateHash();
