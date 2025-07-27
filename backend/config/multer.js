// config/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // No disk write
export const upload = multer({ storage });
