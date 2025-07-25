const usageService = require("../services/usage.service");
const { getHouseUsageSchema } = require("../validator/validation");
const { CONSTANT_MSG } = require("../config/constant_messages");

exports.getUsageByDateRange = async (req, res) => {
  try {
    await getHouseUsageSchema.validateAsync({ ...req.params, ...req.query });
    const result = await usageService.getUsageByHouseAndDateRange(req.params.houseId, req.query.from, req.query.to);
    return res.status(result.statusCode).send(result);
  } catch (error) {
    console.log("Error in getUsageByDateRange:", error);
    const code = error.message === "METER_NOT_FOUND" ? 404 : 400;
    return res.status(code).send({ statusCode: code, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
  }
};
