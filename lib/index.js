var OAuth2Provider = require('oauth2-express').OAuth2Provider;
var oauthProvider;

var path = require('path');

module.exports = function(injector, cfg){
    oauthProvider = new OAuth2Provider(cfg);
    oauthProvider.middleware(injector.app);
    return module.exports;
};

function checkRole(role){
    return oauthProvider.needsOAuth(role);
}

function getUserIfExists(req, res, next){
	next();
}

module.exports.checkRole = function (role) {
    return {
        name: "checkRole(" + role + ")",
        middleware: checkRole(role)
    }
};

module.exports.getUserIfExists = {
    name: "getUserIfExists",
    middleware: getUserIfExists
};
