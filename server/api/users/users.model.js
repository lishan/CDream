'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: String,
  pass: String,
  dream: [Schema.Types.Mixed],
  active: Boolean
});

module.exports = mongoose.model('Users', UsersSchema);
