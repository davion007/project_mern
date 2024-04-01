const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    role:{
        type: Number,
        required: true,
        default: 0 // Role 1 for admin
    },

    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema)