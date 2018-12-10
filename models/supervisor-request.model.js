const mongoose = require('mongoose');


var requestSchema;
requestSchema = new mongoose.Schema({
    rollno: {
        type: String,
    },

    subject: {
        type: String,
    },
    description: {
        type: String,
    },
});





mongoose.model('Request', requestSchema);
