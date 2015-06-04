module.exports.config = require('./plugin.json');

module.exports.init = function(injector, oauthConfig){
	oauthConfig.storage = require('./lib/storage.js');	
	injector.security = require('./lib')(injector, oauthConfig);
}