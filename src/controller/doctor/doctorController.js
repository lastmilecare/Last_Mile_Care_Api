const { sendSuccess, sendError } = require('../../util/responseHandler');
const bcrypt = require("bcryptjs");
const { sequelize, User, Doctor } = require("../../../db/models");

// 
exports.createDoctor = async (req, res) => {

    const {
        registration_number,
        qualification,
        signature,
        username,
        contact_number,
    } = req.body;

    try {
        const userData = {
            username,
            phone: contact_number,
            status: true,
            role_id: 4,
            isAdmin: false

        }
        const insert = await User.create(userData);

        const external_id = `DR00${insert.id}`;
        const data = {
            registration_number,
            contact_number,
            user_id: insert.id,
            qualification,
            signature: signature,
            file_name: null,
            external_id: external_id
        };

        const getDocter = await Doctor.create(data);
        sendSuccess(res, 201, getDocter, 'Create Doctor successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};

exports.viewDoctor = async (req, res) => {

    try {
        const doctors = await Doctor.findAll({
            include: [{
                model: User,
                as: 'User', // Ensure this alias matches the association alias
                attributes: ['id', 'username', 'status', 'phone'] // Specify fields to include from the User model
            }],
            order: [['id', 'DESC']]
        });
        sendSuccess(res, 200, doctors, 'Success');
    } catch (error) {
        sendError(res, 500, error, 'Internal error');
    }
};

exports.detailDoctor = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        sendError(res, 400, "BAD_REQUEST", "id required");
        return
    }

    try {
        const doctors = await Doctor.findOne({
            where: { id: id },
            include: [{
                model: User,
                as: 'User', // Ensure this alias matches the association alias
                attributes: ['id', 'username', 'status', 'phone'] // Specify fields to include from the User model
            }]
        });
        sendSuccess(res, 201, doctors, 'Success');
    } catch (error) {
        sendError(res, 500, error, 'Internal error');
    }

}

exports.updateDoctor = async (req, res) => {
    const { id, username, contact_number, registration_number, qualification, signature } = req.body;

    // Validate the presence of the doctor's ID
    if (!id) {
        sendError(res, 400, "BAD_REQUEST", "Doctor ID required");
        return;
    }

    try {
        // Find the doctor by ID and include associated user information
        const doctor = await Doctor.findOne({
            where: { id },
            include: [{
                model: User,
                as: 'User', // Ensure this alias matches the association alias
                attributes: ['id', 'username', 'phone'] // Specify fields to include from the User model
            }]
        });

        if (!doctor) {
            sendError(res, 404, "NOT_FOUND", "Doctor not found");
            return;
        }

        // Update the user data
        await User.update({ username, phone: contact_number }, { where: { id: doctor.User.id } });

        // Update the doctor data
        await Doctor.update({
            registration_number,
            qualification,
            signature: signature,
            file_name: null,
        }, { where: { id } });

        // Fetch updated doctor data
        const updatedDoctor = await Doctor.findByPk(id, {
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'username', 'phone']
            }]
        });

        // Send success response
        sendSuccess(res, 200, updatedDoctor, 'Doctor updated successfully');
    } catch (error) {
        // Send error response
        sendError(res, 500, error, 'Internal error');
    }
};

exports.updateDoctorStatus = async (req, res) => {
    const { id, status } = req.body;

    if (!id) {
        sendError(res, 400, "BAD_REQUEST", "Doctor ID required");
        return;
    }

    try {
        const doctor = await Doctor.findOne({
            where: { id },
            include: [{
                model: User,
                as: 'User', // Ensure this alias matches the association alias
                where: { status: true },
                attributes: ['id', 'username', 'phone'] // Specify fields to include from the User model
            }]
        });

        if (!doctor) {
            sendError(res, 404, "NOT_FOUND", "Doctor not found");
            return;
        }

        // Update the user data
        await User.update({ status }, { where: { id: doctor.User.id } });

        // Send success response
        sendSuccess(res, 200, status, 'Doctor status updated successfully');
    } catch (error) {
        // Send error response
        sendError(res, 500, error, 'Internal error');
    }
};