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
    Hiv
} = require("../../../db/models");


async function updateMasterTempture(req, data) {

    try {
        const count = await Temperature.findOne({ raw: true, nest: true });

        if (count) {
            const temperature = await Temperature.findOne({ where: { id: count.id } });

            if (temperature) {
                // If the record exists, update it
                await temperature.update(data);
                return temperature;
            } else {
                // If the record doesn't exist, create a new one
                return await Temperature.create(data);
            }
        } else {
            return await Temperature.create(data);


        }
    } catch (error) {
        throw new Error(error);
    }
}

async function updateMasterupdateSPO2s(req, data) {

    try {
        // Check if any record exists in the table
        const count = await SPO2.count();

        if (count > 0) {
            // If records exist, find and update the first one
            const existingRBS = await SPO2.findOne();

            if (existingRBS) {
                // If the record exists, update it
                await existingRBS.update(data);
                return existingRBS;
            } else {
                // This should ideally not happen, but handle it just in case
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            // If no records exist, create a new one
            return await SPO2.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }



}
async function updateRBS(req, data) {
    try {
        // Check if any record exists in the table
        const count = await random_blood_sugar.count();

        if (count > 0) {
            // If records exist, find and update the first one
            const existingRBS = await random_blood_sugar.findOne();

            if (existingRBS) {
                // If the record exists, update it
                await existingRBS.update(data);
                return existingRBS;
            } else {
                // This should ideally not happen, but handle it just in case
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            // If no records exist, create a new one
            return await random_blood_sugar.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function updatePulseService(req, data) {
    try {
        // Check if any record exists in the table
        const count = await Pulse.count();

        if (count > 0) {
            // If records exist, find and update the first one
            const existingPulse = await Pulse.findOne();

            if (existingPulse) {
                // If the record exists, update it
                await existingPulse.update(data);
                return existingPulse;
            } else {
                // This should ideally not happen, but handle it just in case
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            // If no records exist, create a new one
            return await Pulse.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function updatePulmonaryTest(req, data) {
    try {
        // Check if any record exists in the table
        const count = await Pulmonaryfunctiontest.count();

        if (count > 0) {
            const existingPulmonary = await Pulmonaryfunctiontest.findOne();

            if (existingPulmonary) {
                await existingPulmonary.update(data);
                return existingPulmonary;
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            return await Pulmonaryfunctiontest.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}

async function updateHaemoglobinServive(req, data) {
    try {
        // Check if any record exists in the table
        const count = await Haemoglobin.count();

        if (count > 0) {
            const existingHaemoglobin = await Haemoglobin.findOne();

            if (existingHaemoglobin) {
                await existingHaemoglobin.update(data);
                return existingHaemoglobin;
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            return await Haemoglobin.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function updateCretenineService(req, data) {
    try {
        const count = await Cretenine.count();
        if (count > 0) {
            const existingCretenine = await Cretenine.findOne();
            if (existingCretenine) {
                await existingCretenine.update(data);
                return existingCretenine;
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            return await Cretenine.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function updateAlcholtestService(req, data) {
    try {
        const count = await Alcholtest.count();
        if (count > 0) {
            const existingAlcholtest = await Alcholtest.findOne();
            if (existingAlcholtest) {
                await existingAlcholtest.update(data);
                return existingAlcholtest;
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            return await Alcholtest.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}
async function updatHivService(req, data) {
    try {
        const count = await Hiv.count();
        if (count > 0) {
            const existingHiv = await Hiv.findOne();
            if (existingHiv) {
                await existingHiv.update(data);
                return existingHiv;
            } else {
                throw new Error('Unexpected: Record not found when it should exist.');
            }
        } else {
            return await Hiv.create(data);
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { updatHivService, updateAlcholtestService, updateCretenineService, updateHaemoglobinServive, updatePulmonaryTest, updatePulseService, updateRBS, updateMasterupdateSPO2s, updateMasterTempture };
