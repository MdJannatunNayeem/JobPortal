import fs from 'fs';
import path from 'path';


// Use promise-based fs
export const deleteImage = async (fileName) => {
    const filePath = path.join("uploads", fileName);

    try {
        // Check if file exists
        await fs.promises.access(filePath);

        // If exists, delete it
        await fs.promises.unlink(filePath);
        console.log(filePath);
    } catch (err) {
        // If the file doesn't exist or an error occurs,
        // just ignore it unless you want to log or throw it
        if (err.code !== "ENOENT") {
            throw err; // throw only if it's not a "file not found" error
        }
    }
};
