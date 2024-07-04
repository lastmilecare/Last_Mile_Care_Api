const { sendSuccess, sendError } = require('../../util/responseHandler');
const centerService = require('../../service/globalService/centerService');
const { updateMasterTempture, updateHaemoglobinServive, updatHivService, updateAlcholtestService, updateCretenineService, updatePulmonaryTest, updateMasterupdateSPO2s, updateRBS, updatePulseService } = require('../../service/masterService/temperatureService');
const {
    sequelize,
    Temperature,
    SPO2,
    random_blood_sugar,
    Pulse,
    Pulmonaryfunctiontest,
    Haemoglobin,
    Cretenine,
    Alcholtest,
    Hiv,
    Romberg
} = require("../../../db/models");


exports.updateRomberg = async (req, res) => {
    const data = {
        option_one: req.body.option_one,
        option_two: req.body.option_two
    }
    console.log(data)
    try {
        const count = await Romberg.findOne({ raw: true, nest: true });

        if (count) {
            const RombergData = await Romberg.findOne({ where: { id: count.id } });

            if (RombergData) {
                // If the record exists, update it
                await Romberg.update(data, {
                    where: { id: RombergData.id }
                });
                sendSuccess(res, 201, RombergData, 'Update Romberg   successfully');
                return
            } else {
                // If the record doesn't exist, create a new one
                await RombergData.create(data);
                sendSuccess(res, 201, RombergData, 'Update Romberg   successfully');
                return
            }
        } else {
            await Romberg.create(data);
            sendSuccess(res, 201, count, 'Update Romberg   successfully');
            return

        }


    } catch (error) {
        console.log(error)
        return sendError(res, 500, "internal server error");

    }

}

exports.viewRomberg = async (req, res) => {

    try {
        const count = await Romberg.findOne({ raw: true, nest: true });
        return sendSuccess(res, 201, count, '  Romberg successfully fetch');
    } catch (error) {
        return sendError(res, 500, "internal server error");

    }

}



exports.updateMaster = async (req, res) => {
    try {

        sendSuccess(res, 201, insert, 'Create Center successfully');

    } catch (error) {
        return sendError(res, 500, "internal server error");

    }

}

exports.updateTemperature = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units,
            within_deviation_value_min_below: req.body.within_deviation_value_min_below,
            within_deviation_value_max_below: req.body.within_deviation_value_max_below,
            out_of_range_below: req.body.out_of_range_below,
        }
        const insert = await updateMasterTempture(req, data);

        sendSuccess(res, 201, insert, 'Create Temperature successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");

    }
}


exports.updateSPO2s = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units,
            within_deviation_value_min_below: req.body.within_deviation_value_min_below,
            within_deviation_value_max_below: req.body.within_deviation_value_max_below,
            out_of_range_below: req.body.out_of_range_below,
        }
        const insert = await updateMasterupdateSPO2s(req, data);

        sendSuccess(res, 201, insert, 'Create SPO2s successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");
        return
    }
}

exports.updateRandomBloodSugar = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            comments: req.body.comments,
            units: req.body.units
        }
        const insert = await updateRBS(req, data);

        sendSuccess(res, 201, insert, 'Create Random Blood Sugar successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");

    }
}
exports.updatePulse = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units,
            within_deviation_value_min_below: req.body.within_deviation_value_min_below,
            within_deviation_value_max_below: req.body.within_deviation_value_max_below,
            out_of_range_below: req.body.out_of_range_below,
        }
        const insert = await updatePulseService(req, data);

        sendSuccess(res, 201, insert, 'Create Pulse successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");

    }
}

exports.updatePulmonaryfunctiontest = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units,
            within_deviation_value_min_below: req.body.within_deviation_value_min_below,
            within_deviation_value_max_below: req.body.within_deviation_value_max_below,
            out_of_range_below: req.body.out_of_range_below,
        }
        const insert = await updatePulmonaryTest(req, data);

        sendSuccess(res, 201, insert, 'Create Pulmonary function test successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.updateHaemoglobin = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units,
            within_deviation_value_min_below: req.body.within_deviation_value_min_below,
            within_deviation_value_max_below: req.body.within_deviation_value_max_below,
            out_of_range_below: req.body.out_of_range_below,
        }
        const insert = await updateHaemoglobinServive(req, data);

        sendSuccess(res, 201, insert, 'Create Haemoglobin test successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.updateCretenine = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units,
            within_deviation_value_min_below: req.body.within_deviation_value_min_below,
            within_deviation_value_max_below: req.body.within_deviation_value_max_below,
            out_of_range_below: req.body.out_of_range_below,
        }
        const insert = await updateCretenineService(req, data);

        sendSuccess(res, 201, insert, 'Create Cretenine test successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.updateAlcholtest = async (req, res) => {
    try {
        const data = {
            standard_value_min: req.body.standard_value_min,
            standard_value_max: req.body.standard_value_max,
            within_deviation_value_min: req.body.within_deviation_value_min,
            within_deviation_value_max: req.body.within_deviation_value_max,
            out_of_range: req.body.out_of_range,
            units: req.body.units
        }
        const insert = await updateAlcholtestService(req, data);

        sendSuccess(res, 201, insert, 'Create Alcholtest test successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}
exports.updateHiv = async (req, res) => {
    try {
        const data = {
            option_one: req.body.option_one,
            option_two: req.body.option_two,

        }
        const insert = await updatHivService(req, data);

        sendSuccess(res, 201, insert, 'Create Hiv test successfully');

    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

////View All Data
// Function to view Temperature
exports.viewTemperature = async (req, res) => {
    try {
        const data = await Temperature.findOne({ order: [['id', 'DESC']], raw: true, nest: true, order: [['id', 'DESC']] });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view SPO2
exports.viewSPO2 = async (req, res) => {
    try {
        const data = await SPO2.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        console.log(error);
        sendError(res, 500, "internal server error");
    }
}

// Function to view random_blood_sugar
exports.viewRandomBloodSugar = async (req, res) => {
    try {
        const data = await random_blood_sugar.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view Pulse
exports.viewPulse = async (req, res) => {
    try {
        const data = await Pulse.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view Pulmonaryfunctiontest
exports.viewPulmonaryFunctionTest = async (req, res) => {
    try {
        const data = await Pulmonaryfunctiontest.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view Haemoglobin
exports.viewHaemoglobin = async (req, res) => {
    try {
        const data = await Haemoglobin.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view Cretenine
exports.viewCretenine = async (req, res) => {
    try {
        const data = await Cretenine.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view Alcholtest
exports.viewAlcholtest = async (req, res) => {
    try {
        const data = await Alcholtest.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}

// Function to view Hiv
exports.viewHiv = async (req, res) => {
    try {
        const data = await Hiv.findOne({ order: [['id', 'DESC']], raw: true, nest: true });
        sendSuccess(res, 200, data, 'Success');
    } catch (error) {
        sendError(res, 500, "internal server error");
    }
}


