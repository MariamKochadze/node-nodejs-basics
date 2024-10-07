process.stdin.on('data', (data) => {

    const input = data.toString().trim();
    console.log(`Received input: ${input}`);
});

console.log("Hello from script.js!");
