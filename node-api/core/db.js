const mongoose = require("mongoose");
require("dotenv").config();
exports.createDBConnection = () => {
  mongoose.Promise = global.Promise;
  const connect = mongoose.connect(
    process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  return connect;
};