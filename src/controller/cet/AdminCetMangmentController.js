const {
    sequelize,
    User,
    CETMANAGEMENT,
    Center,
    Centeruser,
    Cetuser,
    driverhealthcheckup,
    DRIVERMASTER,
    Doctor,
    Haemoglobin,
    Pulmonaryfunctiontest,
    Bloodpressure

} = require("../../../db/models");
const { Op, where } = require('sequelize');

const { sendSuccess, sendError } = require('../../util/responseHandler');
const { getCenterId, assignCetToUser } = require('../../helper/globalHelper')
const userService = require('../../service/adminService/userService.js');
const bcrypt = require("bcryptjs");
const { checkEmailExist, checkUserNameExist, checkPhoneExist } = require("../../helper/authHelper");
const ExcelJS = require('exceljs');
const moment = require('moment-timezone');

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
        if (password) {
            const updatePass = bcrypt.hashSync(password, 8);
            user.password = updatePass;
        }
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


exports.downloadCsvCet = async (req, res) => {
    const { cet, start_date, end_date } = req.body
    // createdAt
    // 2024-06-14 14:57:43.693+00
    let whereCondition = {};
    let whereCondition2 = {};

    if (cet && cet !== 'all') {
        whereCondition.transpoter = cet; // Assuming cet_id is the field in CETMANAGEMENT you want to filter by
    }
    else {
        delete whereCondition.transpoter
    }
    if (start_date && end_date) {
        const startDateFormatted = `${start_date} 00:00:00`;
        const endDateFormatted = `${end_date} 23:59:59`;

        whereCondition2.date_time = {
            [Op.between]: [startDateFormatted, endDateFormatted]
        };
    } else if (start_date && !end_date) {
        // If only start_date is provided, use it with the current date as end_date
        const startDateFormatted = `${start_date} 00:00:00`;
        const now = new Date().toISOString(); // Current date and time in ISO format
        whereCondition2.date_time = {
            [Op.gte]: startDateFormatted,
            [Op.lt]: now,
            [Op.between]: [startDateFormatted,now],
        };
    }else {
        // If no dates are provided, set the range to the last 24 hours
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago

        whereCondition2.date_time = {
            [Op.gte]: oneDayAgo,
            [Op.lt]: now,
            [Op.between]: [now,oneDayAgo] 
        };
    }

    try {

        const cetUser = await driverhealthcheckup.findAll({
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

                },
                {
                    model: driverhealthcheckup, // Include the driverhealthrecords table
                    as: 'healthRecord',
                    attributes: ['vehicle_no'] // Fetch the vehicle number from driverhealthrecords
                },
            ],
            order: [['id', 'DESC']],
            raw: true,
            nest: true,
            attributes: [
                'vehicle_no', // Include vehicle_no from driverhealthcheckup model
                'id',
                'date_time',
                'selected_package_name',
                [sequelize.col('CETMANAGEMENT.name'), 'CETName'],
                [sequelize.col('center.project_name'), 'CenterName'],
                [sequelize.col('user.username'), 'CenterUserName'],
                [sequelize.col('driver.name'), 'WorkforceName'],
                [sequelize.col('driver.healthCardNumber'), 'HealthCardNumber'],
                [sequelize.col('driver.contactNumber'), 'WorkforceMobileNo'],
            ]
        });




        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('CetUsers');

        // Define the headers
        worksheet.columns = [
            { header: 'CET Name', key: 'CETName', width: 20 },
            { header: 'Center Name', key: 'CenterName', width: 20 },
            { header: 'Center User Name', key: 'CenterUserName', width: 20 },
            { header: 'Test Date', key: 'TestDate', width: 15 },
            { header: 'Test Package Name', key: 'TestPackageName', width: 30 },
            { header: 'Workforce Name', key: 'WorkforceName', width: 20 },
            { header: 'Health Card Number', key: 'HealthCardNumber', width: 20 },
            { header: 'Workforce Mobile No', key: 'WorkforceMobileNo', width: 15 },
            { header: 'VehicleNumber', key: 'VehicleNumber', width: 15 },
            {header: 'Test ID',key:'id',width:10} 

        ];

        // Add rows from cetUser
        cetUser.forEach(data => {
            const dData = {
                CETName: data.CETMANAGEMENT.name,
                CenterName: data.center.project_name,
                CenterUserName: data.user.username,
                TestDate: new Date(data.date_time).toISOString().split('T')[0],
                TestPackageName: data.selected_package_name.flat(),
                WorkforceName: data.driver.name,
                HealthCardNumber: data.driver.healthCardNumber,
                WorkforceMobileNo: data.driver.contactNumber,
                VehicleNumber: data.vehicle_no
            }
            const pName = data.selected_package_name || '';
            console.log(";;;;;;;", dData, pName)

            const finalPackageName = pName.join(',');
            worksheet.addRow({
                CETName: data.CETMANAGEMENT.name,
                CenterName: data.center.project_name,
                CenterUserName: data.user.username,
                TestDate: new Date(data.date_time).toISOString().split('T')[0],
                TestPackageName: finalPackageName,
                WorkforceName: data.driver.name,
                HealthCardNumber: data.driver.healthCardNumber,
                WorkforceMobileNo: data.driver.contactNumber,
                VehicleNumber: data.vehicle_no
            });
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'Cet.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, error);
    }
}

exports.CsvCetList = async (req, res) => {
    const { cet, start_date, end_date } = req.body;
    let whereCondition = {};

    // Handle 'cet' filter
    if (cet && cet !== 'all') {
        whereCondition.transpoter = cet; // Assuming 'transpoter' is the field in CETMANAGEMENT
    }

    // Handle date filtering
    if (start_date && end_date) {
        // Convert to UTC without manual time subtraction
        // 12am -11:59pm
        // const startDateFormatted = moment.tz(`${start_date} 00:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
        // const endDateFormatted = moment.tz(`${end_date} 23:59:59`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
        
        // 6am-5:59am 
        const startDateFormatted = moment.tz(`${start_date} 06:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
        const endDateFormatted = moment.tz(`${end_date} 05:59:59`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
        
        whereCondition.date_time = {
            [Op.gte]: startDateFormatted,
            [Op.lte]: endDateFormatted // Use 'lte' to include the entire end date
        };

    } else if (start_date && !end_date) {
        const startDateFormatted = moment.tz(`${start_date} 00:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
        const now = moment().utc().format(); // Current date in UTC

        whereCondition.date_time = {
            [Op.gte]: startDateFormatted,
            [Op.lte]: now // Include the current time as the end date
        };

    } else {
        // If no dates are provided, set the range to the last 24 hours
        const now = moment().utc().format();
        const oneDayAgo = moment(now).subtract(24, 'hours').utc().format(); // 24 hours ago in UTC

        whereCondition.date_time = {
            [Op.gte]: oneDayAgo,
            [Op.lte]: now
        };
    }

    try {
        const cetUser = await driverhealthcheckup.findAll({
            where: whereCondition,
            include: [
                {
                    model: Doctor,
                    as: 'doctor',
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: ['id', 'username', 'name', 'status', 'phone', 'external_id', 'email']
                        }
                    ]
                },
                {
                    model: DRIVERMASTER,
                    as: 'driver',
                },
                {
                    model: Center,
                    as: 'center',
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
            order: [['id', 'DESC']],
        });

        if (cetUser.length > 0) {
            sendSuccess(res, 200, cetUser, 'Cet Fetch Successfully');
        } else {
            sendSuccess(res, 200, cetUser, 'No data available');
        }

    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
};


// search driver using driver_id
exports.searchDriverById = async (req, res) => {
    const { driver_id } = req.body; // Get the driver_id from the request body

    if (!driver_id) {
        return sendError(res, 400, "Driver ID is required", 'Driver ID Required');
    }

    try {
        // Search for the driver in the driverhealthcheckups table
        const driverRecord = await driverhealthcheckup.findOne({
            where: { driver_id: driver_id },
            include: [
                {
                    model: DRIVERMASTER,
                    as: 'driver',
                    attributes: ['name', 'healthCardNumber', 'contactNumber'], // Fetch specific attributes from DRIVERMASTER
                },
                {
                    model: CETMANAGEMENT,
                    as: 'CETMANAGEMENT',
                    attributes: ['name'], // Fetch CET Name
                },
                {
                    model: Center,
                    as: 'center',
                    attributes: ['project_name'], // Fetch Center Name
                },
                {
                    model: Doctor,
                    as: 'doctor',
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: ['username', 'email'], // Fetch Doctor's associated user details
                        }
                    ],
                }
            ],
            raw: true,
            nest: true,
        });

        if (!driverRecord) {
            return sendError(res, 404, "Driver not found", 'Driver Not Found');
        }
        // Send the found record as a success response
        return sendSuccess(res, 200, driverRecord, 'Driver found successfully');
    } catch (error) {
        console.log("Error searching for driver:", error);
        return sendError(res, 500, error.message, 'An error occurred while searching for the driver');
    }
}

// search driver by healthcard number 
exports.searchDriverHealthRecordByHealthCard = async (req, res) => {
    const { healthCardNumber } = req.body; // Get the healthCardNumber from the request body

    if (!healthCardNumber) {
        return sendError(res, 400, "Health Card Number is required", 'Health Card Number Required');
    }

    try {
        // Search for the driver health record in the driverhealthcheckup table based on healthCardNumber
        const driverHealthRecord = await driverhealthcheckup.findOne({
            include: [
                {
                    model: DRIVERMASTER,
                    as: 'driver',
                    where: { healthCardNumber: healthCardNumber }, // Filter by health card number
                    attributes: ['name', 'healthCardNumber', 'contactNumber'], // Fetch specific attributes from DRIVERMASTER
                },
                {
                    model: CETMANAGEMENT,
                    as: 'CETMANAGEMENT',
                    attributes: ['name'], // Fetch CET Name
                },
                {
                    model: Center,
                    as: 'center',
                    attributes: ['project_name'], // Fetch Center Name
                },
                {
                    model: Doctor,
                    as: 'doctor',
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: ['username', 'email'], // Fetch Doctor's associated user details
                        }
                    ],
                }
            ],
            raw: true,
            nest: true,
        });

        if (!driverHealthRecord) {
            return sendError(res, 404, "Driver Health Record not found", 'Driver Health Record Not Found');
        }

        // Send the found record as a success response
        return sendSuccess(res, 200, driverHealthRecord, 'Driver Health Record found successfully');
    } catch (error) {
        console.log("Error searching for driver health record:", error);
        return sendError(res, 500, error.message, 'An error occurred while searching for the driver health record');
    }
};

exports.searchDriver = async (req, res) => {
    const { driver_id, healthCardNumber } = req.body;

    if (driver_id) {
        return exports.searchDriverById(req, res);
    }

    if (healthCardNumber) {
        return exports.searchDriverHealthRecordByHealthCard(req, res);
    }

    return sendError(res, 400, "Either Driver ID or Health Card Number is required", 'Input Required');
};

exports.editVehicleNumber = async (req, res) => {
    const { test_id, new_vehicleNumber } = req.body;
  
    const vehicleNumberPattern = /^[A-Z]{2}.*\d{4}$/;
  
    if (!vehicleNumberPattern.test(new_vehicleNumber)) {
      return res.status(400).json({ message: "Invalid vehicle number format" });
    }
  
    try {
      const driver = await driverhealthcheckup.findOne({
        where: { id: test_id },
      });
  
      if (!driver) {
        return res.status(404).json({ message: "TestID Not found" });
      }
  
      driver.vehicle_no = new_vehicleNumber;
      await driver.save();
  
      return res.status(200).json({ message: "Vehicle number updated successfully", driver });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal service error" });
    }
  };



  exports.getTestCountByCenter = async (req, res) => {
    try {
        // Extract the parameters from the request body
        const { centerID, startDate, endDate } = req.body;

        // Validate the input
        if (!centerID || !startDate || !endDate) {
            return sendError(res, 400, 'centerID, startDate, and endDate are required');
        }

        // Parse dates
        const startUtc = new Date(startDate).toISOString();
        const endUtc = new Date(endDate).toISOString(); 

        // Query the driverhealthcheckup table to count tests within the time frame
        const testCount = await driverhealthcheckup.count({
            where: {
                createdBy: centerID, // Assuming createdBy is the centerID
                createdAt: {
                    [Op.between]: [startUtc, endUtc]
                }
            }
        });

        // Return the count
        sendSuccess(res, 200, { testCount }, 'Test count retrieved successfully');
    } catch (error) {
        console.error(error);
        sendError(res, 500, error, 'Internal server error');
    }
};

exports.getTestCountPerCenter = async (req, res) => {
    try {
      // Extract the parameters from the request body
      const { startDate, endDate } = req.body;
  
      // Validate the input
      if (!startDate || !endDate) {
        return sendError(res, 400, 'startDate and endDate are required');
      }
  
      // Parse dates
      const startUtc = new Date(startDate).toISOString();
      const endUtc = new Date(endDate).toISOString();
  
      // Query to get the count of tests per center, grouped by BASIC and ADVANCED packages
      const testCountPerCenter = await driverhealthcheckup.findAll({
        attributes: [
          [sequelize.col('center.project_name'), 'center_name'], // Alias for center name
          [sequelize.fn('COUNT', sequelize.col('driverhealthcheckup.id')), 'total_test_count'], // Count the total tests
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN 'BASIC' = ANY(selected_package_name) THEN 1 ELSE 0 END`)), 'basic_test_count'], // Count BASIC tests
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN 'ADVANCED' = ANY(selected_package_name) THEN 1 ELSE 0 END`)), 'advanced_test_count'], // Count ADVANCED tests
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN 'COUNSELLING' = ANY(selected_package_name) THEN 1 ELSE 0 END`)), 'counselling_test_count'], // Count COUNSELLING tests
        ],
        include: [
          {
            model: Center,
            as: 'center', // Alias for the center table
            attributes: [], // Already selected project_name
          },
        ],
        where: {
          createdAt: {
            [Op.between]: [startUtc, endUtc], // Filter by date range
          },
        },
        group: ['center.project_name'], // Group by center name
        order: [[sequelize.col('total_test_count'), 'DESC']], // Order by total test count in descending order
        raw: true,
      });
  
      // Return the success response with the data
      sendSuccess(res, 200, testCountPerCenter, 'Test count per center retrieved successfully');
    } catch (error) {
      console.error(error);
      sendError(res, 500, error.message || 'Internal server error');
    }
  };
  
  

  exports.editCET = async(req,res)=>{
    const{test_id,newTranspoterID} = req.body; 

    if (!test_id || !newTranspoterID) {
        return res.status(400).json({ message: "Test ID and new transporter ID are required" });
    }

    try{
        const driver = await driverhealthcheckup.findOne({
            where: {id:test_id}
        });
        if(!driver){
            return res.status(404).json({message: "Test ID not found"});
        }
        const cetManagement = await CETMANAGEMENT.findOne({
            where:{id:newTranspoterID}
        });
        if(!cetManagement){
            return res.status(404).json({ message: "Transporter (CETMANAGEMENT) ID not found" })
        }
        driver.transpoter = newTranspoterID; 
        await driver.save();

        return res.status(200).json({message:"Transpoter updated successfully",driver});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal service error"});
    }
  };


  
//   exports.cumulativeHealthAnalysis = async (req, res) => {
    
//     const { cet, start_date, end_date } = req.body; // Use 'cet' as the input parameter name
//     let whereCondition = {};
  
//     // Step 1: Handle `cet` filter like `CsvCetList` API
//     if (cet && cet !== 'all') {
//       whereCondition.transpoter = cet; // Assuming 'transpoter' is the field in CETMANAGEMENT to filter by
//     }
  
//     // Step 2: Handle date filtering based on `start_date` and `end_date`
//     if (start_date && end_date) {
//       // Both start and end dates are provided
//       const startDateFormatted = moment.tz(`${start_date} 06:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
//       const endDateFormatted = moment.tz(`${end_date} 05:59:59`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
  
//       whereCondition.date_time = {
//         [Op.gte]: startDateFormatted,
//         [Op.lte]: endDateFormatted
//       };
  
//     } else if (start_date && !end_date) {
//       // Only start date is provided, use the current date as the end date
//       const startDateFormatted = moment.tz(`${start_date} 00:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
//       const now = moment().utc().format(); // Current date and time in UTC
  
//       whereCondition.date_time = {
//         [Op.gte]: startDateFormatted,
//         [Op.lte]: now
//       };
  
//     } else if (!start_date && !end_date) {
//       // If no dates are provided, retrieve all data without date filtering
//       delete whereCondition.date_time;
//     }
  
//     try {
//       const haemoglobinThreshold = await Haemoglobin.findOne({ raw: true });
//       const PFTThreshold = await Pulmonaryfunctiontest.findOne({raw:true});

//       // Step 3: Fetch the records based on the constructed `whereCondition`
//       const records = await driverhealthcheckup.findAll({
//         where: whereCondition,
//         include: [
//           {
//             model: CETMANAGEMENT,
//             as: 'CETMANAGEMENT',
//             attributes: ['name']
//           },
//           {
//             model: DRIVERMASTER,
//             as: 'driver',
//             attributes: ['name', 'healthCardNumber']
//           }
//         ],
//         raw: true,
//         nest: true
//       });
  
//       // Step 4: Initialize counters for each health parameter
//       const healthAnalysis = {
//         blood_oxygen: { green: 0, yellow: 0, red: 0 },
//         haemoglobin: { green: 0, yellow: 0, red: 0 },
//         blood_sugar: { green: 0, yellow: 0, red: 0 },
//         blood_pressure: { green: 0, yellow: 0, red: 0 },
//         pulmonary_function: { green: 0, yellow: 0, red: 0 },
//         ecg: { green: 0, red: 0 },
//         eye_test: { green: 0, red: 0 },
//         hiv_test: { green: 0, red: 0 }
//       };
  
//       // Step 5: Iterate through each record and categorize based on health parameters
//       records.forEach(record => {
//         const { selected_test } = record;
  
//         if (selected_test) {
//           // Blood Oxygen Levels
//           if (selected_test.spo2_unit) {
//             const spo2Remark = selected_test.spo2_unit.remark; // Assuming `remark` is a string field in `spo2_unit`
//             if (spo2Remark && spo2Remark.toLowerCase() === 'pass') {
//               healthAnalysis.blood_oxygen.green++; // If remark is 'pass', increment green count
//             } else {
//               healthAnalysis.blood_oxygen.red++; // If remark is not 'pass', increment red count
//             }
//           }
  
//           // Haemoglobin Levels
//           if (selected_test.haemoglobin_unit) {
//             const hb = parseFloat(selected_test.haemoglobin_unit.value);
//             if (hb >= haemoglobinThreshold.standard_value_min) {
//               healthAnalysis.haemoglobin.green++;
//             } else if (hb >= haemoglobinThreshold.within_deviation_value_min_below && hb < haemoglobinThreshold.standard_value_min) {
//               healthAnalysis.haemoglobin.yellow++;
//             } else {
//               healthAnalysis.haemoglobin.red++;
//             }
//           }
  
//           // Random Blood Sugar Levels
//           if (selected_test?.random_blood_sugar_unit?.value && Array.isArray(selected_test.random_blood_sugar_unit.standard_value)) {
//             const rbs = parseFloat(selected_test.random_blood_sugar_unit.value);
//             const [min, max] = selected_test.random_blood_sugar_unit.standard_value;
          
//             // Ensure the values are valid numbers before comparing
//             if (!isNaN(rbs) && !isNaN(min) && !isNaN(max)) {
//               if (rbs >= min && rbs <= max) {
//                 healthAnalysis.blood_sugar.green++;
//               } else if (rbs < min) {
//                 healthAnalysis.blood_sugar.yellow++;
//               } else {
//                 healthAnalysis.blood_sugar.red++;
//               }
//             }
//           }
          
//           // Blood Pressure (Systolic and Diastolic)
//           if (selected_test.blood_pressure_unit && Array.isArray(selected_test.blood_pressure_unit.systolic_bp_unit.standard_value)&&Array.isArray(selected_test.blood_pressure_unit.diastolic_bp_unit.standard_value)) {
//             const [sys_min,sys_max] = selected_test.blood_pressure_unit.systolic_bp_unit.standard_value;
//             const [dia_min,dia_max] = selected_test.blood_pressure_unit.diastolic_bp_unit.standard_value;

//             const diastolic = parseFloat(selected_test.blood_pressure_unit.diastolic_bp_unit.value); 
//             const systolic = parseFloat(selected_test.blood_pressure_unit.systolic_bp_unit.value);

//             if ((systolic >= sys_min && systolic <= sys_max)&&(diastolic>dia_min && diastolic<=dia_max)) healthAnalysis.blood_pressure.green++;
//             else if ((systolic > sys_max)&&(diastolic>dia_max)) healthAnalysis.blood_pressure.red++;
//             else healthAnalysis.blood_pressure.yellow++;
//           }
  
//           // Pulmonary Function Test
//           if (selected_test.pulmonary_function_test_unit) {
//             const pft = parseFloat(selected_test.pulmonary_function_test_unit.value);
//             const PFT_standard_value = PFTThreshold.standard_value_min;
//             const PTM_standard_value_min = PFTThreshold.within_deviation_value_min_below;
//             if (pft >= PFT_standard_value) healthAnalysis.pulmonary_function.green++;
//             else if (pft >= PTM_standard_value_min ) healthAnalysis.pulmonary_function.yellow++;
//             else healthAnalysis.pulmonary_function.red++;
//           }
  
//           // ECG Test Results
//           if (selected_test.ecg_unit) {
//             const ecgStatus = selected_test.ecg_unit.status;
//             if (ecgStatus === 'success') healthAnalysis.ecg.green++;
//             else healthAnalysis.ecg.red++;
//           }
  
//           // Eye Test Results
//           if (selected_test.eye_unit) {
//             const eyeStatus = selected_test.eye_unit.cylindrical_right_eye_unit.status;
//             if (eyeStatus === 'success') healthAnalysis.eye_test.green++;
//             else healthAnalysis.eye_test.red++;
//           }
  
//           // HIV Test Results
//           if (selected_test.hiv_unit) {
//             const hivStatus = selected_test.hiv_unit.value;
//             if (hivStatus === 'Negative') healthAnalysis.hiv_test.green++;
//             else healthAnalysis.hiv_test.red++;
//           }
//         }
//       });
  
//       // Step 6: Calculate percentages for each health category
//       const totalRecords = records.length;
//       Object.keys(healthAnalysis).forEach(key => {
//         const total = Object.values(healthAnalysis[key]).reduce((acc, val) => acc + val, 0);
//         healthAnalysis[key].green = total === 0 ? "0.00" : ((healthAnalysis[key].green / total) * 100).toFixed(2);
//         healthAnalysis[key].yellow = total === 0 ? "0.00" : ((healthAnalysis[key].yellow / total) * 100).toFixed(2);
//         healthAnalysis[key].red = total === 0 ? "0.00" : ((healthAnalysis[key].red / total) * 100).toFixed(2);
//       });
  
//       // Step 7: Send the final report as a response
//       return res.status(200).json({ status: true, data: healthAnalysis, message: 'Cumulative Health Analysis Report' });
  
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
//   };


exports.cumulativeHealthAnalysis = async (req, res) => {
    let { cet, start_date, end_date } = req.body;
    let whereCondition = {};
  
    // Handle `cet` filter — If no CET is selected or an empty string is passed, analyze data for all CETs
    if (cet && cet !== 'all') {
      whereCondition.transpoter = cet;
    }
  
    // If start_date or end_date is an empty string, set them to undefined to avoid errors in date filtering
    if (!start_date) start_date = undefined;
    if (!end_date) end_date = undefined;
  
    // Handle date filtering
    if (start_date && end_date) {
      const startDateFormatted = moment.tz(`${start_date} 06:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
      const endDateFormatted = moment.tz(`${end_date} 05:59:59`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
  
      whereCondition.date_time = {
        [Op.gte]: startDateFormatted,
        [Op.lte]: endDateFormatted,
      };
    } else if (start_date && !end_date) {
      const startDateFormatted = moment.tz(`${start_date} 00:00:00`, "YYYY-MM-DD HH:mm:ss", 'Asia/Kolkata').utc().format();
      const now = moment().utc().format();
  
      whereCondition.date_time = {
        [Op.gte]: startDateFormatted,
        [Op.lte]: now,
      };
    } else if (!start_date && !end_date) {
      delete whereCondition.date_time; // If no dates are provided, analyze data for all dates
    }
  
    try {
      // Fetch haemoglobin and pulmonary function test threshold values from models
      const haemoglobinThreshold = await Haemoglobin.findOne({ raw: true });
      const PFTThreshold = await Pulmonaryfunctiontest.findOne({ raw: true });
  
      // Fetch the records based on the constructed `whereCondition`
      const records = await driverhealthcheckup.findAll({
        where: whereCondition,
        include: [
          {
            model: CETMANAGEMENT,
            as: 'CETMANAGEMENT',
            attributes: ['name'],
          },
          {
            model: DRIVERMASTER,
            as: 'driver',
            attributes: ['name', 'healthCardNumber'],
          },
        ],
        raw: true,
        nest: true,
      });
  
      // Initialize counters and record holders for each health parameter
      const healthAnalysis = {
        blood_oxygen: { green: 0, yellow: 0, red: 0, redRecords: [] },
        haemoglobin: { green: 0, yellow: 0, red: 0, redRecords: [] },
        blood_sugar: { green: 0, yellow: 0, red: 0, redRecords: [] },
        blood_pressure: { green: 0, yellow: 0, red: 0, redRecords: [] },
        pulmonary_function: { green: 0, yellow: 0, red: 0, redRecords: [] },
        ecg: { green: 0, red: 0, redRecords: [] },
        eye_test: { green: 0, red: 0, redRecords: [] },
        hiv_test: { green: 0, red: 0, redRecords: [] },
      };
  
      // Iterate through each record and categorize based on health parameters
    if(records && Array.isArray(records)){
      records.forEach(record => {
        const { selected_test } = record;
        const patientName = record.driver?.name || 'Unknown';
  
        if (selected_test) {
          // Blood Oxygen Levels
          if (selected_test?.spo2_unit?.remark) {
            if (selected_test.spo2_unit.remark.toLowerCase() === 'pass') {
              healthAnalysis.blood_oxygen.green++;
            } else {
              healthAnalysis.blood_oxygen.red++;
              healthAnalysis.blood_oxygen.redRecords.push({
                name: patientName,
                value: selected_test.spo2_unit.value,
              });
            }
          }
  
          // Haemoglobin Levels
          if (selected_test?.haemoglobin_unit) {
            const hb = parseFloat(selected_test.haemoglobin_unit.value);
            if (hb >= haemoglobinThreshold.standard_value_min) {
              healthAnalysis.haemoglobin.green++;
            } else if (hb >= haemoglobinThreshold.within_deviation_value_min_below && hb < haemoglobinThreshold.standard_value_min) {
              healthAnalysis.haemoglobin.yellow++;
            } else {
              healthAnalysis.haemoglobin.red++;
              healthAnalysis.haemoglobin.redRecords.push({
                name: patientName,
                value: hb,
              });
            }
          }
  
          // Random Blood Sugar Levels
          if (selected_test?.random_blood_sugar_unit?.value && Array.isArray(selected_test.random_blood_sugar_unit.standard_value)) {
            const rbs = parseFloat(selected_test.random_blood_sugar_unit.value);
            const [min, max] = selected_test.random_blood_sugar_unit.standard_value;
  
            if (!isNaN(rbs) && !isNaN(min) && !isNaN(max)) {
              if (rbs >= min && rbs <= max) {
                healthAnalysis.blood_sugar.green++;
              } else if (rbs < min) {
                healthAnalysis.blood_sugar.yellow++;
              } else {
                healthAnalysis.blood_sugar.red++;
                healthAnalysis.blood_sugar.redRecords.push({
                  name: patientName,
                  value: rbs,
                });
              }
            }
          }
  
          // Blood Pressure (Systolic and Diastolic)
          if (selected_test?.blood_pressure_unit?.systolic_bp_unit?.standard_value &&
             Array.isArray(selected_test.blood_pressure_unit.systolic_bp_unit.standard_value)&&
             Array.isArray(selected_test.blood_pressure_unit.diastolic_bp_unit.standard_value)) {

            const [sys_min, sys_max] = selected_test.blood_pressure_unit.systolic_bp_unit.standard_value;
            const [dia_min, dia_max] = selected_test.blood_pressure_unit.diastolic_bp_unit.standard_value;
  
            const diastolic = parseFloat(selected_test.blood_pressure_unit.diastolic_bp_unit.value);
            const systolic = parseFloat(selected_test.blood_pressure_unit.systolic_bp_unit.value);
  
            if (systolic >= sys_min && systolic <= sys_max && diastolic > dia_min && diastolic <= dia_max) {
              healthAnalysis.blood_pressure.green++;
            } else if (systolic > sys_max && diastolic > dia_max) {
              healthAnalysis.blood_pressure.red++;
              healthAnalysis.blood_pressure.redRecords.push({
                name: patientName,
                value: `${systolic}/${diastolic}`,
              });
            } else {
              healthAnalysis.blood_pressure.yellow++;
            }
          }
  
          // Pulmonary Function Test
          if (selected_test?.pulmonary_function_test_unit) {
            const pft = parseFloat(selected_test.pulmonary_function_test_unit.value);
            if (pft >= PFTThreshold.standard_value_min) {
              healthAnalysis.pulmonary_function.green++;
            } else if (pft >= PFTThreshold.within_deviation_value_min_below) {
              healthAnalysis.pulmonary_function.yellow++;
            } else {
              healthAnalysis.pulmonary_function.red++;
              healthAnalysis.pulmonary_function.redRecords.push({
                name: patientName,
                value: pft,
              });
            }
          }
  
          // ECG Test Results
          if (selected_test?.ecg_unit?.status) {
            if (selected_test.ecg_unit.status === 'success') {
              healthAnalysis.ecg.green++;
            } else {
              healthAnalysis.ecg.red++;
              healthAnalysis.ecg.redRecords.push({
                name: patientName,
                value: selected_test.ecg_unit.status,
              });
            }
          }
  
          // Eye Test Results
          if (selected_test?.eye_unit) {
            const {
              spherical_right_eye_unit,
              cylindrical_right_eye_unit,
              spherical_left_eye_unit,
              cylindrical_left_eye_unit
            } = selected_test.eye_unit;
  
            const allStatusesSuccess = [
              spherical_right_eye_unit?.status,
              cylindrical_right_eye_unit?.status,
              spherical_left_eye_unit?.status,
              cylindrical_left_eye_unit?.status
            ].every(status => status === "success");
  
            if (allStatusesSuccess) {
              healthAnalysis.eye_test.green++;
            } else {
              healthAnalysis.eye_test.red++;
              healthAnalysis.eye_test.redRecords.push({
                name: patientName,
                issue: "One or more fields have non-success status",
              });
            }
          }
  
          // HIV Test Results
          if (selected_test?.hiv_unit?.value) {
            const hivStatus = selected_test.hiv_unit.value;
            if (hivStatus === 'Negative') {
              healthAnalysis.hiv_test.green++;
            } else {
              healthAnalysis.hiv_test.red++;
              healthAnalysis.hiv_test.redRecords.push({
                name: patientName,
                value: hivStatus,
              });
            }
          }
        }
      })};
  
      // Calculate percentages for each health category
      Object.keys(healthAnalysis).forEach(key => {
        const total = Object.values(healthAnalysis[key]).reduce((acc, val) => typeof val === 'number' ? acc + val : acc, 0);
        healthAnalysis[key].green = total === 0 ? "0.00" : ((healthAnalysis[key].green / total) * 100).toFixed(2);
        healthAnalysis[key].yellow = total === 0 ? "0.00" : ((healthAnalysis[key].yellow / total) * 100).toFixed(2);
        healthAnalysis[key].red = total === 0 ? "0.00" : ((healthAnalysis[key].red / total) * 100).toFixed(2);
      });
  
      // Send the final report
      return res.status(200).json({ status: true, data: healthAnalysis, message: 'Cumulative Health Analysis Report' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
  };  
  
  
  
  
  exports.getCETTestCounts = async (req, res) => {
    try {
      // Extract startDate and endDate from request body
      const { startDate, endDate } = req.body;
  
      // Validate inputs
      if (!startDate || !endDate) {
        return sendError(res, 400, 'startDate and endDate are required', 'Input Required');
      }
  
      // Format the dates to UTC strings
      const startUtc = new Date(startDate).toISOString();
      const endUtc = new Date(endDate).toISOString();
  
      // Fetch total test count grouped by CET
      const cetTestCounts = await driverhealthcheckup.findAll({
        attributes: [
          [sequelize.col('CETMANAGEMENT.name'), 'CETName'], // Select CET Name
          [sequelize.fn('COUNT', sequelize.col('driverhealthcheckup.id')), 'total_test_count'], // Total count of tests
        ],
        include: [
          {
            model: CETMANAGEMENT,
            as: 'CETMANAGEMENT',
            attributes: [], // No need to fetch other attributes from CETMANAGEMENT
          },
        ],
        where: {
          createdAt: {
            [Op.between]: [startUtc, endUtc], // Filter records by date range
          },
        },
        group: ['CETMANAGEMENT.name'], // Group results by CET name
        order: [[sequelize.col('total_test_count'), 'DESC']], // Order by total test count in descending order
        raw: true, // Get raw results
      });
  
      // Check if results are empty
      if (cetTestCounts.length === 0) {
        return sendSuccess(res, 200, [], 'No CET test records found for the given date range');
      }
  
      // Send the response
      sendSuccess(res, 200, cetTestCounts, 'CET test counts fetched successfully');
    } catch (error) {
      console.error('Error fetching CET test counts:', error);
      sendError(res, 500, error.message, 'Internal Server Error');
    }
  };

  exports.getCETDriverCounts = async (req, res) => {
    try {
      // Extract startDate and endDate from request body
      const { startDate, endDate } = req.body;
  
      // Validate inputs
      if (!startDate || !endDate) {
        return sendError(res, 400, 'startDate and endDate are required', 'Input Required');
      }
  
      // Format the dates to UTC strings
      const startUtc = new Date(startDate).toISOString();
      const endUtc = new Date(endDate).toISOString();
  
      // Fetch unique driver count grouped by CET
      const cetDriverCounts = await driverhealthcheckup.findAll({
        attributes: [
          [sequelize.col('CETMANAGEMENT.name'), 'CETName'], // Select CET Name
          [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('driver_id'))), 'driver_count'], // Count of unique drivers
        ],
        include: [
          {
            model: CETMANAGEMENT,
            as: 'CETMANAGEMENT',
            attributes: [], // No need to fetch other attributes from CETMANAGEMENT
          },
        ],
        where: {
          createdAt: {
            [Op.between]: [startUtc, endUtc], // Filter records by date range
          },
        },
        group: ['CETMANAGEMENT.name'], // Group results by CET name
        order: [[sequelize.col('driver_count'), 'DESC']], // Order by driver count in descending order
        raw: true, // Get raw results
      });
  
      // Check if results are empty
      if (cetDriverCounts.length === 0) {
        return sendSuccess(res, 200, [], 'No CET driver records found for the given date range');
      }
  
      // Send the response
      sendSuccess(res, 200, cetDriverCounts, 'CET driver counts fetched successfully');
    } catch (error) {
      console.error('Error fetching CET driver counts:', error);
      sendError(res, 500, error.message, 'Internal Server Error');
    }
  };