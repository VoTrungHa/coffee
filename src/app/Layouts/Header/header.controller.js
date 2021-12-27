(function () {
  "use strict";

  angular
    .module("header")
    .directive("modHeader", function () {
      return {
        templateUrl: "app/Layouts/Header/header.template.html",
        restrict: "E",
        scope: {
          index: "=",
          name: "=",
        },
        transclude: true,
        // controller: function ($scope) { chỉ xử dụng để xử lý logic
        //   $scope.title=
        // },
      };
    })
    .controller("headerController", headerController);
  headerController.$inject = [
    "$scope",
    "Account",
    "$rootScope",
    "$location",
    "AuthenticationService",
  ];

  function headerController(
    $scope,
    Account,
    $rootScope,
    $location,
    AuthenticationService
  ) {
    $scope.user = {
      avatar: "",
      nickName: "",
      role: "",
    };

    function getUser() {
      if ($rootScope.globals) {
        $scope.isLogin = true;
        var result = Account.getAccountById($rootScope.globals.id);
        $scope.user.avatar = result.avatar;
        $scope.user.nickName = result.nickName;
        $scope.user.role = result.role;
      } else {
        $scope.isLogin = false;
        $scope.user.avatar =
          "http://localhost:3000/public/images/user-avatar.png";
        $scope.user.nickName = "";
        $scope.user.role = "";
      }
    }
    getUser();
    $scope.logout = function () {
      AuthenticationService.ClearCredentials();
      $location.path("/login");
    };
  }
})();
