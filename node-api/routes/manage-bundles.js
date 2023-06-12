const express = require("express");
const router = express.Router();
const manageBundles = require("../controllers/manageBundlesController");

router.post("/getBundlesList", manageBundles.getBundlesList);
router.post("/saveServiceInfo", manageBundles.saveServiceInfo);
router.post('/deleteService', manageBundles.deleteService);

module.exports = router;