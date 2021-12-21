(function () {
  "use strict";

  angular.module("tableRow", []).directive("modTableRow", function () {
    return {
      templateUrl: "app/Components/TableRow/tableRow.template.html",
      restrict: "E",
      transclude: true,
    };
  });
})();
