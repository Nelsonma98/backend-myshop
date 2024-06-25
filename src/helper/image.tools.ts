import { unlinkSync } from 'fs';

export const imageTools = async function deleteFile(
  filePath: string,
): Promise<void> {
  try {
    unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
};
