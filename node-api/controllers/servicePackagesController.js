const managePackages = require("../models/servicePackagesModel");
const globalService = require("../core/globalService");
require("dotenv").config();

exports.saveServicePackage = async (req, res) => {
  const postData = req.body;
  if (postData._id) {
    postData.updatedAt = new Date();
    managePackages.updateOne({
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
          message: "Service updated successfully.",
          data: postData,
        });
      }
    });
  } else {
    const addServices = new managePackages();
    Object.keys(postData).forEach((key) => {
      addServices[key] = postData[key];
    });
    try {
      var serviceResp = await addServices.save();
      if (serviceResp) {
        return res.json({
          message: "Service Package Added Successfully.",
          status: 200,
          data: serviceResp
        });
      } else {
        return res.json({
          message: "Failed to add service.",
          status: 500,
          error: 'Getting issue while adding service package.',
        });
      }
    } catch (error) {
      return res.json({
        message: "Failed to add service package.",
        status: 500,
        error: error.message,
      });
    }
  }
};

exports.getservicePackages = async (req, res) => {
  var Wheobj = req.body
  try {
    const data = await managePackages.find(Wheobj).sort({ serviceName: 1 });
    return res.json({
      status: 200,
      message: "Get the services packages list successfully.",
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
  managePackages.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting Service Package.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Service Package Deleted successfully.',
        data: resp
      });
    }
  });
};
