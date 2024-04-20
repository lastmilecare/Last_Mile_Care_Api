const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');

const { s3 } = require("../../config/envConfig");
// Configure AWS
AWS.config.update({
    accessKeyId: s3.S3AccessId,
    secretAccessKey: s3.SecretId
});
const s3Config = new AWS.S3();



const centerFileUpload = (req, res, next) => {
    if (!req.file) {
        req.filePath = null;
        next();
        return;
    }

    const file = req.files.agreement_file;

    // If tempFilePath is set, use it directly
    const tempFilePath = file.tempFilePath;

    // If tempFilePath is not set, use mv function to move the file
    if (!tempFilePath) {
        const uploadFolder = path.join(__dirname, '../public/uploads');
        const filePath = path.join(uploadFolder, file.name);
        file.mv(filePath, (err) => {
            if (err) {
                console.error('File upload error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('File has been saved to:', filePath);
            req.filePath = filePath; // Store the file path in the request object for future use

            // Upload to S3
            const fileStream = fs.createReadStream(filePath);
            const uploadParams = {
                Bucket: s3.BUCKET_NAME,
                Key: `uploads/${file.name}`,
                Body: fileStream
            };

            s3Config.upload(uploadParams, (err, data) => {
                if (err) {
                    console.error('S3 upload error:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                console.log('File uploaded to S3:', data.Location);
                req.s3Url = data.Location; // Store S3 URL in the request object for future use
                fs.unlinkSync(filePath); // Delete the file from the local storage after uploading to S3
                next(); // Proceed to the next middleware/route handler
            });
        });
    } else {
        console.log('File temp path:', tempFilePath);
        req.filePath = tempFilePath; // Store the temp file path in the request object for future use

        // Upload to S3
        const fileStream = fs.createReadStream(tempFilePath);
        const uploadParams = {
            Bucket: s3.BUCKET_NAME,
            Key: `uploads/${file.name}`,
            Body: fileStream
        };

        s3Config.upload(uploadParams, (err, data) => {
            if (err) {
                console.error('S3 upload error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('File uploaded to S3:', data.Location);
            req.s3Url = data.Location; // Store S3 URL in the request object for future use
            next(); // Proceed to the next middleware/route handler
        });
    }
};

module.exports = centerFileUpload;