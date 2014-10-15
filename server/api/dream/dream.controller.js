'use strict';

var _ = require('lodash');
var Dream = require('./dream.model');
var Task = require('../task/task.model');

// Get list of dreams
exports.index = function(req, res) {
  Dream.find(function (err, dreams) {
    if(err) { return handleError(res, err); }
    return res.json(200, dreams);
  });
};

// Get a single dream
exports.show = function(req, res) {
  Dream.findById(req.params.id, function (err, dream) {
    if(err) { return handleError(res, err); }
    if(!dream) { return res.send(404); }
    return res.json(dream);
  });
};

// Creates a new dream in the DB.
exports.create = function(req, res) {
  Dream.create(req.body, function(err, dream) {
    if(err) { return handleError(res, err); }
    return res.json(201, dream);
  });
};

exports.findDream = function(req, res){
  Dream.findOne({'_id' : req.params.id}).populate('tasks').exec(function(err, dream){
    Task.populate(dream.tasks,{path : 'tags'},function(err,tasks){
        if(err){return handleError(res,err)}
        dream.tasks = tasks;
        return res.json(dream);
    });
    if(err){return handleError(res,err)}
  });
};

exports.addTask = function(req, res){
  if(req.body._id) { delete req.body._id; }
  Dream.findById(req.params.id, function (err, dreams) {
    if (err) { return handleError(res, err); }
    if(!dreams) { return res.send(404); }
    dreams.tasks.push(req.body.task);
    dreams.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dreams);
    });
  });
};

exports.removeTask = function(req, res){
  Dream.findById(req.params.id, function (err, dreams) {
    if (err) { return handleError(res, err); }
    if(!dreams) { return res.send(404); }
    dreams.tasks.pull(req.body.task);
    dreams.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dreams);
    });
  });
};

// Updates an existing dream in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dream.findById(req.params.id, function (err, dream) {
    if (err) { return handleError(res, err); }
    if(!dream) { return res.send(404); }
    var updated = _.merge(dream, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dream);
    });
  });
};

// Deletes a dream from the DB.
exports.destroy = function(req, res) {
  Dream.findById(req.params.id, function (err, dream) {
    if(err) { return handleError(res, err); }
    if(!dream) { return res.send(404); }
    dream.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
