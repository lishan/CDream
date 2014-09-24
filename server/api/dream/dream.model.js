'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DreamSchema = new Schema({
  name: String,
  info: String,
  createTime: Date,
  finished: Boolean,
  tasks:[Schema.Types.Mixed],
  active: Boolean
});

module.exports = mongoose.model('Dream', DreamSchema);
