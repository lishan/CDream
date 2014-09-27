'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DreamSchema = new Schema({
  name: String,
  info: String,
  createTime: Date,
  finished: {type: Boolean, default: false},
  icon: String,
  color : String,
  tasks:[String],
  active: Boolean
});

module.exports = mongoose.model('Dream', DreamSchema);
