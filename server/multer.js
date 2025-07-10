const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configurable size limit (in bytes)
const fileSizeLimit = 5 * 1024 * 1024; // 5 MB

const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8); // Use a portion of a random string
  const sanitizedFilename = originalname
    .replace(/\s/g, "_")
    .replace(/\.[^/.]+$/, ""); // Replace spaces with underscores and remove extension
  const fileExtension = originalname.split(".").pop(); // Extract the file extension

  return `${sanitizedFilename}_${timestamp}_${randomString}.${fileExtension}`;
};

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.query.category || "uncategorized";
    const uploadPath = path.join(__dirname, "public", category);

    // Create the subfolder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = generateUniqueFilename(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
});

module.exports = {
  upload,
};
