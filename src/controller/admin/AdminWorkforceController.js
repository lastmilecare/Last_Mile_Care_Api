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
exports.getById = async (req, res) => {
    const id = req.body.id; // Assuming id is passed in req.body

    try {
        const getData = await Workforcetype.findOne({
            where: { id: id }
        });

        if (!getData) {
            return sendError(res, 404, 'Workforcetype not found');
        }

        sendSuccess(res, 200, getData, 'Workforcetype found successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}

exports.update = async (req, res) => {
    try {
        const { id, full_name, short_name } = req.body; // Assuming id is passed in req.body
        const data = await Workforcetype.findOne({ where: { id: req.body.id } });

        if (!data) {
            sendError(res, 404, "Workforcetype id not found", 'Workforcetype id not found');
            return
        }
        const result = await Workforcetype.update({ full_name, short_name }, {
            where: {
                id: req.body.id,
            },
        })



        sendSuccess(res, 200, result, 'Workforcetype updated successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error.message);
    }
}

exports.statusChange = async (req, res) => {
    try {
        const { id, isActive } = req.body; // Assuming id and isActive are passed in req.body


        const result = await Workforcetype.update({ isActive }, {
            where: {
                id: req.body.id,
            },
        })
        if (!result) {
            return sendError(res, 404, 'Workforcetype not found');
        }

        sendSuccess(res, 200, result, 'Workforcetype status changed successfully');
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

