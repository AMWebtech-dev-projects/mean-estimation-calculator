const saveProposal = require("../models/saveProposalModel");
const globalService = require("../core/globalService");
require("dotenv").config();

exports.saveProposal = async (req, res) => {
  const postData = req.body;
  console.log('api postData', postData);
  const addProposal = new saveProposal();
  Object.keys(postData).forEach((key) => {
    addProposal[key] = postData[key];
  });
  try {
    var response = await addProposal.save();
    if (response) {
      return res.json({
        message: "Proposal Added Successfully.",
        status: 200,
        data: response
      });
    } else {
      return res.json({
        message: "Failed to add Proposal.",
        status: 500,
        error: 'Getting issue while adding Proposal.',
      });
    }
  } catch (error) {
    return res.json({
      message: "Failed to add Proposal.",
      status: 500,
      error: error.message,
    });
  }

};

exports.getProposal = async (req, res) => {
  var Wheobj = req.body
  // console.log('Wheobj', Wheobj);
  try {
    const data = await saveProposal.find(Wheobj).sort({ projectName: 1 });
    return res.json({
      status: 200,
      message: "Get the proposal list successfully.",
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

exports.deleteProposal = (req, res) => {
  var postData = req.body;
  saveProposal.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting Proposal.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'Proposal Deleted successfully.',
        data: resp
      });
    }
  });
};
