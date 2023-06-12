const express = require("express");
const router = express.Router();
const manageServices = require("../controllers/manageServicesController");

router.post("/getManageServices", manageServices.getManageServices);
router.post("/saveServiceInfo", manageServices.saveServiceInfo);
router.post('/deleteService', manageServices.deleteService);

module.exports = router;
