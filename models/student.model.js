const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    rollno:   { type: String },
    email:    { type: String },
    name:     { type: String },
    position: { type: String },
    office:   { type: String },
    salary:   { type: Number }
});

module.exports = { Student };