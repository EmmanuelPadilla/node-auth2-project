const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const router = require("express").Router()

const Users = require("../users/users-model")
const {isInvalid} = require('../users/users-service')

const {jwtSecret} = require("./secrets")





module.exports = router;