import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import fs from 'fs';
import path from 'path';

export function compressFile(filePath, destPath, currentDirectory) {
    const absoluteFilePath = path.join(currentDirectory, filePath);
    const absoluteDestPath = path.join(currentDirectory, destPath);
    const readStream = fs.createReadStream(absoluteFilePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const brotli = createBrotliCompress();
    pipeline(readStream, brotli, writeStream, (err) => {
        if (err) console.log('Operation failed');
    });
}

export function decompressFile(filePath, destPath, currentDirectory) {
    const absoluteFilePath = path.join(currentDirectory, filePath);
    const absoluteDestPath = path.join(currentDirectory, destPath);
    const readStream = fs.createReadStream(absoluteFilePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const brotli = createBrotliDecompress();
    pipeline(readStream, brotli, writeStream, (err) => {
        if (err) console.log('Operation failed');
    });
}
