const { prefix } = require('../../config/envConfig.js');
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware.js');
const signatureUpload = require('../middleware/singleFileUpload');
const driverController = require('../controller/cet/driverController.js');
const doctorController = require('../controller/doctor/doctorController.js');

const prefixUrl = prefix.admin;
module.exports = function (app) {
    //center

    app.post(`${prefixUrl}/upload/signature`, verifyTokenMiddleware, signatureUpload, driverController.uploadSignature);

    app.post(`${prefixUrl}/create/doctor`, verifyTokenMiddleware, doctorController.createDoctor);
    app.post(`${prefixUrl}/view/doctor`, verifyTokenMiddleware, doctorController.viewDoctor);
    app.post(`${prefixUrl}/doctor/detail`, verifyTokenMiddleware, doctorController.detailDoctor);
    app.post(`${prefixUrl}/doctor/update`, verifyTokenMiddleware, doctorController.updateDoctor);
    app.post(`${prefixUrl}/update/doctor/status`, verifyTokenMiddleware, doctorController.updateDoctorStatus);


};