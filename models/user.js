const mongoose = require('../config/db')

const { Schema } = mongoose;

const User = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const user = mongoose.model('User', User);

module.exports = user