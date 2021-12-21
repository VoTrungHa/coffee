(function () {
  "use strict";

  angular
    .module("cardBody", [])

    .directive("modCardBody", function () {
      return {
        templateUrl: "app/Components/CardBody/cardBody.template.html",
        restrict: "E",
        transclude: true,
      };
    });
})();
