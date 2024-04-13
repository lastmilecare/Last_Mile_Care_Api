const { prefix } = require('../../config/envConfig.js');
const adminCenterController = require('../controller/admin/adminCenterController.js');
const adminMasterController = require('../controller/admin/adminMasterController.js');
const packageController = require('../controller/global/packageController.js');
const testMasterController = require('../controller/global/testMasterController.js');
const uploadMiddleware = require('../middleware/fileUploadMiddleware.js');

const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware.js');
const upload = require('../middleware/multer.js');
const centerFileUpload = require('../middleware/centerFile.js');
const prefixUrl = prefix.admin;
module.exports = function (app) {
    //center
    app.post(`${prefixUrl}/create/center`, verifyTokenMiddleware, centerFileUpload, adminCenterController.createCenter);
    app.post(`${prefixUrl}/view/center`, verifyTokenMiddleware, adminCenterController.viewCenter);
    app.post(`${prefixUrl}/create-center-user`, verifyTokenMiddleware, adminCenterController.assignCenter);
    app.post(`${prefixUrl}/edit/center`, verifyTokenMiddleware, adminCenterController.centerEdit);
    app.post(`${prefixUrl}/update/center`, verifyTokenMiddleware, centerFileUpload, adminCenterController.centerUpdate);
    app.post(`${prefixUrl}/center/user/view`, verifyTokenMiddleware, adminCenterController.centerUser);
    app.post(`${prefixUrl}/center/user/details`, verifyTokenMiddleware, adminCenterController.centerUserDetails);
    app.post(`${prefixUrl}/center/user/update`, verifyTokenMiddleware, adminCenterController.centerUserUpdate);
    app.post(`${prefixUrl}/update/center/status`, verifyTokenMiddleware, adminCenterController.updateCenterStatus);
    app.post(`${prefixUrl}/update/center/user/status`, verifyTokenMiddleware, adminCenterController.updateCenterUserStatus);


    //testmaster
    app.post(`${prefixUrl}/update/temperature`, verifyTokenMiddleware, adminMasterController.updateTemperature);
    app.post(`${prefixUrl}/update/spo2`, verifyTokenMiddleware, adminMasterController.updateSPO2s);
    app.post(`${prefixUrl}/update/random-blood-sugar`, verifyTokenMiddleware, adminMasterController.updateRandomBloodSugar);
    app.post(`${prefixUrl}/update/pulse`, verifyTokenMiddleware, adminMasterController.updatePulse);
    app.post(`${prefixUrl}/update/pft`, verifyTokenMiddleware, adminMasterController.updatePulmonaryfunctiontest);
    app.post(`${prefixUrl}/update/haemoglobin`, verifyTokenMiddleware, adminMasterController.updateHaemoglobin);
    app.post(`${prefixUrl}/update/cretenine`, verifyTokenMiddleware, adminMasterController.updateCretenine);
    app.post(`${prefixUrl}/update/alchol`, verifyTokenMiddleware, adminMasterController.updateAlcholtest);
    app.post(`${prefixUrl}/update/hiv`, verifyTokenMiddleware, adminMasterController.updateHiv);

    app.post(`${prefixUrl}/update/blood-group`, verifyTokenMiddleware, testMasterController.bloodGroup);
    app.post(`${prefixUrl}/update/ecg`, verifyTokenMiddleware, upload.single('file'), testMasterController.ecgUpdate);
    app.post(`${prefixUrl}/update/blood-pressure`, verifyTokenMiddleware, testMasterController.bloodPressure);
    app.post(`${prefixUrl}/update/bmi`, verifyTokenMiddleware, testMasterController.bmiCheck);
    app.post(`${prefixUrl}/update/cholesterol`, verifyTokenMiddleware, testMasterController.cholesterolUpdate);
    app.post(`${prefixUrl}/update/eye`, verifyTokenMiddleware, testMasterController.updateEyeTest);

    app.post(`${prefixUrl}/update/hearing`, verifyTokenMiddleware, uploadMiddleware.fields([
        { name: 'doc1', maxCount: 1 },
        { name: 'doc2', maxCount: 1 },
    ]), testMasterController.hearingTest);


    ///view master routes 

    app.post(`${prefixUrl}/view/temperature`, verifyTokenMiddleware, adminMasterController.viewTemperature);
    app.post(`${prefixUrl}/view/spo2`, verifyTokenMiddleware, adminMasterController.viewSPO2);
    app.post(`${prefixUrl}/view/random-blood-sugar`, verifyTokenMiddleware, adminMasterController.viewRandomBloodSugar);
    app.post(`${prefixUrl}/view/pulse`, verifyTokenMiddleware, adminMasterController.viewPulse);
    app.post(`${prefixUrl}/view/pft`, verifyTokenMiddleware, adminMasterController.viewPulmonaryFunctionTest);
    app.post(`${prefixUrl}/view/haemoglobin`, verifyTokenMiddleware, adminMasterController.viewHaemoglobin);
    app.post(`${prefixUrl}/view/cretenine`, verifyTokenMiddleware, adminMasterController.viewCretenine);
    app.post(`${prefixUrl}/view/alchol`, verifyTokenMiddleware, adminMasterController.viewAlcholtest);
    app.post(`${prefixUrl}/view/hiv`, verifyTokenMiddleware, adminMasterController.viewHiv);

    app.post(`${prefixUrl}/view/hearing`, verifyTokenMiddleware, testMasterController.viewHearingtest);
    app.post(`${prefixUrl}/view/blood-group`, verifyTokenMiddleware, testMasterController.viewBloodgroup);
    app.post(`${prefixUrl}/view/ecg`, verifyTokenMiddleware, testMasterController.viewECG);
    app.post(`${prefixUrl}/view/blood-pressure`, verifyTokenMiddleware, testMasterController.viewBloodpressure);
    app.post(`${prefixUrl}/view/bmi`, verifyTokenMiddleware, testMasterController.viewBMI);
    app.post(`${prefixUrl}/view/cholesterol`, verifyTokenMiddleware, testMasterController.viewCholesterol);
    app.post(`${prefixUrl}/view/eye`, verifyTokenMiddleware, testMasterController.viewEyeTest);




    //package 
    app.post(`${prefixUrl}/add/package`, verifyTokenMiddleware, packageController.addPackage);
    app.post(`${prefixUrl}/package/list`, verifyTokenMiddleware, packageController.listPackage);
    app.post(`${prefixUrl}/package/status/update`, verifyTokenMiddleware, packageController.updatePackageStatus);

    app.post(`${prefixUrl}/addpackage/toCenter`, verifyTokenMiddleware, packageController.addPackageTOCenter);
    app.post(`${prefixUrl}/view/center/package`, verifyTokenMiddleware, packageController.viewCenterPackage);
    app.post(`${prefixUrl}/update/center/package/status`, verifyTokenMiddleware, packageController.updateCenterPackageStatus);




    app.post(`${prefixUrl}/package/details`, verifyTokenMiddleware, packageController.packageDetails);
    app.post(`${prefixUrl}/package/update`, verifyTokenMiddleware, packageController.packageUpdate);

    app.post(`${prefixUrl}/centerPackageDetails`, verifyTokenMiddleware, packageController.centerPackageDetails);
    app.post(`${prefixUrl}/update/centerPackageDetails`, verifyTokenMiddleware, packageController.centerPackageUpdate);





};