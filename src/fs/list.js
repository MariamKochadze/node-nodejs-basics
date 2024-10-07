import { access, readdir } from 'fs/promises';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = join(__dirname, 'files');

  try {
    await access(folderPath, constants.F_OK);
    const files = await readdir(folderPath);
    
    console.log(files);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error('FS operation failed:', error.message);
    }
  }
};

await list();
