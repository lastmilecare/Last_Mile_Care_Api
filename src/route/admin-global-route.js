const { prefix } = require('../../config/envConfig.js');
const adminCenterController = require('../controller/admin/adminCenterController.js');
const adminMasterController = require('../controller/admin/adminMasterController.js');
const prefixUrl = prefix.admin;
module.exports = function (app) {
    //center
    app.post(`${prefixUrl}/create/center`, adminCenterController.createCenter);
    app.post(`${prefixUrl}/view/center`, adminCenterController.viewCenter);
    app.post(`${prefixUrl}/assign-user/center`, adminCenterController.assignCenter);
    app.post(`${prefixUrl}/update/center/status`, adminCenterController.updateCenterStatus);

    //master
    app.post(`${prefixUrl}/update-master`, adminMasterController.updateMaster);

};