
const slugify = require('slugify');
const { sendSuccess, sendError } = require('../../../util/responseHandler');
const authService = require('../../../service/adminService/authService.js');
const authHelper = require('../../../helper/authHelper.js');
const {
    sequelize,
    Role,
    User,
    Permission
} = require("../../../../db/models");
const bcrypt = require("bcryptjs");
exports.login = async (req, res) => {
    try {
        if (!req.body.email) {
            sendError(res, 400, "Email ID Required", 'Email ID Required');
            return;
        }
        if (!req.body.password) {
            sendError(res, 400, "Password ID Required", 'Password ID Required');
            return;
        }
        const result = await authService.centerAuth(req.body.email, req.body.password);
        if (result.status == "no_user_found") {
            sendError(res, 404, "no_user_found", 'No User Found!');
            return
        }
        if (result.dataValues.slug != "center") {
            sendError(res, 401, "Invalid_role", 'Invalid ROle');
            return
        }

        const tokenData = await authHelper.checkUserPassCenter(req.body.password, result, res);
        if (tokenData.status == "invalid_password") {
            sendError(res, 404, "no_user_found or invalid_password", 'Invalid Password');
            return;
        }
        sendSuccess(res, 200, tokenData, 'Login Successfully');
        return;
    } catch (error) {
        sendError(res, 500, "internal server error", error);
        return;
    }
};

