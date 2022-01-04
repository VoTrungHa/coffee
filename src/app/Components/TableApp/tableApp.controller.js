(function () {
  "use strict";

  angular
    .module("tableapp", [])

    .directive("modTableApp", function () {
      return {
        link: function ($scope) {
          $scope.sortBy = function (propertyName) {
            $scope.reverse =
              $scope.propertyName === propertyName ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
          };

          $scope.handlUpdate = function (id) {
            $scope.update()(id);
          };
          $scope.handlDelete = function (id) {
            $scope.delete()(id);
          };
          $scope.handlSort = function (name) {
            $scope.sort()(name);
          };
          $scope.search = function (row) {
            return (
              angular
                .lowercase(row.brand)
                .indexOf(angular.lowercase($scope.query) || "") !== -1 ||
              angular
                .lowercase(row.model)
                .indexOf(angular.lowercase($scope.query) || "") !== -1
            );
          };
        },
        restrict: "EA",
        replace: true,
        scope: {
          data: "=",
          tabheader: "=",
          update: "&",
          delete: "&",
          propertyname: "=",
          sort: "&",
        },
        templateUrl: "app/Components/TableApp/tableApp.template.html",
      };
    });
})();
