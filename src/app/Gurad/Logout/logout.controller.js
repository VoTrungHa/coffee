(function () {
  "use strict";

  angular.module("logout").controller("logoutController", logoutController);

  logoutController.$inject = ["$scope", "AuthenticationService", "$route"];

  function logoutController($scope, AuthenticationService, $route) {
    $scope.logout = function (account) {
      AuthenticationService.Login(account, function (response) {
        if (response.status) {
          AuthenticationService.SetCredentials(response.id);
          location.replace("/");
        } else {
          $scope.error = response.message;
        }
      });
    };
  }
})();
