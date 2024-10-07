import { access, unlink } from 'fs/promises';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await access(filePath, constants.F_OK);
    console.log(`File exists at path: ${filePath}`);
    await unlink(filePath);
    console.log('File deleted successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error('FS operation failed:', error.message);
    }
  }
};

await remove();
