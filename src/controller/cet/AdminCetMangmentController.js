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
exports.updateCETStatus = async (req, res) => {
    const { id, status } = req.body; // Get the CET ID from the URL params
    if (!id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }

    if (typeof req.body.status !== 'boolean') {
        sendError(res, 400, "bad request , status required", 'status required');
        return
    }
    try {

        const user = await CETMANAGEMENT.findOne({ where: { id: req.body.id } });

        if (!user) {
            sendError(res, 404, "CETMANAGEMENT id not found", 'CETMANAGEMENT id not found');
            return
        }
        const result = await CETMANAGEMENT.update({ status: req.body.status }, {
            where: {
                id: req.body.id,
            },
        })
        sendSuccess(res, 200, result, 'Status Update Successfully');
        return
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
            sendError(res, 400, "phoneNumber Already Exists", 'phoneNumber Already Exists');
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

        const cetUser = await Cetuser.findAll({
            include: [
                {
                    model: User,
                    as: 'user', // This alias matches the one defined in Cetuser.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
                    attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']
                },
                {
                    model: CETMANAGEMENT,
                    as: 'cetManagement' // This alias matches the one defined in Cetuser.belongsTo(models.CETMANAGEMENT, { foreignKey: 'cet_id', as: 'cetManagement' });
                }
            ],
            order: [['id', 'DESC']],
        });

        sendSuccess(res, 200, cetUser, 'Cet  User List Fetch Successfully');
        return
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}


exports.cetUserDetails = async (req, res) => {
    const id = req.body.id
    try {
        // const result = await CETMANAGEMENT.findOne({
        //     where: { id: id },
        //     include: [
        //         {
        //             model: User,
        //             as: 'Users', // Alias used in the include statement
        //             attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']
        //         }
        //     ]
        // });
        const cetUser = await Cetuser.findOne({
            where: { user_id: id },
            include: [
                {
                    model: User,
                    as: 'user', // This alias matches the one defined in Cetuser.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
                    attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']
                },
                {
                    model: CETMANAGEMENT,
                    as: 'cetManagement' // This alias matches the one defined in Cetuser.belongsTo(models.CETMANAGEMENT, { foreignKey: 'cet_id', as: 'cetManagement' });
                }
            ],
            order: [['id', 'DESC']],
        });

        sendSuccess(res, 200, cetUser, 'Cet  Fetch Successfully');
        return

        // const result = await User.findOne({
        //     where: { id: id },
        //     include: [
        //         { model: Cetuser, as: 'Cetusers' },
        //         { model: CETMANAGEMENT, through: { attributes: [] }, as: 'CETManagements' }
        //     ],
        //     attributes: { exclude: ['password'] } // Exclude the password attribute
        // });
        // sendSuccess(res, 200, result, 'Cet Fetch Successfully');
        // return
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}



exports.cetUserUpdate = async (req, res) => {
    try {
        const { id, username, name, permission_id, phone, email, password, cet_id } = req.body;
        let cetUser;
        // Find the user record to update
        let user = await User.findByPk(id);
        if (!user) {
            return sendError(res, 404, 'User not found', 'User not found');
        }
        const getData = await userService.checkRole(permission_id);

        if (!getData) {
            sendError(res, 404, "Invalid permission id", 'Invalid permission id');
            return
        }

        // Update user data with new values
        user.username = username;
        user.name = name;
        user.role_id = getData.role_id;
        user.permission_id = permission_id;
        user.phone = phone;
        user.email = email;
        user.password = bcrypt.hashSync(password, 8); // You might want to handle password hashing here
        await user.save();

        // If center_id is provided, update associated center
        if (cet_id) {
            cetUser = await Cetuser.findOne({ where: { user_id: id } });
            if (!cetUser) {
                // Create new centeruser if not exists
                cetUser = await Cetuser.create({ user_id: id, cet_id: cet_id });
            } else {
                // Update existing centeruser
                cetUser.cet_id = cet_id;
                await cetUser.save();
            }
        }

        // Send success response with updated user data
        sendSuccess(res, 200, { user, cetUser }, 'User data updated successfully');
        return
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}
exports.updateCetUserStatus = async (req, res) => {
    try {
        if (!req.body.id) {
            sendError(res, 400, "bad request", 'id required');
            return
        }

        if (typeof req.body.status !== 'boolean') {
            sendError(res, 400, "bad request , status required", 'status required');
            return
        }
        const user = await User.findOne({ where: { id: req.body.id } });

        if (!user) {
            sendError(res, 404, "User id not found", 'User id not found');
            return
        }
        const result = await User.update({ status: req.body.status }, {
            where: {
                id: req.body.id,
            },
        })
        sendSuccess(res, 200, result, 'Status Update Successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}