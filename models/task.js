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
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    type: {
        type: String,
        enum: ['Work', 'Personal', 'Study'],
        required: true
    },
    term: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = mongoose.model('Task', Task);

module.exports = task