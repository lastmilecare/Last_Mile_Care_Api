const {
    sequelize,
    User,
    otp,
    Center,
    Centeruser,
    driverhealthcheckup,
    Doctor,
    DRIVERMASTER,
    DRIVERMASTERPERSONAL,
    DRIVERFAMILYHISTORY,
    CETMANAGEMENT,
    Packagemanagment,
    Centerpackage,
    Bloodgroup,
    Bloodpressure,
    Pulmonaryfunctiontest,
    BMI,
    CHOLESTEROL,
    Cretenine,
    ECG,
    Eyetest,
    Haemoglobin,
    Hearingtest,
    Hiv,
    Pulse,
    random_blood_sugar,
    SPO2,
    Temperature,
    Alcholtest
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');
const { Op } = require('sequelize');
const { getCenterId } = require('../../helper/globalHelper')

const { sendOTP } = require('../../helper/sendOtp');

exports.createHealthData = async (req, res) => {

    try {
        const lastInsert = await driverhealthcheckup.findOne({
            order: [['createdAt', 'DESC']]
        });
        const short_code = req.body.short_code;
        const lastInsertId = lastInsert ? parseInt(lastInsert.id, 10) + 1 : 1;
        const paddedLastInsertId = lastInsertId.toString().padStart(5, '0');
        const uniqueId = short_code + paddedLastInsertId;
        const cId = await getCenterId(req.userId);

        const insert = await driverhealthcheckup.create({
            createdBy: cId.center_id,
            uniqueId: uniqueId,
            external_id: uniqueId,
            contactNumber: req.body.contactNumber || null,
            date_time: req.body.date_time,
            driver_id: req.body.driverId,
            patient_type: req.body.patient_type || null,
            transpoter: req.body.transpoter || null,
            verify_option: req.body.verify_option || null,
            accept_term_condition: true,
            signature: req.body.signature,
            doctor_id: req.body.doctor_id,
            is_submited: false,
        });

        sendSuccess(res, 201, insert, 'Health Checkup Created successfully');

    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
        return
    }
}
exports.createHealthDataStep2 = async (req, res) => {
    if (!req.body.last_insert_id) {
        sendError(res, 400, "last_insert_id is required", 'last_insert_id is required');
    }
    const id = req.body.last_insert_id;
    try {
        const data = {
            doctor_id: req.body.doctor_id,
            bmi_unit: req.body.bmi_unit || null,
            haemoglobin_unit: req.body.haemoglobin_unit || null,
            package_list: req.body.package_list || null,
            spo2_unit: req.body.spo2_unit || null,
            temperature_unit: req.body.temperature_unit || null,
            date_time: req.body.date_time,
            random_blood_sugar_unit: req.body.random_blood_sugar_unit || null,
            hearing_unit: req.body.hearing_unit || null,
            cholesterol_unit: req.body.cholesterol_unit || null,
            blood_pressure_unit: req.body.blood_pressure_unit || null,
            ecg_unit: req.body.ecg_unit || null,
            accept_term_condition: true, // Assuming this is always set to true
            selected_test: req.body.selected_test,
            is_submited: true,
            vehicle_no: req.body.vehicle_no,
        }
        await driverhealthcheckup.update(data, {
            where: {
                id: id
            }
        });
        const getData = await driverhealthcheckup.findOne({ id: id });
        sendSuccess(res, 201, getData, 'Health Checkup Created successfully');

    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
        return
    }
}

exports.viewHealthData = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const cId = await getCenterId(req.userId);

        let queryData = {
            where: {
                createdBy: cId.center_id // Always include this condition
            }
        };

        if (startDate && endDate) {
            const startUtc = new Date(startDate).toISOString();
            const endUtc = new Date(endDate).toISOString();
            queryData.where.createdAt = {
                [Op.between]: [startUtc, endUtc]
            };
        }

        const drivers = await driverhealthcheckup.findAll({
            include: [{
                model: DRIVERMASTER,
                as: 'driver',

            }],

            ...queryData,
            order: [['id', 'DESC']]
        });

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
        const drivers = await driverhealthcheckup.findOne({
            where: { id: id },
            include: [{
                model: DRIVERMASTER,
                as: 'driver',
                // attributes: ['id', 'name', 'abhaNumber',
                //     'gender',
                //     'photographOfDriver',
                //     'localAddress',
                //     'healthCardNumber'
                // ]
            }],
            // attributes: ['id',
            //     'uniqueId',
            //     'accept_term_condition',
            //     'driver_id',
            //     'transpoter',
            //     'driver_type',
            //     'vehicle_no',
            //     'signature',
            //     'date_time',
            //     'package_list',
            //     'verify_option',
            //     'selected_test',
            //     'createdAt'
            // ],
            order: [['id', 'DESC']]
        });
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


exports.driverHealthHistory = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        sendError(res, 400, "Id is required", 'BAD_REQUEST');
        return
    }

    try {
        const drivers = await driverhealthcheckup.findAll({
            where: { driver_id: id },
            include: [{
                model: DRIVERMASTER,
                as: 'driver',

            }],

            order: [['id', 'DESC']]
        });
        sendSuccess(res, 200, drivers, 'List of driver health history');
    } catch (error) {
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.driverDoctorList = async (req, res) => {

    try {
        const doctors = await Doctor.findAll({
            include: [{
                model: User,
                where: { status: true },
                as: 'User', // Ensure this alias matches the association alias
                attributes: ['id', 'username', 'status', 'phone'] // Specify fields to include from the User model
            }]
        });
        sendSuccess(res, 200, doctors, 'Success');
    } catch (error) {
        sendError(res, 500, error, 'Internal error');
    }
};
exports.driverHealthReportDownload = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        sendError(res, 400, "Id is required", 'BAD_REQUEST');
        return;
    }

    try {

        const helthData = await driverhealthcheckup.findOne({
            where: { id: id },
            raw: true,
            nest: true
        })
        const centerUserId = helthData.createdBy;
        const packageList = helthData.package_list;
        const userData = await User.findOne({
            where: { id: centerUserId },
            attributes: [
                'username',
                'name',
                'email',
                'phone',
                'status',
                'external_id'
            ],
            raw: true,
            nest: true,
        });

        const getCenterUser = await Centeruser.findOne({ where: { user_id: centerUserId }, raw: true, nest: true });
        const getCenterUserData = await Center.findOne({ where: { id: getCenterUser.center_id }, raw: true, nest: true });
        const getPackageData = await Packagemanagment.findAll({
            where: {
                id: {
                    [Op.in]: packageList
                }
            },
            raw: true,
            nest: true,
            order: [['id', 'DESC']]
        });

        const centerMetaData = {
            signature: getCenterUser.signature,
            getCenterUserData,
            userData
        }
        const packageMetaData = {
            getPackageData
        }


        const drivers = await driverhealthcheckup.findOne({
            where: { id: id },


            include: [
                {
                    model: Doctor,
                    as: 'doctor',
                    include: [{
                        model: User,
                        as: 'User', // Ensure this alias matches the association alias
                        attributes: ['id', 'username', 'status', 'phone'] // Specify fields to include from the User model
                    }]

                },

                {
                    model: DRIVERMASTER,
                    as: 'driver'

                },
                {
                    model: CETMANAGEMENT,
                    as: 'CETMANAGEMENT',

                },
                {
                    model: CETMANAGEMENT,
                    as: 'CETMANAGEMENT',

                },


            ],

            order: [['id', 'DESC']]
        });

        if (!drivers) {
            sendError(res, 404, "Driver health checkup record not found", 'NOT_FOUND');
            return;
        }

        const modelMapping = {
            temperature_unit: Temperature,
            spo2_unit: SPO2,
            pulse_unit: Pulse,
            pulmonary_function_test_unit: Pulmonaryfunctiontest,
            haemoglobin_unit: Haemoglobin,
            cretenine_unit: Cretenine,
            alchol_test_unit: Alcholtest,
            hiv_unit: Hiv,
            ecg_unit: ECG,
            bmi_unit: BMI,
            cholesterol_unit: CHOLESTEROL,
            eyetest_unit: Eyetest,
            hearing_unit: Hearingtest,
            blood_pressure_unit: Bloodpressure,
            blood_group_unit: Bloodgroup,
            random_blood_sugar_unit: random_blood_sugar
        };

        const selectedTest = drivers.selected_test;
        let additionalData = {};
        let metaData = {};
        const dataArray = []

        for (const key in selectedTest) {
            if (modelMapping.hasOwnProperty(key)) {
                const model = modelMapping[key];
                additionalData[key] = await model.findOne({
                    raw: true, nest: true
                });
            }
        }
        for (const key in selectedTest) {
            if (modelMapping.hasOwnProperty(key)) {
                if (typeof selectedTest[key] === 'object') {
                    metaData[key] = { extraData: additionalData[key], ...selectedTest[key] };
                } else {
                    metaData[key] = { extraData: additionalData[key], [key]: selectedTest[key] };
                }
            } else {
                metaData[key] = selectedTest[key];
            }
        }

        const resData = {
            drivers,
            metaData,
            centerMetaData,
            packageMetaData
        }

        sendSuccess(res, 200, resData, 'Driver health report');
        return
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
};
