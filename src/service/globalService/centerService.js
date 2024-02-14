const {
  sequelize,
  Center,
  User,
  Centeruser
} = require("../../db/models");


async function insertCenter(data) {
  try {
    return await Center.create(data);
  } catch (error) {
    throw new Error(error);
  }
}

async function findAllCenter(req) {
  try {
    return await Center.findAll();
  } catch (error) {
    throw new Error(error);
  }
}

async function assignCenterToUser(data) {
  try {
    return await Centeruser.create(data);
  } catch (error) {
    throw new Error(error);
  }
}
async function centerStatusUpdate(id, status) {
  try {
    return await Center.update({ status: status }, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = { centerStatusUpdate, assignCenterToUser, findAllCenter, insertCenter };
