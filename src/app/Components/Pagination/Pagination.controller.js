(function () {
  "use strict";

  angular.module("pagination", []).directive("pagiton", function () {
    return {
      link: function ($scope) {
        $scope.onChangePage = function (currentpage) {
          $scope.pagechanged()(currentpage);
        };
      },
      templateUrl: "app/Components/Pagination/Pagination.template.html",
      restrict: "EA",
      transclude: true,
      scope: {
        length: "=",
        totalitems: "=",
        currentpage: "=",
        numperpage: "=",
        pagechanged: "&",
      },
    };
  });
})();
