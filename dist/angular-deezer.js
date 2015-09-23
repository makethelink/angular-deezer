(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularDeezer.config', [])
      .value('angularDeezer.config', {
          debug: true
      });

  // Modules
  angular.module('angularDeezer.services', []);
  angular.module('angularDeezer',
      [
          'angularDeezer.config',
          'angularDeezer.services'
      ]);

})(angular);

(function (window, angular) {
    'use strict';

    angular
        .module('angularDeezer.services')
        .provider('Deezer', DeezerProvider)
        .run(['$timeout', '$q', '$window', initDeezerSdk])
    ;

    var loadDeferred;
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
                console.log(options);
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

            return new ngDeezer();
        }]
    }

    function initDeezerSdk($timeout, $q, $window) {
        loadDeferred = $q.defer();

        /**
         * Define fbAsyncInit required by Facebook API
         */
        $window.dzAsyncInit = function() {
            // Initialize our Facebook app
            $timeout(function() {
                if (!options.appId) {
                    throw 'Missing appId setting.';
                }

                $window.DZ.init(options);

                loadDeferred.resolve(DZ);
            });
        };


        /**
         * Inject Facebook root element in DOM
         */
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