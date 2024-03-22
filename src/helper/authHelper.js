const bcrypt = require('bcryptjs');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
exports.checkUserPass = async (password, userdata, res) => {
  let makeResponseObject = {};
  let passwordIsValid = bcrypt.compareSync(password, userdata.password);
  if (!passwordIsValid) {
    return { "status": "invalid_password" };
  }

  const token = jwt.sign(
    {
      expiresIn: '72h',
      data: {
        id: userdata.id,
      },

    },
    configJwttoken
  );
  makeResponseObject.token = token;
  makeResponseObject.role = userdata.slug;
  makeResponseObject.username = userdata.username;
  const cookieOptions = {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
    httpOnly: true,
    // Add other cookie options as needed
  };
  res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));
  return makeResponseObject;
};
