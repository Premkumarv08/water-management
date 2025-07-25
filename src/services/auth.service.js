const bcrypt = require('bcryptjs');
const { CONSTANT_MSG } = require('../config/constant_messages');
const User = require('../models/user.model');
const House = require('../models/house.model');

// Register User
exports.createUser = async (reqBody) => {
  try {
    const hashedPassword = reqBody.password ? await bcrypt.hash(reqBody.password, 5) : '';

    if (reqBody.mobile && await User.findOne({ mobile: reqBody.mobile })) {
      return {
        statusCode: 400,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.USER.MOBILE_EXISTS
      };
    }

    if (reqBody.email && await User.findOne({ email: reqBody.email })) {
      return {
        statusCode: 400,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.USER.EMAIL_EXISTS
      };
    }

    reqBody.password = hashedPassword;
    const user = new User(reqBody);
    const userDetails = await user.save();

    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.USER.REGISTRATION_SUCCESS,
      data: userDetails
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: `${CONSTANT_MSG.USER.REGISTRATION_FAILED} ${error.message}`,
    };
  }
};

// Login
exports.login = async (reqBody) => {
  try {
    const user = await User.findOne(
      { $or: [{ mobile: reqBody.username }, { email: reqBody.username }] },
      { createdAt: 1, mobile: 1, email: 1, name: 1, userRole: 1, password: 1 }
    );

    if (!user) {
      return {
        statusCode: 400,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.USER.NOT_REGISTERED
      };
    }

    const isMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!isMatch) {
      return {
        statusCode: 400,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.USER.INVALID_CREDENTIALS
      };
    }

    const userDetails = await User.findOne(
      { $or: [{ mobile: reqBody.username }, { email: reqBody.username }] },
      { mobile: 1, email: 1, name: 1, userRole: 1, _id: 1 }
    );

    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.USER.LOGIN_SUCCESS,
      data: userDetails
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: `${CONSTANT_MSG.USER.LOGIN_FAILED} ${error.message}`
    };
  }
};

// Get User Details
exports.userDetails = async (userDet) => {
  try {
    const user = await User.findOne(
      { mobile: userDet.mobile },
      { mobile: 1, email: 1, name: 1, userRole: 1 }
    );

    if (!user) {
      return {
        statusCode: 400,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.USER.NOT_FOUND
      };
    }

    const house = await House.find({ userId: userDet.userId });

    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.USER.DETAILS_FETCHED,
      data: { user, house }
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: `${CONSTANT_MSG.USER.FETCH_FAILED} ${error.message}`,
    };
  }
};
