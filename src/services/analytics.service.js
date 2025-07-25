const DailyUsage = require('../models/dailyUsage.model');
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.getTopConsumersByDay = async (date, limit = 5) => {
  try {
    const targetDate = new Date(date);
    const result = await DailyUsage.aggregate([
      { $match: { date: { $gte: new Date(targetDate.setHours(0, 0, 0, 0)), $lt: new Date(targetDate.setHours(23, 59, 59, 999)) } } },
      { $group: { _id: '$houseId', totalUsage: { $sum: '$litersUsed' } } },
      { $sort: { totalUsage: -1 } },
      { $limit: parseInt(limit) }
    ]);

    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.ANALYTICS.TOP_CONSUMERS_DAY,
      data: result
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message
    };
  }
};


exports.getTopConsumersByWeek = async (startDate, limit = 5) => {
  try {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(end.getDate() + 7);

    const result = await DailyUsage.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      { $group: { _id: '$houseId', totalUsage: { $sum: '$litersUsed' } } },
      { $sort: { totalUsage: -1 } },
      { $limit: parseInt(limit) }
    ]);

    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.ANALYTICS.TOP_CONSUMERS_WEEK,
      data: result
    };
  } catch (error) {
    return {
      statusCode: 500,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message
    };
  }
};
