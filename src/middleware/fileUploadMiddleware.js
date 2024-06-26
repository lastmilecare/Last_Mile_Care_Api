const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { s3 } = require("../../config/envConfig");



const centerFileUpload = (req, res, next) => {
    next();
    return;
    if (!req.files) {
        req.filePath = null;

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
                return res.status(500).json({ error: 'Internal server error' });
            }
            req.filePath = filePath;

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
                req.s3Url = data.Location;
                fs.unlinkSync(filePath);
                next();
            });
        });
    } else {
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