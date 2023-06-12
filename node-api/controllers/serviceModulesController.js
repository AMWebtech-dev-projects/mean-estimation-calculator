const manageServices = require("../models/serviceModulesModel");
const globalService = require("../core/globalService");
require("dotenv").config();

exports.saveServiceInfo = async (req, res) => {
  const postData = req.body;
  if (postData._id) {
    postData.updatedAt = new Date();
    manageServices.updateOne({
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
          message: "Service Module updated successfully.",
          data: postData,
        });
      }
    });
  } else {
    const addServices = new manageServices();
    Object.keys(postData).forEach((key) => {
      addServices[key] = postData[key];
    });
    try {
      var regionsResp = await addServices.save();
      if (regionsResp) {
        return res.json({
          message: "Service Module Added Successfully.",
          status: 200,
          data: regionsResp
        });
      } else {
        return res.json({
          message: "Failed to add service.",
          status: 500,
          error: 'Getting issue while adding service.',
        });
      }
    } catch (error) {
      return res.json({
        message: "Failed to add service.",
        status: 500,
        error: error.message,
      });
    }
  }
};

exports.getServiceModules = async (req, res) => {
  var Wheobj = req.body
  try {
    const data = await manageServices.find(Wheobj).sort({ serviceModule: 1 });
    return res.json({
      status: 200,
      message: "Get the Services Modules list successfully.",
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

exports.deleteService = (req, res) => {
  var postData = req.body;
  manageServices.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting Service Module.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Service Module Deleted successfully.',
        data: resp
      });
    }
  });
};
