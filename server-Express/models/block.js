var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Block = new Schema({
    account:String,
    sequence:Number,
    operation:String,
    params:Schema.Types.Mixed,
    time: Date,
    height: Number,
    hash: String
});
module.exports = mongoose.model('Block', Block)