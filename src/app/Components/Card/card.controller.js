(function () {
  "use strict";

  angular
    .module("card", [])

    .directive("modCard", function () {
      return {
        templateUrl: "app/Components/Card/card.template.html",
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
          rounded: "=",
          padding: "=",
        },
      };
    });
})();
