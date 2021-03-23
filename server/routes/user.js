const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbCreate');

// creates database and tables
router.get('/createdb', dbController.dbCreate);
router.get('/createtable', dbController.dbCreateTable);

// creates and manages user posts
router.get('/', async userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.updateUser);
router.get('/viewuser/:id', userController.viewUser);
router.get('/:id', userController.deleteUser);

module.exports = router;