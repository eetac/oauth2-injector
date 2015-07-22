'use strict';
var injectorApp = angular.module('injectorApp');

injectorApp.provider('loginProvider', function () {
    var clientId, clientSecret;

    this.setClientCredentials = function(_clientId, _clientSecret){
        clientId = _clientId;
        clientSecret = _clientSecret
    };

    this.$get = function ($http, $location, cookieStore, $rootScope) {
        var factory = {};
        var user;

        factory.login = function (userModel, cb) {
            $http.post('/oauth/token', {
                grant_type: 'password',
                client_id: clientId,
                client_secret: clientSecret,
                username: userModel.login,
                password: userModel.password
            }).success(function (res) {
                var user = {};
                user.name = userModel.login;
                //user.role = res.role;
                user.token = res.access_token;
                var cookieOptions = { path: '/', end: Infinity };
                cookieStore.put('user', JSON.stringify(user), cookieOptions);
                $http.defaults.headers.common['Authorization'] = 'BEARER ' + res.access_token;
                $rootScope.$broadcast('login', user);
                $rootScope.allowedUser = true;
                $location.path('/');
            }).error(function (err) {
                var cookieOptions = { path: '/' };
                cookieStore.remove('user',cookieOptions);
                $rootScope.$broadcast('logout', undefined);
                $rootScope.allowedUser = false;
                cb(false);
            });
        };

        
        
        factory.getUser = function (cb) {
                var user = JSON.parse(cookieStore.get('user'));
                if(user){
                    $rootScope.allowedUser = true;
                    cb(user);
                } else {
                    $rootScope.allowedUser = false;
                    cb(undefined);
                }
            };

        factory.logout = function () {
            var cookieOptions = { path: '/' };
            cookieStore.remove('user',cookieOptions);
            $location.path('/login');
            $rootScope.$broadcast('logout', undefined);
        };

        return factory;
    }
});
