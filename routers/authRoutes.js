const express = require("express");
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.post('/auth/signup', signUpController);
router.post('/auth/login', loginController);

module.exports = router;