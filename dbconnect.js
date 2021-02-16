const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://Abhi921:Abhishek@cluster0.z1thi.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true } );

module.exports = connect;
