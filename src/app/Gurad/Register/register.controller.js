(function () {
  "use strict";

  angular
    .module("register")
    .controller("registerController", registerController);

  registerController.$inject = ["$scope", "Account", "toastr"];

  function registerController($scope, Account, toastr) {
    $scope.account = { email: "", password: "" };
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
