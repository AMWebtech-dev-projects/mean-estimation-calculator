var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var Regions = new Schema({
  regionName: {
    type: String,
    trim: true
  },
  regionFactor: {
    type:Number
  },
  status: {
    type: Number
  },
}, {
  timestamps: true,
  collection: 'regions'
});

module.exports = mongoose.model('regions', Regions);