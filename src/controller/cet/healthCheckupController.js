const {
    sequelize,
    User,
    DRIVERMASTER,
    DRIVERMASTERPERSONAL,
    DRIVERFAMILYHISTORY,
    otp,
    driverhealthcheckup
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');
const { Op } = require('sequelize');
const { sendOTP } = require('../../helper/sendOtp');

exports.createHealthData = async (req, res) => {

    try {

        const insert = await driverhealthcheckup.create({
            driver_id: req.body.driver_id,
            package_and_test_history: req.body.package_and_test_history,
            driver_details: req.body.driver_details,
            transpoter: req.body.transpoter,
            driver_type: req.body.driver_type,
            vehicle_no: req.body.vehicle_no,
            date_time: req.body.date_time,
            unique_code: req.body.unique_code,
            spo2_unit: req.body.spo2_unit,
            temperature_unit: req.body.temperature_unit,
            pulse_unit: req.body.pulse_unit,
            package_list: req.body.package_list,
        })
        sendSuccess(res, 201, insert, 'Health Data  Center successfully');

    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
        return
    }
}

exports.viewHealthData = async (req, res) => {
    try {
        const drivers = await driverhealthcheckup.findAll({ order: [['id', 'DESC']] });
        sendSuccess(res, 200, drivers, 'List of driver health checkup');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}
