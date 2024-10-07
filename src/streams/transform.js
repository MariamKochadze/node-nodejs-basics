import { Transform } from 'stream';


const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {

        const reversed = chunk.toString().split('').reverse().join('');
        callback(null, reversed);
    }
});

const transform = async () => {
    console.log('Please enter the text you want to reverse. Press Ctrl+C to exit.');


    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};


await transform();
