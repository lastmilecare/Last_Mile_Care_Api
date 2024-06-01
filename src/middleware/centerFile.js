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
    next();
    return;


};

module.exports = centerFileUpload;