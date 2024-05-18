const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

const { s3 } = require("../../config/envConfig");

// Configure AWS
AWS.config.update({
  accessKeyId: s3.S3AccessId,
  secretAccessKey: s3.SecretId
});

// Create an instance of the S3 object
const s3Config = new AWS.S3();

// Create the multer-s3 storage engine
const storage = multerS3({
  s3: s3Config,
  bucket: s3.BUCKET_NAME,
  key: function (req, file, cb) {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  if (!req.file) {
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
