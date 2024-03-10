const multer = require('multer');
const path = require('path');

// Define the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads'); // Set the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
    console.log('fname', file.originalname);
  },
});

// Create a Multer instance with the storage engine
const upload = multer({ storage: storage });

module.exports = upload;
