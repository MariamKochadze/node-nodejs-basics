import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const stream = createReadStream(filePath, { encoding: 'utf-8' });

    stream.on('data', (chunk) => {
        process.stdout.write(chunk); 
    });


    stream.on('error', (err) => {
        console.error('FS operation failed:', err.message);
    });

    stream.on('end', () => {
        console.log('\nFile reading completed.');
    });
};


await read();
