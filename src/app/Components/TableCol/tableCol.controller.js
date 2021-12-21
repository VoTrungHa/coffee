(function () {
  "use strict";

  angular.module("tableCol", []).directive("modTableCol", function () {
    return {
      templateUrl: "app/Components/TableCol/tableCol.template.html",
      restrict: "EA",
      transclude: true,
      scope: {
        ishead: "=",
        widthcol: "=",
      },
    };
  });
})();
