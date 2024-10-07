const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const propName = args[i].slice(2);
            const value = args[i + 1];
            result[propName] = value;
        }
    }

    for (const [key, value] of Object.entries(result)) {
        console.log(`${key} is ${value}`);
    }
};


parseArgs();
