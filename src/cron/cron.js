const moment = require("moment");
const WaterMeter = require("../models/waterMeter.model");
const House = require("../models/house.model");
const SpillAlert = require("../models/spillAlert.model");
const DailyUsage = require('../models/dailyUsage.model');

exports.waterMeterUpdate = async () => {
  try {
    const houseList = await House.find({});
    const todayStart = moment().startOf("day");
    const todayEnd = moment().endOf("day");
    const yesterdayStart = moment().subtract(1, "days").startOf("day");
    const yesterdayEnd = moment().subtract(1, "days").endOf("day");

    for (const house of houseList) {
      const randomLiters = Math.floor(Math.random() * 10) + 1;
      const meters = await WaterMeter.findOne({
        houseId: house._id.toString(),
        createdAt: { $gte: todayStart.toDate(), $lte: todayEnd.toDate() },
      });
      if (meters) {
        await WaterMeter.updateOne(
          { _id: meters._id },
          {
            $inc: {
              totalLiters: randomLiters,
            },
            $push: {
              liters: {
                time: moment().format("HH:mm"),
                litre: meters.totalLiters + randomLiters,
              },
            },
          }
        );
      } else {
        const yesterdayMeter = await WaterMeter.findOne({
          houseId: house._id.toString(),
          createdAt: { $gte: yesterdayStart.toDate(), $lte: yesterdayEnd.toDate() },
        });
        const previousLiter = yesterdayMeter ? yesterdayMeter.totalLiters : 0;
        const newMeter = new WaterMeter({
          houseId: house._id.toString(),
          totalLiters: randomLiters,
          previousLiter: previousLiter,
          liters: {
            time: moment().format("HH:mm"),
            litre: randomLiters,
          },
        });
        await newMeter.save();
      }
    }
    for (const house of houseList) {
      const today = moment().startOf("day");
      const waterToday = await WaterMeter.findOne({
        houseId: house._id.toString(),
        createdAt: { $gte: today.toDate(), $lte: moment(today).endOf("day").toDate() },
      });

      if (waterToday) {
        // Get past 7 days usage
        const lastWeekUsage = await DailyUsage.find({
          houseId: house._id.toString(),
          date: { $lt: today.toDate() },
        })
          .sort({ date: -1 })
          .limit(7);

        const total = lastWeekUsage.reduce((sum, rec) => sum + rec.litersUsed, 0);
        const average = lastWeekUsage.length ? total / lastWeekUsage.length : 0;

        const THRESHOLD = 2.0;

        if (average > 0 && waterToday.totalLiters > THRESHOLD * average) {
          await SpillAlert.updateOne(
            { houseId: house._id.toString(), date: today.toDate() },
            {
              $set: {
                usage: waterToday.totalLiters,
                average,
                threshold: THRESHOLD,
                status: "TRIGGERED",
              },
            },
            { upsert: true }
          );
        }
      }
    }
  } catch (error) {
    console.error("Water meter update error:", error);
  }
};

