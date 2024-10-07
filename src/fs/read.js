import { access, readFile } from 'fs/promises';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    await access(filePath, constants.F_OK);
    const content = await readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: fileToRead.txt does not exist');
    } else {
      console.error('FS operation failed:', error.message);
    }
  }
};

await read();
