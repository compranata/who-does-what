// ./controllers/mdb-connection.js
const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/wdw';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const mdb = mongoose.connection;

console.log('MongoDB connected');
mdb.on('error', console.error.bind(console, 'MongoDB connection error:'));
