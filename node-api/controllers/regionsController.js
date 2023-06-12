const Regions = require("../models/regionsModel");
const globalService = require("../core/globalService");
require("dotenv").config();

exports.saveRegionInfo = async (req, res) => {
  const postData = req.body;
  if (postData._id) {
    postData.updatedAt = new Date();
    Regions.updateOne({
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
          message: "Region updated successfully.",
          data: postData,
        });
      }
    });
  } else {
    const addRegions = new Regions();
    Object.keys(postData).forEach((key) => {
      addRegions[key] = postData[key];
    });
    try {
      var regionsResp = await addRegions.save();
      if (regionsResp) {
        return res.json({
          message: "Region Created Successfully.",
          status: 200,
          data: regionsResp
        });
      } else {
        return res.json({
          message: "Failed to create region.",
          status: 500,
          error: 'Getting issue while creating region.',
        });
      }
    } catch (error) {
      return res.json({
        message: "Failed to create a region.",
        status: 500,
        error: error.message,
      });
    }
  }
};

exports.getRegionsList = async (req, res) => {
  var Wheobj = req.body
  try {
    const data = await Regions.find(Wheobj).sort({ regionName: 1 });
    return res.json({
      status: 200,
      message: "Get the regions list successfully.",
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

exports.regionAlreadyExists = async (req, res) => {
  var postData = req.body;
  var whereobj = { regionName: postData.regionName, _id: '' };
  if (postData._id) {
    whereobj._id = { $ne: postData._id };
  } else {
    delete whereobj._id;
  }
  try {
    const regionExitResp = await Regions.find(whereobj);
    if (regionExitResp && regionExitResp.length) {
      return res.json({
        status: 200,
        message: "This Region Already Exists, please try another one.",
        data: regionExitResp,
      });
    } else {
      return res.json({
        status: 500,
        message: "No Region Found.",
        data: regionExitResp,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "No Region Found.",
      data: error,
    });
  }
};

exports.deleteRegion = (req, res) => {
  var postData = req.body;
  Regions.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting Region.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Region Deleted successfully.',
        data: resp
      });
    }
  });
};
