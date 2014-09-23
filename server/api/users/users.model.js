'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Users', UsersSchema);