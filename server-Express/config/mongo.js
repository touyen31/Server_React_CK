var mongoose = require('mongoose');
mongoose.connect('mongodb://touyen:uyen1997@ds145223.mlab.com:45223/server_blockchain');

mongoose.Promise = global.Promise
const db=mongoose.connection;
db.on('error', () => console.log("error"))