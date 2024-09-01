const {
    sequelize,
    User,
    DRIVERMASTER,
    otp,
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
    Alcholtest,
    Centeruser,
    Romberg,
    Center,
    DRIVERFAMILYHISTORY,
    DRIVERMASTERPERSONAL,
    Vision
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');
const { Op, where } = require('sequelize');
const { sendOTP } = require('../../helper/sendOtp');
const { sendWhatsAppMessage, sendWhatsAppTemplateMessage } = require('../../helper/whatsApp');
const { getCenterId } = require('../../helper/globalHelper')
const {getCetId} = require('../../helper/globalHelper')

exports.createDriver = async (req, res) => {

    const {
        driver_cetid,
        driver_cetname,
        name,
        healthCardNumber,
        driverId,
        abhaNumber,
        dateOfBirthOrAge,
        gender,
        localAddress,
        localAddressDistrict,
        localAddressState,
        contactNumber,
        emergencyContactName,
        emergencyContactNumber,
        idProof,
        idProof_number, photographOfDriver,
        idProof_doc,
        idProof_name,
        blood_group

    } = req.body;


    const checkNumber = await DRIVERMASTER.findOne({
        where: { contactNumber: contactNumber },
        attributes: ['contactNumber', 'id'],
        raw: true,
        nest: true

    });
    if (checkNumber) {
        sendError(res, 400, "Phone number already exists", 'Phone number already exists');
        return
    }
    if (!name) {
        sendError(res, 400, "name Required", 'name Required');
        return
    }
    // if (!driverId) {
    //     sendError(res, 400, "driverId Required", 'driverId Required');
    //     return
    // }
    const getLastCenterId = await DRIVERMASTER.findOne({
        order: [['id', 'DESC']], // Correctly specify the order by clause
    });

    // Extract the numeric part and increment it
    const nextId = getLastCenterId ? parseInt(getLastCenterId.id) + 1 : 1;
    const external_id = `LMC0000${nextId}`;
    const cId = await getCenterId(req.userId);
    
    try {

        const data = {
            driver_cetid,
            driver_cetname,
            createdBy: cId.center_id,
            external_id: external_id,
            name,
            healthCardNumber,
            driverId: driverId || null,
            abhaNumber,
            dateOfBirthOrAge,
            gender,
            photographOfDriver: photographOfDriver ? photographOfDriver : null,
            localAddress,
            localAddressDistrict,
            localAddressState,
            contactNumber,
            emergencyContactName,
            emergencyContactNumber,
            idProof,
            idProof_number,
            blood_group,
            idProof_name: idProof_name ? idProof_name : null,
            idProof_doc: idProof_doc ? idProof_doc : null,
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
        const cId = await getCenterId(req.userId);

        // const drivers = await DRIVERMASTER.findAll({ where: { createdBy: cId.center_id }, order: [['id', 'DESC']] });
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
    const { id } = req.body;
    if (!id) {
        return sendError(res, 400, "ID Required", 'ID Required');
    }

    try {
        // Merge cet info into req.body if needed
        const updatedData = {
            ...req.body, 
        };

        const [updatedRowCount] = await DRIVERMASTER.update(updatedData, {
            where: { id }
        });

        if (updatedRowCount === 0) {
            return sendError(res, 404, "Driver not found or not updated", 'Driver not found or not updated');
        }

        const updatedDriver = await DRIVERMASTER.findByPk(id);
        sendSuccess(res, 200, updatedDriver, 'Driver updated successfully with CET details');
    } catch (error) {
        console.error('Error updating driver:', error);
        sendError(res, 500, error, 'Internal server error');
    }
};
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







    const data = {
        driver_phone,
        driver_id: parseInt(driver_id), // Convert to integer if needed
        blood_group,
        diabetes: diabetes, // Convert string to boolean
        hypertension: hypertension,
        hypotension: hypotension,
        epilepsy: epilepsy,
        physical_disability: physical_disability,
        physical_disability_details,
        mental_disability: mental_disability,
        mental_disability_details,
        vision_issues: vision_issues,
        vision_issues_details,
        hearing_issues: hearing_issues,
        hearing_issues_details: hearing_issues_details === 'null' ? null : hearing_issues_details, // Set null if 'null' string
        major_accident,
        allergies,
        other_medical_info,
        alcohol_consumption: alcohol_consumption,
        smoking: smoking,
        tobacco_consumption: tobacco_consumption,
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
        const driver = await DRIVERMASTER.findOne({ where: { id: req.body.id } });

        const driverPersonalData = await DRIVERMASTERPERSONAL.findOne({ where: { driver_id: req.body.id } });
        const resData = {
            driver,
            driverPersonalData
        }
        sendSuccess(res, 200, resData, 'Driver Data');
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.driverPersonalUpdate = async (req, res) => {
    const {
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
    const driver = await DRIVERMASTER.findOne({ where: { id: driver_id } });

    const data = {
        driver_id: parseInt(driver_id), // Convert to integer if needed
        blood_group,
        diabetes: diabetes, // Convert string to boolean
        hypertension: hypertension,
        hypotension: hypotension,
        epilepsy: epilepsy,
        physical_disability: physical_disability,
        physical_disability_details,
        mental_disability: mental_disability,
        mental_disability_details,
        vision_issues: vision_issues,
        vision_issues_details,
        hearing_issues: hearing_issues,
        hearing_issues_details: hearing_issues_details === 'null' ? null : hearing_issues_details, // Set null if 'null' string
        major_accident,
        allergies,
        other_medical_info,
        alcohol_consumption: alcohol_consumption,
        smoking: smoking,
        tobacco_consumption: tobacco_consumption,
        birthmark_identification,
        driver_phone: driver.contactNumber
    };

    try {

        const existingRecord = await DRIVERMASTERPERSONAL.findOne({ where: { driver_id: driver_id }, raw: true, nest: true });
        if (existingRecord) {
            await DRIVERMASTERPERSONAL.update(data, { where: { driver_id } });
            sendSuccess(res, 200, data, 'Driver personal data updated successfully');
        } else {
            // Create a new record
            await DRIVERMASTERPERSONAL.create(data);
            sendSuccess(res, 200, data, 'Driver personal data created successfully');
        }

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
        family_member_1_relation,
        family_member_2_relation
    } = req.body;

    // Ensure required fields are present and of correct type


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
            family_member_1_relation,
            family_member_2_relation
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
        const driver = await DRIVERMASTER.findOne({ where: { id: req.body.id } });

        const familyData = await DRIVERFAMILYHISTORY.findOne({ where: { driver_id: req.body.id } });
        const resData = {
            driver,
            familyData
        }
        sendSuccess(res, 200, resData, 'DRIVERFAMILYHISTORY Fetch successfully');
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
            family_member_1,
            family_member_2,
            parent_diabetic,
            parent_hypertension,
            parent_hypotension,
            other_genetic_disease,
            driver_id,
            family_member_1_relation,
            family_member_2_relation

        } = req.body;


        const existingRecord = await DRIVERFAMILYHISTORY.findOne({ where: { driver_id: driver_id }, raw: true, nest: true });

        if (existingRecord) {
            // Update the existing family member record
            await DRIVERFAMILYHISTORY.update({
                driver_phone,
                family_member_1,
                family_member_2,
                parent_diabetic,
                parent_hypertension,
                parent_hypotension,
                other_genetic_disease,
                family_member_1_relation,
                family_member_2_relation

            }, {
                where: { id: id }
            });
            sendSuccess(res, 201, existingRecord, 'Family member record updated successfully');
            return
        } else {
            // Create a new family member record
            await DRIVERFAMILYHISTORY.create({
                driver_id,
                driver_phone,
                family_member_1,
                family_member_2,
                parent_diabetic,
                parent_hypertension,
                parent_hypotension,
                other_genetic_disease,
                family_member_1_relation,
                family_member_2_relation
            });
            sendSuccess(res, 201, existingRecord, 'Family member record updated successfully');
            return
        }
    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}

//driver helth
exports.searchDriverByNumber = async (req, res) => {
    const searchData = req.body.searchData;
    const cId = await getCenterId(req.userId);

    try {
        //driverId
        const searchQuery = await DRIVERMASTER.findOne({
            where: {
               // createdBy: cId.center_id,

                [Op.or]: [
                    { contactNumber: searchData },
                    { driverId: searchData }
                ]
            },
            // include: [
            //     {
            //         model: DRIVERFAMILYHISTORY,
            //         required: false  // Optional: set to true if the association must exist
            //     },
            //     {
            //         model: DRIVERMASTERPERSONAL,
            //         required: false  // Optional: set to true if the association must exist
            //     }
            // ]
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
    const phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
        sendError(res, 400, "Phone Number is required!", 'Phone Number is required!');
        return;
    }

    try {
        const checkNumber = await DRIVERMASTER.findOne({ where: { contactNumber: phoneNumber }, raw: true, nest: true });

        if (checkNumber) {
            const getOtp = await sendOTP(phoneNumber);
            console.log("getOtp", getOtp);
            await otp.create({
                user_id: checkNumber.id,
                phone: phoneNumber,
                otp: getOtp.otp
            })
            sendSuccess(res, 200, "OTP Send Successfully", 'OTP Send Successfully');
            return
        } else {
            sendError(res, 400, 'Wrong Phone Number', 'Wrong Phone Number');
            return
        }


    } catch (error) {
        sendError(res, 500, error, 'Internal server error');
    }
}

exports.whatsappOtp = async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const name = req.body.name;
    const url = req.body.url
    if (!phoneNumber) {
        sendError(res, 400, "Phone Number is required!", 'Phone Number is required!');
        return;
    }
    try {

        const result = await sendWhatsAppTemplateMessage(name, url, phoneNumber);
        return res.status(200).json({ success: true, code: 200, result, result });
    } catch (error) {
        console.log(error);
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
        console.log(checkNumber);
        if (checkNumber) {
            await checkNumber.destroy();
            sendSuccess(res, 200, "the OTP verification is successful", 'the OTP verification is successful');

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
    const cId = req.userId;

    try {
        const centerData = await Centeruser.findOne({ where: { user_id: cId }, raw: true, nest: true });
        const reqData = await Centerpackage.findAll({
            where: { center_id: centerData.center_id, status: true },
            include: [{ model: Packagemanagment, as: 'package' }],
            raw: true,
            nest: true,
            order: [['id', 'DESC']]
        });
        console.log(reqData, cId);

        const formattedData = reqData.map(data => {
            return {

                package: {
                    id: data.package.id,
                    package_name: data.package.package_name,
                    package_id: data.package.package_id,
                    package_list: data.package.package_list,
                    status: data.package.status,
                    createdAt: data.package.createdAt,
                    updatedAt: data.package.updatedAt
                }
            };
        });

        sendSuccess(res, 200, formattedData, 'Success');


    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}


exports.packageListUnit = async (req, res) => {
    const package_list = req.body.package_list;
    const data = {};
    try {
        const modelMapping = {
            temperature: Temperature,
            spo2: SPO2,
            pulse: Pulse,
            pft: Pulmonaryfunctiontest,
            haemoglobin: Haemoglobin,
            cretenine: Cretenine,
            alchol: Alcholtest,
            hiv: Hiv,
            ecg: ECG,
            bmi: BMI,
            cholesterol: CHOLESTEROL,
            eye: Eyetest,
            hearing: Hearingtest,
            'blood-pressure': Bloodpressure,
            'blood-group': Bloodgroup,
            'random-blood-sugar': random_blood_sugar,
            romberg: Romberg,
            vision: Vision
        };

        // Loop through each item in package_list and query the corresponding model
        for (const unit of package_list) {
            // Check if the model exists in the mapping
            if (unit in modelMapping) {
                // Query the model and store the result in data
                data[unit] = await modelMapping[unit].findOne();
            } else {
                console.warn(`Model '${unit}' not found for package unit.`);
            }
        }
        sendSuccess(res, 200, data, 'Success');



    } catch (error) {
        console.log(error);
        sendError(res, 500, error, 'Internal server error');
    }
}
exports.uploadSignature = (req, res) => {
    try {
        // Handle the uploaded file data, which is now available in req.fileData
        const fileData = req.fileData;
        sendSuccess(res, 200, fileData, 'Success');
    } catch (error) {
        sendError(res, 500, error, 'Internal server error');
    }
};

