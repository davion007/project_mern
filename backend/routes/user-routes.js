const express = require('express')
const { verifyAccount, createAccount, getMe } = require('../controller/user-controller')
const {protect} = require('../middlewares/protect')
const Router = express.Router()

Router.post('/verify', verifyAccount)
Router.post('/create', createAccount)
Router.get('/me', protect, getMe)

module.exports = Router