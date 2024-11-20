const mongoose = require('../config/db')

const { Schema } = mongoose;

const Task = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['work', 'personal', 'study'],
        required: true
    },
    term: {
        type: Date,
        required: true
    },
});

const task = mongoose.model('Task', Task);

module.exports = task