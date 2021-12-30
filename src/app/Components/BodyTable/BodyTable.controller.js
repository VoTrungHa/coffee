(function () {
  "use strict";

  angular
    .module("tablebody", [])

    .directive("bodytable", function () {
      return {
        link: function ($scope) {
          $scope.handlUpdate = function (id) {
            $scope.update()(id);
          };
          $scope.handlDelete = function (id) {
            $scope.delete()(id);
          };
        },
        restrict: "A",
        replace: true,
        scope: {
          data: "=",
          update: "&",
          delete: "&",
        },
        templateUrl: "app/Components/BodyTable/BodyTable.template.html",
      };
    });
})();
