const { prefix } = require('../../config/envConfig.js');
const verifyTokenMiddleware = require('../middleware/centerAuthMiddleware.js');
const uploadImagesToS3 = require('../middleware/cetUpload.js');
const cetMangmentController = require('../controller/cet/cetMangmentController.js');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware.js')
const driverController = require('../controller/cet/driverController.js');
const healthCheckupController = require('../controller/cet/healthCheckupController.js');

const prefixUrl = prefix.center;
//
module.exports = function (app) {
    //center CET
    app.post(`${prefixUrl}/create/CET`, verifyTokenMiddleware, uploadImagesToS3, cetMangmentController.createCET);

    app.post(`${prefixUrl}/view/CET`, verifyTokenMiddleware, cetMangmentController.viewCET);
    app.post(`${prefixUrl}/CET/details`, verifyTokenMiddleware, cetMangmentController.viewCETDetails);

    app.post(`${prefixUrl}/CET/updateCET`, verifyTokenMiddleware, uploadImagesToS3, cetMangmentController.updateCET);

    ////Driver
    app.post(`${prefixUrl}/driver/create`, verifyTokenMiddleware, fileUploadMiddleware.fields([
        { name: 'doc1', maxCount: 1 },
        { name: 'doc2', maxCount: 1 },

    ]), driverController.createDriver);
    app.post(`${prefixUrl}/driver/list`, verifyTokenMiddleware, driverController.getDriverList);
    app.post(`${prefixUrl}/driver/details`, verifyTokenMiddleware, driverController.getDriverDetails);
    app.post(`${prefixUrl}/driver/update`, verifyTokenMiddleware, driverController.updateDriver);


    app.post(`${prefixUrl}/driver/personal/history/create`, verifyTokenMiddleware, driverController.createDriverPersonalData);
    app.post(`${prefixUrl}/driver/personal/history/view`, verifyTokenMiddleware, driverController.driverPersonalDataVIew);
    app.post(`${prefixUrl}/driver/personal/history/details`, verifyTokenMiddleware, driverController.driverPersonalDetails);
    app.post(`${prefixUrl}/driver/personal/history/update`, verifyTokenMiddleware, driverController.driverPersonalUpdate);


    //family

    app.post(`${prefixUrl}/driver/family/history/create`, verifyTokenMiddleware, driverController.createDriverFamilyData);
    app.post(`${prefixUrl}/driver/family/history/list`, verifyTokenMiddleware, driverController.driverFamilyList);
    app.post(`${prefixUrl}/driver/family/history/details`, verifyTokenMiddleware, driverController.driverFamilyDetails);
    app.post(`${prefixUrl}/driver/family/history/update`, verifyTokenMiddleware, driverController.driverFamilyUpdate);




    //app.post(`${prefixUrl}/driver/list`, verifyTokenMiddleware, driverController.driverList);

    //helth checkup
    app.post(`${prefixUrl}/driver/search/bynumber`, verifyTokenMiddleware, driverController.searchDriverByNumber);
    app.post(`${prefixUrl}/driver/send/otp`, verifyTokenMiddleware, driverController.sendOtp);
    app.post(`${prefixUrl}/driver/verify/otp`, verifyTokenMiddleware, driverController.verifyOtp);
    app.post(`${prefixUrl}/driver/package/list`, verifyTokenMiddleware, driverController.packageList);
    app.post(`${prefixUrl}/driver/create/health-checkup`, verifyTokenMiddleware, healthCheckupController.createHealthData);
    app.post(`${prefixUrl}/driver/view/health-checkup`, verifyTokenMiddleware, healthCheckupController.viewHealthData);

    app.post(`${prefixUrl}/driver/health-checkup/details`, verifyTokenMiddleware, healthCheckupController.detailsHealthData);


};