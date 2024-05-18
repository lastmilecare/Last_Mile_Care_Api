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


// const uploadToS3Middleware = (req, res, next) => {

//     let cetUrl = {};
//     if (!req.files) {
//         return sendError(res, 400, "No files were uploaded.", 'No files were uploaded.');

//     }
//     if (req.files.panDoc) {
//         const file = req.files.panDoc;
//         console.log('panDoc', file)
//         const fileContent = file.data;
//         const params = {
//             Bucket: s3.BUCKET_NAME,
//             Key: file.name,
//             Body: fileContent,
//         };
//         s3Data.upload(params, (err, data) => {
//             if (err) {
//                 console.error('Error uploading file to S3:', err);
//                 cetUrl = { error: "data.Location" };

//                 return sendError(res, 400, "Error uploading file to S3", 'Error uploading file to S3');
//             }
//             cetUrl = { panDoc: data.Location };

//         });

//     }
//     if (req.files.gstDoc) {
//         const file = req.files.gstDoc;
//         const fileContent = file.data;
//         const params = {
//             Bucket: s3.BUCKET_NAME,
//             Key: file.name,
//             Body: fileContent,
//         };
//         s3Data.upload(params, (err, data) => {
//             if (err) {
//                 console.error('Error uploading file to S3:', err);
//                 cetUrl = { error: "data.Location" };

//                 return sendError(res, 400, "Error uploading file to S3", 'Error uploading file to S3');
//             }
//             cetUrl = { gstDoc: data.Location };

//         });

//     }
//     if (req.files.chequeDoc) {
//         const file = req.files.chequeDoc;
//         const fileContent = file.data;
//         const params = {
//             Bucket: s3.BUCKET_NAME,
//             Key: file.name,
//             Body: fileContent,
//         };
//         s3Data.upload(params, (err, data) => {
//             if (err) {
//                 console.error('Error uploading file to S3:', err);
//                 cetUrl = { error: "data.Location" };

//                 return sendError(res, 400, "Error uploading file to S3", 'Error uploading file to S3');
//             }
//             cetUrl = { chequeDoc: data.Location };

//         });

//     }
//     if (req.files.incorporationDoc) {
//         const file = req.files.incorporationDoc;
//         const fileContent = file.data;
//         const params = {
//             Bucket: s3.BUCKET_NAME,
//             Key: file.name,
//             Body: fileContent,
//         };
//         s3Data.upload(params, (err, data) => {
//             if (err) {
//                 console.error('Error uploading file to S3:', err);
//                 cetUrl = { error: "data.Location" };

//                 return sendError(res, 400, "Error uploading file to S3", 'Error uploading file to S3');
//             }
//             cetUrl = { incorporationDoc: data.Location };

//         });

//     }
//     console.log("---------------------", cetUrl);
//     req.fileUrl = cetUrl;
//     next();

// };
const uploadToS3Middleware = (req, res, next) => {
    next();
    let cetUrl = {}; // Initialize an empty object to store file URLs

    // Function to upload a file to S3
    const uploadFileToS3 = (file, key) => {
        const fileContent = file.data;
        const params = {
            Bucket: s3.BUCKET_NAME,
            Key: file.name,
            Body: fileContent,
        };
        s3Data.upload(params, (err, data) => {
            console.log("key", key);
            if (err) {
                cetUrl[key] = { error: err.message };
                console.log(cetUrl);
                req.fileUrl = cetUrl
                next();
            } else {
                cetUrl[key] = data.Location;
            }
            checkAllUploadsComplete();
        });
    };

    // Function to check if all uploads are complete and call next
    const checkAllUploadsComplete = () => {
        // Check if all expected files are uploaded
        const allFilesUploaded = (
            req.files.panDoc &&
            req.files.gstDoc &&
            req.files.chequeDoc &&
            req.files.incorporationDoc
        );
        if (allFilesUploaded) {
            req.fileUrl = cetUrl; // Store the file URLs in the request object
            next(); // Call next() after handling the uploads
        }
    };

    // Upload each file to S3
    if (req.files.panDoc) {
        uploadFileToS3(req.files.panDoc, 'panDoc');
    }
    if (req.files.gstDoc) {
        uploadFileToS3(req.files.gstDoc, 'gstDoc');
    }
    if (req.files.chequeDoc) {
        uploadFileToS3(req.files.chequeDoc, 'chequeDoc');
    }
    if (req.files.incorporationDoc) {
        uploadFileToS3(req.files.incorporationDoc, 'incorporationDoc');
    }
};
module.exports = uploadToS3Middleware;