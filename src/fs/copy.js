import { cp, access } from 'fs/promises';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const srcDir = join(__dirname, '/files');
    const destDir = join(__dirname, '/files_copy');

    try {
        await access(srcDir, constants.F_OK);

        try {
            await access(destDir, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error; 
            }
        }
        await cp(srcDir, destDir, { recursive: true });
        console.log('Folder copied successfully');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(error.message || 'FS operation failed');
        }
    }
};

await copy();
