import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompressFile = () => {
    const inputPath = join(__dirname, 'files', 'archive.gz'); 
    const outputPath = join(__dirname, 'files', 'fileToCompress.txt'); 

    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gunzip = createGunzip();

    readStream
        .pipe(gunzip) 
        .pipe(writeStream) 
        .on('finish', () => {
            console.log('File successfully decompressed to fileToCompress.txt');
        })
        .on('error', (err) => {
            console.error('Error during decompression:', err);
        });
};

decompressFile();
