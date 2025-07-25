const joi = require('joi');
const joiObjectId = require('joi-objectid')(joi)

module.exports.signUpSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().max(75).required(),
    mobile: joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be 10 digits'
    }),
    password: joi.string().min(6).max(30).required(),
    userRole: joi.string().valid('USER').required(),
    DOB: joi.date().iso().required().messages({
        'date.format': 'DOB must be in ISO format (YYYY-MM-DD)'
    }),
    gender: joi.string().valid('MALE', 'FEMALE').required()
});

module.exports.signInSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(6).max(30).required(),
});

module.exports.paramsId = joi.object({
    id: joiObjectId().required(),
});

module.exports.addHouse = joi.object({
    userId: joiObjectId().required(),
    mobile: joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be 10 digits'
    }),
    name: joi.string().max(30).required(),
    email: joi.string().max(75).required(),
    address: joi.string().max(200).required(),
    city: joi.string().max(30).required(),
    state: joi.string().max(30).required(),
    country: joi.string().max(30).required(),
    pincode: joi.string().pattern(/^\d{4,8}$/).required().messages({
        'string.pattern.base': 'Pincode must be between 4 and 8 digits'
    }),
    district: joi.string().max(30).required()
});

module.exports.getManyHouse = joi.object({
    userId: joiObjectId(),
    searchValue: joi.string().allow('').optional(),
    startDate: joi.string().required(),
    endDate: joi.string().required(),
});

module.exports.updateHouse = joi.object({
    userId: joiObjectId().required(),
    mobile: joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be 10 digits'
    }),
    email: joi.string().max(75).required(),
    address: joi.string().max(200).required(),
    city: joi.string().max(30).required(),
    state: joi.string().max(30).required(),
    country: joi.string().max(30).required(),
    pincode: joi.string().pattern(/^\d{4,8}$/).required().messages({
        'string.pattern.base': 'Pincode must be between 4 and 8 digits'
    })
});

module.exports.addSpillAlertSchema = joi.object({
  houseId: joi.string().required(),
  date: joi.date().required(),
  message: joi.string().optional(),
  resolved: joi.boolean().optional()
});

module.exports.getSpillAlertSchema = joi.object({
  houseId: joi.string().optional()
});

exports.getTopConsumersByDaySchema = joi.object({
  date: joi.string().isoDate().required(),
  limit: joi.number().integer().min(1).optional(),
});

exports.getTopConsumersByWeekSchema = joi.object({
  startDate: joi.string().isoDate().required(),
  limit: joi.number().integer().min(1).optional(),
});

exports.getHouseUsageSchema = joi.object({
  houseId: joi.string().required(),
  from: joi.string().isoDate().required(),
  to: joi.string().isoDate().required(),
});
