'use strict';

var _ = require('lodash');
var User = require('./user.model');
var Dream = require('../dream/dream.model');

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });
};

exports.find = function(req ,res){
  User.findOne({'email' : req.params.email,'pass' : req.params.pass},function(err, user){
    if(err){return handleError(res,err)}
    return res.json(user);
  });
};

exports.findEmail = function(req ,res){
  User.findOne({'email' : req.params.email},function(err, user){
    return !err;
  });
};

exports.findUser = function(req, res){
  User.findOne({'email' : req.params.email}).populate('dreams tags').exec(function(err, user){
    Dream.populate(user.dreams,{path : '_user tasks'},function(err,dreams){
       if(err){return handleError(res,err)}
       user.dreams = dreams;
       return res.json(user);
    });
    if(err){return handleError(res,err)}
  });
};

exports.addDream = function(req, res){
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.dreams.push(req.body.dream);
    users.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

exports.removeDream = function(req, res){
  User.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.dreams.pull(req.body.dream);
    users.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

exports.addTag = function(req, res){
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.tags.push(req.body.tag);
    users.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

exports.removeTag = function(req, res){
  User.findById(req.params.id, function (err, users) {
    if (err) { return handleError(res, err); }
    if(!users) { return res.send(404); }
    users.tags.pull(req.body.tag);
    users.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, users);
    });
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.json(user);
  });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.json(201, user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
