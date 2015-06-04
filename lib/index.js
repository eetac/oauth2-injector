var OAuth2Provider = require('oauth2-express').OAuth2Provider;
var oauthProvider;

var path = require('path');

module.exports = function(cfg){
    oauthProvider = new OAuth2Provider(cfg);
    return module.exports;
};

module.exports.checkRole = function(role){
    return oauthProvider.needsOAuth(role);
};

module.exports.getUserIfExists = function(req, res, next){
	next();
};