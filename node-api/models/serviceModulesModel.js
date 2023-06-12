var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var serviceModules = new Schema({
  serviceModule: {
    type: String,
    trim: true
  },
  timeRequired: {
    type: Number,
  },
  summary: {
    type: String,
  },
  status: {
    type: Number
  },
}, {
  timestamps: true,
  collection: 'service-modules'
});

module.exports = mongoose.model('service-modules', serviceModules);
