'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DreamSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  info: String,
  createTime: Date,
  finished: {type: Boolean, default: false},
  icon: String,
  color : String,
  tasks:[{type : Schema.Types.ObjectId, ref : 'Task'}],
  active: Boolean
});

module.exports = mongoose.model('Dream', DreamSchema);
