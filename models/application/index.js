var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId; //not needed here, but may be needed in another model file

var schema = require('./schema').getSchema();
var model = mongoose.model('Application', schema);
module.exports.Model = model;