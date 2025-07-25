const authService = require("../services/auth.service");
const { signInSchema, signUpSchema } = require('../validator/validation')
const { CONSTANT_MSG } = require('../config/constant_messages');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        await signUpSchema.validateAsync(req.body);
        const user = await authService.createUser(req.body);
        return res.status(user.statusCode).send(user);
    } catch (error) {
        console.log("Error in Register API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        await signInSchema.validateAsync(req.body);
        let user = await authService.login(req.body);
        if (user.status != 'error') {
            const token = jwt.sign({ email: user.data.email, userRole: user.data.userRole, mobile: user.data.mobile, userId: user.data._id }, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn: "10d" })
            user.token = token;
        }
        return res.status(user.statusCode).send(user);
    } catch (error) {
        console.log("Error in Login API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};

// userDetails
exports.userDetails = async (req, res) => {
    try {
        let user = await authService.userDetails(req.user);
        return res.status(user.statusCode).send(user);
    } catch (error) {
        console.log("Error in Login API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};