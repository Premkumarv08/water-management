const spillAlertService = require('../services/spillAlert.service');
const { addSpillAlertSchema, getSpillAlertSchema } = require('../validator/validation');
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.addSpillAlert = async (req, res) => {
  try {
    await addSpillAlertSchema.validateAsync(req.body);
    const result = await spillAlertService.addSpillAlert(req.body);
    return res.status(result.statusCode).send(result);
  } catch (error) {
    console.log("Error in addSpillAlert:", error);
    return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
};

exports.getSpillAlerts = async (req, res) => {
  try {
    await getSpillAlertSchema.validateAsync(req.query);
    const result = await spillAlertService.getSpillAlerts(req.query);
    return res.status(result.statusCode).send(result);
  } catch (error) {
    console.log("Error in getSpillAlerts:", error);
    return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
};
