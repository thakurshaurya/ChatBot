const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
        trim: true,
    },
    output: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Input', inputSchema);
