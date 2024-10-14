import os from 'os';
import {
    addFile,
    goUp,
    changeDirectory,
    listDirectory,
    readFile,
    renameFile,
    copyFile,
    moveFile,
    deleteFile,
    handleOSInfo,
    calculateHash,
    compressFile,
    decompressFile,
} from './src/fileOps/index.js';

let currentDirectory = os.homedir();


export function handleCommand(command, args) {
    switch (command) {
        case 'up':
            currentDirectory = goUp(currentDirectory);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'cd':
            const newDir = changeDirectory(args[0], currentDirectory);
            if (newDir) {
                currentDirectory = newDir; 
            }
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'ls':
            listDirectory(currentDirectory);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'cat':
            readFile(args[0], currentDirectory);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'add':
            addFile(args[0], currentDirectory);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'rn':
            if (args.length < 2) {
                console.log('Please provide both old and new file names.');
                return true;
            }
            renameFile(args[0], args[1], currentDirectory);
            console.log(`Renamed ${args[0]} to ${args[1]}`);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'cp':
            if (args.length < 2) {
                console.log('Please provide both source and destination file names.');
                return true;
            }
            copyFile(args[0], args[1], currentDirectory);
            console.log(`Copied ${args[0]} to ${args[1]}`);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'mv':
            if (args.length < 2) {
                console.log('Please provide both source and destination file names.');
                return true;
            }
            moveFile(args[0], args[1], currentDirectory);
            console.log(`Moved ${args[0]} to ${args[1]}`);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'rm':
            deleteFile(args[0], currentDirectory);
            console.log(`Deleted ${args[0]}`);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'os':
            handleOSInfo(args[0]);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'hash':
            calculateHash(args[0], currentDirectory);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'compress':
            if (args.length < 2) {
                console.log('Please provide both input and output file names.');
                return true;
            }
            compressFile(args[0], args[1], currentDirectory);
            console.log(`Compressed ${args[0]} to ${args[1]}`);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case 'decompress':
            if (args.length < 2) {
                console.log('Please provide both input and output file names.');
                return true;
            }
            decompressFile(args[0], args[1], currentDirectory);
            console.log(`Decompressed ${args[0]} to ${args[1]}`);
            console.log(`Current Directory: ${currentDirectory}`);
            return true;

        case '.exit':
            return false; 

        default:
            console.log('Invalid command');
            return true;
    }
}
