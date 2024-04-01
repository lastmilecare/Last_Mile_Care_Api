const {
    sequelize,
    User,
    DRIVERMASTER,
    DRIVERMASTERPERSONAL,
    DRIVERFAMILYHISTORY
} = require("../../../db/models");
const { sendSuccess, sendError } = require('../../util/responseHandler');

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