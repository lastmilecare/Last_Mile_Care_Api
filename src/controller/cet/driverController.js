const {
    sequelize,
    User,
    DRIVERMASTER,
    DRIVERMASTERPERSONAL,
    DRIVERFAMILYHISTORY,
    otp,
    Packagemanagment
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');
const { Op } = require('sequelize');
const { sendOTP } = require('../../helper/sendOtp');

exports.createDriver = async (req, res) => {

    const {
        name,
        healthCardNumber,
        driverId,
        abhaNumber,
        dateOfBirthOrAge,
        gender,
        photographOfDriver,
        localAddress,
        localAddressDistrict,
        localAddressState,
        contactNumber,
        emergencyContactName,
        emergencyContactNumber,
        idProof,
        idProof_number,
        idProof_doc,
    } = req.body;

    const {
        doc1,
        doc2,

    } = req.files || {};
    const requiredFields = [
        'name',
        'healthCardNumber',
        'driverId',
        'abhaNumber',
        'dateOfBirthOrAge',
        'gender',

        'localAddress',
        'localAddressDistrict',
        'localAddressState',
        'contactNumber',
        'emergencyContactName',
        'emergencyContactNumber',
        'idProof',
        'idProof_number',

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
            healthCardNumber,
            driverId,
            abhaNumber,
            dateOfBirthOrAge,
            gender,
            photographOfDriver: doc1[0].path,
            localAddress,
            localAddressDistrict,
            localAddressState,
            contactNumber,
            emergencyContactName,
            emergencyContactNumber,
            idProof,
            idProof_number,
            idProof_doc: doc2[0].path,
        };

        const insert = await DRIVERMASTER.create(data);
        sendSuccess(res, 201, insert, 'DRIVER  Center successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Invalid input');
    }
}
exports.getDriverList = async (req, res) => {
    try {
        const drivers = await DRIVERMASTER.findAll({ order: [['id', 'DESC']] });
        sendSuccess(res, 200, drivers, 'List of drivers');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

// Details API
exports.getDriverDetails = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }
    const { id } = req.body;
    console.log(id)
    try {
        const driver = await DRIVERMASTER.findOne({ where: { id: id } });

        sendSuccess(res, 200, driver, 'Driver details');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

// Update API
exports.updateDriver = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }

    try {
        const [updatedRowCount] = await DRIVERMASTER.update(req.body, {
            where: { id: req.body.id },
        });

        if (updatedRowCount === 0) {
            sendError(res, 404, "Driver not found or not updated", 'Driver not found or not updated');
            return;
        }

        const updatedDriver = await DRIVERMASTER.findByPk(req.body.id);
        sendSuccess(res, 200, updatedDriver, 'Driver updated successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}


////////////// Personal data

exports.createDriverPersonalData = async (req, res) => {
    const {
        driver_phone,
        driver_id,
        blood_group,
        diabetes,
        hypertension,
        hypotension,
        epilepsy,
        physical_disability,
        physical_disability_details,
        mental_disability,
        mental_disability_details,
        vision_issues,
        vision_issues_details,
        hearing_issues,
        hearing_issues_details,
        major_accident,
        allergies,
        other_medical_info,
        alcohol_consumption,
        smoking,
        tobacco_consumption,
        birthmark_identification,
    } = req.body;


    const requiredFields = [
        'driver_phone',
        'driver_id',
        'blood_group',
        'diabetes',
        'hypertension',
        'hypotension',
        'epilepsy',
        'physical_disability',
        'physical_disability_details',
        'mental_disability',
        'mental_disability_details',
        'vision_issues',
        'vision_issues_details',
        'hearing_issues',
        'hearing_issues_details',
        'major_accident',
        'allergies',
        'other_medical_info',
        'alcohol_consumption',
        'smoking',
        'tobacco_consumption',
        'birthmark_identification',

    ];


    const missingFields = requiredFields.filter(field => {
        return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
    });

    console.log("Missing Fields:", missingFields); // Log missing fields

    if (missingFields.length > 0) {
        const msg = missingFields.join(', ');
        return res.status(400).json({ error: msg + " is required" });
    }

    const data = {
        driver_phone,
        driver_id: parseInt(driver_id), // Convert to integer if needed
        blood_group,
        diabetes: diabetes === 'true', // Convert string to boolean
        hypertension: hypertension === 'true',
        hypotension: hypotension === 'true',
        epilepsy: epilepsy === 'true',
        physical_disability: physical_disability === 'true',
        physical_disability_details,
        mental_disability: mental_disability === 'true',
        mental_disability_details,
        vision_issues: vision_issues === 'true',
        vision_issues_details,
        hearing_issues: hearing_issues === 'true',
        hearing_issues_details: hearing_issues_details === 'null' ? null : hearing_issues_details, // Set null if 'null' string
        major_accident,
        allergies,
        other_medical_info,
        alcohol_consumption: alcohol_consumption === 'true',
        smoking: smoking === 'true',
        tobacco_consumption: tobacco_consumption === 'true',
        birthmark_identification,
    };

    try {
        console.log(data);

        const insert = await DRIVERMASTERPERSONAL.create(data);
        sendSuccess(res, 201, insert, 'DRIVERMASTERPERSONAL  Center successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}


exports.driverPersonalDataVIew = async (req, res) => {
    try {
        const drivers = await DRIVERMASTERPERSONAL.findAll({ order: [['id', 'DESC']] });
        sendSuccess(res, 200, drivers, 'List of drivers');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.driverPersonalDetails = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }
    try {
        const drivers = await DRIVERMASTERPERSONAL.findOne({ where: { id: req.body.id } });
        sendSuccess(res, 200, drivers, 'Driver Data');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.driverPersonalUpdate = async (req, res) => {
    const {
        driver_phone,
        driver_id,
        blood_group,
        diabetes,
        hypertension,
        hypotension,
        epilepsy,
        physical_disability,
        physical_disability_details,
        mental_disability,
        mental_disability_details,
        vision_issues,
        vision_issues_details,
        hearing_issues,
        hearing_issues_details,
        major_accident,
        allergies,
        other_medical_info,
        alcohol_consumption,
        smoking,
        tobacco_consumption,
        birthmark_identification,

    } = req.body;

    const id = req.body.id;
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }




    const data = {
        driver_phone,
        driver_id: parseInt(driver_id), // Convert to integer if needed
        blood_group,
        diabetes: diabetes === 'true', // Convert string to boolean
        hypertension: hypertension === 'true',
        hypotension: hypotension === 'true',
        epilepsy: epilepsy === 'true',
        physical_disability: physical_disability === 'true',
        physical_disability_details,
        mental_disability: mental_disability === 'true',
        mental_disability_details,
        vision_issues: vision_issues === 'true',
        vision_issues_details,
        hearing_issues: hearing_issues === 'true',
        hearing_issues_details: hearing_issues_details === 'null' ? null : hearing_issues_details, // Set null if 'null' string
        major_accident,
        allergies,
        other_medical_info,
        alcohol_consumption: alcohol_consumption === 'true',
        smoking: smoking === 'true',
        tobacco_consumption: tobacco_consumption === 'true',
        birthmark_identification,
    };

    try {
        console.log(data);

        const updatedRecord = await DRIVERMASTERPERSONAL.update(data, { where: { id: id } });
        if (updatedRecord[0] === 0) {
            sendError(res, 404, 'Driver not found or not updated', 'Driver personal data updated successfully');
            return
        }

        const updatedDriver = await DRIVERMASTERPERSONAL.findByPk(id);
        sendSuccess(res, 200, updatedDriver, 'Driver personal data updated successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}



////Family datta

exports.createDriverFamilyData = async (req, res) => {
    const {
        driver_phone,
        driver_id,
        family_member_1,
        family_member_2,
        parent_diabetic,
        parent_hypertension,
        parent_hypotension,
        other_genetic_disease,
    } = req.body;

    // Ensure required fields are present and of correct type
    const requiredFields = [
        'driver_phone',
        'driver_id',
        'family_member_1',
        'family_member_2',
        'parent_diabetic',
        'parent_hypertension',
        'parent_hypotension',
        'other_genetic_disease',
    ];

    const missingFields = requiredFields.filter(field => {
        return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
    });

    console.log("Missing Fields:", missingFields); // Log missing fields

    if (missingFields.length > 0) {
        const msg = missingFields.join(', ');
        return res.status(400).json({ error: msg + " is required" });
    }

    try {
        console.log(req.body);

        const insert = await DRIVERFAMILYHISTORY.create({
            driver_phone,
            driver_id,
            family_member_1,
            family_member_2,
            parent_diabetic,
            parent_hypertension,
            parent_hypotension,
            other_genetic_disease,
        });
        sendSuccess(res, 201, insert, 'DRIVERFAMILYHISTORY Center successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.driverFamilyList = async (req, res) => {

    try {
        const insert = await DRIVERFAMILYHISTORY.findAll({ order: [['id', 'DESC']] });
        sendSuccess(res, 200, insert, 'DRIVERFAMILYHISTORY Fetch successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.driverFamilyDetails = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }
    try {
        const insert = await DRIVERFAMILYHISTORY.findOne({ where: { id: req.body.id } });
        sendSuccess(res, 200, insert, 'DRIVERFAMILYHISTORY Fetch successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}
exports.driverFamilyUpdate = async (req, res) => {
    if (!req.body.id) {
        sendError(res, 400, "ID Required", 'ID Required');
        return;
    }
    try {
        const {
            id,
            driver_phone,
            driver_id,
            family_member_1,
            family_member_2,
            parent_diabetic,
            parent_hypertension,
            parent_hypotension,
            other_genetic_disease,
        } = req.body;

        // Ensure required fields are present and of correct type
        const requiredFields = [
            'driver_phone',
            'driver_id',
            'family_member_1',
            'family_member_2',
            'parent_diabetic',
            'parent_hypertension',
            'parent_hypotension',
            'other_genetic_disease',
        ];

        const missingFields = requiredFields.filter(field => {
            return !req.body[field] || (typeof req.body[field] !== 'string') || req.body[field].trim() === '';
        });

        console.log("Missing Fields:", missingFields); // Log missing fields

        if (missingFields.length > 0) {
            const msg = missingFields.join(', ');
            return res.status(400).json({ error: msg + " is required" });
        }

        // Check if the family member record exists
        const existingRecord = await DRIVERFAMILYHISTORY.findByPk(id);
        if (!existingRecord) {
            sendError(res, 404, 'Family member record not found', 'Family member record not found');
            return
        }

        // Update the family member record
        await DRIVERFAMILYHISTORY.update({
            driver_phone,
            driver_id,
            family_member_1,
            family_member_2,
            parent_diabetic,
            parent_hypertension,
            parent_hypotension,
            other_genetic_disease,
        }, {
            where: { id: id }
        });

        // Fetch and return the updated family member record
        const updatedRecord = await DRIVERFAMILYHISTORY.findByPk(id);
        sendSuccess(res, 200, updatedRecord, 'DRIVERFAMILYHISTORY updated successfully');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

//driver helth
exports.searchDriverByNumber = async (req, res) => {
    const searchData = req.body.searchData;
    console.log(searchData);
    try {
        //driverId
        const searchQuery = await DRIVERMASTER.findOne({
            where: {
                [Op.or]: [
                    { contactNumber: searchData },
                    { driverId: searchData }
                ]
            }
        });

        if (searchQuery) {
            sendSuccess(res, 200, searchQuery, 'Success');

        } else {
            sendError(res, 404, 'Driver not found', 'Driver not found');
            return
        }
    } catch (error) {
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.sendOtp = async (req, res) => {
    if (!req.body.phoneNumber) {
        sendError(res, 400, "Phone Number is required!", 'Phone Number is required!');
        return;
    }
    const phoneNumber = req.body.phoneNumber;

    try {
        const checkNumber = await DRIVERMASTER.findOne({ where: { contactNumber: req.body.phoneNumber }, raw: true, nest: true });

        if (checkNumber) {
            const getOtp = await sendOTP(phoneNumber);
            await otp.create({
                user_id: checkNumber.id,
                phone: phoneNumber,
                otp: getOtp
            })
            sendSuccess(res, 200, "Your OTP Is : " + getOtp, 'OTP Send Successfully');

        } else {
            sendError(res, 400, 'Wrong Phone Number', 'Wrong Phone Number');
            return
        }


    } catch (error) {
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.verifyOtp = async (req, res) => {
    if (!req.body.phoneNumber) {
        sendError(res, 400, "Phone Number is required!", 'Phone Number is required!');
        return;
    }
    if (!req.body.otp) {
        sendError(res, 400, "Otp is required!", 'Otp is required!');
        return;
    }
    try {
        const checkNumber = await otp.findOne({ where: { phone: req.body.phoneNumber, otp: req.body.otp } });

        if (checkNumber) {
            await checkNumber.destroy();
            sendSuccess(res, 200, "the OTP verification was successful", 'the OTP verification was successful');

        } else {
            sendError(res, 400, 'Wrong Otp', 'Wrong Otp');
            return
        }


    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}
exports.packageList = async (req, res) => {

    try {
        const reqData = await Packagemanagment.findAll({ where: { status: true }, raw: true, nest: true, order: [['id', 'DESC']] });
        sendSuccess(res, 200, reqData, 'Success');


    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}
