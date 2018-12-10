const mongoose = require('mongoose');


var resultsSchema;
resultsSchema = new mongoose.Schema({
    rollno: {
        type: String,
    },

    year: [{
        year: String,
        subject: [{
            subname: String,
            submarks: Number,
        }],
    }],
});





mongoose.model('Results', resultsSchema);
