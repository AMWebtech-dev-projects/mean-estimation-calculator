const express = require("express");
const router = express.Router();
const Regions = require("../controllers/regionsController");

router.post("/getRegionsList", Regions.getRegionsList);
router.post("/saveRegionInfo", Regions.saveRegionInfo);
router.post("/regionAlreadyExists", Regions.regionAlreadyExists);
router.post('/deleteRegion', Regions.deleteRegion);

module.exports = router;