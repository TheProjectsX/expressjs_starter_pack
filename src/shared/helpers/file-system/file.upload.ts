import fs from "fs";
import multer from "multer";
import path from "path";
import { slugify } from "@/shared/utils/slugify";
import { fileFilter } from "./file.filter";

const uploadDir = path.join(process.cwd(), "uploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// local file storage
export const createStorage = (folder?: string) => {
    const uploadFolder = folder
        ? path.join(process.cwd(), "uploads", folder)
        : path.join(process.cwd(), "uploads");

    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFolder);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = `${Date.now()}`;
            const fileExtension = path.extname(file.originalname);

            const sluggedName = slugify(
                path.basename(file.originalname, fileExtension),
            );

            const fileName = `${sluggedName}__SUF_${uniqueSuffix}${fileExtension}`;

            cb(null, fileName);
        },
    });
};

export const upload = multer({
    storage: createStorage(),
    fileFilter: fileFilter,
});
