const { sendSuccess, sendError } = require('../../util/responseHandler');
const centerService = require('../../service/globalService/centerService');
const { updateMasterTempture, updateHaemoglobinServive, updatHivService, updateAlcholtestService, updateCretenineService, updatePulmonaryTest, updateMasterupdateSPO2s, updateRBS, updatePulseService } = require('../../service/masterService/temperatureService');


exports.updateMaster = async (req, res) => {
    try {

        sendSuccess(res, 201, insert, 'Create Center successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
        }
        const insert = await updateMasterTempture(req, data);

        sendSuccess(res, 201, insert, 'Create Temperature successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
        }
        const insert = await updateMasterupdateSPO2s(req, data);

        sendSuccess(res, 201, insert, 'Create SPO2s successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
        sendError(res, 500, error, error.message);

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
            units: req.body.units
        }
        const insert = await updatePulseService(req, data);

        sendSuccess(res, 201, insert, 'Create Pulse successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
            units: req.body.units
        }
        const insert = await updatePulmonaryTest(req, data);

        sendSuccess(res, 201, insert, 'Create Pulmonary function test successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
            units: req.body.units
        }
        const insert = await updateHaemoglobinServive(req, data);

        sendSuccess(res, 201, insert, 'Create Haemoglobin test successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
            units: req.body.units
        }
        const insert = await updateCretenineService(req, data);

        sendSuccess(res, 201, insert, 'Create Cretenine test successfully');

    } catch (error) {
        sendError(res, 500, error, error.message);

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
        sendError(res, 500, error, error.message);

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
        sendError(res, 500, error, error.message);

    }
}
