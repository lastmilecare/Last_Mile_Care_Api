const { prefix } = require('../../config/envConfig.js');
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware.js');
const upload = require('../middleware/cetUpload.js');
const cetMangmentController = require('../controller/cet/cetMangmentController.js');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware.js')
const driverController = require('../controller/cet/driverController.js');

const prefixUrl = prefix.center;
//
module.exports = function (app) {
    //center CET
    app.post(`${prefixUrl}/create/CET`, verifyTokenMiddleware, upload.fields([
        { name: 'attachPanCopy', maxCount: 1 },
        { name: 'attachGstin', maxCount: 1 },
        { name: 'attachCancelledChequeOrPassbook', maxCount: 1 },
        { name: 'attachCertificateOfIncorporation', maxCount: 1 },
    ]), cetMangmentController.createCET);

    app.post(`${prefixUrl}/view/CET`, verifyTokenMiddleware, cetMangmentController.viewCET);
    app.post(`${prefixUrl}/CET/details`, verifyTokenMiddleware, cetMangmentController.viewCETDetails);

    app.post(`${prefixUrl}/CET/updateCET`, verifyTokenMiddleware, upload.fields([
        { name: 'attachPanCopy', maxCount: 1 },
        { name: 'attachGstin', maxCount: 1 },
        { name: 'attachCancelledChequeOrPassbook', maxCount: 1 },
        { name: 'attachCertificateOfIncorporation', maxCount: 1 },
    ]), cetMangmentController.updateCET);

    ////driver
    app.post(`${prefixUrl}/driver/create`, verifyTokenMiddleware, fileUploadMiddleware.fields([
        { name: 'doc1', maxCount: 1 },
        { name: 'doc2', maxCount: 1 },

    ]), driverController.createDriver);

    app.post(`${prefixUrl}/driver/personal/history/create`, verifyTokenMiddleware, driverController.createDriverPersonalData);
    app.post(`${prefixUrl}/driver/family/history/create`, verifyTokenMiddleware, driverController.createDriverFamilyData);

    //  app.post(`${prefixUrl}/driver/list`, verifyTokenMiddleware, driverController.driverList);




};