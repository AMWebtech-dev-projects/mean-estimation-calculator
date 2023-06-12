var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var saveProposal = new Schema({
  projectName: {
    type: String,
    trim: true
  },
  type: {
    type: String,
  },
  tags: {
    type: String,
  },
  status: {
    type: Number
  },
  estimationData: Any,
}, {
  timestamps: true,
  collection: 'template'
});

module.exports = mongoose.model('template', saveProposal);
