import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compressFile = (fileToCompress) => {
    const inputPath = join(__dirname, 'files', fileToCompress); 
    const outputPath = join(__dirname, 'files', 'archive.gz'); 

    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gzip = createGzip();

    readStream
        .pipe(gzip)  
        .pipe(writeStream) 
        .on('finish', () => {
            console.log('File successfully compressed to archive.gz');
        })
        .on('error', (err) => {
            console.error('Error during compression:', err);
        });
};

compressFile('fileToCompress.txt');
