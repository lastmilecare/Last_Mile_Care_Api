const {
  sequelize,
  Center,
  User,
  Centeruser
} = require("../../../db/models");


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

async function assignCenterToUser(req) {
  try {
    const { username, name, role_id, phone, email, password, center_id } = req.body;
    const data = {
      username, name, role_id, phone, email, password, center_id
    }
    const userInsert = await User.create(data)

    await Centeruser.create({
      user_id: userInsert.id,
      center_id: center_id
    })
    return userInsert;
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
async function getCenterUser(req) {
  try {
    const centerUsers = await Centeruser.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'name', 'email'] }, // Include associated User details
        { model: Center, as: 'center' } // Include associated Center details
      ]
    });

    return centerUsers;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = { getCenterUser, centerStatusUpdate, assignCenterToUser, findAllCenter, insertCenter };
