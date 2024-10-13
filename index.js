import fs from 'fs';
import os from 'os';
import path from 'path';
import readline from 'readline';
import crypto from 'crypto';
import { pipeline } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

// Set starting directory to home
let currentDirectory = os.homedir();

// Handle username argument
const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
let username = '';

if (usernameArg) {
    username = usernameArg.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
} else {
    console.log('Username not provided.');
    process.exit(1);
}

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command: '
});

rl.prompt();

// Helper to show the current directory
function showCurrentDirectory() {
    console.log(`You are currently in ${currentDirectory}`);
}

// Handle exit gracefully
function exitProgram() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}

// Display current directory at start
showCurrentDirectory();

// Handle Ctrl + C or .exit command
rl.on('SIGINT', exitProgram);
rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');

    try {
        switch (command) {
            case 'up':
                goUp();
                break;
            case 'cd':
                changeDirectory(args[0]);
                break;
            case 'ls':
                listDirectory();
                break;
            case 'cat':
                readFile(args[0]);
                break;
            case 'add':
                addFile(args[0]);
                break;
            case 'rn':
                renameFile(args[0], args[1]);
                break;
            case 'cp':
                copyFile(args[0], args[1]);
                break;
            case 'mv':
                moveFile(args[0], args[1]);
                break;
            case 'rm':
                deleteFile(args[0]);
                break;
            case 'os':
                handleOSInfo(args[0]);
                break;
            case 'hash':
                calculateHash(args[0]);
                break;
            case 'compress':
                compressFile(args[0], args[1]);
                break;
            case 'decompress':
                decompressFile(args[0], args[1]);
                break;
            case '.exit':
                exitProgram();
                break;
            default:
                console.log('Invalid input');
        }
    } catch (error) {
        console.log('Operation failed');
    }

    // Show the prompt again
    rl.prompt();
});

// Navigation and Working Directory Functions
function goUp() {
    const newDir = path.dirname(currentDirectory);
    if (newDir !== currentDirectory) {
        currentDirectory = newDir;
        showCurrentDirectory();
    }
}

function changeDirectory(targetPath) {
    const newDir = path.isAbsolute(targetPath) ? targetPath : path.join(currentDirectory, targetPath);
    if (fs.existsSync(newDir) && fs.statSync(newDir).isDirectory()) {
        currentDirectory = newDir;
        showCurrentDirectory();
    } else {
        console.log('Invalid path');
    }
}

function listDirectory() {
    fs.readdir(currentDirectory, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.log('Operation failed');
            return;
        }

        console.log('(index)\tName\t\tType');
        entries.forEach((entry, index) => {
            const type = entry.isDirectory() ? 'directory' : 'file';
            console.log(`${index}\t${entry.name}\t${type}`);
        });
    });
}

// Basic File Operations
function readFile(filePath) {
    const absolutePath = path.join(currentDirectory, filePath);
    const readStream = fs.createReadStream(absolutePath, 'utf-8');
    readStream.pipe(process.stdout);
}

function addFile(fileName) {
    const filePath = path.join(currentDirectory, fileName);
    fs.writeFileSync(filePath, '', 'utf-8');
    console.log(`File ${fileName} created.`);
}

function renameFile(oldPath, newPath) {
    const oldFilePath = path.join(currentDirectory, oldPath);
    const newFilePath = path.join(currentDirectory, newPath);
    fs.renameSync(oldFilePath, newFilePath);
    console.log(`File renamed to ${newPath}`);
}

function copyFile(src, dest) {
    const srcPath = path.join(currentDirectory, src);
    const destPath = path.join(currentDirectory, dest);
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);
    pipeline(readStream, writeStream, (err) => {
        if (err) console.log('Operation failed');
    });
}

function moveFile(src, dest) {
    const srcPath = path.join(currentDirectory, src);
    const destPath = path.join(currentDirectory, dest);
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);
    
    pipeline(readStream, writeStream, (err) => {
        if (err) {
            console.log('Operation failed');
            return;
        }
        // Delete the source file only after the copy operation is successful
        fs.unlink(srcPath, (unlinkErr) => {
            if (unlinkErr) {
                console.log('Failed to delete the source file');
                return;
            }
            console.log(`File ${src} moved to ${dest}`);
        });
    });
}


function deleteFile(filePath) {
    const absolutePath = path.join(currentDirectory, filePath);
    fs.unlinkSync(absolutePath);
    console.log(`File ${filePath} deleted.`);
}

// OS Info Handlers
function handleOSInfo(option) {
    switch (option) {
        case '--EOL':
            console.log(JSON.stringify(os.EOL));
            break;
        case '--cpus':
            console.log(os.cpus());
            break;
        case '--homedir':
            console.log(os.homedir());
            break;
        case '--username':
            console.log(os.userInfo().username);
            break;
        case '--architecture':
            console.log(os.arch());
            break;
        default:
            console.log('Invalid input');
    }
}

// Hash Calculation
function calculateHash(filePath) {
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

// Compression and Decompression
function compressFile(filePath, destPath) {
    const absoluteFilePath = path.join(currentDirectory, filePath);
    const absoluteDestPath = path.join(currentDirectory, destPath);
    const readStream = fs.createReadStream(absoluteFilePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const brotli = createBrotliCompress();
    pipeline(readStream, brotli, writeStream, (err) => {
        if (err) console.log('Operation failed');
    });
}

function decompressFile(filePath, destPath) {
    const absoluteFilePath = path.join(currentDirectory, filePath);
    const absoluteDestPath = path.join(currentDirectory, destPath);
    const readStream = fs.createReadStream(absoluteFilePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const brotli = createBrotliDecompress();
    pipeline(readStream, brotli, writeStream, (err) => {
        if (err) console.log('Operation failed');
    });
}
