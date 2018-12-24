var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    account:String,
    bandwidth: Number,
    energy: Number,
    bandwidthtime: Date,
    following: [String]
});
module.exports = mongoose.model('Account', Account)