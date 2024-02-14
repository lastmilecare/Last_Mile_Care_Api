
const { prefix } = require('../../config/envConfig');
const adminAuthController = require('../controller/admin/auth/authController.js');
const prefixUrl = prefix.admin;
module.exports = function (app) {
    app.post(`${prefixUrl}/create/role`, adminAuthController.createRole);
    app.post(`${prefixUrl}/view/role`, adminAuthController.viewRole);
    app.post(`${prefixUrl}/create`, adminAuthController.adminCreate);
    app.post(`${prefixUrl}/login`, adminAuthController.adminAuth);
    app.post(`${prefixUrl}/create/user-permission`, adminAuthController.createPermission);
    app.post(`${prefixUrl}/view-permission`, adminAuthController.viewPermission);
    app.post(`${prefixUrl}/user/status/update`, adminAuthController.userStatusUpdate);

};