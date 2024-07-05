const { sendSuccess, sendError } = require('../../util/responseHandler');
const centerService = require('../../service/globalService/centerService');
const userService = require('../../service/adminService/userService.js');
const bcrypt = require("bcryptjs");
const { checkEmailExist, checkUserNameExist, checkPhoneExist } = require("../../helper/authHelper");

const {
    sequelize,
    Center,
    User,
    Workforcetype,

} = require("../../../db/models");

//


exports.create = async (req, res) => {
    try {
        const { full_name, short_name } = req.body

        const result = await Workforcetype.create({
            full_name, short_name, isActive: true
        });
        sendSuccess(res, 201, result, 'Workforcetype Center successfully');
    } catch (error) {
        sendError(res, 500, error, error);
    }
}


exports.view = async (req, res) => {
    try {

        const getData = await Workforcetype.findAll({
            order: [['id', 'DESC']],
            raw: true,
            nest: true
        }); sendSuccess(res, 200, getData, 'Success');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}