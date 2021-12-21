(function () {
  "use strict";

  angular.module("table", []).directive("modTable", function () {
    return {
      templateUrl: "app/Components/Table/table.template.html",
      restrict: "E",
      transclude: true,
    };
  });
})();
