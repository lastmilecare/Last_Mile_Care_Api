
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
const { createUserLogs } = require("../../../helper/globalHelper.js");

exports.cetLogin = async (req, res) => {
    try {
        if (!req.body.email) {
            sendError(res, 400, "Email ID Required", 'Email ID Required');
            return;
        }
        if (!req.body.password) {
            sendError(res, 400, "Password ID Required", 'Password ID Required');
            return;
        }
        const result = await authService.cetAuth(req.body.email, req.body.password);
        if (result) {
            if (result.status == "account_inactive") {
                sendError(res, 401, "account_inactive", 'account inactive!');
                return
            } if (result.status == "no_user_found") {
                sendError(res, 404, "no_user_found", 'No User Found!');
                return
            }
            if (result.slug != "cet") {
                sendError(res, 401, "Invalid_role", 'Invalid ROle');
                return
            }

            const tokenData = await authHelper.checkUserPassCet(req.body.password, result, res);
            if (tokenData.status == "invalid_password") {
                sendError(res, 404, "no_user_found or invalid_password", 'Invalid Password');
                return;
            }
            const logData = {
                user_id: result.id,
                action_type: "cet_login",
                action_description: null,
                user_ip: req.userIp,
                action_time: new Date().toISOString(),
            }
            await createUserLogs(logData);
            sendSuccess(res, 200, tokenData, 'Login Successfully');
            return;
        }
        else {
            console.log("return;")
        }


    } catch (error) {
        sendError(res, 500, "internal server error", error);
        return;
    }
};

