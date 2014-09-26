'use strict';

var _ = require('lodash');
var Users = require('./users.model');

// Get list of userss
exports.index = function(req, res) {
  Users.find(function (err, userss) {
    if(err) { return handleError(res, err); }
    return res.json(200, userss);
  });
};

exports.find = function(req ,res){
  Users.findOne({'email' : req.params.email,'pass' : req.params.pass},function(err, user){
    if(err){return handleError(res,err)}
    return res.json(user);
  });
};

exports.findEmail = function(req ,res){
  Users.findOne({'email' : req.params.email},function(err, user){
    return !err;
  });
};

exports.findUser = function(req, res){
  Users.findOne({'email' : req.params.email},function(err, user){
    if(err){return handleError(res,err)}
    return res.json(user);
  });
};

exports.addDreams = function(req, res){
  if(req.body._id) { delete req.body._id; }
  Users.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.dream.push(req.body.dream);
    users.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

exports.setDreams = function(req, res){
  Users.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.dream = req.body.dream;
    users.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

// Get a single users
exports.show = function(req, res) {
  Users.findById(req.params.id, function (err, users) {
    if(err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    return res.json(users);
  });
};

// Creates a new users in the DB.
exports.create = function(req, res) {
  Users.create(req.body, function(err, users) {
    if(err) { return handleError(res, err); }
    return res.json(201, users);
  });
};

// Updates an existing users in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Users.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    var updated = _.merge(users, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

// Deletes a users from the DB.
exports.destroy = function(req, res) {
  Users.findById(req.params.id, function (err, users) {
    if(err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
