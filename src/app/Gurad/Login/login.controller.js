(function () {
  "use strict";

  angular.module("login").controller("loginController", loginController);

  loginController.$inject = ["$scope", "AuthenticationService"];

  function loginController($scope, AuthenticationService) {
    $scope.account = { email: "", password: "" };
    $scope.login = function (account) {
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
