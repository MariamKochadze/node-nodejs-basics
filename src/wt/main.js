import { Worker } from 'worker_threads';
import { cpus } from 'os';


const createWorker = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./worker.js', import.meta.url), {
            workerData
        });

        worker.on('message', (result) => {
            resolve({ status: 'resolved', data: result });
        });

        worker.on('error', () => {
            reject({ status: 'error', data: null });
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject({ status: 'error', data: null });
            }
        });
    });
};


const main = async () => {
    const numCPUs = cpus().length; 
    const results = []; 

    const workerPromises = Array.from({ length: numCPUs }, (_, i) => {
        return createWorker(10 + i); 
    });

    try {
        const resolvedResults = await Promise.all(workerPromises);
        results.push(...resolvedResults); 
    } catch (error) {
        console.error('Error occurred in worker:', error);
        results.push(error); 
    }


    console.log(results); 
};


main();
