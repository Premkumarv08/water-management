const SpillAlert = require('../models/spillAlert.model');
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.addSpillAlert = async (payload) => {
  try {
    const alert = await SpillAlert.create(payload);
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: "Spill alert created successfully",
      data: alert
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message
    };
  }
};

exports.getSpillAlerts = async (query = {}) => {
  try {
    const alerts = await SpillAlert.find(query).populate('houseId');
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: "Spill alerts fetched successfully",
      data: alerts
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message
    };
  }
};
