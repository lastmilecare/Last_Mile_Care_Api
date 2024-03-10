const multer = require('multer');
const path = require('path');

function getUploadFolder(fieldName) {
    // Map field names to destination folders
    const folderMap = {
        doc1: './public/uploads',
        doc2: './public/uploads',
        doc3: './public/uploads',
    };

    // Return the corresponding destination folder for the given field name
    return folderMap[fieldName] || './public/uploads'; // Default to a common folder if field name is not recognized
}

// Define the storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine the destination folder based on the field name
        const uploadFolder = getUploadFolder(file.fieldname);
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname);
        console.log(`Filename for ${file.fieldname}: ${filename}`); // Log the filename
        cb(null, filename);
    },
});

// Create a Multer instance with the storage engine
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Allow only three specific fields
        if (file.fieldname === 'doc1' || file.fieldname === 'doc3' || file.fieldname === 'doc2') {
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
