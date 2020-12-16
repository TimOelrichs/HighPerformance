
//Import the mongoose module
exports = mongoose = require('mongoose');
var config = require("../config/dbConfig");

//Set up default mongoose connection
var mongoDB = `mongodb://${config.HOST}:${config.PORT}/${config.DBNAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', console.log.bind(console, `[Info] Connected to MongoDB ${config.DBNAME}`));

exports = Schema = mongoose.Schema;
