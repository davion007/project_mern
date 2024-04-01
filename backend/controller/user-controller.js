require("dotenv").config();
const User = require('../model/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAccount = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res.status(409).json({ message: "Email Already Exist" });
    }
    const encry_password = bcrypt.hashSync(password);

    const newUser = await User({
        name: name,
        email: email,
        password: encry_password
    })
    await newUser.save();
    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id)
    });
})


exports.verifyAccount = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(404).json({ message: "Account doesn't exist" });
    }

    if (bcrypt.compare(password, existingUser.password)) {
        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token: generateToken(existingUser._id)
        })
    } else {
        res.status(401).json({ message: "Invalid password" });
    }
})

exports.getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})



const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}