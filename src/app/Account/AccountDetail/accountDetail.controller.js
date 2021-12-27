(function () {
  "use strict";

  angular
    .module("account.detail")
    .controller("accountDetailController", accountDetailController);

  accountDetailController.$inject = ["$scope", "$routeParams", "Account"];

  function accountDetailController($scope, $routeParams, Account) {
    $scope.account = Account.getAccountById($routeParams.id);
    $scope.isSetOpenSearch = true;
    $scope.setIsOpenSearch = function (name) {
      $scope.isSetOpenSearch = name;
    };
  }
})();
