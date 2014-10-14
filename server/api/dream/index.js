'use strict';

var express = require('express');
var controller = require('./dream.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/addTask/:id',controller.addTask);
router.post('/removeTask/:id',controller.removeTask);

module.exports = router;
