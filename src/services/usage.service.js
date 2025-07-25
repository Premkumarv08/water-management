const DailyUsage = require('../models/dailyUsage.model');
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.getHouseUsageSummary = async (houseId, from, to, type = 'daily') => {
  try {
    const startDate = new Date(from);
    const endDate = new Date(to);

    const match = {
      houseId,
      date: { $gte: startDate, $lte: endDate }
    };

    const groupBy = type === 'weekly'
      ? {
          _id: {
            week: { $isoWeek: "$date" },
            year: { $isoWeekYear: "$date" }
          },
          totalUsage: { $sum: "$litersUsed" }
        }
      : {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalUsage: { $sum: "$litersUsed" }
        };

    const usageSummary = await DailyUsage.aggregate([
      { $match: match },
      { $group: groupBy },
      { $sort: { "_id": 1 } }
    ]);

    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.USAGE.FETCH_SUCCESS,
      data: usageSummary
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message,
    };
  }
};
