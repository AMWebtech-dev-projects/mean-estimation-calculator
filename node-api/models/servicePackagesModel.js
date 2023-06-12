var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var servicePackages = new Schema({
  servicePackage: {
    type: String,
    trim: true
  },
  serviceId: {
    type: String,
    trim: true
  },
  essential: {
    type: Number,
  },
  professional: {
    type: Number,
  },
  enterprise: {
    type: Number,
  },
  status: {
    type: Number
  },
  packageData: Any,
}, {
  timestamps: true,
  collection: 'service-packages'
});

module.exports = mongoose.model('service-packages', servicePackages);
