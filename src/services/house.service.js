const mongoose = require('mongoose');
const moment = require('moment');
const House = require('../models/house.model');
const ObjectID = mongoose.Types.ObjectId;
const { CONSTANT_MSG } = require('../config/constant_messages');

exports.addHouse = async (reqBody) => {
  try {
    const house = await House.findOne({ userId: reqBody.userId, email: reqBody.email, mobile: reqBody.mobile });
    if (house) {
      return {
        statusCode: 400,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.HOUSE.ALREADY_EXISTS
      };
    }
    let houseDetails = new House(reqBody);
    houseDetails = await houseDetails.save();
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.HOUSE.ADD_SUCCESS,
      data: houseDetails
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message,
    };
  }
};

exports.getHouse = async (houseId) => {
  try {
    const house = await House.findById(houseId);
    if (!house) {
      return {
        statusCode: 404,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.HOUSE.NOT_FOUND,
      };
    }
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.HOUSE.FETCH_SUCCESS,
      data: house
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message,
    };
  }
};

exports.getManyHouse = async (reqBody) => {
  try {
    let endDate = new Date();
    const page = reqBody.page || 1;
    const limit = parseInt(reqBody.limit) || 10;
    const skip = (page - 1) * limit;
    const sortObj = reqBody.sortObj || { createdAt: -1 };

    let aggregatePipeline = [];
    let filterArr = [];
    let filterArrWM = [];

    if (reqBody.startDate || reqBody.endDate) {
      if (reqBody.endDate) {
        endDate = new Date(reqBody.endDate);
        endDate.setDate(endDate.getDate() + 1);
        endDate = moment(endDate, "YYYY-MM-DD").toISOString()
        endDate = endDate.slice(0, endDate.length - 1)
      }
      if (reqBody.startDate) {
        reqBody.startDate = moment(reqBody.startDate, "YYYY-MM-DD").toISOString()
        reqBody.startDate = reqBody.startDate.slice(0, reqBody.startDate.length - 1)
      }
      filterArrWM.push({ "createdAt": { '$gte': new Date(reqBody.startDate), '$lte': new Date(endDate) } })
    }

    if (reqBody.userId) {
      filterArr.push(
        { userId: reqBody.userId }
      );
    }

    if (reqBody.searchValue) {
      filterArr.push(
        { address: { $regex: reqBody.searchValue, $options: 'i' } },
        { city: { $regex: reqBody.searchValue, $options: 'i' } },
        { state: { $regex: reqBody.searchValue, $options: 'i' } },
        { country: { $regex: reqBody.searchValue, $options: 'i' } },
        { pincode: { $regex: reqBody.searchValue, $options: 'i' } }
      );
    }

    if (filterArr.length > 0) {
      aggregatePipeline.push({ $match: { $or: filterArr } });
    }

    aggregatePipeline.push({ $sort: sortObj });
    const count = await House.aggregate([...aggregatePipeline]);
    aggregatePipeline.push({ $skip: skip }, { $limit: limit });
    const houses = await House.aggregate([...aggregatePipeline,
    {
      $addFields: {
        houseId: { $toString: "$_id" },
      }
    }, {
      $lookup: {
        from: 'watermeters',
        let: { houseId: "$houseId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$houseId", "$$houseId"] },
              ...(filterArrWM.length > 0 ? { $and: filterArrWM } : {})
            }
          }
        ],
        as: 'waterMeterDetails'
      }
    }]);
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.HOUSE.FETCH_MANY_SUCCESS,
      data: {
        houses,
        total: count.length
      }
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message,
    };
  }
};

exports.updateHouseById = async (reqBody, houseId) => {
  try {
    const house = await House.findOne({ _id: ObjectID(houseId) });
    if (!house) {
      return {
        statusCode: 404,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.HOUSE.NOT_FOUND,
      };
    }
    await House.updateOne({ _id: ObjectID(houseId) }, reqBody);
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.HOUSE.UPDATE_SUCCESS,
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message,
    };
  }
};

exports.deleteHouseById = async (houseId) => {
  try {
    const house = await House.findOne({ _id: ObjectID(houseId) });
    if (!house) {
      return {
        statusCode: 404,
        status: CONSTANT_MSG.STATUS.ERROR,
        message: CONSTANT_MSG.HOUSE.NOT_FOUND,
      };
    }
    await House.deleteOne({ _id: ObjectID(houseId) });
    return {
      statusCode: 200,
      status: CONSTANT_MSG.STATUS.SUCCESS,
      message: CONSTANT_MSG.HOUSE.DELETE_SUCCESS,
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: CONSTANT_MSG.STATUS.ERROR,
      message: error.message,
    };
  }
};
