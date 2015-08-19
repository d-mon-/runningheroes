var express = require('express');
var router = express.Router();
var userController = require("../controller/user");

/* GET users listing. */
router.get('/', userController.getClosestUsers);

/* POST users */
router.post('/', userController.insertUser);

module.exports = router;
