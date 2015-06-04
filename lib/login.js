'use strict';
var injectorApp = angular.module('injectorApp');

injectorApp.provider('loginProvider', function () {
    var clientId, clientSecret;

    this.setClientCredentials = function(_clientId, _clientSecret){
        clientId = _clientId;
        clientSecret = _clientSecret
    };

    this.$get = function ($http, $location, $cookieStore, $rootScope) {
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
                $cookieStore.put('user', user);
                $http.defaults.headers.common['Authorization'] = 'BEARER ' + res.access_token;
                $rootScope.$broadcast('login', user);
                $location.path('/');
            }).error(function (err) {
                $cookieStore.remove('user');
                $rootScope.$broadcast('login', undefined);
                cb(false);
            });
        };

        factory.getUser = function () {
            return $cookieStore.get('user');
        };

        factory.logout = function () {
            $cookieStore.remove('user');
            $location.path('/login');
            $rootScope.$broadcast('login', undefined);
        };

        return factory;
    }
});
