const Currencies = require("../models/currenciesModel");
const globalService = require("../core/globalService");
require("dotenv").config();

exports.saveCurrencyInfo = async (req, res) => {
  const postData = req.body;
  // console.log('apipostData', postData);
  if (postData._id) {
    postData.updatedAt = new Date();
    Currencies.updateOne({
      _id: postData._id,
    }, postData, (err, resp) => {
      if (err) {

        return res.json({
          status: 500,
          message: "There are some error while update.",
          data: err,
        });
      } else {
        return res.json({
          status: 200,
          message: "Currency updated successfully.",
          data: postData,
        });
      }
    });
  } else {
    const addCurrencies = new Currencies();
    Object.keys(postData).forEach((key) => {
      addCurrencies[key] = postData[key];
    });
    try {
      var currenciesResp = await addCurrencies.save();
      if (currenciesResp) {
        return res.json({
          message: "Currency Added Successfully.",
          status: 200,
          data: currenciesResp
        });
      } else {
        return res.json({
          message: "Failed to create currency.",
          status: 500,
          error: 'Getting issue while creating currency.',
        });
      }
    } catch (error) {
      return res.json({
        message: "Failed to create a currency.",
        status: 500,
        error: error.message,
      });
    }
  }
};

exports.getCurrenciesList = async (req, res) => {
  try {
    const data = await Currencies.find().sort({ currencyName: 1 });
    return res.json({
      status: 200,
      message: "Get the currencies list successfully.",
      data: data,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Some error occurred.",
      data: error,
    });
  }
};

exports.currencyAlreadyExists = async (req, res) => {
  var postData = req.body;
  var whereobj = { currencySymbol: postData.currencySymbol, _id: '' };
  if (postData._id) {
    whereobj._id = { $ne: postData._id };
  } else {
    delete whereobj._id;
  }
  try {
    const currencyExitResp = await Currencies.find(whereobj);
    if (currencyExitResp && currencyExitResp.length) {
      return res.json({
        status: 200,
        message: "This Currency Already Exists, please try another one.",
        data: currencyExitResp,
      });
    } else {
      return res.json({
        status: 500,
        message: "No Currency Found.",
        data: currencyExitResp,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "No Currency Found.",
      data: error,
    });
  }
};

exports.deleteCurrency = (req, res) => {
  var postData = req.body;
  Currencies.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting Currency.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Currency Deleted successfully.',
        data: resp
      });
    }
  });
};
