var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var manageServices = new Schema({
  serviceName: {
    type: String,
    trim: true
  },
  expertise: {
    type: Number
  },
  teamSize: {
    type: Number
  },
  hourlyPrice: {
    type: Number
  },
  monthlyPrice: {
    type: Number
  },
  pagePrice: {
    type: Number
  },
  devicePrice: {
    type: Number
  },
  discount: {
    type: Number
  },
  status: {
    type: Number
  },
}, {
  timestamps: true,
  collection: 'manage-services'
});

module.exports = mongoose.model('manage-services', manageServices);
