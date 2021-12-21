(function () {
  "use strict";

  angular.module("iconTurnOff", []).directive("iconTurnOff", function () {
    return {
      link: function ($scope) {
        $scope.onClick = function () {
          $scope.isopen = !$scope.isopen;
          $scope.setisopen()($scope.isopen);
        };
      },
      templateUrl: "app/Components/IconTurnOff/iconTurnOff.template.html",
      restrict: "EA",
      transclude: true,
      scope: {
        setisopen: "&",
        isopen: "=",
      },
    };
  });
})();
