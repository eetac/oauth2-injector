'use strict';

var injectorApp = angular.module('injectorApp');

injectorApp.config(function (loginProviderProvider) {
    loginProviderProvider.setClientCredentials("backoffice_id", "backoffice_secret");
});