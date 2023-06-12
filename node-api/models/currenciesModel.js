var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var Currencies = new Schema({
  currencyName: {
    type: String,
    trim: true
  },
  currencyFactor: {
    type: Number
  },
  currencySymbol: {
    type: String
  },
  status: {
    type: Number
  },
}, {
  timestamps: true,
  collection: 'currencies'
});

module.exports = mongoose.model('currencies', Currencies);