const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded'); } else { console.log('error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});
require('./user.model');
require('./notification.model');
require('./message.model');
require('./results.model');
require('./supervisor-request.model');
module.exports = mongoose;
