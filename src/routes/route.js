const express = require('express');
const authentication = require("../middleware/authentication");
const authController = require("../controllers/auth.controller");
const houseController = require("../controllers/house.controller");
const spillAlertController = require('../controllers/spillAlert.controller');
const analyticsController = require('../controllers/analytics.controller');
const usageController = require("../controllers/usage.controller");

const router = express.Router();

//Auth Controller
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/userDetails', authentication.checkJwtToken, authController.userDetails);

//House Controller
router.post('/house/addHouse', authentication.checkJwtToken, houseController.addHouse);
router.get('/house/getHouse/:id', authentication.checkJwtToken, houseController.getHouse);
router.get('/house/getManyHouse', authentication.checkJwtToken, houseController.getManyHouse);
router.put('/house/updateHouse/:id', authentication.checkJwtToken, houseController.updateHouse);
router.delete('/house/deleteHouse/:id', authentication.checkJwtToken, houseController.deleteHouse);

//SpillAlert Controller
router.post('/spillAlert/addSpillAlert', authentication.checkJwtToken, spillAlertController.addSpillAlert);
router.get('/spillAlert/getSpillAlerts', authentication.checkJwtToken, spillAlertController.getSpillAlerts);

//Analytics Controller
router.get('/analytics/topConsumers/day', authentication.checkJwtToken, analyticsController.topConsumersByDay);
router.get('/analytics/topConsumers/week', authentication.checkJwtToken, analyticsController.topConsumersByWeek);

//Usage Controller
router.get("/usage/house/:houseId", authentication.checkJwtToken,   usageController.getUsageByDateRange);

module.exports = router;