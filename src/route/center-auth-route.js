
const { prefix } = require('../../config/envConfig');
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware.js');
const centerLoginController = require('../controller/center/auth/centerLoginController.js');

const prefixUrlCenter = prefix.center;
module.exports = function (app) {


    app.post(`${prefixUrlCenter}/login`, centerLoginController.login);





};