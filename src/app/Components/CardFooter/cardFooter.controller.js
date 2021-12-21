(function () {
  "use strict";

  angular
    .module("cardFooter", [])

    .directive("modCardFooter", function () {
      return {
        templateUrl: "app/Components/CardFooter/cardFooter.template.html",
        restrict: "E",
        transclude: true,
      };
    });
})();
