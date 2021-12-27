(function () {
  "use strict";

  angular
    .module("account.edit")
    .controller("accountEditController", accountEditController);

  accountEditController.$inject = [
    "$scope",
    "toastr",
    "$routeParams",
    "Account",
    "$location",
  ];

  function accountEditController(
    $scope,
    toastr,
    $routeParams,
    Account,
    $location
  ) {
    function getAccount() {
      var result = Account.getAccountById($routeParams.id);
      $scope.account = {
        email: result.email,
        password: result.password,
        nickName: result.nickName,
        role: result.role,
        createdAt: result.createdAt,
        id: result.id,
        avatar: result.avatar,
      };
    }
    getAccount();

    $scope.handleEdit = function (form) {
      if (form.$valid) {
        var result = Account.editAccount($scope.account, $routeParams.id);
        if (result) {
          toastr.success("Thành công !", "Cập nhật người dùng", {
            closeButton: true,
          });
          $location.path("/account-detail/" + $routeParams.id);
        }
      }
    };
  }
})();
