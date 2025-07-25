const jwt = require('jsonwebtoken');
const { CONSTANT_MSG } = require('../config/constant_messages');

module.exports.checkJwtToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ statuCode: 401, message: CONSTANT_MSG.ERROR_MSG.UNAUTHORIZED_NO_PERMISSION_ERROR });
    }
    const token = authHeader.split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).send({ statuCode: 401, message: err.message, data: { isTokenExpired: true } });
            } else {
                req.user = user;
                next();
            }
        });
    }
    else {
        return res.status(401).send({ statuCode: "401", message: "Invalid Request : Authentication Error" });
    }
};
