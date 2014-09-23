/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Users = require('./users.model');

exports.register = function(socket) {
  Users.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Users.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('users:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('users:remove', doc);
}