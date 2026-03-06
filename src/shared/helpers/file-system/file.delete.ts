import fs from "fs";
import path from "path";

/**
 * Deletes a file from the uploads folder.
 * @param fileUrl The URL or filename of the file to delete.
 */
export const deleteFile = async (fileUrl: string) => {
    try {
        let filename = fileUrl;

        // If it's a URL, extract the filename
        if (fileUrl.startsWith("http")) {
            filename = path.basename(new URL(fileUrl).pathname);
        }

        const fullPath = path.join(process.cwd(), "uploads", filename);

        await fs.promises.access(fullPath);
        await fs.promises.unlink(fullPath);
    } catch (error) {
        console.error(`Failed to delete file: ${fileUrl}`, error);
    }
};
