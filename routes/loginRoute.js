const express = require('express');
const router = express.Router();
const User = require('../model/userSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
require('dotenv').config();
const authController = require('../controller/authController')

router.post('/login',authController.login)


module.exports = router;