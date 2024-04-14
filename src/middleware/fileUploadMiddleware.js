const multer = require('multer');
const path = require('path');

function getUploadFolder(fieldName) {
    // Map field names to destination folders
    const folderMap = {
        doc1: './public/uploads',
        doc2: './public/uploads',
        doc3: './public/uploads',
        doc4: './public/uploads',
        doc5: './public/uploads',
    };

    // Return the corresponding destination folder for the given field name
    return folderMap[fieldName] || './public/uploads'; // Default to a common folder if field name is not recognized
}

// Define the storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine if a file is included in the request
        if (!file) {
            // If no file is included, move to the next middleware
            return cb(null, './public/uploads'); // Default destination folder
        }
        // Determine the destination folder based on the field name
        const uploadFolder = getUploadFolder(file.fieldname);
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        // Determine if a file is included in the request
        if (!file) {
            // If no file is included, move to the next middleware
            return cb(new Error('No file included'));
        }
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
        if (file.fieldname === 'doc1' || file.fieldname === 'doc3' || file.fieldname === 'doc2' || file.fieldname === 'doc4' || file.fieldname === 'doc5') {
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
