const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

// Middleware to handle single file uploads
const centerFileUpload = (req, res, next) => {
    if (!req.file) {

        req.filePath = null;
        next();
        return;
    }

    const file = req.files.agreement_file;

    // Define the destination folder for file uploads
    const uploadFolder = path.join(__dirname, '../public/uploads');

    // If tempFilePath is set, use it directly
    const tempFilePath = file.tempFilePath;

    // If tempFilePath is not set, use mv function to move the file
    if (!tempFilePath) {
        const filePath = path.join(uploadFolder, file.name);
        file.mv(filePath, (err) => {
            if (err) {
                console.error('File upload error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('File has been saved to:', filePath);
            req.filePath = filePath; // Store the file path in request object for future use
            next(); // Proceed to the next middleware/route handler
        });
    } else {
        console.log('File temp path:', tempFilePath);
        req.filePath = tempFilePath; // Store the temp file path in request object for future use
        next(); // Proceed to the next middleware/route handler
    }
};


module.exports = centerFileUpload;