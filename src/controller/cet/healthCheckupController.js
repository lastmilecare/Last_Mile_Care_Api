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

exports.detailsHealthData = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        sendError(res, 400, "Id is required", 'BAD_REQUEST');
        return
    }

    try {
        const drivers = await driverhealthcheckup.findOne({ where: { id: id } });
        sendSuccess(res, 200, drivers, 'List of driver health checkup');
    } catch (error) {
        sendError(res, 500, error, 'Internal server error');
    }
}


exports.updateHealthDataById = async (req, res) => {
    const id = req.body.id; // Assuming the ID is passed as a route parameter

    try {
        const [updatedRowsCount, updatedRows] = await driverhealthcheckup.update(
            {
                driver_id: req.body.driver_id,
                package_and_test_history: req.body.package_and_test_history,
                driver_details: req.body.driver_details,
                transpoter: req.body.transpoter,
                driver_type: req.body.driver_type,
                vehicle_no: req.body.vehicle_no,
                date_time: req.body.date_time,
                spo2_unit: req.body.spo2_unit,
                temperature_unit: req.body.temperature_unit,
                pulse_unit: req.body.pulse_unit,
                package_list: req.body.package_list,
            },
            { where: { id: id } } // Update based on the ID
        );

        if (updatedRowsCount > 0) {
            sendSuccess(res, 200, updatedRows, 'Health Data updated successfully');
        } else {
            sendError(res, 404, 'Health Data not found', 'Health Data not found');
            return
        }
    } catch (error) {
        console.error(error);
        sendError(res, 500, error, 'Internal server error');
    }
};