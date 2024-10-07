import { access, rename as fsRename } from 'fs/promises';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const renameFile = async () => {
  const wrongFilename = join(__dirname, 'wrongFilename.txt');
  const properFilename = join(__dirname, 'properFilename.md');

  try {
    await access(wrongFilename, constants.F_OK);
    try {
      await access(properFilename, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error; 
      }
    }

  
    await fsRename(wrongFilename, properFilename);
    console.log('File renamed successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(error.message || 'FS operation failed');
    }
  }
};

await renameFile();
