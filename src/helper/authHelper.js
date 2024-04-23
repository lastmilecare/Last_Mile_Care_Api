const bcrypt = require('bcryptjs');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;
const configJwttokenCenter = configJwt.JWT_CENTER;

const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.checkUserPass = async (password, userdata, res) => {
  try {
    let passwordIsValid = bcrypt.compareSync(password, userdata.password);
    if (!passwordIsValid) {
      return { "status": "invalid_password" };
    }

    const token = jwt.sign(
      {
        data: {
          id: userdata.id,
        },
      },
      configJwttoken,
      { expiresIn: '10d' } // Token expires after 10 days
    );
    let makeResponseObject = {
      token,
      role: userdata.dataValues.slug,
      username: userdata.username,
      isAdmin: userdata.isAdmin,
      permission: userdata.dataValues.permissions
    };

    const cookieOptions = {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,

    };
    res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));

    return makeResponseObject;
  } catch (error) {
    // Handle any potential errors here
    console.error('Error in generating JWT token:', error);
    throw error;
  }
};

exports.checkUserPassCenter = async (password, userdata, res) => {
  try {
    let passwordIsValid = bcrypt.compareSync(password, userdata.password);

    if (!passwordIsValid) {
      return { "status": "invalid_password" };
    }

    const token = jwt.sign(
      {
        data: {
          id: userdata.id,
        },
      },
      configJwttokenCenter,
      { expiresIn: '10d' } // Token expires after 10 days
    );

    let makeResponseObject = {
      token,
      role: userdata.slug,
      username: userdata.username,
      isAdmin: userdata.isAdmin,
      permission: userdata.dataValues.permissions
    };

    const cookieOptions = {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
      httpOnly: true,
      // Add other cookie options as needed
    };
    res.setHeader('Set-Cookie', cookie.serialize('center_token', token, cookieOptions));

    return makeResponseObject;
  } catch (error) {
    // Handle any potential errors here
    console.error('Error in generating JWT token:', error);
    throw error;
  }
};