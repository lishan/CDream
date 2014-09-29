'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:email&:pass', controller.find);
router.get('/find/:email', controller.findUser);
router.post('/addDream/:id', controller.addDream);
router.post('/removeDream/:id', controller.removeDream);
router.post('/addTag/:id',controller.addTag);
router.post('/removeTag/:id',controller.removeTag);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
