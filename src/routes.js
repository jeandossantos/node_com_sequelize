const express = require('express');
const UserController = require('./controller/UserController');
const AddressController = require('./controller/AddressController');
const TechController = require('./controller/TechController');

const router = express.Router();

router.post('/users', UserController.store);
router.get('/users', UserController.getAll);
// Adresses

router.post('/users/:user_id/addresses', AddressController.store);
router.get('/users/:user_id/addresses', AddressController.getAll);
// Techs
router.get('/users/:user_id/techs', TechController.getAll);
router.post('/users/:user_id/techs', TechController.store);
router.delete('/users/:user_id/techs', TechController.remove);

module.exports = router;