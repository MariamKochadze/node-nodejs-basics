import os from 'os';
import readline from 'readline';
import { handleCommand } from './app.js'; 


let currentDirectory = os.homedir();


const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
let username = '';

if (usernameArg) {
    username = usernameArg.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${currentDirectory}`); 
} else {
    console.log('Username not provided.');
    process.exit(1);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command: '
});


rl.prompt();


rl.on('line', (line) => {
    const input = line.trim().split(' ');
    const command = input[0];
    const args = input.slice(1);
    
    const continueApp = handleCommand(command, args, currentDirectory);
    
    if (!continueApp) {
        rl.close(); 
    } else {
        rl.prompt();
    }
}).on('close', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
    process.exit(0);
});
