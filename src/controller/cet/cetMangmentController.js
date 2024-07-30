
const {
    sequelize,
    User,
    CETMANAGEMENT,
    Center,
    Centeruser,
    Cetuser,
    driverhealthcheckup,
    DRIVERMASTER,
    Doctor

} = require("../../../db/models");
const { Op, where } = require('sequelize');

const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');
const { sendSuccess, sendError } = require('../../util/responseHandler');
const { getCenterId, getCetId } = require('../../helper/globalHelper')
exports.createCET = async (req, res) => {

    const {
        name,
        uniqueId,
        registeredAddress,
        correspondenceAddress,
        contactNumber,
        spocName,
        spocWhatsappNumber,
        spocEmail,
        alternateSpocName,
        alternateSpocContactNumber,
        alternateSpocEmail,
        pan,
        gstin,
        accountNumber,
        ifscCode,
        bankName,
        status,
        attachPanCopy,
        attachGstin,
        attachCancelledChequeOrPassbook,
        attachCertificateOfIncorporation,
        short_code,
        cet_type,


    } = req.body;


    const requiredFields = [
        'name',
        'registeredAddress',
        'contactNumber',

    ];
    const missingFields = requiredFields.filter(field => {
        return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
    });

    if (missingFields.length > 0) {
        const msg = missingFields.join(', ');
        return res.status(400).json({ error: msg + " is required" });
    }

    try {


        const getLastCenterId = await CETMANAGEMENT.findOne({
            order: [['id', 'DESC']],
        });

        const nextId = getLastCenterId ? parseInt(getLastCenterId.id) + 1 : 1;
        const external_id = `${short_code}000${nextId}`;
        const cId = await getCenterId(req.userId);

        const data = {
            center_id: cId.center_id,
            external_id: external_id,
            short_code: short_code,
            cet_type,
            name,
            uniqueId,
            registeredAddress,
            correspondenceAddress,
            contactNumber,
            spocName,
            spocWhatsappNumber,
            spocEmail,
            alternateSpocName,
            alternateSpocContactNumber,
            alternateSpocEmail,
            pan,
            gstin,
            accountNumber,
            ifscCode,
            bankName,
            status: "Active",
            attachPanCopy: attachPanCopy ? attachPanCopy : null,
            attachGstin: attachGstin ? attachGstin : null,
            attachCancelledChequeOrPassbook: attachCancelledChequeOrPassbook ? attachCancelledChequeOrPassbook : null,
            attachCertificateOfIncorporation: attachCertificateOfIncorporation ? attachCertificateOfIncorporation : null,
        };

        const insert = await CETMANAGEMENT.create(data);
        sendSuccess(res, 201, insert, 'CET Center successfully');
        return
    } catch (error) {
        console.log("error", error.message);
        sendError(res, 500, error, 'Invalid input');
        return
    }
}

exports.viewCET = async (req, res) => {
    try {
        const cId = await getCenterId(req.userId);

        const result = await CETMANAGEMENT.findAll({ where: { center_id: cId.center_id }, raw: true, nest: true, order: [['id', 'DESC']] });
        sendSuccess(res, 200, result, 'CET List Fetch Successful');

    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");

    }
}
exports.viewCETDetails = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');

    }
    try {
        const result = await CETMANAGEMENT.findOne({ where: { id: req.body.id }, raw: true, nest: true, });
        sendSuccess(res, 200, result, 'CET Details Fetch Successful');

    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");
    }
}

exports.updateCET = async (req, res) => {
    const { id } = req.body; // Get the CET ID from the URL params
    if (!id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }
    const {
        name,
        uniqueId,
        registeredAddress,
        correspondenceAddress,
        contactNumber,
        spocName,
        spocWhatsappNumber,
        spocEmail,
        alternateSpocName,
        alternateSpocContactNumber,
        alternateSpocEmail,
        pan,
        gstin,
        accountNumber,
        ifscCode,
        bankName,
        status,
        attachPanCopy,
        attachGstin,
        attachCancelledChequeOrPassbook,
        attachCertificateOfIncorporation
    } = req.body;



    try {


        const data = {
            name,
            uniqueId,
            registeredAddress,
            correspondenceAddress,
            contactNumber,
            spocName,
            spocWhatsappNumber,
            spocEmail,
            alternateSpocName,
            alternateSpocContactNumber,
            alternateSpocEmail,
            pan,
            gstin,
            accountNumber,
            ifscCode,
            bankName,
            status,
            attachPanCopy: attachPanCopy ? attachPanCopy : null,
            attachGstin: attachGstin ? attachGstin : null,
            attachCancelledChequeOrPassbook: attachCancelledChequeOrPassbook ? attachCancelledChequeOrPassbook : null,
            attachCertificateOfIncorporation: attachCertificateOfIncorporation ? attachCertificateOfIncorporation : null,
        };

        // Update CET data in the database
        const update = await CETMANAGEMENT.update(data, { where: { id } });

        sendSuccess(res, 200, update, 'CET Center updated successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}

exports.healthCheckupHistoryDownload = async (req, res) => {
    try {
        const cId = await getCetId(req.userId);
        if (cId) {
            const drivers = await driverhealthcheckup.findAll({
                where: { transpoter: cId.cet_id },
                include: [{
                    model: DRIVERMASTER,
                    as: 'driver',
                }],
                order: [['id', 'DESC']]
            });

            if (drivers.length === 0) {
                return sendError(res, 404, 'No data found', 'No data found');
            }

            const csvWriter = createObjectCsvWriter({
                path: path.join(__dirname, 'healthCheckupHistory.csv'),
                header: [
                    { id: 'id', title: 'ID' },
                    { id: 'uniqueId', title: 'Unique ID' },
                    { id: 'accept_term_condition', title: 'Accept Term Condition' },
                    { id: 'driver_id', title: 'Driver ID' },
                    { id: 'transpoter', title: 'Transporter' },
                    { id: 'driver_type', title: 'Driver Type' },
                    { id: 'vehicle_no', title: 'Vehicle No' },
                    { id: 'signature', title: 'Signature' },
                    { id: 'date_time', title: 'Date Time' },
                    { id: 'package_list', title: 'Package List' },
                    { id: 'verify_option', title: 'Verify Option' },
                    { id: 'selected_test', title: 'Selected Test' },
                    { id: 'createdAt', title: 'Created At' },
                    { id: 'driver_name', title: 'Driver Name' },
                    { id: 'driver_abhaNumber', title: 'Driver ABHA Number' },
                    { id: 'driver_gender', title: 'Driver Gender' },
                    { id: 'driver_photographOfDriver', title: 'Driver Photograph' },
                    { id: 'driver_localAddress', title: 'Driver Local Address' },
                    { id: 'driver_healthCardNumber', title: 'Driver Health Card Number' },
                ]
            });

            const records = drivers.map(driver => ({
                id: driver.id,
                uniqueId: driver.uniqueId,
                accept_term_condition: driver.accept_term_condition,
                driver_id: driver.driver_id,
                transpoter: driver.transpoter,
                driver_type: driver.driver_type,
                vehicle_no: driver.vehicle_no,
                signature: driver.signature,
                date_time: driver.date_time,
                package_list: driver.package_list,
                verify_option: driver.verify_option,
                selected_test: driver.selected_test,
                createdAt: driver.createdAt,
                driver_name: driver.driver.name,
                driver_abhaNumber: driver.driver.abhaNumber,
                driver_gender: driver.driver.gender,
                driver_photographOfDriver: driver.driver.photographOfDriver,
                driver_localAddress: driver.driver.localAddress,
                driver_healthCardNumber: driver.driver.healthCardNumber,
            }));

            await csvWriter.writeRecords(records);

            const filePath = path.join(__dirname, 'healthCheckupHistory.csv');
            res.download(filePath, 'healthCheckupHistory.csv', (err) => {
                if (err) {
                    console.log(err);
                    sendError(res, 500, "internal server error", 'Error downloading the file');
                } else {
                    fs.unlinkSync(filePath); // Delete the file after download
                }
            });
        } else {
            sendError(res, 400, "Not found", 'Not found');
        }
    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error", 'Internal server error');
    }
};

//
exports.healthCheckupHistory = async (req, res) => {
    try {

        const cId = await getCetId(req.userId);
        const { start_date, end_date } = req.body
        let whereCondition2 = {};
        if (start_date && end_date) {
            const startDateFormatted = `${start_date} 00:00:00`;
            const endDateFormatted = `${end_date} 23:59:59`;

            whereCondition2.date_time = {
                [Op.between]: [startDateFormatted, endDateFormatted]
            };
        }

        let whereCondition = {
            confirm_report: "yes",
            is_submited: true,
            transpoter: cId.cet_id
        }

        if (cId) {
            const drivers = await driverhealthcheckup.findAll({
                where: [whereCondition, whereCondition2],
                include: [
                    {
                        model: Doctor,
                        as: 'doctor',
                        include: [
                            {
                                model: User,
                                as: 'User', // Assuming 'user' is the alias for User model in Doctor model
                                attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']
                            }
                        ]

                    },

                    {
                        model: Center,
                        as: 'center',

                    },
                    {
                        model: DRIVERMASTER,
                        as: 'driver',

                    },


                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']

                    },

                    {
                        model: CETMANAGEMENT,
                        as: 'CETMANAGEMENT',

                    }
                ],
                order: [['id', 'DESC']]
            });
            sendSuccess(res, 200, drivers, 'CET List Fetch Successful');
            return
        }
        else {
            sendError(res, 400, "Not found", 'Not found');
            return
        }

    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");

    }
}

exports.healthCheckupHistoryById = async (req, res) => {
    try {

        const cId = req.body.id

        if (cId) {
            const drivers = await driverhealthcheckup.findAll({
                where: { id: cId },
                include: [
                    {
                        model: Doctor,
                        as: 'doctor',
                        include: [
                            {
                                model: User,
                                as: 'User', // Assuming 'user' is the alias for User model in Doctor model
                                attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']
                            }
                        ]

                    },

                    {
                        model: Center,
                        as: 'center',

                    },
                    {
                        model: DRIVERMASTER,
                        as: 'driver',

                    },


                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']

                    },

                    {
                        model: CETMANAGEMENT,
                        as: 'CETMANAGEMENT',

                    }
                ],
                order: [['id', 'DESC']]
            });
            sendSuccess(res, 200, drivers, 'CET List Fetch Successful');
            return
        }
        else {
            sendError(res, 400, "Not found", 'Not found');
            return
        }

    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");

    }
}