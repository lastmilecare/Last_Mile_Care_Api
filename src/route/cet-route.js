
const { prefix } = require('../../config/envConfig');
const centerAuthMiddleware = require('../middleware/cetAuthMiddleware.js');
const cetAuthController = require('../controller/cet/auth/cetAuthController');

const prefixUrlCenter = prefix.cet;
module.exports = function (app) {


    app.post(`${prefixUrlCenter}/login`, cetAuthController.cetLogin);





};