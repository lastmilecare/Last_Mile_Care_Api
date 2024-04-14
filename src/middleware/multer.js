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

// Middleware to handle file uploads conditionally
const uploadMiddleware = (req, res, next) => {
  // Check if a file is included in the request
  if (!req.file) {
    // If no file is included, move to the next middleware
    return next();
  }

  // If a file is included, use Multer to process it
  upload.single('file')(req, res, (err) => {
    if (err) {
      // If an error occurs during file upload, pass it to the error handling middleware
      return next(err);
    }
    // Move to the next middleware
    next();
  });
};

module.exports = uploadMiddleware;
