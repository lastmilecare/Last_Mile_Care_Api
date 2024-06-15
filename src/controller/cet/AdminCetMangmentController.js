const {
    sequelize,
    User,
    CETMANAGEMENT,
    Center,
    Centeruser,
    Cetuser
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');
const { getCenterId, assignCetToUser } = require('../../helper/globalHelper')
const userService = require('../../service/adminService/userService.js');
const bcrypt = require("bcryptjs");
const { checkEmailExist, checkUserNameExist, checkPhoneExist } = require("../../helper/authHelper");


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
        center_id


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
        //  const cId = await getCenterId(req.userId);

        const data = {
            center_id: center_id,
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


        const result = await CETMANAGEMENT.findAll({ raw: true, nest: true, order: [['id', 'DESC']] });
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

//cet user 
exports.assignCET = async (req, res) => {
    try {
        if (!req.body.cet_id) {
            sendError(res, 400, "bad request", 'cet_id   required');
            return
        }
        if (!req.body.permission_id) {
            sendError(res, 404, "permission id required", 'permission id required');
            return
        }
        const { username, name, phone, email, password, cet_id, } = req.body;
        const phoneNumber = String(phone)
        if (await checkUserNameExist(username.trim().toLowerCase())) {
            sendError(res, 400, "Username Already Exists", 'Username Already Exists');
            return
        }
        if (await checkEmailExist(email.toLowerCase())) {
            sendError(res, 400, "Email Already Exists", 'Email Already Exists');
            return
        }
        if (await checkPhoneExist(phoneNumber)) {
            sendError(res, 400, "Email Already Exists", 'Email Already Exists');
            return
        }

        const getData = await userService.checkRole(req.body.permission_id);
        if (!getData) {
            sendError(res, 404, "Invalid permission id", 'Invalid permission id');
            return
        }
        const result = await assignCetToUser(req, res, getData)
        sendSuccess(res, 201, result, 'Cet user assign successfully');


    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}
exports.cetUser = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}
exports.cetUserDetails = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}
exports.cetUserUpdate = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}
exports.updateCetUserStatus = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}