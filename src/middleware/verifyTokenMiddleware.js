const jwt = require('jsonwebtoken');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;


const verifyTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        return res.status(401).json({ error: true, message: 'Token is missing in cookies' });
    }

    jwt.verify(token, configJwttoken, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: true, message: 'Invalid token provided' });
            }
            return res.status(500).json({ error: true, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.data.id;
        next();
    });
};


module.exports = verifyTokenMiddleware;
