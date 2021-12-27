(function () {
  "use strict";

  angular
    .module("register")
    .controller("registerController", registerController);

  registerController.$inject = ["$scope", "Account", "$route", "toastr"];

  function registerController($scope, Account, $route, toastr) {
    $scope.register = function (account) {
      var result = Account.createdAccount(account);
      if (result.status) {
        toastr.success(result.message, "Tạo tài khoản");
      } else {
        toastr.error(result.message, "Tạo tài khoản");
      }
    };
  }
})();
