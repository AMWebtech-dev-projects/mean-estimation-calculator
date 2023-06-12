const express = require("express");
const router = express.Router();
const subRegions = require("../controllers/subRegionsController");

router.get("/getSubRegionsList", subRegions.getSubRegionsList);
router.post("/saveSubRegionInfo", subRegions.saveSubRegionInfo);
router.post("/countryCodeExists", subRegions.countryCodeExists);
router.post('/deleteSubRegion', subRegions.deleteSubRegion);

module.exports = router;