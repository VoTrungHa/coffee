(function () {
  "use strict";

  angular
    .module("account.created")
    .controller("accountCreatedController", accountCreatedController);

  accountCreatedController.$inject = ["$scope"];

  function accountCreatedController($scope) {
    $scope.name = "Chúc bạn thành công";
  }
})();
