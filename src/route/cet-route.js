
const { prefix } = require('../../config/envConfig');
const centerAuthMiddleware = require('../middleware/cetAuthMiddleware.js');
const cetAuthController = require('../controller/cet/auth/cetAuthController');
const cetMangmentController = require('../controller/cet/cetMangmentController');

const prefixUrlCenter = prefix.cet;
module.exports = function (app) {


    app.post(`${prefixUrlCenter}/login`, cetAuthController.cetLogin);
    app.post(`${prefixUrlCenter}/health-checkup/history`, centerAuthMiddleware, cetMangmentController.healthCheckupHistory);

    app.post(`${prefixUrlCenter}/health-checkup/historyByid`, cetMangmentController.healthCheckupHistoryById);




};