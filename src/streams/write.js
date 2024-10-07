import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {

    const writeStream = createWriteStream(filePath, { flags: 'a' }); 

    console.log('Please enter the data you want to write to the file. Press Ctrl+C to exit.');

    process.stdin.on('data', (data) => {
        writeStream.write(data); 
    });


    writeStream.on('error', (err) => {
        console.error('FS operation failed:', err.message);
    });

    writeStream.on('finish', () => {
        console.log('Data has been written to the file successfully.');
    });

    
    process.stdin.on('end', () => {
        writeStream.end(); 
    });
};


await write();
