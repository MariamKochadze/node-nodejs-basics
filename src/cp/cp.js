import { spawn } from 'child_process';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const spawnChildProcess = async (args) => {

    const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'inherit'] 
    });


    child.stdout.on('data', (data) => {
        stdout.write(`Child: ${data}`);
    });

    stdin.on('data', (data) => {
        child.stdin.write(data);
    });


    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
        process.exit(code); 
    });
};


spawnChildProcess(['arg1', 'arg2']); 
