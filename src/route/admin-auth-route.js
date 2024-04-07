
const { prefix } = require('../../config/envConfig');
const adminAuthController = require('../controller/admin/auth/authController.js');
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware.js');
const userController = require('../controller/admin/auth/userController.js');

const prefixUrl = prefix.admin;
module.exports = function (app) {

    app.post(`${prefixUrl}/create`, verifyTokenMiddleware, adminAuthController.adminCreate);
    app.post(`${prefixUrl}/user/list`, verifyTokenMiddleware, userController.userList);
    app.post(`${prefixUrl}/login`, adminAuthController.adminAuth);
    app.post(`${prefixUrl}/user/status/update`, verifyTokenMiddleware, adminAuthController.userStatusUpdate);
    app.post(`${prefixUrl}/user/details`, verifyTokenMiddleware, adminAuthController.userDetails);
    app.post(`${prefixUrl}/user/update`, verifyTokenMiddleware, adminAuthController.userUpdate);
    //role 
    app.post(`${prefixUrl}/create/role`, verifyTokenMiddleware, adminAuthController.createRole);
    app.post(`${prefixUrl}/view/role`, verifyTokenMiddleware, adminAuthController.viewRole);
    app.post(`${prefixUrl}/role/details`, verifyTokenMiddleware, adminAuthController.roleDetails);
    app.post(`${prefixUrl}/role/update`, verifyTokenMiddleware, adminAuthController.updateRole);
    //permission
    app.post(`${prefixUrl}/create/user-permission`, verifyTokenMiddleware, adminAuthController.createPermission);
    app.post(`${prefixUrl}/view-permission`, verifyTokenMiddleware, adminAuthController.viewPermission);
    app.post(`${prefixUrl}/permission-details`, verifyTokenMiddleware, adminAuthController.permissionDetails);
    app.post(`${prefixUrl}/permission-update`, verifyTokenMiddleware, adminAuthController.permissionUpdate);




};