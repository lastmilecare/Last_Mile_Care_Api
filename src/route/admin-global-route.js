const { prefix } = require('../../config/envConfig.js');
const adminCenterController = require('../controller/admin/adminCenterController.js');
const adminMasterController = require('../controller/admin/adminMasterController.js');
const packageController = require('../controller/global/packageController.js');
const testMasterController = require('../controller/global/testMasterController.js');
const uploadMiddleware = require('../middleware/fileUploadMiddleware.js');

const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware.js');
const upload = require('../middleware/multer.js')
const prefixUrl = prefix.admin;
module.exports = function (app) {
    //center
    app.post(`${prefixUrl}/create/center`, verifyTokenMiddleware, upload.single('file'), adminCenterController.createCenter);
    app.post(`${prefixUrl}/view/center`, verifyTokenMiddleware, adminCenterController.viewCenter);
    app.post(`${prefixUrl}/center-user/center`, verifyTokenMiddleware, adminCenterController.assignCenter);
    app.post(`${prefixUrl}/center/user/view`, verifyTokenMiddleware, adminCenterController.centerUser);

    app.post(`${prefixUrl}/update/center/status`, verifyTokenMiddleware, adminCenterController.updateCenterStatus);

    //testmaster
    app.post(`${prefixUrl}/update/temperature`, verifyTokenMiddleware, adminMasterController.updateTemperature);
    app.post(`${prefixUrl}/update/SPO2`, verifyTokenMiddleware, adminMasterController.updateSPO2s);
    app.post(`${prefixUrl}/update/random_blood_sugar`, verifyTokenMiddleware, adminMasterController.updateRandomBloodSugar);
    app.post(`${prefixUrl}/update/pulse`, verifyTokenMiddleware, adminMasterController.updatePulse);
    app.post(`${prefixUrl}/update/pulmonaryfunctiontest`, verifyTokenMiddleware, adminMasterController.updatePulmonaryfunctiontest);
    app.post(`${prefixUrl}/update/Haemoglobin`, verifyTokenMiddleware, adminMasterController.updateHaemoglobin);
    app.post(`${prefixUrl}/update/Cretenine`, verifyTokenMiddleware, adminMasterController.updateCretenine);
    app.post(`${prefixUrl}/update/Alcholtest`, verifyTokenMiddleware, adminMasterController.updateAlcholtest);
    app.post(`${prefixUrl}/update/Hiv`, verifyTokenMiddleware, adminMasterController.updateHiv);
    app.post(`${prefixUrl}/update/hearingtest`, verifyTokenMiddleware, uploadMiddleware.fields([
        { name: 'doc1', maxCount: 1 },
        { name: 'doc2', maxCount: 1 },
    ]), testMasterController.hearingTest);
    app.post(`${prefixUrl}/update/BloodGroup`, verifyTokenMiddleware, testMasterController.bloodGroup);
    app.post(`${prefixUrl}/update/ecg`, verifyTokenMiddleware, upload.single('file'), testMasterController.ecgUpdate);

    app.post(`${prefixUrl}/update/bloodpressure`, verifyTokenMiddleware, testMasterController.bloodPressure);



    //package 
    app.post(`${prefixUrl}/add/package`, verifyTokenMiddleware, packageController.addPackage);
    app.post(`${prefixUrl}/package/list`, verifyTokenMiddleware, packageController.listPackage);
    app.post(`${prefixUrl}/addpackage/toCenter`, verifyTokenMiddleware, packageController.addPackageTOCenter);
    app.post(`${prefixUrl}/view/center/package`, verifyTokenMiddleware, packageController.viewCenterPackage);



};