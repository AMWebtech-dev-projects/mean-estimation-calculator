var createError = require("http-errors");
const express = require("express");
const app = express();
const session = require('express-session');
var path = require("path");
var bodyParser = require('body-parser'),
  cors = require("cors")
const mongoose = require('mongoose')
var cookieParser = require("cookie-parser");
const logger = require('morgan');
// const globalService = require("../core/globalService");
mongoose.Promise = global.Promise;

// connect to db
var DB = require("./core/db");
var DBConnection = DB.createDBConnection();
DBConnection.then(
  (res) => {
    console.log("DB connection done", );
  },
  (err) => {
    console.log("connection failed ", err);
  }
);

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var regionsRouter = require("./routes/regions");
var currenciesRouter = require("./routes/currencies");
var subRegionsRouter = require("./routes/sub-regions");
var manageServicesRouter = require("./routes/manage-services");
var manageBundlesRouter = require("./routes/manage-bundles");
var serviceModulesRouter = require("./routes/service-modules");
var servicePackagesRouter = require("./routes/service-packages");
var saveProposalRouter = require("./routes/save-proposal");
const globalService = require("./core/globalService");
const dotenv = require("dotenv");
dotenv.config();

// session setup
app.use(session({
  secret: process.env.SESSION_SECRETKEY,
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

// view engine setup
app.use(express.static('public'));
app.use(express.static('photos'));
app.use(logger('dev'));
app.use(express.json()); //Used to parse JSON bodies
app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost", "http://localhost:8100"],
    credentials: true,
  })
);
// HERE WE ARE DOING AUTHORIZATION WITH API/UI WITHOUT UI WE CAN'T ACCESS OUR API. IT WILL BE CHANGE AFTER LOGIN ENV.JWT_AUTHORIZATION
app.use(async (req, res) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const authorization = req.headers.authorization.split(" ")[1]
    globalService.verifyToken(authorization, (verifyResp) => {
      if (verifyResp.verify) {
        return req.next();
      } else {
        return res.json({
          status: 401,
          error: "You are unauthorized users.",
        });
      }
    });
  } else {
    let UnauthenticationPages = globalService.authenticationFalsePage();
    let pageSegment = req.url.split('/');
    // console.log("pageSegment", pageSegment)
    const foundPages = UnauthenticationPages.find((page) => page === pageSegment[2])
    console.log("foundPages", foundPages)
    if (foundPages) {
      return req.next();
    } else {
      return res.json({
        status: 401,
        error: "You are unauthorized users.",
      });
    }
  }
})

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/regions", regionsRouter);
app.use("/subregions", subRegionsRouter);
app.use("/currencies", currenciesRouter);
app.use("/manageServices", manageServicesRouter);
app.use("/manageBundles", manageBundlesRouter);
app.use("/serviceModules", serviceModulesRouter);
app.use("/servicePackages", servicePackagesRouter);
app.use("/proposal", saveProposalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// PLEASE UNCOMMENT CODE ON AWS/DIGITALOCEAN SERVER FOR PM2 AND FOREVER but don't need it with microservice
/* app.listen(process.env.PORT, function () {
console.log('Listening on ', process.env.PORT);
}); 
 */
module.exports = app;