const analyticsService = require('../services/analytics.service');
const { getTopConsumersByDaySchema, getTopConsumersByWeekSchema } = require('../validator/validation');
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.topConsumersByDay = async (req, res) => {
  try {
    await getTopConsumersByDaySchema.validateAsync(req.query);
    const result = await analyticsService.getTopConsumersByDay(req.query.date, req.query.limit);
    return res.status(result.statusCode).send(result);
  } catch (error) {
    console.log("Error in topConsumersByDay:", error);
    return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
};

exports.topConsumersByWeek = async (req, res) => {
  try {
    await getTopConsumersByWeekSchema.validateAsync(req.query);
    const result = await analyticsService.getTopConsumersByWeek(req.query.startDate, req.query.limit);
    return res.status(result.statusCode).send(result);
  } catch (error) {
    console.log("Error in topConsumersByWeek:", error);
    return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
};
