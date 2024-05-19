const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { s3 } = require("../../config/envConfig");

// Configure AWS
AWS.config.update({
    accessKeyId: s3.S3AccessId,
    secretAccessKey: s3.SecretId,

});
const s3Config = new AWS.S3();

function getUploadFolder(fieldName) {
    // Map field names to destination folders
    const folderMap = {
        doc1: 'doc1',
        doc2: 'doc2',
        doc3: 'doc3',
        doc4: 'doc4',
        doc5: 'doc5',
    };

    // Return the corresponding destination folder for the given field name
    return folderMap[fieldName] || 'uploads'; // Default to a common folder if field name is not recognized
}

// Define the storage engine for Multer
const storage = multerS3({
    s3: s3Config,
    bucket: s3.BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = getUploadFolder(file.fieldname) + '/' + file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname);
        cb(null, filename);
    }
});

// Create a Multer instance with the storage engine
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Allow only specific fields
        if (file.fieldname === 'doc1' || file.fieldname === 'doc2' || file.fieldname === 'doc3' || file.fieldname === 'doc4' || file.fieldname === 'doc5') {
            cb(null, true);
        } else {
            cb(new Error('Invalid fieldname'));
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB file size limit
    },
});

module.exports = upload;
