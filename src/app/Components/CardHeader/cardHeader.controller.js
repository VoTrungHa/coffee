(function () {
  "use strict";

  angular
    .module("cardHeader", [])

    .directive("modCardHeader", function () {
      return {
        templateUrl: "app/Components/CardHeader/cardHeader.template.html",
        restrict: "E",
        transclude: true,
      };
    });
})();
