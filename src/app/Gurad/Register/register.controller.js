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
      result.then((res) => {
        if (res.status) {
          toastr.success(res.message, "Tạo tài khoản");
        } else {
          toastr.error(res.message, "Tạo tài khoản");
        }
      });
    };
  }
})();
