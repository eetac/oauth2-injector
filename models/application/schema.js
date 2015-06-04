var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var jsonform = require('mongoose-jsonform');
var injector = require('mongoose-injector');

var schema = new Schema({
    name: {type: String, required: true, unique: true, index: true},
    details: {
        icon: injector.types.RImage,
        screenshots: [injector.types.RImage],
        description: {type: String, format: 'html'},
        category: {type: ObjectId, ref: 'Category'},
        developer: {type: ObjectId, ref: 'User'},
        download: [{
            market: String,
            url: String
        }]
    },
    tokens: {
        client_id: {type: String, required: true},
        client_secret: {type: String, required: true},
        redirect_uri: {type: String, required: true}
    },
    information: {
        created_at: {type: Date, required: true, default: new Date()},
        updated_at: {type: Date, required: true, default: new Date()}
    }
}, {id: false});

//Is used to enable refection in security middleware
schema.plugin(jsonform, {
    excludedPaths: ['_id', '__v'] //these paths are generally excluded
});

schema.plugin(injector, require('./injector'));

exports.getSchema = function () {
    return schema;
};