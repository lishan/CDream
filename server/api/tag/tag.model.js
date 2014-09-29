'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  _user : [{type : Schema.Types.ObjectId, ref : 'User'}],
  name: String,
  info: String,
  color: String,
  icon: String,
  active: Boolean
});

module.exports = mongoose.model('Tag', TagSchema);
