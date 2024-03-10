const { sendSuccess, sendError } = require('../../util/responseHandler');
const {
    sequelize,
    Packagemanagment,
    Centerpackage
} = require("../../../db/models");
// 
exports.addPackage = async (req, res) => {

    try {
        const { package_name, package_id, package_list } = req.body
        const data = {
            package_name,
            package_id,
            package_list
        }
        const insert = await Packagemanagment.create(data);

        sendSuccess(res, 201, insert, 'addPackage successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};
exports.listPackage = async (req, res) => {

    try {

        const reqData = await Packagemanagment.findAll({ raw: true, nest: true });

        sendSuccess(res, 200, reqData, 'Success');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};

exports.addPackageTOCenter = async (req, res) => {
    const { package_price,
        package_frequency,
        package_id,
        center_id, } = req.body
    try {
        const data = {
            package_price,
            package_frequency,
            package_id,
            center_id,
        };

        const reqData = await Centerpackage.create(data);

        sendSuccess(res, 201, reqData, 'Centerpackage created Successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};
exports.viewCenterPackage = async (req, res) => {

    try {
        const reqData = await Centerpackage.findALl({
            include: [
                { model: Package, as: 'package' }, // Include associated Package details
                { model: Center, as: 'center' } // Include associated Center details
            ],
            raw: true, nest: true
        });

        sendSuccess(res, 200, reqData, 'Centerpackage created Successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};
