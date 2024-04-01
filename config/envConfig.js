const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const API_PREFIX_ADMIN = process.env.API_PREFIX_ADMIN || '/api/v1/admin';
const API_PREFIX_CENTER = process.env.API_PREFIX_CENTER || '/api/v1/center';


// Database
const databaseName = process.env.DATABASE_NAME || 'lastmileDb';
const userName = process.env.USER_NAME || 'postgres';
const password = process.env.PASSWORD || '103Lastmilecare';
const host = process.env.HOST || 'database-1.c1i0cmiimplb.us-east-1.rds.amazonaws.com';
const JWT_ADMIN = process.env.JWT_ADMIN
// Email
const emailApiKey = process.env.EMAIL_API_KEY || 'default_email_api_key';
const emailFrom = process.env.EMAIL_FROM || 'default_email@example.com';

// Other Keys
const secretKey = process.env.SECRET_KEY || 'default_secret_key';
const anotherKey = process.env.ANOTHER_KEY || 'default_another_key';
const prefix = {
  admin: API_PREFIX_ADMIN,
  center: API_PREFIX_CENTER
};


module.exports = {
  port,
  JWT_ADMIN,
  prefix,
  database: {
    name: databaseName,
    user: userName,
    password,
    host,
  },
  email: {
    apiKey: emailApiKey,
    from: emailFrom,
  },
  otherKeys: {
    secretKey,
    anotherKey,
  },
};
