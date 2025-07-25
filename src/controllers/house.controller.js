const houseService = require("../services/house.service");
const { paramsId, addHouse, getManyHouse, updateHouse } = require('../validator/validation')
const { CONSTANT_MSG } = require('../config/constant_messages');

// addHouse
exports.addHouse = async (req, res) => {
    try {
        await addHouse.validateAsync(req.body);
        const house = await houseService.addHouse(req.body);
        return res.status(house.statusCode).send(house);
    } catch (error) {
        console.log("Error in addHouse API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};

// getHouse
exports.getHouse = async (req, res) => {
    try {
        const houseId = req.params.id;
        await paramsId.validateAsync({ id: houseId });
        const house = await houseService.getHouse(houseId);
        return res.status(house.statusCode).send(house);
    } catch (error) {
        console.log("Error in Register API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};

// getManyHouse
exports.getManyHouse = async (req, res) => {
    try {
        await getManyHouse.validateAsync(req.query);
        const house = await houseService.getManyHouse(req.query);
        return res.status(house.statusCode).send(house);
    } catch (error) {
        console.log("Error in getManyHouse API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};

// updateHouse
exports.updateHouse = async (req, res) => {
    try {
        await paramsId.validateAsync(req.params.id);
        await updateHouse.validateAsync(req.body);
        const house = await houseService.updateHouse(req.body);
        return res.status(house.statusCode).send(house);
    } catch (error) {
        console.log("Error in updateHouse API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};

// deleteHouse
exports.deleteHouse = async (req, res) => {
    try {
        await paramsId.validateAsync(req.params.id);
        const house = await houseService.deleteHouse(req.body);
        return res.status(house.statusCode).send(house);
    } catch (error) {
        console.log("Error in deleteHouse API: ", error);
        return res.status(400).send({ statusCode: 400, status: CONSTANT_MSG.STATUS.ERROR, message: error.message });
    }
};
