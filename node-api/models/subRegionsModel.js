var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var subRegions = new Schema({
  countryName: {
    type: String,
    trim: true
  },
  countryCode: {
    type: String,
    uppercase: true
  },
  regionId: {
    type: String
  },
  status: {
    type: Number
  },
}, {
  timestamps: true,
  collection: 'sub-regions'
});

module.exports = mongoose.model('sub-regions', subRegions);
