const express = require("express");
const router = express.Router();
const Currencies = require("../controllers/currenciesController");

router.get("/getCurrenciesList", Currencies.getCurrenciesList);
router.post("/saveCurrencyInfo", Currencies.saveCurrencyInfo);
router.post("/currencyAlreadyExists", Currencies.currencyAlreadyExists);
router.post('/deleteCurrency', Currencies.deleteCurrency);

module.exports = router;
