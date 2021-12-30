(function () {
  "use strict";

  angular
    .module("tableheader", [])

    .directive("headertable", function () {
      return {
        restrict: "A",
        replace: true,
        scope: {
          data: "=",
          sort: "&",
        },
        templateUrl: "app/Components/HeaderTable/HeaderTable.template.html",
        link: function ($scope, element, attrs) {
          $scope.handlSort = function (name) {
            $scope.sort()(name);
          };
        },
      };
    });
})();
