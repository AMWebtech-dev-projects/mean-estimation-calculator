const express = require("express");
const router = express.Router();
const serviceModules = require("../controllers/serviceModulesController");

router.post("/getServiceModules", serviceModules.getServiceModules);
router.post("/saveServiceInfo", serviceModules.saveServiceInfo);
router.post('/deleteService', serviceModules.deleteService);

module.exports = router;
