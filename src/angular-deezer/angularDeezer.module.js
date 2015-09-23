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
