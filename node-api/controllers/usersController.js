const User = require("../models/usersModel.js");
const globalService = require("../core/globalService");
const config = require("../core/configSetting.js");
var jwt = require('jsonwebtoken');
require("dotenv").config();
exports.saveUserInfo = async (req, res) => {
  const postData = req.body;
  if (postData._id) {
    console.log('inside if ==', postData)
    postData.updatedAt = new Date();
    User.updateOne({
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
          message: "User Updated successfully.",
          data: postData,
        });
      }
    });
  } else {
    if (postData && postData.email) {
      postData.email = postData.email.toLowerCase();
      const addUser = new User();
      Object.keys(postData).forEach((key) => {
        addUser[key] = postData[key];
      });
      try {
        var userResp = await addUser.save();
        if (userResp) {
          return res.json({
            message: "User Account Created Successfuly.",
            status: 200,
            data: userResp
          });
        } else {
          return res.json({
            message: "Failed to create account.",
            status: 500,
            error: 'Getting issue while creating user account.',
          });
        }
      } catch (error) {
        return res.json({
          message: "Failed to create an user account.",
          status: 500,
          error: error.message,
        });
      }
    } else {
      return res.json({
        message: "Failed to create an user account.",
        status: 500,
        error: error.message,
      });
    }
  }
};

exports.doSignIn = async (req, res) => {
  const postData = req.body;
  delete postData.userPhoto;
  postData.email = postData.email.toLowerCase();
  process.env.HOST_NAME = 'http://' + req.headers.host + '/';
  process.env.WEBSITE_URL = 'http://' + req.headers.host + '/#/';
  if (postData.email) {
    try {
      let userDetails = await User.findOne(postData);
      // console.log("userDetails======", userDetails)
      if (userDetails && userDetails.status == 1) {
        userDetails = JSON.parse(JSON.stringify(userDetails));
        var token = jwt.sign({
          _id: userDetails._id
        }, process.env.JWT_SECRETKEY, {
          expiresIn: process.env.TOKEN_EXPIRE // expires in 24 hours 1h, 5m, "10h", "7d"
        });

        userDetails.authorization = token;
        req.session.currentUser = userDetails;
        return res.json({
          message: "You have signin successfully !",
          status: 200,
          data: userDetails,
          config: config,
        });
      } else {
        return res.json({
          message: "You account has been deactivated by Admin. Please contact to administator ...",
          status: 400,
        });
      }
    } catch (error) {
      return res.json({
        message: "We don't have your google cloud login information.",
        status: 500,
        error: error,
      });
    }
  } {
    return res.json({
      message: "We don't have your google cloud login information.",
      status: 400,
    });
  }
};

exports.getUsersList = async (req, res) => {
  try {
    // const data = await User.find();
    const data = await User.find().sort({
      userName: 1
    });
    return res.json({
      status: 200,
      message: "Get the users list successfully.",
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

exports.usersListWithPagination = async (req, res) => {
  const postData = req.body;
  // return;
  console.log("postData", postData)
  var limit = Number(postData.limit) || 10;
  var page = postData.page || 1;
  if (page < 1) page = 1;
  var offset = (page - 1) * limit;
  let searchText = {
    $or: [{
        firstName: {
          $regex: new RegExp(".*" + postData.search.toLowerCase() + ".*", "i"),
        },
      },
      {
        lastName: {
          $regex: new RegExp(".*" + postData.search.toLowerCase() + ".*", "i"),
        },
      },
      {
        email: {
          $regex: new RegExp(".*" + postData.search.toLowerCase() + ".*", "i"),
        },
      },
    ],
  };
  try {
    // const user = await User.find()
    /* console.log("limit", limit)
    console.log("offset", offset) */
    const user = await User.find(searchText).limit(limit).skip(offset);
    // console.log('user', user.length);
    const userLength = await User.countDocuments(searchText);
    // console.log('user', userLength);
    return res.json({
      status: 200,
      message: "Get the user list successfully.",
      data: {
        data: user,
        totalUsers: userLength,
      },
    });
  } catch (err) {
    return res.json({
      status: 500,
      message: "Some error occrred.",
      data: err,
    });
  }
};

exports.emailAlreadyExists = async (req, res) => {
  var postData = req.body;
  try {
    const emailExitResp = await User.find({
      'email': postData.email
    });
    if (emailExitResp && emailExitResp.length) {
      return res.json({
        status: 200,
        message: "This Email Already Exists, please try another one.",
        data: emailExitResp,
      });
    } else {
      return res.json({
        status: 500,
        message: "No Email Found.",
        data: emailExitResp,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "No Email Found.",
      data: error,
    });
  }
};

exports.authentication = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(" ")[1];
    globalService.verifyToken(authorization, (verifyResp) => {
      if (verifyResp.verify) {
        return res.json({
          status: 200,
          message: "Api authenticated Successfully.",
          currentUser: true,
        });
      } else {
        return res.json({
          status: 500,
          message: "Authentication failed.",
          currentUser: null,
        });
      }
    });
  } else {
    return res.json({
      status: 500,
      message: "Authentication failed.",
      currentUser: null,
    });
  }
};

exports.logout = (req, res) => {
  // req.session.destroy();
  return res.json({
    status: 200,
    message: 'Logged out successfully.',
  });
};

exports.deleteUser = (req, res) => {
  var postData = req.body;
  User.findOneAndDelete({
    _id: postData._id
  }, (err, resp) => {
    if (resp === null) {
      return res.json({
        status: 400,
        message: 'There are some error while Deleting User.',
        data: err
      });
    } else {
      return res.json({
        status: 200,
        message: 'User Deleted successfully.',
        data: resp
      });
    }
  });
};