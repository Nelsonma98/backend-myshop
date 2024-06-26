import { unlinkSync } from 'fs';
import { join } from 'path';

export const deleteFile = async function (fileName: string): Promise<void> {
  try {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'src',
      'uploads',
      'image',
      fileName,
    );
    unlinkSync(filePath);
    console.log(`Deleted file: ${fileName}`);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
    error.status = 500;
    error.message = 'Error deleting file';
    throw error;
  }
};
