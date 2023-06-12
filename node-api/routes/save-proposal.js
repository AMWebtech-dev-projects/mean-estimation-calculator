const express = require("express");
const router = express.Router();
const saveProposal = require("../controllers/saveProposalController");

router.post("/getProposal", saveProposal.getProposal);
router.post("/saveProposal", saveProposal.saveProposal);
router.post('/deleteProposal', saveProposal.deleteProposal);

module.exports = router;