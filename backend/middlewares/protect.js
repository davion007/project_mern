require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const asyncHandler = require('express-async-handler');

exports.protect = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await User.findById(decoded.id).select('-password')
 
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: 'Not Auth' })
        }
    } else {
        res.status(401).json({ message: 'No Auth, No Token Found' })
    }
})