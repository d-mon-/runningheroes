var express = require('express');
var router = express.Router();
var userController = require("../controller/user.js");



/* GET users listing. */
router.get('/', userController.getClosestUsers);

router.post('/',userController.insertUser);

module.exports = router;
