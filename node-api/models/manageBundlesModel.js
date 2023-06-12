var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var manageBundles = new Schema({
  serviceBundle: {
    type: String,
    trim: true
  },
  serviceId: {
    type: String,
    trim: true
  },
  type: {
    type: Number,
  },
  servicePrice: {
    type: Number
  },
  status: {
    type: Number
  },
}, {
  timestamps: true,
  collection: 'manage-bundles'
});

module.exports = mongoose.model('manage-bundles', manageBundles);
