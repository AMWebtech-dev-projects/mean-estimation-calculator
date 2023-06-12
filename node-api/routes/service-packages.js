const express = require("express");
const router = express.Router();
const servicePackages = require("../controllers/servicePackagesController");

router.post("/getservicePackages", servicePackages.getservicePackages);
router.post("/saveServicePackage", servicePackages.saveServicePackage);
router.post('/deleteService', servicePackages.deleteService);

module.exports = router;
