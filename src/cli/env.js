const parseEnv = () => {
    const rssEnvVariables = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    if (rssEnvVariables) {
        console.log(rssEnvVariables);
    } else {
        console.log('No environment variables with the prefix "RSS_" found.');
    }
};

parseEnv();
