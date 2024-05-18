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

            bmi_unit: req.body.bmi_unit,
            contactNumber: req.body.contactNumber,
            date_time: req.body.date_time,
            driver_id: req.body.driverId,
            haemoglobin_unit: req.body.haemoglobin_unit,
            package_list: req.body.package_list,
            patient_type: req.body.patient_type,
            spo2_unit: req.body.spo2_unit,
            temperature_unit: req.body.temperature_unit,
            transpoter: req.body.transpoter,
            verify_option: req.body.verify_option,
            random_blood_sugar_unit: req.body.random_blood_sugar_unit,
            hearing_unit: req.body.hearing_unit,
            cholesterol_unit: req.body.cholesterol_unit,
            blood_pressure_unit: req.body.blood_pressure_unit,
            ecg_unit: req.body.ecg_unit,
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