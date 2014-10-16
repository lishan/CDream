'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: String,
  pass: String,
  mobile: String,
  qq: String,
  address: String,
  dreams: [{type : Schema.Types.ObjectId, ref : 'Dream'}],
  tags: [{type : Schema.Types.ObjectId, ref : 'Tag'}],
  active: Boolean
});

module.exports = mongoose.model('User', UsersSchema);
