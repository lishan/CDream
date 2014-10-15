'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  _dream: {type: Schema.Types.ObjectId, ref: 'Dream'},
  createTime : Date,
  dueTime : Date,
  name: String,
  finished: {type: Boolean, default: false},
  info: String,
  tags: [{type : Schema.Types.ObjectId, ref : 'Tag'}],
  active: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);
