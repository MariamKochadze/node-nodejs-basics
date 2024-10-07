import { writeFile, open } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    try {
        const fileHandle = await open(join(__dirname, '/files/fresh.txt'), 'r');
        await fileHandle.close();

        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile('src/fs/files/fresh.txt', 'I am fresh and young');
        } else {
            throw error;
        }
    }
};

await create();
