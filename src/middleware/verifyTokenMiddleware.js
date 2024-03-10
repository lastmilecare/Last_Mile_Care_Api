const jwt = require('jsonwebtoken');
const configJwt = require('../../config/envConfig');
const configJwttoken = configJwt.JWT_ADMIN;

const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Get the Authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: true, message: 'Bearer token is missing' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer '

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
