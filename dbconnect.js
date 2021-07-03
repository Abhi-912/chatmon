const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true } );

module.exports = connect;
