const AWS = require('aws-sdk');
const { s3 } = require("../../config/envConfig");
const { decodeBase64Image } = require('../../src/helper/base64Helper');
// Configure AWS
AWS.config.update({
    accessKeyId: s3.S3AccessId,
    secretAccessKey: s3.SecretId
});
const s3Config = new AWS.S3();

const signatureUpload = async (req, res, next) => {
    if (!req.body.file_url) {
        return res.status(400).send('file_url data  is missing.');
    }
    const maxBase64Size = 50 * 1024 * 1024;
    const fileData = req.body.file_url;
    const fileName = req.body.name;
    console.log(fileData.length);
    if (fileData.length > maxBase64Size) {
        return res.status(400).send('Base64 string size exceeds 10 MB');
    }

    try {
        const { buffer, mimeType } = decodeBase64Image(fileData);
        console.log("--------", buffer, mimeType);
        // Set S3 upload parameters
        const uploadParams = {
            Bucket: s3.BUCKET_NAME,
            Key: `uploads/${fileName}`,
            Body: buffer,
            ContentType: mimeType,
            Metadata: {
                fileName
            }

        };

        // Upload file to S3
        const data = await s3Config.upload(uploadParams).promise();
        req.fileData = data;
        next();
    } catch (error) {
        res.status(500).send({
            message: 'File upload failed.',
            error: error.message,
        });
    }
};

module.exports = signatureUpload;
