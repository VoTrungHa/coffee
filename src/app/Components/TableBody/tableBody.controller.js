(function () {
  "use strict";

  angular.module("tablebody", []).directive("mod-tableBody", function () {
    return {
      templateUrl: "app/Components/TableBody/tableBody.template.html",
      restrict: "E",
      transclude: true,
    };
  });
})();
