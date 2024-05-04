const {
    sequelize,
    User,
    CETMANAGEMENT
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');

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
        status
    } = req.body;


    const requiredFields = [
        'name',
        'uniqueId',
        'registeredAddress',
        'correspondenceAddress',
        'contactNumber',
        'spocName',
        'spocWhatsappNumber',
        'spocEmail',
        'alternateSpocName',
        'alternateSpocContactNumber',
        'alternateSpocEmail',
        'pan',
        'gstin',
        'accountNumber',
        'ifscCode',
        'bankName',
        'status'
    ];

    try {
        const missingFields = requiredFields.filter(field => {
            return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
        });

        console.log("Missing Fields:", missingFields); // Log missing fields

        if (missingFields.length > 0) {
            const msg = missingFields.join(', ');
            return res.status(400).json({ error: msg + " is required" });
        }

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
            status: "In_Progress"
        };


        const insert = await CETMANAGEMENT.create(data);
        sendSuccess(res, 201, insert, 'CET Center successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}

exports.viewCET = async (req, res) => {
    try {
        const result = await CETMANAGEMENT.findAll({ raw: true, nest: true, });
        sendSuccess(res, 200, result, 'CET List Fetch Successful');
    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");
    }
}
exports.viewCETDetails = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
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
        status
    } = req.body;

    const {
        attachPanCopy,
        attachGstin,
        attachCancelledChequeOrPassbook,
        attachCertificateOfIncorporation
    } = req.files || {};

    const requiredFields = [
        'name',
        'uniqueId',
        'registeredAddress',
        'correspondenceAddress',
        'contactNumber',
        'spocName',
        'spocWhatsappNumber',
        'spocEmail',
        'alternateSpocName',
        'alternateSpocContactNumber',
        'alternateSpocEmail',
        'pan',
        'gstin',
        'accountNumber',
        'ifscCode',
        'bankName',
        'status'
    ];

    try {
        const missingFields = requiredFields.filter(field => {
            return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
        });

        console.log("Missing Fields:", missingFields); // Log missing fields

        if (missingFields.length > 0) {
            const msg = missingFields.join(', ');
            return res.status(400).json({ error: msg + " is required" });
        }

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
            attachPanCopy: attachPanCopy ? attachPanCopy[0].filename : null,
            attachGstin: attachGstin ? attachGstin[0].filename : null,
            attachCancelledChequeOrPassbook: attachCancelledChequeOrPassbook ? attachCancelledChequeOrPassbook[0].filename : null,
            attachCertificateOfIncorporation: attachCertificateOfIncorporation ? attachCertificateOfIncorporation[0].filename : null
        };

        // Update CET data in the database
        const update = await CETMANAGEMENT.update(data, { where: { id } });

        sendSuccess(res, 200, update, 'CET Center updated successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}