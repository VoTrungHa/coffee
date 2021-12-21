(function () {
  "use strict";

  angular.module("tableheader", []).directive("modTableHeader", function () {
    return {
      templateUrl: "app/Components/TableHeader/tableHeader.template.html",
      restrict: "E",
      transclude: true,
    };
  });
})();
