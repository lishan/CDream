'use strict';

var express = require('express');
var controller = require('./users.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:email&:pass', controller.find);
router.get('/find/:email', controller.findEmail);
router.get('/find/user/:email', controller.findUser);
router.post('/add/:id', controller.addDreams);
router.post('/setDream/:id', controller.setDreams);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
