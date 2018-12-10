const mongoose = require('mongoose');
var message = mongoose.model('message', {
    rollno: { type: String },
    message: { type: String }
});

module.exports = { message };