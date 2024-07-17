const { sendSuccess, sendError } = require('../../util/responseHandler');
const {
    sequelize,
    Bloodgroup,
    Hearingtest,
    ECG,
    Bloodpressure,
    BMI,
    CHOLESTEROL,
    Eyetest,
    Vision
} = require("../../../db/models");
// 
exports.hearingTest = async (req, res) => {
    const {
        option_1,
        option_2,
        option_3
    } = req.body;



    const data = {
        option_1,
        option_2,
        option_3
    };


    // Retrieve uploaded files from req.files
    let insert;

    try {
        const count = await Hearingtest.count();
        if (count > 0) {
            const existinHearingtest = await Hearingtest.findOne();
            if (existinHearingtest) {
                insert = await existinHearingtest.update(data);
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            insert = await Hearingtest.create(data);
        }

        sendSuccess(res, 201, insert, 'Hearingtest update successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};
exports.bloodGroup = async (req, res) => {
    let insert;
    const {
        option_1,
        option_2,
        option_3,
        option_4,
        option_5,
        option_6,
        option_7,
        option_8,
    } = req.body;


    const data = {
        option_1,
        option_2,
        option_3,
        option_4,
        option_5,
        option_6,
        option_7,
        option_8,
    };

    try {
        const count = await Bloodgroup.count();
        if (count > 0) {
            const existinBloodgroup = await Bloodgroup.findOne();
            if (existinBloodgroup) {
                insert = await existinBloodgroup.update(data);
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            insert = await Bloodgroup.create(data);
        }

        sendSuccess(res, 201, insert, 'Bloodgroup update successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};

exports.ecgUpdate = async (req, res) => {
    let insert;
    const { option_1, option_2, option_3, document } = req.body
    const data = {
        option_1,
        option_2,
        option_3,
        doc: document ? document : null,
    }

    try {
        const count = await ECG.count();
        if (count > 0) {
            const existinECG = await ECG.findOne();
            if (existinECG) {
                insert = await existinECG.update(data);
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            insert = await ECG.create(data);
        }

        sendSuccess(res, 201, insert, 'ECG update successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};
exports.bloodPressure = async (req, res) => {
    let insert;
    const { systolic_standard_value_min,
        systolic_standard_value_max,
        systolic_within_deviation_value_min,
        systolic_within_deviation_value_max,
        systolic_units,
        systolic_out_of_range,

        diastolic_standard_value_min,
        diastolic_standard_value_max,
        diastolic_within_deviation_value_min,
        diastolic_within_deviation_value_max,
        diastolic_units,
        diastolic_out_of_range,
        systolic_within_deviation_value_min_below,
        systolic_within_deviation_value_max_below,
        diastolic_within_deviation_value_min_below,
        diastolic_within_deviation_value_max_below,
        diastolic_out_of_range_below,
        systolic_out_of_range_below
    } = req.body
    const data = {
        systolic_standard_value_min,
        systolic_standard_value_max,
        systolic_within_deviation_value_min,
        systolic_within_deviation_value_max,
        systolic_units,
        systolic_out_of_range,

        diastolic_standard_value_min,
        diastolic_standard_value_max,
        diastolic_within_deviation_value_min,
        diastolic_within_deviation_value_max,
        diastolic_units,
        diastolic_out_of_range,
        systolic_within_deviation_value_min_below: systolic_within_deviation_value_min_below,
        systolic_within_deviation_value_max_below: systolic_within_deviation_value_max_below,
        diastolic_within_deviation_value_min_below: diastolic_within_deviation_value_min_below,
        diastolic_within_deviation_value_max_below: diastolic_within_deviation_value_max_below,
        diastolic_out_of_range_below: diastolic_out_of_range_below,
        systolic_out_of_range_below: systolic_out_of_range_below
    }

    try {
        const count = await Bloodpressure.count();
        if (count > 0) {
            const existinBloodpressure = await Bloodpressure.findOne();
            if (existinBloodpressure) {
                insert = await existinBloodpressure.update(data);
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            insert = await Bloodpressure.create(data);
        }

        sendSuccess(res, 201, insert, 'Bloodpressure update successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};
exports.bmiCheck = async (req, res) => {
    let insert;
    const {
        bmi_standard_value_min,
        bmi_standard_value_max,
        bmi_within_deviation_value_min,
        bmi_within_deviation_value_max,
        bmi_out_of_range,
        bmi_units,
        weight_standard_value_min,
        weight_standard_value_max,
        weight_within_deviation_value_min,
        weight_within_deviation_value_max,
        weight_out_of_range,
        weight_units,
        height_standard_value_min,
        height_standard_value_max,
        height_within_deviation_value_min,
        height_within_deviation_value_max,
        height_out_of_range,
        height_units,
    } = req.body
    const data = {
        bmi_standard_value_min,
        bmi_standard_value_max,
        bmi_within_deviation_value_min,
        bmi_within_deviation_value_max,
        bmi_out_of_range,
        bmi_units,
        weight_standard_value_min: weight_standard_value_min,
        weight_standard_value_max,
        weight_within_deviation_value_min,
        weight_within_deviation_value_max,
        weight_out_of_range,
        weight_units,
        height_standard_value_min,
        height_standard_value_max,
        height_within_deviation_value_min,
        height_within_deviation_value_max,
        height_out_of_range,
        height_units,
        bmi_within_deviation_value_min_below: req.body.bmi_within_deviation_value_min_below,
        bmi_within_deviation_value_max_below: req.body.bmi_within_deviation_value_max_below,
        bmi_out_of_range_below: req.body.bmi_out_of_range_below,
    }
    console.log(data)
    try {
        const count = await BMI.count();
        if (count > 0) {
            const existinBMI = await BMI.findOne();
            if (existinBMI) {
                insert = await existinBMI.update(data);
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            insert = await BMI.create(data);
        }

        sendSuccess(res, 201, insert, 'BMI update successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};



exports.cholesterolUpdate = async (req, res) => {
    let insert;
    const {

        total_cholesterol_standard_value_min,
        total_cholesterol_standard_value_max,
        total_cholesterol_within_deviation_value_min,
        total_cholesterol_within_deviation_value_max,
        total_cholesterol_out_of_range,
        total_cholesterol_units,

        ld_cholesterol_standard_value_min,
        ld_cholesterol_standard_value_max,
        ld_cholesterol_within_deviation_value_min,
        ld_cholesterol_within_deviation_value_max,
        ld_cholesterol_out_of_range,
        ld_cholesterol_units,

        hd_cholesterol_standard_value_min,
        hd_cholesterol_standard_value_max,
        hd_cholesterol_within_deviation_value_min,
        hd_cholesterol_within_deviation_value_max,
        hd_cholesterol_out_of_range,
        hd_cholesterol_units,
    } = req.body
    const data = {
        total_cholesterol_standard_value_min,
        total_cholesterol_standard_value_max,
        total_cholesterol_within_deviation_value_min,
        total_cholesterol_within_deviation_value_max,
        total_cholesterol_out_of_range,
        total_cholesterol_units,

        ld_cholesterol_standard_value_min,
        ld_cholesterol_standard_value_max,
        ld_cholesterol_within_deviation_value_min,
        ld_cholesterol_within_deviation_value_max,
        ld_cholesterol_out_of_range,
        ld_cholesterol_units,

        hd_cholesterol_standard_value_min,
        hd_cholesterol_standard_value_max,
        hd_cholesterol_within_deviation_value_min,
        hd_cholesterol_within_deviation_value_max,
        hd_cholesterol_out_of_range,
        hd_cholesterol_units,
    }


    try {
        const count = await CHOLESTEROL.count();
        if (count > 0) {
            const existiCHOLESTEROL = await CHOLESTEROL.findOne();
            if (existiCHOLESTEROL) {
                insert = await existiCHOLESTEROL.update(data);
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            insert = await CHOLESTEROL.create(data);
        }

        sendSuccess(res, 201, insert, 'CHOLESTEROL update successfully');
    } catch (error) {
        sendError(res, 500, error, 'Invalid input');
    }
};

//////view


exports.viewEyeTest = async (req, res) => {
    try {
        const data = await Eyetest.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.viewBloodgroup = async (req, res) => {
    try {
        const data = await Bloodgroup.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}


exports.viewHearingtest = async (req, res) => {
    try {
        const data = await Hearingtest.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

exports.viewECG = async (req, res) => {
    try {
        const data = await ECG.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

exports.viewBloodpressure = async (req, res) => {
    try {
        const data = await Bloodpressure.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.viewBMI = async (req, res) => {
    try {
        const data = await BMI.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

exports.viewCholesterol = async (req, res) => {
    try {
        const data = await CHOLESTEROL.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

exports.updateEyeTest = async (req, res) => {
    try {
        const {
            spherical_right_within_deviation_value_min_below,
            spherical_right_within_deviation_value_min,
            spherical_right_out_of_range_below,
            spherical_right_out_of_range,
            cylindrical_right_within_deviation_value_min_below,
            cylindrical_right_within_deviation_value_min,
            cylindrical_right_out_of_range_below,
            cylindrical_right_out_of_range,
            spherical_left_within_deviation_value_min_below,
            spherical_left_within_deviation_value_min,
            spherical_left_out_of_range_below,
            spherical_left_out_of_range,
            cylindrical_left_within_deviation_value_min_below,
            cylindrical_left_within_deviation_value_min,
            cylindrical_left_out_of_range_below,
            cylindrical_left_out_of_range,
            colour_blindness_option_1,
            colour_blindness_option_2,
        } = req.body;



        const data = {
            spherical_right_within_deviation_value_min_below,
            spherical_right_within_deviation_value_min,
            spherical_right_out_of_range_below,
            spherical_right_out_of_range,
            cylindrical_right_within_deviation_value_min_below,
            cylindrical_right_within_deviation_value_min,
            cylindrical_right_out_of_range_below,
            cylindrical_right_out_of_range,
            spherical_left_within_deviation_value_min_below,
            spherical_left_within_deviation_value_min,
            spherical_left_out_of_range_below,
            spherical_left_out_of_range,
            cylindrical_left_within_deviation_value_min_below,
            cylindrical_left_within_deviation_value_min,
            cylindrical_left_out_of_range_below,
            cylindrical_left_out_of_range,
            colour_blindness_option_1,
            colour_blindness_option_2,
        };


        // Retrieve uploaded files from req.files
        let insert;

        try {
            const count = await Eyetest.count();
            if (count > 0) {
                const existinEyetest = await Eyetest.findOne();
                if (existinEyetest) {
                    insert = await existinEyetest.update(data);
                } else {
                    throw new Error('Unexpected: Record not found when it should exist.');
                }
            } else {
                insert = await Eyetest.create(data);
            }

            sendSuccess(res, 201, insert, 'EyeTest update successfully');
        } catch (error) {
            sendError(res, 500, error, 'Invalid input');
        }
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.VisionTestUpdate = async (req, res) => {
    try {
        const {
            option_1,
            option_2,
            option_3,
            option_4,
            option_5,
            option_6,
        } = req.body;



        const data = {
            option_1,
            option_2,
            option_3,
            option_4,
            option_5,
            option_6,
        };



        let insert;

        try {
            const count = await Vision.count();
            if (count > 0) {
                const existinVision = await Vision.findOne();
                if (existinVision) {
                    insert = await existinVision.update(data);
                } else {
                    throw new Error('Unexpected: Record not found when it should exist.');
                }
            } else {
                insert = await Vision.create(data);
            }

            sendSuccess(res, 201, insert, 'Vision update successfully');
        } catch (error) {
            sendError(res, 500, error, 'Invalid input');
        }
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

exports.VisionTestView = async (req, res) => {

    try {
        const data = await Vision.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
