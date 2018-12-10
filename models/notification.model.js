const mongoose = require('mongoose');
var notification = mongoose.model('notification', {
    head: { type: String },
    body: { type: String }
});

module.exports = { notification };