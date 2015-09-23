(function (window, angular) {
    'use strict';

    angular
        .module('angularDeezer.services')
        .provider('Deezer', DeezerProvider)
        .run(['$timeout', '$window', initDeezerSdk])
    ;

    var options = {
        appId: null,
        channelUrl: null
    };

    function DeezerProvider() {
        this.setAppId = function(appId) {
            options.appId = appId;
        }

        this.setChannelUrl = function(channelUrl) {
            options.channelUrl = channelUrl;
        }

        this.init = function(customOptions) {
            angular.extend(options, customOptions);
        };

        this.$get = ['$q', '$window', function($q, $window) {
            var ngDeezer = function() {
                this.appId = options.appId;
                this.channelUrl = options.channelUrl;
            }

            ngDeezer.prototype.login = function(permissions) {
                var deferred = $q.defer();

                $window.DZ.login(function(response) {
                    if (response.authResponse) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject(response);
                    }
                }, permissions)

                return deferred.promise;
            }

            angular.forEach([
                'ready',
                'logout',
                'api',
                'getLoginStatus'
            ], function(name) {
                ngDeezer.prototype[name] = function() {
                    var deferred = $q.defer();
                    var args = Array.prototype.slice.call(arguments);

                    //Add a function to be resolved to a promise
                    args.push(function(response) {
                        if (response && typeof response.error == 'undefined') {
                            deferred.resolve(response);
                        } else {
                            deferred.reject(response);
                        }
                    });
                    $window.DZ[name].apply(DZ, args);

                    return deferred.promise;
                }
            });
            return new ngDeezer();
        }]
    }

    function initDeezerSdk($timeout, $window) {
        $window.dzAsyncInit = function() {
            // Initialize our Facebook app
            $timeout(function() {
                if (!options.appId) {
                    throw 'Missing appId setting.';
                }
                if (!options.channelUrl) {
                    throw 'Missing channelUrl setting.';
                }

                $window.DZ.init(options);
            });
        };


        (function addDZRoot() {
            var dzRoot = document.getElementById('dz-root');

            if (!dzRoot) {
                dzRoot = document.createElement('div');
                dzRoot.id = 'dz-root';
                document.body.insertBefore(dzRoot, document.body.childNodes[0]);
            }

            return dzRoot;
        })();

        (function() {
            var e = document.createElement('script');
            e.src = 'https://cdns-files.deezer.com/js/min/dz.js';
            e.async = true;
            document.getElementById('dz-root').appendChild(e);
        }());
    }
})(window, angular);