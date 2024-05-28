const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { s3 } = require("../../config/envConfig");
const { sendSuccess, sendError } = require('../../src/util/responseHandler');

const fs = require('fs');
const path = require('path');
const s3Data = new AWS.S3({
    accessKeyId: s3.S3AccessId,
    secretAccessKey: s3.SecretId
});

const uploadToS3Middleware = async (req, res, next) => {
    next();
    return
    let cetUrl = {}; // Initialize an empty object to store file URLs

    // Function to upload a file to S3
    const uploadFileToS3 = (file, key) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve(); // Resolve immediately if file is null or undefined
                return;
            }

            const fileContent = file.data;
            const params = {
                Bucket: s3.BUCKET_NAME,
                Key: file.name,
                Body: fileContent,
            };

            s3Data.upload(params, (err, data) => {
                if (err) {
                    cetUrl[key] = { error: err.message };
                    resolve(); // Resolve even if there's an error to avoid blocking
                } else {
                    cetUrl[key] = data.Location;
                    resolve(); // Resolve on success
                }
            });
        });
    };

    try {
        // Create an array of promises for the uploads
        const uploadPromises = [
            uploadFileToS3(req.files ? req.files.panDoc : null, 'panDoc'),
            uploadFileToS3(req.files ? req.files.gstDoc : null, 'gstDoc'),
            uploadFileToS3(req.files ? req.files.chequeDoc : null, 'chequeDoc'),
            uploadFileToS3(req.files ? req.files.incorporationDoc : null, 'incorporationDoc')
        ];

        // Wait for all upload promises to complete
        await Promise.all(uploadPromises);

        req.fileUrl = cetUrl; // Store the file URLs in the request object
        next(); // Call next() after handling the uploads
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
};

module.exports = uploadToS3Middleware;

module.exports = uploadToS3Middleware;