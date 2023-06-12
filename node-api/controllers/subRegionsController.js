const subRegions = require("../models/subRegionsModel");
const globalService = require("../core/globalService");
require("dotenv").config();

exports.saveSubRegionInfo = async (req, res) => {
  const postData = req.body;
  if (postData._id) {
    postData.updatedAt = new Date();
    subRegions.updateOne({
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
          message: "Sub Region updated successfully.",
          data: postData,
        });
      }
    });
  } else {
    const addSubRegions = new subRegions();
    Object.keys(postData).forEach((key) => {
      addSubRegions[key] = postData[key];
    });
    try {
      var regionsResp = await addSubRegions.save();
      if (regionsResp) {
        return res.json({
          message: "Sub Region Created Successfully.",
          status: 200,
          data: regionsResp
        });
      } else {
        return res.json({
          message: "Failed to create sub region.",
          status: 500,
          error: 'Getting issue while creating sub region.',
        });
      }
    } catch (error) {
      return res.json({
        message: "Failed to create a sub region.",
        status: 500,
        error: error.message,
      });
    }
  }
};

exports.getSubRegionsList = async (req, res) => {
  try {
    const data = await subRegions.find().sort({ regionName: 1 });
    return res.json({
      status: 200,
      message: "Get the sub regions list successfully.",
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

exports.countryCodeExists = async (req, res) => {
  var postData = req.body;
  var whereobj = { countryCode: postData.countryCode, _id: '' };
  if (postData._id) {
    whereobj._id = { $ne: postData._id };
  } else {
    delete whereobj._id;
  }
  try {
    const countryCodeExitResp = await subRegions.find(whereobj);
    if (countryCodeExitResp && countryCodeExitResp.length) {
      return res.json({
        status: 200,
        message: "This Country Code Already Exists, please try another one.",
        data: countryCodeExitResp,
      });
    } else {
      return res.json({
        status: 500,
        message: "No Country Code Found.",
        data: countryCodeExitResp,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "No Country Code Found.",
      data: error,
    });
  }
};

exports.deleteSubRegion = (req, res) => {
  var postData = req.body;
  subRegions.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting Sub Region.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Sub Region Deleted successfully.',
        data: resp
      });
    }
  });
};
